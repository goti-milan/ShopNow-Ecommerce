"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { Button } from "../ui/button";
import {
    Sparkles,
    Flame,
    Star,
    Clock,
    Layers,
    ArrowRight,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const TABS = [
    { id: "new-arrivals", label: "New Arrivals", icon: Sparkles, color: "text-primary", bg: "bg-accent" },
    { id: "featured", label: "Featured Products", icon: Star, color: "text-primary", bg: "bg-accent" },
    { id: "flash-sale", label: "Flash Sale", icon: Flame, color: "text-primary", bg: "bg-accent" },
    { id: "today-deals", label: "Today Deals", icon: Clock, color: "text-primary", bg: "bg-accent" },
    { id: "combo-offers", label: "Combo Offers", icon: Layers, color: "text-primary", bg: "bg-accent" },
];

export default function HomeNewFeatures() {
    const [activeTab, setActiveTab] = useState("new-arrivals");
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Flash sale timer
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

    useEffect(() => {
        if (activeTab === "flash-sale") {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                    if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                    if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                    return prev;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [activeTab]);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    // Mock filtering based on tabs
    const filteredProducts = PRODUCTS.slice(0, 8); // Just using all for demo, in real app would filter

    return (
        <section className="py-16 bg-background overflow-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="h-px w-8 bg-primary rounded-full" />
                            <span className="text-primary font-bold tracking-widest uppercase text-xs">Shop the Best</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Exclusive Collections</h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("left")}
                            className="rounded-full border-border hover:border-primary hover:text-primary transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scroll("right")}
                            className="rounded-full border-border hover:border-primary hover:text-primary transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Dynamic Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-6 scrollbar-hide no-scrollbar -mx-4 px-4 mask-fade-right">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl whitespace-nowrap transition-all duration-300 font-bold border-2 ${isActive
                                    ? `${tab.bg} ${tab.color} border-current shadow-lg shadow-current/5 scale-105`
                                    : "bg-background text-muted-foreground border-border hover:border-border hover:text-muted-foreground"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab-specific Content Bar */}
                <div className="mt-8 mb-10 min-h-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-muted border border-border italic">
                    {activeTab === "flash-sale" ? (
                        <div className="flex items-center gap-4">
                            <span className="font-black text-primary uppercase tracking-tighter text-xl">Ends In:</span>
                            <div className="flex gap-2">
                                {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((t, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className="bg-accent0 text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-lg shadow-lg shadow-red-500/20">
                                            {t.toString().padStart(2, '0')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-muted-foreground font-medium">
                            Displaying the latest <span className="text-primary font-bold">{(TABS.find(t => t.id === activeTab))?.label}</span> Curated just for you.
                        </p>
                    )}
                    <Button variant="ghost" className="text-primary font-black hover:bg-primary/5 gap-2 uppercase tracking-tighter">
                        Explore All <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                {/* Product Grid / Row */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-2 px-2"
                >
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="min-w-[240px] md:min-w-[280px] snap-start transform transition-transform duration-500 hover:-translate-y-2">
                            <ProductCard item={product} />
                        </div>
                    ))}

                    {/* View More Card */}
                    <div className="min-w-[240px] md:min-w-[280px] snap-start group cursor-pointer">
                        <div className="h-full bg-muted rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center p-8 text-center gap-4 group-hover:bg-primary/5 group-hover:border-primary/30 transition-all">
                            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center shadow-sm group-hover:scale-110 transition-all">
                                <ArrowRight className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-black text-foreground">View More</h4>
                                <p className="text-sm text-muted-foreground font-medium">Check all items in this collection</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Banner for Combo Offers */}
                {activeTab === "combo-offers" && (
                    <div className="mt-12 bg-secondary rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/30 transition-all duration-700" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
                            <div className="space-y-4 text-center md:text-left">
                                <Badge className="bg-primary hover:bg-primary text-white font-black px-4 py-1">Limited Combo Deals</Badge>
                                <h2 className="text-4xl font-black text-white italic tracking-tighter">Buy 1 Get 1 Free!</h2>
                                <p className="text-muted-foreground font-medium max-w-sm">Mix and match any two items from our selected accessories category.</p>
                            </div>
                            <Button className="bg-background text-foreground hover:bg-muted font-black px-10 py-8 rounded-2xl text-xl transition-all transform hover:scale-105 active:scale-95">
                                Claim Offer
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 ${className}`}>
            {children}
        </span>
    );
}
