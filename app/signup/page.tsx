'use client'

import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { signup } from "./action"
import { useState } from "react"

type SignUpFormData = {
  fullName: string
  phone: string
  email: string
  password: string
  confirmPassword: string
}

export default function SignUpPage() {
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>()

  const onSubmit = async (data: SignUpFormData) => {
    setMessage(null)
    const result = await signup(data)
    
    if (result?.error) {
      setMessage({ type: 'error', text: result.error })
    } else if (result?.success) {
      setShowSuccessDialog(true)
    }
  }

  return (
    <>
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Account Created Successfully!
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Thank you for signing up with Beyond Borders! We&apos;ve sent a confirmation email to your inbox.
              </p>
              <p className="font-medium text-foreground">
                Please check your email and click the confirmation link to verify your account.
              </p>
              <p className="text-sm text-muted-foreground">
                Don&apos;t forget to check your spam folder if you don&apos;t see the email within a few minutes.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Link href="/login" className="w-full">
                Go to Login
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/20 px-4 py-8">
        <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign up to start booking with Beyond Borders
          </p>
        </div>

        {/* Sign Up Form Card */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 space-y-6">
          {message && (
            <div className={`p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' : 'bg-green-50 border border-green-200 text-green-800'}`}>
              <p className="text-sm">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label 
                htmlFor="fullName" 
                className="text-sm font-medium text-foreground"
              >
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                {...register("fullName", { 
                  required: "Please enter your full name",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters long"
                  }
                })}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label 
                htmlFor="phone" 
                className="text-sm font-medium text-foreground"
              >
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                {...register("phone", { 
                  required: "Please enter your phone number",
                  pattern: {
                    value: /^[\d\s\-\+\(\)]+$/,
                    message: "Please enter a valid phone number"
                  },
                  minLength: {
                    value: 10,
                    message: "Phone number must be at least 10 digits"
                  }
                })}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-sm font-medium text-foreground"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                {...register("email", { 
                  required: "Please enter your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label 
                htmlFor="password" 
                className="text-sm font-medium text-foreground"
              >
                Password *
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password"
                className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                {...register("password", { 
                  required: "Please create a password",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: "Password must contain uppercase, lowercase, and number"
                  }
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label 
                htmlFor="confirmPassword" 
                className="text-sm font-medium text-foreground"
              >
                Confirm Password *
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: (value) => {
                    const password = watch("password")
                    return value === password || "Passwords do not match"
                  }
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Min 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link 
            href="/" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            ← Back to home
          </Link>
        </div>
        </div>
      </div>
    </>
  )
}
