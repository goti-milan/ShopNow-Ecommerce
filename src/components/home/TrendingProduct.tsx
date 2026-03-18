"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useRef } from "react";
import HomeSectionHeader from "./HomeSectionHeader";

export default function TrendingProduct() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, clientWidth } = scrollContainerRef.current;
        const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
        scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    };

    const trendingProducts = PRODUCTS.slice(0, 10);

    return (
        <section className="py-8 sm:py-10 md:py-12 bg-muted/30 overflow-x-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <HomeSectionHeader
                    label="What&apos;s Hot Right Now"
                    heading="Trending Products"
                    description="The most loved items by our community — see what everyone&apos;s buying."
                    action={
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto rounded-full px-6 py-3 text-sm md:text-base md:px-12 md:py-6 border-2 border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300 gap-2"
                            aria-label="View all trending products"
                        >
                            View All
                        </Button>
                    }
                />

                <div className="relative">
                    <div className="hidden sm:block pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 z-10">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("left")}
                            className="pointer-events-auto ml-2 rounded-full border-foreground/20 bg-background/80 backdrop-blur hover:bg-background hover:border-primary hover:text-primary transition-all shadow-sm"
                            aria-label="Scroll trending products left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                    </div>
                    <div className="hidden sm:block pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 z-10">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("right")}
                            className="pointer-events-auto mr-2 rounded-full border-foreground/20 bg-background/80 backdrop-blur hover:bg-background hover:border-primary hover:text-primary transition-all shadow-sm"
                            aria-label="Scroll trending products right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto overflow-y-visible pt-6 pb-12 snap-x snap-mandatory no-scrollbar -mx-4 px-4"
                    >
                        {trendingProducts.map((product) => (
                            <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start relative group">
                                <div className="absolute -top-3 -right-3 z-10 scale-0 group-hover:scale-100 transition-transform duration-500">
                                    <div className="bg-primary text-primary-foreground p-2.5 rounded-2xl shadow-xl flex items-center gap-1.5">
                                        <TrendingUp className="w-4 h-4" />
                                        <span className="font-semibold text-xs uppercase tracking-tight">Trending</span>
                                    </div>
                                </div>
                                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <ProductCard item={product} showActions={false} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
