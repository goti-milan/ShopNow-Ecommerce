"use client";

import { useState, useEffect } from "react";
import { Zap, Star, TrendingUp, Truck } from "lucide-react";

const messages = [
    {
        id: 1,
        text: "Free Shipping on Orders Over $50",
        icon: Truck,
    },
    {
        id: 2,
        text: "New Summer Collection is Here!",
        icon: Star,
    },
    {
        id: 3,
        text: "Flash Sale: Up to 50% Off Select Items",
        icon: Zap,
    },
    {
        id: 4,
        text: "Join Our Loyalty Program for Exclusive Rewards",
        icon: TrendingUp,
    },
];

export default function Ticker() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % messages.length);
                setIsAnimating(false);
            }, 500); // Wait for exit animation
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const CurrentIcon = messages[currentIndex].icon;

    return (
        <div className="bg-foreground text-background py-3 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center relative z-10">
                <div
                    className={`flex items-center gap-3 transition-all duration-500 transform ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                        }`}
                >
                    <CurrentIcon className="w-5 h-5 text-primary" />
                    <span className="font-medium text-sm md:text-base tracking-wide">
                        {messages[currentIndex].text}
                    </span>
                </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 md:opacity-100 animate-pulse pointer-events-none"></div>
        </div>
    );
}
