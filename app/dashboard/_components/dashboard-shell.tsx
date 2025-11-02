"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Home, Settings, Users, Wrench, CreditCard, BarChart3 } from "lucide-react"
import { PropsWithChildren } from "react"
import { SignOutButton } from "../sign-out-button"

type DashboardShellProps = PropsWithChildren<{
  userEmail?: string
  role?: "admin" | "customer"
}>

const customerNav = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "My Bookings", href: "/dashboard/bookings", icon: CalendarDays },
  // You can uncomment once the route exists
  // { label: "Profile & Settings", href: "/dashboard/settings", icon: Settings },
]

const adminNav = [
  { label: "Overview", href: "/dashboard", icon: Home },
  { label: "Bookings", href: "/dashboard/bookings", icon: CalendarDays },
  { label: "Services", href: "/dashboard/services", icon: Wrench },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
]

export default function DashboardShell({ children, userEmail, role = "customer" }: DashboardShellProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isAdmin = role === "admin"
  const nav = isAdmin ? adminNav : customerNav

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="px-2 py-1">
            <Link href="/" className="font-semibold tracking-tight">
              Beyond Borders
            </Link>
            {userEmail ? (
              <div className="text-xs text-muted-foreground truncate" title={userEmail}>
                {userEmail}
              </div>
            ) : null}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => {
                  const Icon = item.icon
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard"
                      : pathname === item.href || pathname.startsWith(item.href + "/")
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                        <Link href={item.href}>
                          <Icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                      {isAdmin && item.label === "Bookings" ? (
                        <SidebarMenuSub>
                          {[
                            { label: "All", status: undefined },
                            { label: "Pending", status: "PENDING" },
                            { label: "Confirmed", status: "CONFIRMED" },
                            { label: "Cancelled", status: "CANCELLED" },
                          ].map((sub) => {
                            const current = searchParams?.get("status") ?? undefined
                            const active = sub.status
                              ? current === sub.status
                              : !current || current === "ALL"
                            const href = sub.status
                              ? `/dashboard/bookings?status=${sub.status}`
                              : "/dashboard/bookings"
                            return (
                              <SidebarMenuSubItem key={sub.label}>
                                <SidebarMenuSubButton href={href} isActive={active}>
                                  <span>{sub.label}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          })}
                        </SidebarMenuSub>
                      ) : null}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter>
          <div className="flex items-center gap-2">
            <Settings className="size-4 text-muted-foreground" />
            <Link href="/dashboard/settings" className="text-sm">
              Profile & Settings
            </Link>
          </div>
          <SignOutButton />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        {/* Top header bar */}
        <div className="flex h-14 items-center gap-2 border-b px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-1 h-6" />
          <div className="font-medium">{isAdmin ? "Admin Dashboard" : "Customer Dashboard"}</div>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild>
              <Link href="/dashboard/booking">New Booking</Link>
            </Button>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
