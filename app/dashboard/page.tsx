import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { SignOutButton } from "./sign-out-button"

export default async function Dashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
        redirect('/login')
    }
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.email}</p>
            <SignOutButton />
        </div>
    )
}