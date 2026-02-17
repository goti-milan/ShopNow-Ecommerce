"use client";

import { useState, useMemo } from "react";
import { GALLERY_ITEMS } from "@/utils/static-data";
import { GalleryItem } from "@/utils/types";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ImageViewerModal } from "@/components/gallery/ImageViewerModal";

export default function GalleryPage() {
    const [filter, setFilter] = useState("all");
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    const filteredItems = useMemo(() => {
        if (filter === "all") return GALLERY_ITEMS;
        return GALLERY_ITEMS.filter((item) => item.type === filter);
    }, [filter]);

    const handleNavigate = (direction: 'next' | 'prev') => {
        if (!selectedItem) return;

        const currentIndex = filteredItems.findIndex(i => i.id === selectedItem.id);
        let nextIndex;

        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % filteredItems.length;
        } else {
            nextIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        }

        setSelectedItem(filteredItems[nextIndex]);
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    Image Gallery
                </h1>
                <p className="text-muted-foreground text-lg">
                    Explore our collection of high-quality products and professional services.
                    Use the filters below to browse our offerings.
                </p>
            </div>

            <GalleryFilters
                currentFilter={filter}
                onFilterChange={setFilter}
            />

            <GalleryGrid
                items={filteredItems}
                onView={setSelectedItem}
            />

            {selectedItem && (
                <ImageViewerModal
                    item={selectedItem}
                    items={filteredItems}
                    onClose={() => setSelectedItem(null)}
                    onNavigate={handleNavigate}
                />
            )}
        </div>
    );
}
