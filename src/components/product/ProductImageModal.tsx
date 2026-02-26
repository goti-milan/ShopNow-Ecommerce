"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageModalProps {
    images: string[];
    title: string;
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductImageModal({
    images,
    title,
    initialIndex = 0,
    isOpen,
    onClose,
}: ProductImageModalProps) {
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const [isLoaded, setIsLoaded] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoaded(false);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedIndex(initialIndex);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, initialIndex]);

    const galleryImages = images.length > 0 ? images : ["https://picsum.photos/seed/picsum/800/800"];
    const totalImages = galleryImages.length;

    const goToPrevious = useCallback(() => {
        setIsLoaded(false);
        setSelectedIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    }, [totalImages]);

    const goToNext = useCallback(() => {
        setIsLoaded(false);
        setSelectedIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    }, [totalImages]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                goToPrevious();
            } else if (e.key === "ArrowRight") {
                goToNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, goToPrevious, goToNext]);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[10000] flex flex-col bg-black/95 backdrop-blur-md">
            {/* Header: Title and Close */}
            <div className="flex items-center justify-between p-4 md:p-6 text-white border-b border-white/10 relative z-[10001]">
                <h2 className="text-lg md:text-xl font-medium truncate pr-8">{title}</h2>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
                    aria-label="Close modal"
                >
                    <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
            </div>

            {/* Main Content: Large Image and Navigation */}
            <div className="relative flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden z-[10001]">
                {/* Previous Button */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 md:left-8 z-20 p-3 md:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all active:scale-95"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                {/* Main Image */}
                <div className="relative w-full h-full max-w-5xl transition-all duration-500 ease-out">
                    <div
                        className={cn(
                            "relative w-full h-full transition-opacity duration-300",
                            isLoaded ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <Image
                            src={galleryImages[selectedIndex]}
                            alt={`${title} - Image ${selectedIndex + 1}`}
                            fill
                            className="object-contain"
                            priority
                            onLoad={() => setIsLoaded(true)}
                        />
                    </div>
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                        </div>
                    )}
                </div>

                {/* Next Button */}
                <button
                    onClick={goToNext}
                    className="absolute right-4 md:right-8 z-20 p-3 md:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all active:scale-95"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white/90 px-4 py-1.5 rounded-full text-sm backdrop-blur-sm border border-white/10">
                    {selectedIndex + 1} / {galleryImages.length}
                </div>
            </div>

            {/* Footer: Thumbnails */}
            <div className="h-24 md:h-32 bg-black/40 border-t border-white/10 p-4 md:p-6 flex items-center justify-center gap-2 md:gap-4 overflow-x-auto no-scrollbar relative z-[10001]">
                {galleryImages.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (selectedIndex !== index) {
                                setIsLoaded(false);
                                setSelectedIndex(index);
                            }
                        }}
                        className={cn(
                            "relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300",
                            selectedIndex === index
                                ? "border-primary scale-110 shadow-[0_0_15px_rgba(229,78,50,0.3)]"
                                : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
                        )}
                    >
                        <Image
                            src={img}
                            alt={`${title} thumbnail ${index + 1}`}
                            fill
                            className="object-contain p-1"
                        />
                    </button>
                ))}
            </div>
        </div>,
        document.body
    );
}

