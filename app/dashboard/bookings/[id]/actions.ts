'use server'

import { revalidatePath } from 'next/cache'
import { PrismaClient, Role } from '@/lib/generated/prisma'
import { createClient } from '@/utils/supabase/server'
import type { BookingStatus as BookingStatusType } from '@/lib/generated/prisma'

export async function updateBookingStatus(bookingId: string, status: BookingStatusType) {
  try {
    const supabase = await createClient()
    const prisma = new PrismaClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized. Please login.' }
    }

    // Only admins can change status
    const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { role: true } })
    if (dbUser?.role !== Role.ADMIN) {
      return { error: 'Forbidden. Admins only.' }
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      select: { id: true, status: true },
    })

    // Revalidate pages that show this booking
    revalidatePath(`/dashboard/bookings/${bookingId}`)
    revalidatePath('/dashboard/bookings')

    return { success: true, booking }
  } catch (err) {
    console.error('updateBookingStatus error', err)
    return { error: 'Failed to update status.' }
  }
}
