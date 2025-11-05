"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"

export function SubmitButton({ children }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} aria-busy={pending} className="min-w-28">
      {pending ? "Saving..." : children ?? "Save changes"}
    </Button>
  )
}
