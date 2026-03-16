"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { Layers, ChevronLeft, ChevronRight, Gift, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";

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
        <section className="py-16 bg-background overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-primary" />
                            <span className="text-primary font-semibold tracking-widest uppercase text-xs">Better Together</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Combo Offers</h2>
                        <p className="text-muted-foreground text-sm max-w-md">Smart pairings designed to give you more for less. Save up to 40% when you buy together!</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-full px-12 py-6 text-base border-2 border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300 gap-2">
                            View All <ArrowRight className="w-4 h-4" />
                        </Button>
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
                    className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar -mx-2 px-2"
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
                        <Button className="bg-background text-foreground hover:bg-muted font-bold px-10 py-8 rounded-2xl text-lg transition-all transform hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3 shrink-0">
                            CLAIM COMBO OFFER <ArrowRight className="w-6 h-6" />
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    );
}
