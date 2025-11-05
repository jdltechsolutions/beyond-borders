'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
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

export async function updateBookingDetails(formData: FormData) {
  'use server'
  try {
    const supabase = await createClient()
    const prisma = new PrismaClient()
    const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized. Please login.')

    // Admin-only
    const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { role: true } })
  if (dbUser?.role !== Role.ADMIN) throw new Error('Forbidden. Admins only.')

    const bookingId = String(formData.get('bookingId') || '')
    const startDateStr = String(formData.get('startDate') || '')
    const endDateStr = String(formData.get('endDate') || '')
    const groupSizeStr = String(formData.get('groupSize') || '1')
    const notes = (formData.get('notes') as string | null) ?? null
    const guestName = (formData.get('guestName') as string | null) ?? null
    const guestEmail = (formData.get('guestEmail') as string | null) ?? null
    const guestPhone = (formData.get('guestPhone') as string | null) ?? null

  if (!bookingId) throw new Error('Missing booking id.')

    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)
    const groupSize = Math.max(1, parseInt(groupSizeStr || '1', 10))
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid dates.')
    }
    if (endDate < startDate) {
      throw new Error('End date must be after start date.')
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        startDate,
        endDate,
        groupSize,
        notes,
        guestName,
        guestEmail,
        guestPhone,
      },
    })

    revalidatePath(`/dashboard/bookings/${bookingId}`)
    revalidatePath('/dashboard/bookings')
  redirect(`/dashboard/bookings/${bookingId}?updated=1`)
  } catch (err) {
    console.error('updateBookingDetails error', err)
    // Optionally, handle error feedback route here
    throw err
  }
}
