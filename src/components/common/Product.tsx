"use client";

import { Product } from "@/utils/types";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";

const ProductCard = ({ item, showActions = true }: { item: Product; showActions?: boolean }) => {
    const { id, badgeText, title, price, originalPrice, discountPercent, image } = item
    return (
        <Link href={`/product/${id}`} className="group w-full max-w-60 rounded-xl bg-card transition-all duration-300 ease-out hover:shadow-hover hover:-translate-y-1 overflow-hidden border border-transparent hover:border-border block">
            {/* Image Wrapper */}
            <div className="relative flex h-[240px] items-center justify-center bg-transparent overflow-hidden">
                {badgeText && (
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground shadow-sm">
                        {badgeText}
                    </span>
                )}

                {/* Wishlist Button */}
                <button className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 shadow-sm" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                    <Heart className="h-4 w-4" />
                </button>

                <Image
                    src={image || "https://picsum.photos/seed/picsum/600/800"}
                    alt={title}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <h4 className="line-clamp-2 h-10 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {title}
                </h4>

                <div className="flex flex-col items-baseline justify-between">
                    {/* Price */}
                    <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-lg font-bold text-foreground">
                            ₹{price.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground font-normal">/ unit</span>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">

                        {originalPrice && (
                            <span className="text-xs text-muted-foreground line-through ml-1">
                                ₹{originalPrice.toLocaleString()}
                            </span>
                        )}

                        {/* Discount */}
                        {discountPercent && (
                            <p className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm">
                                {discountPercent}% OFF
                            </p>
                        )}
                    </div>
                </div>

                {showActions && (
                    <div className="flex flex-col gap-2 pt-1">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs font-semibold rounded-lg h-9"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        >
                            Add to Cart
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            className="w-full text-xs font-semibold rounded-lg h-9 shadow-sm"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        >
                            Buy Now
                        </Button>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default ProductCard;

