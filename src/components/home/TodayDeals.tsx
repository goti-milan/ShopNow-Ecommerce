"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { Flame, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";

export default function TodayDeals() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="py-16 bg-muted/30 overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Flame className="w-4 h-4 text-primary" />
                            <span className="text-primary font-semibold tracking-widest uppercase text-xs">Deal of the Day</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Hot Deals</h2>
                        <p className="text-muted-foreground text-sm max-w-md">Exclusive prices available only for the next 24 hours — don&apos;t miss out!</p>
                    </div>

                    <div className="flex items-center gap-3">
                        
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => scroll("left")}
                                className="rounded-full border-foreground/20 hover:border-primary hover:text-primary transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => scroll("right")}
                                className="rounded-full border-foreground/20 hover:border-primary hover:text-primary transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-2 px-2"
                >
                    {PRODUCTS.slice(2, 10).map((product) => (
                        <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start transform transition-transform duration-500 hover:-translate-y-2">
                            <ProductCard item={product} />
                        </div>
                    ))}
                </div>

                <div className="pt-8 flex justify-center">
                    <Button variant="outline" className="rounded-full px-12 py-6 text-base border-2 border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300 gap-2">
                        View All Hot Deals <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
