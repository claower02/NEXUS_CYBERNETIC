import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL
  
  // Если мы в браузере или нет строки подключения, возвращаем пустышку
  // Это предотвратит краш Client Components
  if (typeof window !== "undefined" || !connectionString) {
    return new Proxy({} as PrismaClient, {
      get() {
        throw new Error("PrismaClient cannot be used on the client side or without DATABASE_URL.")
      }
    })
  }

  try {
    const pool = new pg.Pool({ connectionString, max: 10 })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  } catch (error) {
    console.error("Failed to initialize Prisma:", error)
    return new PrismaClient() // Fallback
  }
}

// Singleton для работы в Next.js (предотвращает утечки соединений при hot-reload)
export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
