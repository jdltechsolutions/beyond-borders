import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { SignOutButton } from "./sign-out-button"
import { PrismaClient, Role } from "@/lib/generated/prisma"
import Link from "next/link"

type AdminBookingRow = {
    id: string
    ref: string
    customerEmail: string
    customerName?: string | null
    serviceName: string
    startDate: string
    endDate: string
    status: string
    updatedAt: string
}

export default async function Dashboard({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const supabase = await createClient()
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (!user || error) {
        redirect("/login")
    }

    const prisma = new PrismaClient()
    const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { role: true } })
    const isAdmin = dbUser?.role === Role.ADMIN

    // If not admin: simple customer dashboard (retain existing minimal view)
    if (!isAdmin) {
        return (
            <div className="p-6 space-y-4">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-sm text-neutral-500">Customer</p>
                <p>Welcome, {user.email}</p>
                <SignOutButton />
                <p className="text-sm text-neutral-600">Coming soon: richer customer dashboard experience.</p>
            </div>
        )
    }

    // --- Admin dashboard data ---
    const q = typeof searchParams.q === "string" ? searchParams.q.trim() : undefined
    const fromStr = typeof searchParams.from === "string" ? searchParams.from : undefined
    const toStr = typeof searchParams.to === "string" ? searchParams.to : undefined
    const fromDate = fromStr ? new Date(fromStr) : undefined
    const toDate = toStr ? new Date(toStr) : undefined

    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(startOfToday)
    startOfWeek.setDate(startOfWeek.getDate() - startOfToday.getDay())

    const [bookingsToday, bookingsThisWeek, pendingPaymentsPlaceholder, docsToReviewPlaceholder, cancelledCount] = await Promise.all([
        prisma.booking.count({ where: { createdAt: { gte: startOfToday } } }),
        prisma.booking.count({ where: { createdAt: { gte: startOfWeek } } }),
        Promise.resolve(0), // No payment model yet; placeholder
        Promise.resolve(0), // No document model yet; placeholder
        prisma.booking.count({ where: { status: "CANCELLED" } }),
    ])

    // Revenue placeholder (schema lacks pricing info)
    const revenuePeriod = 0
    const revenueForecast = 0

    // Recent bookings list (simple filters applied if future param support added)
    const recentRaw = await prisma.booking.findMany({
        take: 25,
        orderBy: { updatedAt: "desc" },
        include: { user: { select: { email: true, name: true } }, service: { select: { name: true } } },
    })

    const filteredRaw = recentRaw.filter((b) => {
        if (q) {
            const needle = q.toLowerCase()
            const hay = [b.id, b.user?.email, b.user?.name, b.service?.name].filter(Boolean).join(" ").toLowerCase()
            if (!hay.includes(needle)) return false
        }
        if (fromDate && b.startDate < fromDate) return false
        if (toDate && b.endDate > toDate) return false
        return true
    })

    const bookings: AdminBookingRow[] = filteredRaw.map((b) => ({
        id: b.id,
        ref: b.id,
        customerEmail: b.user.email,
        customerName: b.user.name,
        serviceName: b.service?.name ?? "Service",
        startDate: b.startDate.toISOString(),
        endDate: b.endDate.toISOString(),
        status: b.status,
        updatedAt: b.updatedAt.toISOString(),
    }))

    return (
        <div className="p-6 space-y-8">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-sm text-neutral-500">Admin</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                    <form className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 items-end" method="get">
                        <div className="flex flex-col gap-1 lg:col-span-2">
                            <label htmlFor="q" className="text-xs font-medium text-neutral-600">Search (ref/customer/service)</label>
                            <input id="q" name="q" placeholder="e.g. email or ref" defaultValue={q || ""} className="h-9 w-full min-w-0 rounded-md border px-3 text-sm" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="from" className="text-xs font-medium text-neutral-600">From</label>
                            <input id="from" name="from" type="date" defaultValue={fromStr || ""} className="h-9 w-full rounded-md border px-3 text-sm" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="to" className="text-xs font-medium text-neutral-600">To</label>
                            <input id="to" name="to" type="date" defaultValue={toStr || ""} className="h-9 w-full rounded-md border px-3 text-sm" />
                        </div>
                        <div>
                            <button className="h-9 w-full sm:w-auto px-4 rounded-md border text-sm bg-neutral-50 hover:bg-neutral-100" type="submit">Apply</button>
                        </div>
                    </form>
                </div>
            </header>

            {/* KPI Cards */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                <Kpi label="Bookings today" value={bookingsToday} />
                <Kpi label="Bookings this week" value={bookingsThisWeek} />
                <Kpi label="Revenue (period)" value={formatCurrency(revenuePeriod)} hint="Add pricing fields" />
                <Kpi label="Pending payments" value={pendingPaymentsPlaceholder} hint="Requires payments model" />
                <Kpi label="Docs to review" value={docsToReviewPlaceholder} hint="Requires documents model" />
                <Kpi label="Cancellations" value={cancelledCount} />
                <Kpi label="Revenue forecast" value={formatCurrency(revenueForecast)} hint="Model needed" />
            </section>

            {/* Bookings Table */}
            <section className="space-y-3">
                <h2 className="text-lg font-medium">Recent bookings</h2>
                <div className="rounded-lg border overflow-auto">
                    <table className="min-w-[900px] w-full text-sm">
                        <thead className="bg-neutral-50">
                            <tr>
                                <Th>Ref</Th>
                                <Th>Customer</Th>
                                <Th>Service</Th>
                                <Th>Dates</Th>
                                <Th>Status</Th>
                                <Th>Updated</Th>
                                <Th>&nbsp;</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((b) => (
                                <tr key={b.id} className="border-t">
                                    <Td>{b.ref}</Td>
                                    <Td>{b.customerName || b.customerEmail}</Td>
                                    <Td>{b.serviceName}</Td>
                                    <Td>
                                        {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}
                                    </Td>
                                    <Td><StatusBadge status={b.status} /></Td>
                                    <Td>{new Date(b.updatedAt).toLocaleDateString()}</Td>
                                                        <Td>
                                        <Link href={`/dashboard/bookings/${b.id}`} className="rounded-md border px-2 py-1 hover:bg-neutral-50">View</Link>
                                    </Td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                                <tr>
                                                    <td colSpan={7} className="px-3 py-8 text-center text-neutral-500">No bookings found.</td>
                                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

function Kpi({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
    return (
        <div className="rounded-lg border p-4">
            <div className="text-xs text-neutral-500">{label}</div>
            <div className="mt-1 text-xl font-semibold">{value}</div>
            {hint && <div className="text-[11px] text-neutral-400 mt-1">{hint}</div>}
        </div>
    )
}

function Th({ children }: { children: React.ReactNode }) {
    return <th className="px-3 py-2 text-left font-medium">{children}</th>
}
function Td({ children, colSpan }: { children: React.ReactNode; colSpan?: number }) {
    return <td className="px-3 py-2 align-top" colSpan={colSpan}>{children}</td>
}

function StatusBadge({ status }: { status: string }) {
    const styles =
        status === "PENDING"
            ? "bg-amber-100 text-amber-800"
            : status === "CONFIRMED"
            ? "bg-emerald-100 text-emerald-800"
            : status === "COMPLETED"
            ? "bg-blue-100 text-blue-800"
            : status === "CANCELLED"
            ? "bg-neutral-300 text-neutral-800"
            : "bg-neutral-200 text-neutral-700"
    return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs ${styles}`}>{status}</span>
}

function formatCurrency(n: number) {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n)
}