"use client"

import { useMemo } from "react"

export type Role = "admin" | "customer"
export type Status = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"

type BookingUI = {
  id: string
  reference: string
  serviceName: string
  startDate: string
  endDate: string
  groupSize: number
  status: Status
  notes?: string
  guestName?: string
  customer?: { id: string; name?: string; email?: string }
}

type Permissions = {
  canPay: boolean
  canCancel: boolean
  canEdit: boolean
  canChangeStatus: boolean
  canRefund: boolean
  canUploadDocs: boolean
}

export default function BookingDetailsClient({
  booking,
  role,
  permissions,
}: {
  booking: BookingUI
  role: Role
  permissions: Permissions
}) {
  const dateRange = useMemo(() => {
    const s = new Date(booking.startDate)
    const e = new Date(booking.endDate)
    return `${s.toLocaleDateString()} → ${e.toLocaleDateString()}`
  }, [booking.startDate, booking.endDate])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm text-neutral-500">Booking {booking.reference}</div>
          <h1 className="text-2xl font-semibold">{booking.serviceName}</h1>
          <div className="text-sm text-neutral-600">
            {dateRange}
            <span className="ml-2">• Group {booking.groupSize}</span>
          </div>
          {role === "admin" && booking.customer && (
            <div className="mt-1 text-sm text-neutral-500">
              Customer: {booking.customer.name || "Unknown"} ({booking.customer.email})
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={booking.status} />
          {permissions.canPay && (
            <a
              href={`/dashboard/bookings/${booking.id}/pay`}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
            >
              Pay now
            </a>
          )}
          {permissions.canCancel && (
            <a
              href={`/dashboard/bookings/${booking.id}/cancel`}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-50"
            >
              Cancel
            </a>
          )}
          {permissions.canEdit && (
            <a
              href={`/dashboard/bookings/${booking.id}/edit`}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-50"
            >
              Edit
            </a>
          )}
          {permissions.canChangeStatus && (
            <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-50">Change status</button>
          )}
          {permissions.canRefund && (
            <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-50">Refund</button>
          )}
        </div>
      </div>

      {/* Overview */}
      <div className="space-y-3 rounded-lg border p-4">
        <div className="text-sm text-neutral-600">
          Guest: {booking.guestName || "—"}
          {booking.notes ? <span className="ml-2">• Notes: {booking.notes}</span> : null}
        </div>
        <div className="text-sm text-neutral-600">
          Dates: {new Date(booking.startDate).toLocaleString()} → {new Date(booking.endDate).toLocaleString()}
        </div>
        <div className="text-sm text-neutral-600">Group size: {booking.groupSize}</div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: Status }) {
  const styles =
    status === "PENDING"
      ? "bg-amber-100 text-amber-800"
      : status === "CONFIRMED"
      ? "bg-emerald-100 text-emerald-800"
      : status === "COMPLETED"
      ? "bg-blue-100 text-blue-800"
      : "bg-neutral-200 text-neutral-800"
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${styles}`}>{status}</span>
}
