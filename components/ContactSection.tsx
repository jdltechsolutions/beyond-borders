'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Have questions or ready to start your journey? We&apos;re here to help you every step of the way.
          </p>
        </div>

  <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-6 text-2xl font-semibold">Contact Information</h3>
              <p className="mb-8 text-muted-foreground">
                Reach out to us through any of the following channels. We&apos;re available to answer your questions and provide support.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {/* Phone */}
              <Card className="p-6 transition-shadow hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">Phone</h4>
                    <a href="tel:+1234567890" className="text-muted-foreground transition-colors hover:text-primary">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </Card>

              {/* WhatsApp */}
              <Card className="p-6 transition-shadow hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2 font-semibold">WhatsApp</h4>
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                      aria-label="Chat with us on WhatsApp"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Email */}
              <Card className="p-6 transition-shadow hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">Email</h4>
                    <a href="mailto:info@beyondborders.com" className="text-muted-foreground transition-colors hover:text-primary">
                      info@beyondborders.com
                    </a>
                  </div>
                </div>
              </Card>

              {/* Location */}
              <Card className="p-6 transition-shadow hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">Address</h4>
                    <p className="text-muted-foreground">
                      123 Business Avenue<br />
                      Suite 456<br />
                      City, State 12345
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <h3 className="mb-6 text-2xl font-semibold">Send us a Message</h3>
            <form className="space-y-6" aria-label="Contact form">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe"
                  className="w-full"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="john@example.com"
                  className="w-full"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  placeholder="+1 (234) 567-890"
                  className="w-full"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="How can we help you?"
                  className="w-full"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us more about your inquiry..."
                  className="w-full min-h-[150px]"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}