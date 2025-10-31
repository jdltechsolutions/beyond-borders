'use server'

import { revalidatePath } from 'next/cache'
import { PrismaClient } from '@/lib/generated/prisma'
import { createClient } from '@/utils/supabase/server'

export async function createBooking(formData: {
  serviceId: string
  startDate: string
  endDate: string
  groupSize: string
  notes?: string
  guestName?: string
  guestEmail?: string
  guestPhone?: string
}) {
  try {
    // Get authenticated user
    const supabase = await createClient()
    const prisma = new PrismaClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized. Please login.' }
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        serviceId: formData.serviceId,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        groupSize: parseInt(formData.groupSize),
        notes: formData.notes || null,
        guestName: formData.guestName || null,
        guestEmail: formData.guestEmail || null,
        guestPhone: formData.guestPhone || null,
        status: 'PENDING',
      },
      include: {
        service: true,
      },
    })

    revalidatePath('/bookings')
    return { success: true, booking }
  } catch (error) {
    console.error('Booking creation error:', error)
    return { error: 'Failed to create booking. Please try again.' }
  }
}