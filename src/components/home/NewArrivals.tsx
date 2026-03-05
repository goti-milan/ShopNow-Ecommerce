"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";

export default function NewArrivals() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
                            <span className="text-blue-500 font-bold tracking-widest uppercase text-xs">Fresh in Store</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight italic uppercase">New Arrivals</h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("left")}
                            className="rounded-full border-gray-200 hover:border-primary hover:text-primary transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("right")}
                            className="rounded-full border-gray-200 hover:border-primary hover:text-primary transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-2 px-2"
                >
                    {PRODUCTS.slice(4, 12).map((product) => (
                        <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start transform transition-transform duration-500 hover:-translate-y-2">
                            <ProductCard item={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
