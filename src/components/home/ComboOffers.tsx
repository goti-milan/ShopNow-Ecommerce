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
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-2xl border border-purple-100">
                            <Layers className="w-5 h-5 text-purple-600" />
                            <span className="text-purple-700 font-black tracking-widest uppercase text-xs">Better Together</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight italic uppercase">Exclusive Combo Offers</h2>
                        <p className="text-gray-500 font-bold max-w-2xl">Smart pairings designed to give you more for less. Save up to 40% when you buy these items together!</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("left")}
                            className="rounded-full border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("right")}
                            className="rounded-full border-gray-200 hover:border-purple-600 hover:text-purple-600 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar -mx-2 px-2"
                >
                    {PRODUCTS.slice(3, 11).map((product) => (
                        <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start relative group">
                            <div className="absolute -top-3 -right-3 z-10 scale-0 group-hover:scale-100 transition-transform duration-500">
                                <div className="bg-purple-600 text-white p-3 rounded-2xl shadow-xl shadow-purple-600/30 flex items-center gap-2">
                                    <Gift className="w-5 h-5" />
                                    <span className="font-black text-sm uppercase tracking-tighter italic">Value Combo</span>
                                </div>
                            </div>
                            <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                <ProductCard item={product} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Promo Banner */}
                <div className="mt-8 bg-[#2d3139] rounded-[40px] p-8 md:p-16 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-purple-600/30 transition-all duration-700" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 justify-between">
                        <div className="space-y-6 text-center md:text-left">
                            <div className="inline-block bg-purple-600 text-white font-black px-6 py-2 rounded-xl italic tracking-tighter text-lg shadow-lg shadow-purple-600/20">
                                LIMITED COMBO DEALS
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none underline decoration-purple-600 underline-offset-8">BUY 1 GET 1 FREE!</h2>
                            <p className="text-gray-400 font-bold text-xl max-w-lg leading-relaxed">
                                Mix and match any two items from our selected accessories category. Limited time offer ending soon.
                            </p>
                        </div>
                        <Button className="bg-white text-gray-900 hover:bg-gray-100 font-black px-12 py-10 rounded-[32px] text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-4">
                            CLAIM COMBO OFFER <ArrowRight className="w-8 h-8" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
