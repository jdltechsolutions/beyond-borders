import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

export async function GET() {
    const prisma = new PrismaClient();

  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    })
    
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}