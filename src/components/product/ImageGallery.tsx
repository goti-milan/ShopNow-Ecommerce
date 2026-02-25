"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProductImageModal } from "./ProductImageModal";

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export const ImageGallery = ({ images, title }: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const galleryImages = images.length > 0 ? images : ["https://picsum.photos/seed/picsum/800/800"];

    return (
        <div className="flex flex-col gap-5">
            {/* Main Image */}
            <div
                className="relative aspect-square bg-slate-50 rounded-4xl overflow-hidden border border-slate-200 cursor-pointer group shadow-sm"
                onClick={() => setIsModalOpen(true)}
            >
                <Image
                    src={galleryImages[selectedImage]}
                    alt={title}
                    fill
                    className="object-contain p-12 transition-all duration-700 ease-out scale-100"
                    priority
                />

                {/* Click to enlarge indicator */}
                <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20 text-sm font-medium text-slate-600 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Click to view large
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-1">
                {galleryImages.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                            "relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-white",
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

            {/* Amazon-style Modal */}
            <ProductImageModal
                images={galleryImages}
                title={title}
                initialIndex={selectedImage}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
