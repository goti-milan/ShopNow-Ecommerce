"use client";

import ProductCard from "@/components/common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function FlashSalePage() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 5,
        minutes: 45,
        seconds: 30,
    });

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

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Banner */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 mb-12 text-white text-center shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Zap className="w-8 h-8 fill-yellow-300 text-yellow-300 animate-pulse" />
                        <span className="text-lg font-bold tracking-widest uppercase">Flash Deals</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 drop-shadow-md">
                        SUPER FLASH SALE
                    </h1>
                    <p className="text-xl md:text-2xl font-medium mb-8 opacity-90">
                        Up to 70% off on premium products. Hurry up!
                    </p>

                    <div className="flex justify-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[80px]">
                            <div className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                            <div className="text-xs uppercase">Days</div>
                        </div>
                        <div className="text-4xl font-bold self-center">:</div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[80px]">
                            <div className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                            <div className="text-xs uppercase">Hours</div>
                        </div>
                        <div className="text-4xl font-bold self-center">:</div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[80px]">
                            <div className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                            <div className="text-xs uppercase">Minutes</div>
                        </div>
                        <div className="text-4xl font-bold self-center">:</div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[80px]">
                            <div className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                            <div className="text-xs uppercase">Seconds</div>
                        </div>
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-32 -mt-32"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-black opacity-10 rounded-full -mr-48 -mb-48"></div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {/* Repeating PRODUCTS with extra discount badge simulation */}
                {[...PRODUCTS, ...PRODUCTS].map((product, index) => (
                    <div key={`${product.id}-${index}`} className="flex justify-center">
                        <ProductCard item={{ ...product, badgeText: "FLASH DEAL", discountPercent: 50 }} />
                    </div>
                ))}
            </div>
        </div>
    );
}
