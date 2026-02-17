"use client";

import Image from "next/image";
import { GalleryItem } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface GalleryCardProps {
    item: GalleryItem;
    onView: (item: GalleryItem) => void;
}

export function GalleryCard({ item, onView }: GalleryCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="gap-2"
                        onClick={() => onView(item)}
                    >
                        <Eye className="h-4 w-4" />
                        View
                    </Button>
                </div>
                <div className="absolute top-3 left-3">
                    <Badge variant={item.type === 'service' ? 'secondary' : 'default'} className="capitalize">
                        {item.type}
                    </Badge>
                </div>
            </div>
            <div className="p-4">
                <div className="mb-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {item.category}
                </div>
                <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                </h3>
            </div>
        </div>
    );
}
