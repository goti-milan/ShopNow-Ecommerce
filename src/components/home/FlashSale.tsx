"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";

export default function FlashSale() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 5,
        minutes: 45,
        seconds: 30,
    });
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

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
                {/* Banner from Flash Sale Page */}
                <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-[40px] p-8 md:p-12 mb-12 text-white shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="text-center lg:text-left space-y-6">
                            <div className="flex items-center justify-center lg:justify-start gap-2">
                                <Zap className="w-10 h-10 fill-yellow-300 text-yellow-300 animate-pulse" />
                                <span className="text-xl font-black tracking-[0.2em] uppercase italic">Flash Deals</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-2xl italic tracking-tighter">
                                SUPER FLASH SALE
                            </h2>
                            <p className="text-2xl font-bold opacity-90 max-w-xl italic">
                                Up to 70% off on premium products. Hurry up!
                            </p>

                            <Button className="bg-white text-orange-600 hover:bg-gray-100 font-black px-12 py-8 rounded-2xl text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                                SHOP THE SALE
                            </Button>
                        </div>

                        <div className="flex flex-col items-center gap-4 bg-black/20 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-inner">
                            <p className="text-sm font-black uppercase tracking-widest text-orange-200">Limited Time Remaining</p>
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-5xl md:text-6xl font-black italic tracking-tighter">{timeLeft.hours.toString().padStart(2, '0')}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Hours</div>
                                </div>
                                <div className="text-4xl font-black opacity-30">:</div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-5xl md:text-6xl font-black italic tracking-tighter">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Mins</div>
                                </div>
                                <div className="text-4xl font-black opacity-30">:</div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-5xl md:text-6xl font-black italic tracking-tighter">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Secs</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-[100px] -ml-40 -mt-40"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-black opacity-20 rounded-full blur-[120px] -mr-60 -mb-60"></div>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-black text-gray-900 italic tracking-tighter">FLASH SALE ITEMS</h3>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full">
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-2 px-2"
                >
                    {PRODUCTS.map((product) => (
                        <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start transform transition-transform duration-500 hover:-translate-y-2">
                            <ProductCard item={{ ...product, badgeText: "FLASH DEAL", discountPercent: 50 }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
