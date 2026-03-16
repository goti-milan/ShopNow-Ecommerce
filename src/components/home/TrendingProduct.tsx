"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { TrendingUp, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useRef } from "react";

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
        <section className="py-16 bg-muted/30 overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-primary font-semibold tracking-widest uppercase text-xs">What&apos;s Hot Right Now</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Trending Products</h2>
                        <p className="text-muted-foreground text-sm max-w-md">The most loved items by our community — see what everyone&apos;s buying.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="rounded-full px-12 py-6 text-base border-2 border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300 gap-2"
                            aria-label="View all trending products"
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => scroll("left")}
                                className="rounded-full border-foreground/20 hover:border-primary hover:text-primary transition-all"
                                aria-label="Scroll trending products left"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => scroll("right")}
                                className="rounded-full border-foreground/20 hover:border-primary hover:text-primary transition-all"
                                aria-label="Scroll trending products right"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar -mx-2 px-2"
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
        </section>
    );
}
