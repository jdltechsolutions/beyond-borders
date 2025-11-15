"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trophy, BadgeCheck, DollarSign, Map } from "lucide-react";


export default function SignupSection() {

    return (
        <section id="signup" className="relative w-full">
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/9.jpg"
                    alt="Travel inspiration background"
                    fill
                    priority={false}
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 md:px-32 py-14 md:py-20">
                <div className="grid gap-10 md:grid-cols-2 items-center">
                    {/* Left text content */}
                    <div className="space-y-6 text-white">
                        <div className="space-y-2">
                            <p className="text-sm uppercase tracking-wider text-primary/80 font-semibold flex items-center gap-2">
                                <Trophy className="h-4 w-4" aria-hidden /> Award-Winning Service
                            </p>
                            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                                Elevate Your Journey with Beyond Borders
                            </h2>
                        </div>
                        <p className="max-w-prose text-sm md:text-base text-white/90 leading-relaxed">
                            Explore Ghana and West Africa effortlessly. From flights and bespoke accommodations to on-ground assistance and curated cultural experiences—our team makes travel seamless and memorable. Join our community for insider updates, special packages, and early access to new tour launches.
                        </p>
                        <ul className="grid gap-3 text-sm md:text-base">
                            <li className="flex items-start gap-3">
                                <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" aria-hidden />
                                <span>Responsive, trusted customer support.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <DollarSign className="h-5 w-5 text-primary flex-shrink-0" aria-hidden />
                                <span>Competitive, transparent pricing.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Map className="h-5 w-5 text-primary flex-shrink-0" aria-hidden />
                                <span>Authentic tours & local-led adventures.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right signup form */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 md:p-8 shadow-lg">
                        {/* GET form to redirect with email prefilled */}
                        <form method="GET" action="/signup" className="space-y-5">
                            <div className="space-y-1">
                                <label htmlFor="email" className="text-sm font-medium text-white">
                                    Get travel updates & offers
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="bg-white/90 text-black placeholder:text-black/50"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full text-base font-semibold"
                            >
                                Continue to Sign Up
                            </Button>
                            <p className="text-xs text-white/60 leading-relaxed">
                                You&apos;ll be redirected to complete your account. Your email will be prefilled.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}