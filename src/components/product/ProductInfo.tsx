"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import ShareButton from "@/components/common/ShareButton";

interface ProductInfoProps {
    title: string;
    brand?: string;
    productId?: string;
    sharePath?: string;
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
    sharePath,
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
                    <div className="flex items-center gap-1 bg-accent text-primary px-2 py-0.5 rounded text-[10px] font-bold border border-primary/20 uppercase tracking-tighter">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        Best Seller
                    </div>
                )}
            </div>

            {/* Title Section */}
            <div className="space-y-2">
                <div className="flex items-start justify-between">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight tracking-tight max-w-[85%]">
                        {title}
                    </h1>
                    {sharePath && (
                        <ShareButton
                            path={sharePath}
                            title={title}
                            className="shrink-0 rounded-full border border-border bg-background p-2 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                            iconClassName="h-5 w-5"
                            shareTitle="Share product"
                        />
                    )}
                </div>

                {/* Rating & Reviews Section */}
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "w-4 h-4 tracking-tighter",
                                    i < Math.floor(rating) ? "fill-primary text-primary" : "text-border"
                                )}
                            />
                        ))}
                    </div>
                    <span className="text-primary font-bold text-sm">{rating}</span>
                    <span className="text-muted-foreground text-xs">({reviewsCount.toLocaleString()} Reviews)</span>
                </div>

                {/* Brand and ID */}
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                    <div>Brand: <span className="text-primary font-bold">{brand}</span></div>
                    <div className="text-muted-foreground">|</div>
                    <div>Product ID: <span className="text-foreground font-bold">{productId}</span></div>
                </div>
            </div>

            {/* Price Section */}
            <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-foreground">
                        ₹{price.toLocaleString()}
                    </span>
                    {originalPrice && (
                        <span className="text-lg text-muted-foreground line-through font-medium">
                            ₹{originalPrice.toLocaleString()}
                        </span>
                    )}
                    {discountPercent && (
                        <span className="text-primary font-black text-lg italic">
                            {discountPercent}% OFF
                        </span>
                    )}
                </div>
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    Inclusive of all taxes
                </div>
            </div>

            {/* In context description snippet */}
            {description && (
                <div className="pt-2 border-t border-border">
                    <h4 className="text-[10px] font-black text-foreground uppercase tracking-widest mb-3">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent0" />
                            <span className="text-xs font-bold text-foreground">6.7&quot; Super Retina XDR</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent0" />
                            <span className="text-xs font-bold text-foreground">5G Connectivity</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent0" />
                            <span className="text-xs font-bold text-foreground">A16 Bionic Chip</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent0" />
                            <span className="text-xs font-bold text-foreground">Battery: 4323 mAh</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
