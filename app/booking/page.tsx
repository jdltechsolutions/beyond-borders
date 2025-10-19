'use client'

import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type BookingFormData = {
  serviceId: string
  date: string
  groupSize: string
  name: string
  phone: string
  email: string
  notes?: string
  terms: boolean
}

export default function BookingPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<BookingFormData>({
    defaultValues: {
      groupSize: "1"
    }
  })

  const onSubmit = (data: BookingFormData) => {
    console.log("Booking Form Data:", data)
  }

  const selectedService = watch("serviceId")
  const selectedGroupSize = watch("groupSize")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/20 px-4 py-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Book Your Experience
          </h1>
          <p className="text-muted-foreground text-sm">
            Choose your perfect travel experience with Beyond Borders
          </p>
        </div>

        {/* Booking Form Card */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Service Selection */}
            <div className="space-y-2">
              <Label 
                htmlFor="serviceId" 
                className="text-sm font-medium text-foreground"
              >
                Select Service *
              </Label>
              <Select 
                value={selectedService} 
                onValueChange={(value) => setValue("serviceId", value)}
              >
                <SelectTrigger className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200">
                  <SelectValue placeholder="Choose a service..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tour-package-dubai">Dubai Tour Package</SelectItem>
                  <SelectItem value="flight-booking">Flight Booking</SelectItem>
                  <SelectItem value="hotel-accommodation">Hotel Accommodation</SelectItem>
                  <SelectItem value="visa-processing">Visa Processing</SelectItem>
                  <SelectItem value="group-tour">Group Tour</SelectItem>
                  <SelectItem value="custom-package">Custom Travel Package</SelectItem>
                </SelectContent>
              </Select>
              {errors.serviceId && (
                <p className="text-sm text-red-500">Please select a service</p>
              )}
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label 
                  htmlFor="date" 
                  className="text-sm font-medium text-foreground"
                >
                  Preferred Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                  {...register("date", { required: "Please select a date" })}
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>

              {/* Group Size */}
              <div className="space-y-2">
                <Label 
                  htmlFor="groupSize" 
                  className="text-sm font-medium text-foreground"
                >
                  Group Size
                </Label>
                <Select 
                  value={selectedGroupSize} 
                  onValueChange={(value) => setValue("groupSize", value)}
                >
                  <SelectTrigger className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200">
                    <SelectValue placeholder="Select group size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3">3 People</SelectItem>
                    <SelectItem value="4">4 People</SelectItem>
                    <SelectItem value="5">5 People</SelectItem>
                    <SelectItem value="6">6 People</SelectItem>
                    <SelectItem value="7">7 People</SelectItem>
                    <SelectItem value="8">8 People</SelectItem>
                    <SelectItem value="9">9+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label 
                  htmlFor="name" 
                  className="text-sm font-medium text-foreground"
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                  {...register("name", { required: "Please enter your name" })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

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
                  {...register("phone", { required: "Please enter your phone number" })}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
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
                placeholder="Enter your email address"
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

            {/* Special Notes */}
            <div className="space-y-2">
              <Label 
                htmlFor="notes" 
                className="text-sm font-medium text-foreground"
              >
                Special Requirements or Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Any special requirements, dietary restrictions, accessibility needs, or other notes..."
                rows={4}
                className="bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200 resize-none"
                {...register("notes")}
              />
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-2 text-sm">
              <input
                type="checkbox"
                id="terms"
                className="mt-0.5 h-4 w-4 text-primary border-border rounded focus:ring-primary/20 focus:ring-2"
                {...register("terms", { required: "Please accept the terms and conditions" })}
              />
              <label htmlFor="terms" className="text-muted-foreground leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:text-primary/80 underline underline-offset-2">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:text-primary/80 underline underline-offset-2">
                  Privacy Policy
                </Link>
                {" "}and understand that booking confirmation is subject to availability.
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms.message}</p>
            )}

            {/* Submit Button */}
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md text-base disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </form>

          {/* Additional Information */}
          <div className="border-t border-border pt-6">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>We'll review your request and contact you within 24 hours</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 3 6V5z" />
                </svg>
                <span>Need help? Call us at +1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Want to explore more options?{" "}
            <Link 
              href="/" 
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-colors duration-200"
            >
              Browse our services
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
