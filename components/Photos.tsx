"use client";

import Image from "next/image";

const galleryImages = [
    "/gallery/IMG_3439.jpg",
    "/gallery/IMG_4991.jpg",
    "/gallery/IMG_5222.jpg",
];

function filenameToAlt(path: string) {
    const file = path.split("/").pop() || "";
    const base = file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
    return base.trim();
}

export default function PhotoGallery() {
    return (
        <section id="gallery" className="w-full bg-background px-4 md:px-32 py-12 md:py-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 text-center md:mb-12">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Photo Gallery</h2>
                    <p className="text-muted-foreground mt-2 text-sm md:text-base">
                        A glimpse into journeys curated by Beyond Borders.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {galleryImages.map((src) => (
                        <div key={src} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                            <Image
                                src={src}
                                alt={filenameToAlt(src)}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                priority={false}
                            />
                            <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}