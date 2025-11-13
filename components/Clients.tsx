"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Globe, Users, Star } from "lucide-react";

const audience = [
    { label: "Corporates", Icon: Briefcase },
    { label: "Families & Individuals", Icon: Users },
    { label: "Diaspora", Icon: Globe },
];

const testimonials = [
    {
        quote:
            "Beyond Borders took care of everything for our leadership retreat. Smooth logistics and great attention to detail.",
        name: "Ama K.",
        role: "Operations Lead, Accra",
        rating: 5,
    },
    {
        quote:
            "Our family trip across Ghana was seamless—from flights to stays and on-ground support.",
        name: "David M.",
        role: "Family Traveler",
        rating: 5,
    },
    {
        quote:
            "As part of the diaspora, having reliable local support made all the difference.",
        name: "Nadia A.",
        role: "Diaspora Visitor",
        rating: 5,
    },
];

export default function Ourclients() {
    return (
        <section id="clients" className="w-full bg-background px-4 md:px-32 py-12 md:py-16">
            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <div className="mb-8 text-center md:mb-12">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Our Clients</h2>
                    <p className="text-muted-foreground mt-2 text-sm md:text-base">
                        Who we work with: corporates, families, individuals, diaspora.
                    </p>
                </div>

                {/* Audience chips/cards */}
                <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {audience.map(({ label, Icon }) => (
                        <Card key={label} className="h-full">
                            <CardContent className="flex items-center gap-3 p-5">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="h-5 w-5" aria-hidden />
                                </span>
                                <span className="text-base font-medium">{label}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <Card key={i} className="h-full">
                            <CardContent className="flex h-full flex-col gap-4 p-6">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <Star
                                            key={idx}
                                            className={`h-4 w-4 ${idx < t.rating ? "fill-current" : "opacity-30"}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm leading-relaxed text-muted-foreground">“{t.quote}”</p>
                                <div className="mt-auto">
                                    <p className="text-sm font-semibold">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.role}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}