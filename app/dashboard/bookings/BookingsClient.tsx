"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, FileText, Package, Clock } from "lucide-react"

type Role = "admin" | "customer"
type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED"
type BookingUI = {
  id: string
  serviceName: string
  startDate: string
  endDate: string
  groupSize: number
  status: BookingStatus
  notes?: string | null
  guestName?: string | null
}

export default function BookingsClient({
  bookings,
  initialStatus,
  role,
}: {
  bookings: BookingUI[]
  initialStatus: "ALL" | BookingStatus
  role: Role
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [statusFilter, setStatusFilter] = useState<"ALL" | BookingStatus>(initialStatus)

  useEffect(() => {
    const q = (searchParams?.get("status") as BookingStatus | "ALL" | null) ?? "ALL"
    setStatusFilter(q)
  }, [searchParams])

  const filtered = useMemo(() => {
    return statusFilter === "ALL" ? bookings : bookings.filter((b) => b.status === statusFilter)
  }, [statusFilter, bookings])

  const upcomingCount = useMemo(() => {
    const today = new Date()
    return bookings.filter((b) => new Date(b.startDate) >= today).length
  }, [bookings])

  function formatDate(d: string) {
    try {
      return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    } catch {
      return d
    }
  }

  function StatusBadge({ status }: { status: BookingStatus }) {
    const classes =
      status === "CONFIRMED"
        ? "bg-primary/10 text-primary border-primary/30"
        : status === "PENDING"
        ? "bg-secondary text-secondary-foreground border-border"
        : "bg-destructive/10 text-destructive border-destructive/30"
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${classes}`}>{status}</span>
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-primary/5 via-background to-secondary/20">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {role === "admin" ? "All Bookings" : "Your Bookings"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {role === "admin" ? "View and manage all customer bookings." : "View and manage your trip bookings."}
            </p>
          </div>

          <div className="flex items-end gap-3">
            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v as "ALL" | BookingStatus)
                  const url = v === "ALL" ? "/dashboard/bookings" : `/dashboard/bookings?status=${v}`
                  router.push(url)
                }}
              >
                <SelectTrigger id="status" className="w-[160px] h-10">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="mt-1 text-2xl font-semibold">{bookings.length}</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs text-muted-foreground">Upcoming</div>
            <div className="mt-1 text-2xl font-semibold">{upcomingCount}</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs text-muted-foreground">Confirmed</div>
            <div className="mt-1 text-2xl font-semibold">
              {bookings.filter((b) => b.status === "CONFIRMED").length}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="text-base font-semibold text-foreground">No bookings found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {role === "admin" ? "Try another filter." : "When you book a service, it will show up here."}
              </p>
              {role !== "admin" ? <Button className="mt-4" onClick={() => router.push("/dashboard/booking")}>New booking</Button> : null}
            </div>
          ) : (
            filtered.map((b) => (
              <div key={b.id} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">{b.serviceName}</h3>
                      <StatusBadge status={b.status} />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        {formatDate(b.startDate)} — {formatDate(b.endDate)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-4 w-4 text-primary" />
                        {b.groupSize} {b.groupSize === 1 ? "person" : "people"}
                      </span>
                      {b.guestName ? (
                        <span className="inline-flex items-center gap-1">
                          <FileText className="h-4 w-4 text-primary" /> Guest: {b.guestName}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" className="h-9">
                      <Link href={`/dashboard/bookings/${b.id}`}>View details</Link>
                    </Button>
                  </div>
                </div>

                {b.notes ? (
                  <div className="mt-3 rounded-md border border-border bg-background/50 p-3 text-sm text-muted-foreground">
                    <div className="mb-1 flex items-center gap-2 font-medium text-foreground/90">
                      <Clock className="h-4 w-4 text-primary" /> Notes
                    </div>
                    <p>{b.notes}</p>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}