import { notFound, redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { PrismaClient, Role } from "@/lib/generated/prisma"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "../_components/SubmitButton"
import { updateBookingDetails } from "../actions"
import Link from "next/link"

export default async function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Auth
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return notFound()

  // Role
  const prisma = new PrismaClient()
  const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { role: true } })
  const role: "admin" | "customer" = dbUser?.role === Role.ADMIN ? "admin" : "customer"
  if (role !== "admin") return notFound()

  // Load booking
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      service: { select: { name: true } },
      user: { select: { name: true, email: true, phone: true } },
    },
  })
  if (!booking) return notFound()

  // Prefill values
  const startISO = booking.startDate.toISOString().slice(0, 16) // for datetime-local
  const endISO = booking.endDate.toISOString().slice(0, 16)
  const guestNameDefault = booking.guestName ?? booking.user?.name ?? ""
  const guestEmailDefault = booking.guestEmail ?? booking.user?.email ?? ""
  const guestPhoneDefault = booking.guestPhone ?? booking.user?.phone ?? ""

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit booking</h1>
        <p className="text-sm text-neutral-500">{booking.service?.name ?? "Service"} • {booking.id}</p>
      </div>

      <form action={updateBookingDetails} className="space-y-5">
        <input type="hidden" name="bookingId" value={booking.id} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="startDate">Start date</Label>
            <Input id="startDate" name="startDate" type="datetime-local" defaultValue={startISO} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="endDate">End date</Label>
            <Input id="endDate" name="endDate" type="datetime-local" defaultValue={endISO} required />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="groupSize">Group size</Label>
            <Input id="groupSize" name="groupSize" type="number" min={1} defaultValue={booking.groupSize} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="guestName">Guest name</Label>
            <Input id="guestName" name="guestName" type="text" defaultValue={guestNameDefault} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="guestEmail">Guest email</Label>
            <Input id="guestEmail" name="guestEmail" type="email" defaultValue={guestEmailDefault} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="guestPhone">Guest phone</Label>
            <Input id="guestPhone" name="guestPhone" type="tel" defaultValue={guestPhoneDefault} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" rows={4} defaultValue={booking.notes ?? ""} />
        </div>

        <div className="flex items-center gap-3">
          <SubmitButton>Save changes</SubmitButton>
          <Button asChild type="button" variant="outline">
            <Link href={`/dashboard/bookings/${booking.id}`}>Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
