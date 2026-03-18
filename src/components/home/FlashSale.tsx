"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import HomeSectionHeader from "./HomeSectionHeader";

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
        <section className="py-8 sm:py-10 md:py-12 bg-background overflow-x-hidden">
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
                            <Button className="w-full sm:w-auto bg-background text-primary-dark hover:bg-accent-hover font-bold px-8 py-5 rounded-xl text-base transition-all transform hover:scale-105 active:scale-95 shadow-lg gap-2">
                                Shop the Sale
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

                <HomeSectionHeader
                    label="Flash Deals"
                    heading="Flash Sale Items"
                    description="Grab these limited-time deals before they&apos;re gone!"
                    action={
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto rounded-full px-6 py-3 text-sm md:text-base md:px-12 md:py-6 border-2 border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300 gap-2"
                            aria-label="View all flash sale items"
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
                            aria-label="Scroll flash sale items left"
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
                            aria-label="Scroll flash sale items right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-visible pt-4 sm:pt-6 pb-6 sm:pb-10 snap-x snap-mandatory no-scrollbar -mx-4 px-4"
                    >
                        {PRODUCTS.map((product) => (
                            <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start transform transition-transform duration-500 hover:-translate-y-2">
                                <ProductCard item={{ ...product, badgeText: "FLASH DEAL", discountPercent: 50 }} />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
