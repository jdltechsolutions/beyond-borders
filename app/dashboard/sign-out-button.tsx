'use client'

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export function SignOutButton() {
    const router = useRouter()
    
    const handleSignOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/login')
    }
    
    return (
        <Button onClick={handleSignOut}>Sign Out</Button>
    )
}
