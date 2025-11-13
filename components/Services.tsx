"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
    BedDouble,
    CalendarCheck2,
    Car,
    Headset,
    MapPinned,
    Plane,
} from "lucide-react";

const services = [
    {
        title: "Flight Booking",
        Icon: Plane,
        image: "/flight.jpg",
    },
    {
        title: "Accommodation & Rentals",
        Icon: BedDouble,
        image: "/accomodation.jpg",
    },
    {
        title: "Transportation Services",
        Icon: Car,
        image: "/transport.jpg",
    },
    {
        title: "Event Support (spaces + connecting to planners)",
        Icon: CalendarCheck2,
        image: "/event.jpg",
    },
    {
        title: "Curated Tours: Domestic (trips across Ghana)",
        Icon: MapPinned,
        image: "/tour.jpg",
    },
    {
        title: "On-Ground Assistance (24/7 support)",
        Icon: Headset,
        image: "/support.jpg",
    },
];

export default function ServicesSection() {
    return (
        <section id="services" className="w-full bg-background px-4 md:px-32 py-12 md:py-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 text-center md:mb-12">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Our Services</h2>
                    <p className="text-muted-foreground mt-2 text-sm md:text-base">
                        Discover how Beyond Borders supports every step of your journey.
                    </p>
                </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map(({ title, Icon, image }) => (
                            <Card
                                key={title}
                                className="relative h-56 md:h-64 overflow-hidden p-0 transition-all hover:shadow-md hover:border-foreground/20"
                            >
                                {/* Background image */}
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover"
                                    priority={false}
                                />
                                            {/* Full-cover black transparent overlay */}
                                            <div className="absolute inset-0 bg-black/55" />

                                            {/* Centered text overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center text-white p-4">
                                                <div className="flex flex-col items-center text-center gap-3">
                                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/15">
                                                        <Icon className="h-6 w-6" aria-hidden />
                                                    </span>
                                                    <h3 className="text-lg md:text-xl font-semibold leading-snug">{title}</h3>
                                                </div>
                                            </div>
                            </Card>
                        ))}
                </div>
            </div>
        </section>
    );
}