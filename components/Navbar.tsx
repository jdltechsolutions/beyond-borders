"use client";

import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon, PhoneIcon } from "lucide-react";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Packages", href: "/packages" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const isMobile = useIsMobile();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center font-semibold">
                    <Image
                        src="/logo.png"
                        alt="Beyond Borders Logo"
                        width={150}
                        height={150}
                        className="rounded-md shrink-0"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex">
                    <NavigationMenu aria-label="Main navigation" viewport={isMobile}>
                        <NavigationMenuList>
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <NavigationMenuLink
                                        asChild
                                        className={
                                            navigationMenuTriggerStyle() +
                                            " min-w-[90px] justify-center text-base lg:text-lg"
                                        }
                                    >
                                        <Link href={item.href}>{item.label}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Desktop Phone Number */}
                <div className="ml-auto hidden md:flex items-center">
                    <a
                        href="tel:+15551234567"
                        aria-label="Call us at +1 (555) 123-4567"
                        className="flex items-center gap-2 text-base lg:text-lg font-semibold tracking-wide hover:text-primary focus:text-primary transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-sm px-2 py-1"
                    >
                        <PhoneIcon className="size-5" aria-hidden="true" />
                        <span>+1 (555) 123-4567</span>
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <div className="ml-auto flex items-center gap-2 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" aria-label="Open navigation menu">
                                <MenuIcon className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0">
                            <div className="flex items-center gap-2 border-b px-4 py-3">
                                <Image
                                    src="/logo.png"
                                    alt="Beyond Borders Logo"
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                    priority
                                />
                            </div>
                            <nav aria-label="Mobile navigation" className="flex flex-col divide-y">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-foreground hover:bg-accent hover:text-accent-foreground px-4 py-3 text-base font-medium transition-colors focus:bg-accent focus:text-accent-foreground outline-none"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}