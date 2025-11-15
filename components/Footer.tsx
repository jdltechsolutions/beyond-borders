"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail } from "lucide-react";

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Packages", href: "/packages" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const discoverLinks = [
    { label: "All Trips", href: "/packages" },
    { label: "Destinations", href: "/destinations" },
    { label: "Activities", href: "/activities" },
    { label: "Book a Transfer", href: "/transfers" },
    { label: "Things to Do", href: "/experiences" },
    { label: "Blog", href: "/blog" },
    { label: "Curated Tours", href: "/services" },
];

const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Travel Guide", href: "/guide" },
    { label: "Reviews", href: "/reviews" },
];

const social = [
    { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="mt-24 border-t bg-secondary py-12 text-sm text-muted-foreground">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link href="/" className="mb-4 inline-flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="Beyond Borders Logo"
                                width={50}
                                height={50}
                                className="rounded-md"
                            />
                            <span className="text-lg font-semibold text-foreground">Beyond Borders</span>
                        </Link>
                        <p className="max-w-xs leading-relaxed">
                            Explore Ghana and beyond with a dedicated travel partner focused on seamless experiences and curated adventures.
                        </p>
                        <div className="mt-4 space-y-1">
                            <a
                                href="tel:+15551234567"
                                className="flex items-center gap-2 hover:text-primary focus:text-primary transition-colors"
                                aria-label="Call us"
                            >
                                <Phone className="h-4 w-4" /> +1 (555) 123-4567
                            </a>
                            <a
                                href="mailto:info@beyondborders.com"
                                className="flex items-center gap-2 hover:text-primary focus:text-primary transition-colors"
                                aria-label="Email us"
                            >
                                <Mail className="h-4 w-4" /> info@beyondborders.com
                            </a>
                        </div>
                        <div className="mt-6">
                            <h3 className="mb-3 text-sm font-semibold text-foreground">Follow Us</h3>
                            <div className="flex gap-2">
                                {social.map(({ Icon, href, label }) => (
                                    <Button
                                        key={label}
                                        size="icon"
                                        variant="outline"
                                        aria-label={`Visit our ${label} page`}
                                        className="transition-colors hover:bg-primary hover:text-primary-foreground"
                                        onClick={() => window.open(href, "_blank")}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <nav aria-label="Quick Links" className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
                        <ul className="grid gap-2">
                            {quickLinks.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="inline-block rounded-sm px-1 py-1 hover:text-primary focus:text-primary focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Discover" className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground">Discover Experiences</h3>
                        <ul className="grid gap-2">
                            {discoverLinks.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="inline-block rounded-sm px-1 py-1 hover:text-primary focus:text-primary focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label="Company" className="space-y-4">
                        <h3 className="text-sm font-semibold text-foreground">Company</h3>
                        <ul className="grid gap-2">
                            {companyLinks.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="inline-block rounded-sm px-1 py-1 hover:text-primary focus:text-primary focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <hr className="my-10 border-border" />

                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-xs">&copy; {new Date().getFullYear()} Beyond Borders. All rights reserved.</p>
                    <div className="flex flex-wrap gap-4 text-xs">
                        <Link href="/privacy" className="transition-colors hover:text-primary focus:text-primary">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="transition-colors hover:text-primary focus:text-primary">
                            Terms & Conditions
                        </Link>
                        <Link href="/faq" className="transition-colors hover:text-primary focus:text-primary">
                            FAQ
                        </Link>
                        <Link href="/contact" className="transition-colors hover:text-primary focus:text-primary">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}