"use client";

import { GalleryItem } from "@/utils/types";
import { GalleryCard } from "./GalleryCard";

interface GalleryGridProps {
    items: GalleryItem[];
    onView: (item: GalleryItem) => void;
}

export function GalleryGrid({ items, onView }: GalleryGridProps) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-xl font-medium text-muted-foreground">No items found.</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mb-12">
            {items.map((item) => (
                <GalleryCard key={item.id} item={item} onView={onView} />
            ))}
        </div>
    );
}
