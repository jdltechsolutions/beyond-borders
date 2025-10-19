import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, User, Calendar } from "lucide-react"

interface PageProps {
  searchParams: {
    type?: 'new-user' | 'existing-user'
    booking?: string
  }
}

export default function BookingSuccessPage({ searchParams }: PageProps) {
  const { type, booking } = searchParams
  const isNewUser = type === 'new-user'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/20 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Success Icon */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {isNewUser ? 'Welcome to Beyond Borders!' : 'Booking Submitted!'}
          </h1>
        </div>

        {/* Success Message Card */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 space-y-6">
          {isNewUser ? (
            <>
              {/* New User Message */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Account Created</h3>
                    <p className="text-sm text-muted-foreground">
                      We've created your Beyond Borders account and submitted your booking request.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Check Your Email</h3>
                    <p className="text-sm text-muted-foreground">
                      We've sent you a welcome email with instructions to set up your password and access your account.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Booking Confirmation</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team will review your booking request and contact you within 24 hours with confirmation details.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Existing User Message */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Welcome Back!</h3>
                    <p className="text-sm text-muted-foreground">
                      We've added this new booking to your existing Beyond Borders account.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Booking Submitted</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team will review your booking request and contact you within 24 hours with confirmation details.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Booking Reference */}
          {booking && (
            <div className="bg-secondary/30 rounded-lg p-4 border border-secondary">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Booking Reference</p>
                <p className="font-mono text-sm font-semibold text-foreground mt-1">
                  {booking.slice(-8).toUpperCase()}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <Button asChild className="w-full h-11">
              <Link href="/">
                Browse More Services
              </Link>
            </Button>
            
            {!isNewUser && (
              <Button variant="outline" asChild className="w-full h-11">
                <Link href="/bookings">
                  View My Bookings
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="text-center space-y-3">
          <div className="text-sm text-muted-foreground">
            <p>Need immediate assistance?</p>
            <p className="text-primary font-medium">Call us at +1 (555) 123-4567</p>
          </div>
          
          {isNewUser && (
            <div className="text-xs text-muted-foreground bg-secondary/20 rounded-lg p-3">
              <p>
                <strong>Tip:</strong> Check your spam folder if you don't see our welcome email. 
                You can always request a new password reset from the login page.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}