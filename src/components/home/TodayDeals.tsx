"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";
import HomeSectionHeader from "./HomeSectionHeader";

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
        <section className="py-8 sm:py-10 md:py-12 bg-muted/30 overflow-x-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <HomeSectionHeader
                    label="Deal of the Day"
                    heading="Hot Deals"
                    description="Exclusive prices available only for the next 24 hours — don&apos;t miss out!"
                    action={
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto rounded-full px-6 py-3 text-sm md:text-base md:px-12 md:py-6 border-2 border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300 gap-2"
                            aria-label="View all hot deals"
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
                            aria-label="Scroll hot deals left"
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
                            aria-label="Scroll hot deals right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-visible pt-4 sm:pt-6 pb-6 sm:pb-10 snap-x snap-mandatory no-scrollbar -mx-4 px-4"
                    >
                        {PRODUCTS.slice(2, 10).map((product) => (
                            <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start transform transition-transform duration-500 hover:-translate-y-2">
                                <ProductCard item={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
