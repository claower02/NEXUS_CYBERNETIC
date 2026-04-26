import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL
  
  if (connectionString) {
    const pool = new pg.Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  } else {
    // В Prisma 7 если нет URL, используем стандартный конструктор.
    // Окружение для сборки мы обеспечим в Dockerfile.
    return new PrismaClient()
  }
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }
  return globalForPrisma.prisma
}

// Lazy proxy: PrismaClient инициализируется только при первом реальном обращении.
// Это позволяет Next.js безопасно импортировать этот модуль во время сборки.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient()
    const value = client[prop as keyof PrismaClient]
    if (typeof value === "function") {
      return value.bind(client)
    }
    return value
  },
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
