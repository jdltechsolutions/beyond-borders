import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
    return (
    <section id="about" className="w-full bg-background px-4 md:px-32 py-12 md:py-16">
            <div className="mx-auto max-w-7xl">
                {/*
                    Layout rules:
                    - Mobile: image 1, then text card, then image 2 (stacked)
                    - Desktop (md+): two images in the left column (stacked vertically), text card on the right spanning two rows
                */}
                <div className="grid gap-5 md:grid-cols-2">
                    {/* Image 1 (hidden on mobile) */}
                    <div className="hidden md:block md:order-none md:col-span-1 md:row-start-1">
                        <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-lg md:mx-0">
                            <Image
                                src="/7.jpg"
                                alt="About gallery image 1"
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 50vw, 100vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* Text Card */}
                    <div className="order-2 md:order-none md:col-span-1 md:row-span-2 md:self-center md:-ml-20 lg:-ml-32 relative z-10">
                        <Card className="shadow-xl">
                            <CardContent className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                                    Story of Beyond Borders and its founders
                                </h3>
                                <p className="text-muted-foreground mt-4 leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p className="text-muted-foreground mt-4 leading-relaxed">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <div className="mt-6">
                                    <h4 className="text-xl font-semibold tracking-tight md:text-2xl">
                                        Our Unique Proposition
                                    </h4>
                                    <ul className="text-muted-foreground mt-3 list-disc space-y-1 pl-5">
                                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                        <li>Quis nostrud exercitation ullamco laboris nisi ut aliquip.</li>
                                        <li>Duis aute irure dolor in reprehenderit in voluptate velit.</li>
                                        <li>Excepteur sint occaecat cupidatat non proident.</li>
                                    </ul>
                                </div>
                                <div className="mt-8">
                                    <p className="text-balance text-center text-lg font-semibold italic md:text-left">
                                        “Beyond borders, beyond expectations.”
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Image 2 */}
                    <div className="order-3 md:order-none md:col-span-1 md:row-start-2">
                        <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-lg md:mx-0">
                            <Image
                                src="/11.jpg"
                                alt="About gallery image 2"
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 50vw, 100vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
