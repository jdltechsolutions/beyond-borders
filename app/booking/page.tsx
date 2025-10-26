'use client'

import { useState } from 'react'
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

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    groupSize: '1',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will go here
    console.log('Form submitted:', formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Book Your Adventure</h2>
        <p className="text-gray-600">Fill in the details below to start your journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Booking Details Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Booking Details</h3>
          
          <div className="space-y-2">
            <Label htmlFor="service">Select Service *</Label>
            <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
              <SelectTrigger id="service">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Preferred Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="groupSize" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Group Size *
              </Label>
              <Select value={formData.groupSize} onValueChange={(value) => handleChange('groupSize', value)}>
                <SelectTrigger id="groupSize">
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
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Additional Notes (Optional)
            </Label>
            <textarea
              id="notes"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Any special requirements, dietary restrictions, or questions..."
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold">
            Submit Booking Request
          </Button>
          <p className="text-sm text-gray-500 text-center mt-3">
            We&apos;ll contact you within 24 hours to confirm your booking
          </p>
        </div>
      </form>
    </div>
  )
}