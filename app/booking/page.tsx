'use client'

import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, Users, MessageSquare } from 'lucide-react'
import Link from 'next/link'

type BookingFormData = {
  name: string
  email: string
  phone: string
  service: string
  date: string
  groupSize: string
  notes?: string
}

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<BookingFormData>({
    defaultValues: {
      groupSize: '1',
      notes: ''
    }
  })

  const onSubmit = async (data: BookingFormData) => {
    // Form submission logic will go here
    console.log('Form submitted:', data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/20 px-4 py-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Book Your Adventure
          </h1>
          <p className="text-muted-foreground text-sm">
            Fill in the details below to start your journey with Beyond Borders
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                    {...register('name', { 
                      required: 'Full name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                      message: 'Please enter a valid phone number'
                    }
                  })}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Booking Details Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">Booking Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="service" className="text-sm font-medium text-foreground">Select Service *</Label>
                <Controller
                  name="service"
                  control={control}
                  rules={{ required: 'Please select a service' }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="service" className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safari-tour">Safari Tour</SelectItem>
                        <SelectItem value="mountain-trek">Mountain Trek</SelectItem>
                        <SelectItem value="beach-resort">Beach Resort Package</SelectItem>
                        <SelectItem value="city-tour">City Cultural Tour</SelectItem>
                        <SelectItem value="flight-booking">Flight Booking</SelectItem>
                        <SelectItem value="accommodation">Accommodation Only</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.service && (
                  <p className="text-sm text-destructive">{errors.service.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Preferred Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('date', { 
                      required: 'Please select a date',
                      validate: (value) => {
                        const selectedDate = new Date(value)
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return selectedDate >= today || 'Please select a future date'
                      }
                    })}
                  />
                  {errors.date && (
                    <p className="text-sm text-destructive">{errors.date.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupSize" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Group Size *
                  </Label>
                  <Controller
                    name="groupSize"
                    control={control}
                    rules={{ required: 'Please select group size' }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="groupSize" className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Person' : 'People'}
                            </SelectItem>
                          ))}
                          <SelectItem value="10+">10+ People</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.groupSize && (
                    <p className="text-sm text-destructive">{errors.groupSize.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Additional Notes (Optional)
                </Label>
                <textarea
                  id="notes"
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                  placeholder="Any special requirements, dietary restrictions, or questions..."
                  {...register('notes')}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
              </Button>
              <p className="text-sm text-muted-foreground text-center mt-3">
                We&apos;ll contact you within 24 hours to confirm your booking
              </p>
            </div>
          </form>
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
  )
}