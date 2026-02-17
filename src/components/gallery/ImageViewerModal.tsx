"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GalleryItem } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, ShoppingCart, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageViewerModalProps {
    item: GalleryItem;
    onClose: () => void;
    onNavigate: (direction: 'next' | 'prev') => void;
    items: GalleryItem[];
}

export function ImageViewerModal({ item, onClose, onNavigate, items }: ImageViewerModalProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNavigate('next');
            if (e.key === "ArrowLeft") onNavigate('prev');
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose, onNavigate]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-all duration-300">
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/10 z-50"
                onClick={onClose}
            >
                <X className="h-6 w-6" />
            </Button>

            <div className="flex h-full w-full flex-col md:flex-row max-w-7xl mx-auto overflow-hidden bg-background md:rounded-2xl shadow-2xl">
                {/* Image Section */}
                <div className="relative flex-1 bg-neutral-950 flex items-center justify-center group overflow-hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 text-white hover:bg-white/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onNavigate('prev')}
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </Button>

                    <div className={cn(
                        "relative w-full h-full p-4 md:p-8 flex items-center justify-center transition-all duration-500",
                        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    )}>
                        <div className="relative w-full h-full max-h-[80vh]">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-contain"
                                onLoadingComplete={() => setIsLoaded(true)}
                            />
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 text-white hover:bg-white/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => onNavigate('next')}
                    >
                        <ChevronRight className="h-8 w-8" />
                    </Button>
                </div>

                {/* Info Section */}
                <div className="w-full md:w-[400px] p-6 md:p-8 flex flex-col gap-6 overflow-y-auto bg-card border-l">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Badge variant={item.type === 'service' ? 'secondary' : 'default'} className="capitalize">
                                {item.type}
                            </Badge>
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                {item.category}
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold">{item.title}</h2>

                        <p className="text-muted-foreground leading-relaxed">
                            {item.description || "No description available for this item."}
                        </p>
                    </div>

                    <div className="mt-auto space-y-4 pt-6 border-t font-medium">
                        {item.type === 'product' ? (
                            <Button className="w-full gap-2 text-lg h-12">
                                <ShoppingCart className="h-5 w-5" />
                                Add to Cart
                            </Button>
                        ) : (
                            <Button className="w-full gap-2 text-lg h-12" variant="outline">
                                <MessageSquare className="h-5 w-5" />
                                Contact for Quote
                            </Button>
                        )}
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="mt-4">
                        <p className="text-sm font-semibold mb-3">More in Gallery</p>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                            {items.slice(0, 5).map((thumb) => (
                                <button
                                    key={thumb.id}
                                    onClick={() => {/* Implement quick jump if needed */ }}
                                    className={cn(
                                        "relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all hover:scale-105",
                                        thumb.id === item.id ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                                    )}
                                >
                                    <Image
                                        src={thumb.image}
                                        alt={thumb.title}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
