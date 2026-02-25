"use client";

import { Star, CheckCircle, Info, Tag, RefreshCcw, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface Offer {
    type: "bank" | "exchange" | "coupon";
    title: string;
    description: string;
    icon: React.ReactNode;
}

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
    isVerified?: boolean;
}

const offers: Offer[] = [
    {
        type: "bank",
        title: "Bank Offer",
        description: "₹5,000 Off",
        icon: <CreditCard className="w-4 h-4" />
    },
    {
        type: "exchange",
        title: "Exchange",
        description: "Old Phone",
        icon: <RefreshCcw className="w-4 h-4" />
    },
    {
        type: "coupon",
        title: "Coupon",
        description: "SAVE10",
        icon: <Tag className="w-4 h-4" />
    }
];

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
    isVerified = true,
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
                        {isVerified && (
                            <span className="inline-flex items-center ml-2 text-blue-500 align-middle">
                                <CheckCircle className="w-5 h-5 fill-current text-white bg-blue-500 rounded-full" />
                                <span className="text-xs font-bold ml-1">Verified</span>
                            </span>
                        )}
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
                    <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold border border-green-100 uppercase ml-2">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                    </div>
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
                <div className="flex items-center gap-2 mt-2 pt-1 border-t border-slate-50 border-dashed">
                    <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px]">EMI</div>
                    <span className="text-xs font-bold text-slate-700">EMI starting from ₹4,299/month</span>
                    <button className="text-blue-500 hover:translate-x-1 transition-transform">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Offers Section */}
            <div className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-extrabold text-slate-900 uppercase tracking-tighter">Offers:</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {offers.map((offer, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center p-2 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-all group cursor-pointer lg:p-1.5 xl:p-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">{offer.title}</span>
                            <span className={cn(
                                "text-[11px] font-black group-hover:text-blue-600 transition-colors uppercase py-0.5",
                                offer.type === "coupon" ? "text-orange-500" : "text-green-600"
                            )}>
                                {offer.description}
                                {offer.type !== "coupon" && <span className="ml-0.5">↑</span>}
                            </span>
                        </div>
                    ))}
                    <div className="col-span-1 flex flex-col items-center justify-center p-2 rounded-xl border border-slate-100 bg-slate-50/50 lg:hidden xl:flex">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Coupon</span>
                        <span className="text-[11px] font-black text-orange-500 uppercase py-0.5">SAVE10</span>
                    </div>
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
