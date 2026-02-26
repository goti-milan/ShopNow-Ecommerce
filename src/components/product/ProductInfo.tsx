"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
    title: string;
    brand?: string;
    productId?: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    rating?: number;
    reviewsCount?: number;
    description: string;
    badgeText?: string;
    isBestSeller?: boolean;
}

export const ProductInfo = ({
    title,
    brand = "Apple",
    productId = "#APL14PM",
    price,
    originalPrice,
    discountPercent,
    rating = 4.8,
    reviewsCount = 1248,
    isBestSeller = true,
    description
}: Omit<ProductInfoProps, 'badgeText'>) => {
    return (
        <div className="flex flex-col space-y-5">
            {/* Badges and Top Header */}
            <div className="flex items-center gap-2">
                {isBestSeller && (
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-100 uppercase tracking-tighter">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        Best Seller
                    </div>
                )}
            </div>

            {/* Title Section */}
            <div className="space-y-2">
                <div className="flex items-start justify-between">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-[85%]">
                        {title}
                    </h1>
                </div>

                {/* Rating & Reviews Section */}
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "w-4 h-4 tracking-tighter",
                                    i < Math.floor(rating) ? "fill-orange-400 text-orange-400" : "text-slate-200"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-orange-500 font-bold text-sm">{rating}</span>
                    <span className="text-slate-400 text-xs">({reviewsCount.toLocaleString()} Reviews)</span>
                </div>

                {/* Brand and ID */}
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <div>Brand: <span className="text-blue-500 font-bold">{brand}</span></div>
                    <div className="text-slate-300">|</div>
                    <div>Product ID: <span className="text-slate-900 font-bold">{productId}</span></div>
                </div>
            </div>

            {/* Price Section */}
            <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-slate-900">
                        ₹{price.toLocaleString()}
                    </span>
                    {originalPrice && (
                        <span className="text-lg text-slate-400 line-through font-medium">
                            ₹{originalPrice.toLocaleString()}
                        </span>
                    )}
                    {discountPercent && (
                        <span className="text-orange-500 font-black text-lg italic">
                            {discountPercent}% OFF
                        </span>
                    )}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    Inclusive of all taxes
                </div>
            </div>

            {/* In context description snippet */}
            {description && (
                <div className="pt-2 border-t border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-xs font-bold text-slate-700">6.7&quot; Super Retina XDR</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-xs font-bold text-slate-700">5G Connectivity</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-xs font-bold text-slate-700">A16 Bionic Chip</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-xs font-bold text-slate-700">Battery: 4323 mAh</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
