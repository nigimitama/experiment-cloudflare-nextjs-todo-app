import { PrismaClient } from '@/generated/prisma'
import { PrismaD1 } from '@prisma/adapter-d1'
import { getCloudflareContext } from '@opennextjs/cloudflare'

/**
 * Get Prisma client configured for the current environment
 * Uses Cloudflare D1 via D1 adapter in both development and production
 */
export async function getPrismaClient(): Promise<PrismaClient> {
  const context = await getCloudflareContext({ async: true })
  if (!context?.env?.DB) {
    throw new Error('D1 database binding not found. Make sure you are running with wrangler or have configured D1.')
  }

  // Use D1 with adapter
  const adapter = new PrismaD1(context.env.DB)
  return new PrismaClient({ adapter })
}
