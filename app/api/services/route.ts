import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['warn', 'error'],
  })
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(services, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('[api/services] fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}