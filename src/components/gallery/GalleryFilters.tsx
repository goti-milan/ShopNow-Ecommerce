"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GalleryFiltersProps {
    currentFilter: string;
    onFilterChange: (filter: string) => void;
}

export function GalleryFilters({ currentFilter, onFilterChange }: GalleryFiltersProps) {
    const filters = [
        { label: "All", value: "all" },
        { label: "Products", value: "product" },
        { label: "Services", value: "service" },
    ];

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {filters.map((filter) => (
                <Button
                    key={filter.value}
                    variant={currentFilter === filter.value ? "primary" : "outline"}
                    onClick={() => onFilterChange(filter.value)}
                    className={cn(
                        "rounded-full px-6 transition-all",
                        currentFilter === filter.value && "shadow-md"
                    )}
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    );
}
