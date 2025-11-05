import { notFound } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { PrismaClient, Role } from "@/lib/generated/prisma"
import type { BookingStatus as BookingStatusType } from "@/lib/generated/prisma"
import BookingDetailsClient from "@/app/dashboard/bookings/[id]/BookingDetailsClient"

export default async function BookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // Auth: server-side via Supabase
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return notFound()

  // DB: Prisma client
  const prisma = new PrismaClient()

  // Role resolution
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  })
  const role: "admin" | "customer" = dbUser?.role === Role.ADMIN ? "admin" : "customer"

  // Load booking and a few relations needed in the details page
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      service: { select: { name: true } },
      user: role === "admin" ? { select: { id: true, email: true, name: true } } : false,
    },
  })

  if (!booking) return notFound()

  // Access control: customers can only view their own booking
  if (role !== "admin" && booking.userId !== user.id) return notFound()

  // Map to UI shape
  const uiBooking = {
    id: booking.id,
    reference: booking.id, // adjust if you have a custom reference code
    serviceName: booking.service?.name ?? "Service",
    startDate: booking.startDate.toISOString(),
    endDate: booking.endDate.toISOString(),
    groupSize: booking.groupSize,
    status: booking.status as BookingStatusType,
    notes: booking.notes ?? undefined,
    guestName: booking.guestName ?? undefined,
    customer:
      role === "admin" && booking.user
        ? {
            id: booking.user.id,
            name: (booking.user).name ?? undefined,
            email: booking.user.email ?? undefined,
          }
        : undefined,
  }

  // Role-based permissions for action buttons
  const permissions = {
    canPay: role === "customer" && uiBooking.status === "PENDING",
    canCancel: role === "customer" && uiBooking.status !== "CANCELLED",
    canEdit: role === "admin",
    canChangeStatus: role === "admin",
    canRefund: role === "admin" && uiBooking.status === "CONFIRMED",
    canUploadDocs: role === "customer" && uiBooking.status !== "CANCELLED",
  }

  return <BookingDetailsClient booking={uiBooking} role={role} permissions={permissions} />
}
