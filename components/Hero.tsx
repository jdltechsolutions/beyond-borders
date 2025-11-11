"use client";

import * as React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const slides = [
    {
        src: "/8.jpg",
        alt: "Travel destination 1",
        title: "Lorem ipsum dolor sit amet",
        subtitle:
            "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        ctaLabel: "Book Now",
        ctaHref: "/packages",
    },
    {
        src: "/2.jpg",
        alt: "Travel destination 2",
        title: "Sed ut perspiciatis unde omnis",
        subtitle:
            "Natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
        ctaLabel: "View Packages",
        ctaHref: "/packages",
    },
    {
        src: "/5.jpg",
        alt: "Travel destination 3",
        title: "At vero eos et accusamus",
        subtitle:
            "Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.",
        ctaLabel: "Learn More",
        ctaHref: "/services",
    },
];

export default function Hero() {
    const [api, setApi] = React.useState<CarouselApi | null>(null);

    React.useEffect(() => {
        if (!api) return;
        const id = setInterval(() => {
            if (api.canScrollNext()) {
                api.scrollNext();
            } else {
                api.scrollTo(0);
            }
        }, 5000);
        return () => clearInterval(id);
    }, [api]);

    return (
    <section className="relative w-full px-0 pt-0">
            <div className="relative">
                        <Carousel className="w-full" setApi={setApi}>
                            <CarouselContent className="-ml-0">
                                {slides.map((slide, idx) => (
                                    <CarouselItem key={slide.src} className="pl-0">
                                        <div className="relative aspect-[16/9] w-full">
                                                    <Image
                                                        src={slide.src}
                                                        alt={slide.alt}
                                                        fill
                                                        priority={idx === 0}
                                                        sizes="100vw"
                                                        className="object-cover"
                                                    />
                                                {/* Optional dark gradient for legibility over images */}
                                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />

                                                {/* Overlay content */}
                                                <div className="absolute inset-0 flex items-end md:items-center">
                                                    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-10 lg:px-8">
                                                        <div className="max-w-xl md:max-w-2xl space-y-3 text-white bg-black/30 rounded-lg p-4 md:p-6">
                                                            <h2 className="text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl drop-shadow-sm">
                                                                {slide.title}
                                                            </h2>
                                                            <div className="pt-2">
                                                                <Button asChild size="lg" className="text-base">
                                                                    <a href={slide.ctaHref}>{slide.ctaLabel}</a>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2 md:left-4 bg-background/80 backdrop-blur hover:bg-background" />
                            <CarouselNext className="right-2 md:right-4 bg-background/80 backdrop-blur hover:bg-background" />
                        </Carousel>
            </div>
        </section>
    );
}