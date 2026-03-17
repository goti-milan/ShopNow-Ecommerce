"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { Zap, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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
        <section className="py-16 bg-background overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Flash Sale Banner */}
                <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12 mb-12 text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="text-center lg:text-left space-y-4">
                            <div className="flex items-center justify-center lg:justify-start gap-2">
                                <Zap className="w-6 h-6 fill-primary text-primary-foreground animate-pulse" />
                                <span className="text-primary-foreground font-semibold tracking-widest uppercase text-xs">Limited Time Deal</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                                Super Flash Sale
                            </h2>
                            <p className="text-lg font-medium opacity-90 max-w-xl">
                                Up to 70% off on premium products. Hurry up!
                            </p>
                            <Button className="bg-background text-primary-dark hover:bg-accent-hover font-bold px-8 py-5 rounded-xl text-base transition-all transform hover:scale-105 active:scale-95 shadow-lg gap-2">
                                Shop the Sale <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex flex-col items-center gap-3 bg-secondary/20 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-inner">
                            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground">Limited Time Remaining</p>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-4xl md:text-5xl font-bold tracking-tight">{timeLeft.hours.toString().padStart(2, '0')}</div>
                                    <div className="text-[10px] font-semibold uppercase tracking-widest opacity-70">Hours</div>
                                </div>
                                <div className="text-3xl font-bold opacity-40">:</div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-4xl md:text-5xl font-bold tracking-tight">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                                    <div className="text-[10px] font-semibold uppercase tracking-widest opacity-70">Mins</div>
                                </div>
                                <div className="text-3xl font-bold opacity-40">:</div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="text-4xl md:text-5xl font-bold tracking-tight">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                                    <div className="text-[10px] font-semibold uppercase tracking-widest opacity-70">Secs</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-background opacity-10 rounded-full blur-[100px] -ml-40 -mt-40"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary opacity-20 rounded-full blur-[120px] -mr-60 -mb-60"></div>
                </div>

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-primary font-semibold tracking-widest uppercase text-xs">Flash Deals</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Flash Sale Items</h2>
                        <p className="text-muted-foreground text-sm max-w-md">Grab these limited-time deals before they&apos;re gone!</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-full px-12 py-6 text-base border-2 border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300 gap-2">
                            View All  <ArrowRight className="w-4 h-4" />
                        </Button>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full border-foreground/20 hover:border-primary hover:text-primary transition-all">
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full border-foreground/20 hover:border-primary hover:text-primary transition-all">
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-2 px-2"
                >
                    {PRODUCTS.map((product) => (
                        <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start transform transition-transform duration-500 hover:-translate-y-2">
                            <ProductCard item={{ ...product, badgeText: "FLASH DEAL", discountPercent: 50 }} />
                        </div>
                    ))}
                </div>

                <div className="pt-8 flex justify-center">
                    <Button variant="outline" className="rounded-full px-12 py-6 text-base border-2 border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300 gap-2">
                        View All Flash Sale Items <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
