import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL
  
  // Безопасный прокси-заглушка для пограничных случаев
  const dummyClient = new Proxy({} as PrismaClient, {
    get(_target, prop) {
      console.warn(`Prisma access attempted on property "${String(prop)}", but DATABASE_URL is missing.`)
      // Возвращаем функцию-пустышку для методов БД (.findMany, .create и т.д.)
      return () => Promise.resolve(null)
    }
  })

  // Если мы в браузере — возвращаем заглушку (база только на сервере!)
  if (typeof window !== "undefined") {
    return dummyClient
  }

  // Если на сервере нет адреса базы — не крашим приложение, а возвращаем заглушку
  if (!connectionString) {
    console.error("CRITICAL: DATABASE_URL is missing in environment variables!")
    return dummyClient
  }

  try {
    const pool = new pg.Pool({ 
      connectionString, 
      max: 10,
      connectionTimeoutMillis: 5000 
    })
    
    // Предотвращаем падение процесса при ошибках в пуле
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err)
    })

    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  } catch (error) {
    console.error("Prisma initialization failed:", error)
    return dummyClient
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
