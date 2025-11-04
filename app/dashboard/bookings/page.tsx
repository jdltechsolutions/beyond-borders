// Server-side page that lists bookings with optional status filtering.
// Uses Supabase for auth and Prisma for database access.
import { createClient } from "@/utils/supabase/server"
import { PrismaClient, Role } from "@/lib/generated/prisma"
import type { Prisma, BookingStatus as BookingStatusType } from "@/lib/generated/prisma"
import BookingsClient from "./BookingsClient"

type SearchParams = { [key: string]: string | string[] | undefined }

export default async function BookingsPage({ searchParams }: { searchParams: SearchParams }) {
  // 1) Authenticate the user (server-side) via Supabase
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  // If not logged in, render nothing (middleware should redirect anyway)
  if (!user) return null

  // 2) Create Prisma client and load the user's role from the DB
  const prisma = new PrismaClient()
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  })
  const role = dbUser?.role === Role.ADMIN ? "admin" : "customer"

  // 3) Parse the `status` filter from the URL: /dashboard/bookings?status=pending
  //    We normalize to uppercase and keep only allowed statuses (UI supports these three)
  const rawStatus =
    typeof searchParams?.status === "string"
      ? (searchParams.status.toUpperCase() as BookingStatusType)
      : undefined
  const allowed: Set<BookingStatusType> = new Set(["PENDING", "CONFIRMED", "CANCELLED"])
  // 4) Build a Prisma where filter.
  //    - Non-admins only see their own bookings
  //    - Apply status filter only if allowed
  const where: Prisma.BookingWhereInput = {}
  if (role !== "admin") where.userId = user.id
  if (rawStatus && allowed.has(rawStatus)) where.status = rawStatus

  // 5) Query bookings, include the related service name, and sort by most recent start date
  const bookings = await prisma.booking.findMany({
    where,
    include: { service: { select: { name: true } } },
    orderBy: { startDate: "desc" },
  })

  // 6) Map DB records to a UI-friendly shape (e.g., Date -> ISO string)
  const uiBookings = bookings.map((b) => ({
    id: b.id,
    serviceName: b.service?.name ?? "Service",
    startDate: b.startDate.toISOString(),
    endDate: b.endDate.toISOString(),
    groupSize: b.groupSize,
    status: b.status as "PENDING" | "CONFIRMED" | "CANCELLED",
    notes: b.notes ?? undefined,
    guestName: b.guestName ?? undefined,
  }))

  // 7) Initial status filter for the client UI (defaults to "ALL")
  const initialStatus = rawStatus && allowed.has(rawStatus) ? (rawStatus as "PENDING" | "CONFIRMED" | "CANCELLED") : "ALL"

  // 8) Render the client component with pre-fetched data and role context
  return <BookingsClient bookings={uiBookings} initialStatus={initialStatus} role={role} />
}
