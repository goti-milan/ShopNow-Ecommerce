"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { Clock, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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
        <section className="py-16 bg-emerald-50/30 overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-emerald-500 p-1.5 rounded-lg shadow-lg shadow-emerald-500/20">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-emerald-600 font-black tracking-widest uppercase text-xs">Deal of the Day</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight italic uppercase">Today{`'s`} Hot Deals</h2>
                        <p className="text-emerald-700 font-bold italic">Exclusive prices available only for the next 24 hours!</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="text-emerald-600 font-black gap-2 hover:bg-emerald-100/50">
                            View All <ArrowRight className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => scroll("left")}
                                className="rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => scroll("right")}
                                className="rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-2 px-2"
                >
                    {PRODUCTS.slice(2, 10).map((product) => (
                        <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start transform transition-transform duration-500 hover:-translate-y-2">
                            <ProductCard item={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
