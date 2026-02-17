"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export const ImageGallery = ({ images, title }: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setMousePos({ x, y });
    };

    const galleryImages = images.length > 0 ? images : ["https://picsum.photos/seed/picsum/800/800"];

    return (
        <div className="flex flex-col gap-5">
            {/* Main Image */}
            <div
                className="relative aspect-square bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-200 cursor-zoom-in group shadow-sm"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
            >
                <Image
                    src={galleryImages[selectedImage]}
                    alt={title}
                    fill
                    className={cn(
                        "object-contain p-12 transition-all duration-700 ease-out",
                        isZoomed ? "scale-[1.8]" : "scale-100"
                    )}
                    style={isZoomed ? {
                        transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                    } : undefined}
                    priority
                />

                {/* Visual indicator for zoom */}
                <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20 shadow-xl">
                    <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-1">
                {galleryImages.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                            "relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-white",
                            selectedImage === index
                                ? "border-primary ring-4 ring-primary/10 scale-105 shadow-md"
                                : "border-slate-100 opacity-60 hover:opacity-100 hover:border-slate-300"
                        )}
                    >
                        <Image
                            src={img}
                            alt={`${title} thumbnail ${index + 1}`}
                            fill
                            className="object-contain p-3"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};
