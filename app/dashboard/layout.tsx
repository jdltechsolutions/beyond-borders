import { ReactNode } from "react"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import DashboardShell from "./_components/dashboard-shell"
import { PrismaClient } from "@/lib/generated/prisma"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  // Server-side auth guard for all dashboard routes
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user || error) {
    redirect("/login")
  }

  // Fetch role from DB (trusted) and map to app roles
  const prisma = new PrismaClient()
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  })

  const role = dbUser?.role === "ADMIN" ? "admin" : "customer"

  return (
    <DashboardShell role={role} userEmail={user.email ?? undefined}>
      {children}
    </DashboardShell>
  )
}
