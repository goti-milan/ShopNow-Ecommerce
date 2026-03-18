"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { ChevronLeft, ChevronRight, Gift, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";
import HomeSectionHeader from "./HomeSectionHeader";

export default function ComboOffers() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="py-8 sm:py-10 md:py-12 bg-background overflow-x-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <HomeSectionHeader
                    label="Better Together"
                    heading="Combo Offers"
                    description="Smart pairings designed to give you more for less. Save up to 40% when you buy together!"
                    action={
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto rounded-full px-6 py-3 text-sm md:text-base md:px-12 md:py-6 border-2 border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300 gap-2"
                            aria-label="View all combo offers"
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
                            aria-label="Scroll combo offers left"
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
                            aria-label="Scroll combo offers right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto overflow-y-visible pt-6 pb-12 snap-x snap-mandatory no-scrollbar -mx-4 px-4"
                    >
                        {PRODUCTS.slice(3, 11).map((product) => (
                            <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start relative group">
                                <div className="absolute -top-3 -right-3 z-10 scale-0 group-hover:scale-100 transition-transform duration-500">
                                    <div className="bg-primary text-primary-foreground p-2.5 rounded-2xl shadow-xl flex items-center gap-1.5">
                                        <Gift className="w-4 h-4" />
                                        <span className="font-semibold text-xs uppercase tracking-tight">Value Combo</span>
                                    </div>
                                </div>
                                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <ProductCard item={product} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Promo Banner */}
                <div className="mt-4 bg-secondary rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-primary/30 transition-all duration-700" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 justify-between">
                        <div className="space-y-4 text-center md:text-left">
                            <div className="inline-block bg-primary text-primary-foreground font-semibold px-5 py-1.5 rounded-xl text-sm shadow-lg">
                                LIMITED COMBO DEALS
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">BUY 1 GET 1 FREE!</h2>
                            <p className="text-muted-foreground text-base max-w-lg leading-relaxed">
                                Mix and match any two items from our selected accessories category. Limited time offer ending soon.
                            </p>
                        </div>
                        <Button className="w-full sm:w-auto bg-background text-foreground hover:bg-muted font-bold px-8 py-6 md:px-10 md:py-8 rounded-2xl text-base md:text-lg transition-all transform hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-3 shrink-0">
                            CLAIM COMBO OFFER <ArrowRight className="w-6 h-6" />
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    );
}
