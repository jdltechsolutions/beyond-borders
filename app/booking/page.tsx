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
import { Calendar, Users, MessageSquare, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { createBooking } from './action'
import { toast } from 'sonner'

type BookingFormData = {
  service: string
  startDate: string
  endDate: string
  groupSize: string
  notes?: string
  bookingForSomeoneElse: boolean
  guestName?: string
  guestEmail?: string
  guestPhone?: string
}

type Service = {
  id: string
  name: string
}

export default function BookingForm() {
  const [services, setServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [bookingForSomeoneElse, setBookingForSomeoneElse] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<BookingFormData>({
    defaultValues: {
      groupSize: '1',
      notes: '',
      bookingForSomeoneElse: false
    }
  })

  //check if user is authenticated before accessing the booking form
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login?redirect=/booking')
        return
      }
      
      setUserId(user.id)
    }

    // fetch services from services API
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services')
        if (response.ok) {
          const data = await response.json()
          setServices(data)
        }
      } catch (error) {
        console.error('Failed to fetch services:', error)
      } finally {
        setLoadingServices(false)
      }
    }

    checkAuth()
    fetchServices()
  }, [router])

  const onSubmit = async (data: BookingFormData) => {
    if (!userId) return

    const result = await createBooking({
      serviceId: data.service,
      startDate: data.startDate,
      endDate: data.endDate,
      groupSize: data.groupSize,
      notes: data.notes,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
    })

    if (result.error) {
      toast.error(result.error, {
        className: 'booking-toast',
        description: 'Please try again.',
      })
    } else {
      toast.success('Booking submitted successfully!', {
        className: 'booking-toast',
        description: "We'll contact you within 24 hours to confirm your booking.",
      })
      router.push('/bookings')
    }
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
                    <Select value={field.value} onValueChange={field.onChange} disabled={loadingServices}>
                      <SelectTrigger id="service" className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2">
                        <SelectValue placeholder={loadingServices ? "Loading services..." : "Choose a service"} />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
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
                  <Label htmlFor="startDate" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Start Date *
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('startDate', { required: 'Please select a start date' })}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-destructive">{errors.startDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    End Date *
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('endDate', { 
                      required: 'Please select an end date',
                      validate: (value) => {
                        const start = watch('startDate')
                        if (start && value < start) {
                          return 'End date must be after start date'
                        }
                        return true
                      }
                    })}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-destructive">{errors.endDate.message}</p>
                  )}
                </div>
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

            {/* Booking for Someone Else Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="bookingForSomeoneElse"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  {...register('bookingForSomeoneElse')}
                  onChange={(e) => setBookingForSomeoneElse(e.target.checked)}
                />
                <Label htmlFor="bookingForSomeoneElse" className="text-sm font-medium text-foreground flex items-center gap-2 cursor-pointer">
                  <UserPlus className="w-4 h-4 text-primary" />
                  I&apos;m booking for someone else
                </Label>
              </div>

              {bookingForSomeoneElse && (
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold text-foreground">Guest Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="guestName" className="text-sm font-medium text-foreground">Guest Full Name *</Label>
                    <Input
                      id="guestName"
                      type="text"
                      placeholder="Jane Doe"
                      className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                      {...register('guestName', { 
                        required: bookingForSomeoneElse ? 'Guest name is required' : false,
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters'
                        }
                      })}
                    />
                    {errors.guestName && (
                      <p className="text-sm text-destructive">{errors.guestName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guestEmail" className="text-sm font-medium text-foreground">Guest Email *</Label>
                      <Input
                        id="guestEmail"
                        type="email"
                        placeholder="jane@example.com"
                        className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                        {...register('guestEmail', { 
                          required: bookingForSomeoneElse ? 'Guest email is required' : false,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address'
                          }
                        })}
                      />
                      {errors.guestEmail && (
                        <p className="text-sm text-destructive">{errors.guestEmail.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guestPhone" className="text-sm font-medium text-foreground">Guest Phone *</Label>
                      <Input
                        id="guestPhone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="h-11 bg-background border-border focus:border-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                        {...register('guestPhone', { 
                          required: bookingForSomeoneElse ? 'Guest phone is required' : false,
                          pattern: {
                            value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                            message: 'Please enter a valid phone number'
                          }
                        })}
                      />
                      {errors.guestPhone && (
                        <p className="text-sm text-destructive">{errors.guestPhone.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting || !userId}
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