import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import { getCloudflareContext } from '@opennextjs/cloudflare'

// Global prisma instance for local development (prevents multiple instances)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Get Prisma client configured for the current environment
 * - Local development: Uses SQLite via file:./dev.db
 * - Production: Uses Cloudflare D1 via binding
 */
export function getPrismaClient(): PrismaClient {
  // Check if running in Cloudflare Workers (production)
  try {
    const context = getCloudflareContext()
    if (context?.env?.DB) {
      // Production: Use D1 with adapter
      const adapter = new PrismaD1(context.env.DB)
      return new PrismaClient({ adapter })
    }
  } catch (error) {
    // Not in Cloudflare context, fall through to local
  }

  // Local development: Use standard SQLite
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  }

  return globalForPrisma.prisma
}

// Export for convenience
export const prisma = getPrismaClient()
