import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const prismaClientSingleton = () => {
  const databaseUrl = process.env.DATABASE_URL ?? 'file:./dev.db'
  
  // According to the error, it expects { url: ... }
  // It seems in this version, the adapter takes the configuration object directly?
  // Or maybe I am importing the wrong thing?
  
  const adapter = new PrismaBetterSqlite3({
    url: databaseUrl
  })
  
  return new PrismaClient({ adapter })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
