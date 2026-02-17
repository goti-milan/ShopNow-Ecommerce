"use client";

import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductInfoProps {
    title: string;
    brand?: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    rating?: number;
    reviewsCount?: number;
    description: string;
    badgeText?: string;
}

export const ProductInfo = ({
    title,
    brand = "ShopNow Premium",
    price,
    originalPrice,
    discountPercent,
    rating = 4.8,
    reviewsCount = 128,
    description,
    badgeText
}: ProductInfoProps) => {
    return (
        <div className="flex flex-col space-y-4">
            {/* Brand and Badge */}
            <div className="flex items-center justify-between">
                <span className="text-primary font-bold tracking-wider text-sm uppercase">{brand}</span>
                {badgeText && (
                    <Badge variant="destructive" className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                        {badgeText}
                    </Badge>
                )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
                {title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
                <div className="flex items-center bg-yellow-400/10 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-bold text-yellow-700 text-sm">{rating}</span>
                </div>
                <span className="text-muted-foreground text-sm font-medium">
                    ({reviewsCount} Verified Reviews)
                </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 py-2">
                <span className="text-4xl font-extrabold text-foreground">
                    ₹{price.toLocaleString()}
                </span>
                {originalPrice && (
                    <span className="text-xl text-muted-foreground line-through font-medium">
                        ₹{originalPrice.toLocaleString()}
                    </span>
                )}
                {discountPercent && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold">
                        {discountPercent}% OFF
                    </Badge>
                )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 py-1 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-600 font-semibold uppercase tracking-wide">In Stock</span>
                <span className="text-muted-foreground">• Ready for dispatch</span>
            </div>

            {/* Short Description */}
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {description || "Elevate your lifestyle with our premium product, designed for durability and world-class performance. A perfect blend of aesthetics and functionality that stands out in every detail."}
            </p>

            {/* Delivery & Return Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 border-y border-slate-100 my-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 transition-colors hover:bg-slate-50">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">🚚</div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">Premium Delivery</span>
                        <span className="text-xs text-slate-500 mt-0.5 leading-relaxed">Free express shipping on orders over ₹2,000. Delivered in 2-4 days.</span>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 transition-colors hover:bg-slate-50">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">🔄</div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">Hassle-Free Returns</span>
                        <span className="text-xs text-slate-500 mt-0.5 leading-relaxed">30-day easy return policy. Guaranteed money back if not satisfied.</span>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 transition-colors hover:bg-slate-50">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">🛡️</div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">Secure Checkout</span>
                        <span className="text-xs text-slate-500 mt-0.5 leading-relaxed">100% genuine products with SSL encrypted secure payments.</span>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 transition-colors hover:bg-slate-50">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">✨</div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">Brand Warranty</span>
                        <span className="text-xs text-slate-500 mt-0.5 leading-relaxed">This product comes with a 1-year official manufacturer warranty.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
