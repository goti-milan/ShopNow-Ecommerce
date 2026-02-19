"use client";

import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
    onAddToCart?: () => void;
    onBuyNow?: () => void;
    onWishlist?: () => void;
    onShare?: () => void;
    isWishlisted?: boolean;
}

export const ActionButtons = ({
    onAddToCart,
    onBuyNow,
    onWishlist,
    onShare,
    isWishlisted = false
}: ActionButtonsProps) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-4 w-full">
                <Button
                    className="h-12 text-sm font-bold rounded-lg bg-[#f97316]/10 text-[#f97316] hover:bg-[#f97316]/20 border border-[#f97316]/20 transition-all active:scale-[0.98]"
                    onClick={onAddToCart}
                >
                    Add to Cart
                </Button>

                <Button
                    className="h-12 text-sm font-bold rounded-lg bg-[#f97316] text-white hover:bg-[#f97316]/90 shadow-md shadow-orange-200 transition-all active:scale-[0.98]"
                    onClick={onBuyNow}
                >
                    Buy Now
                </Button>
            </div>

            <div className="flex items-center justify-between pt-2">
                <button
                    onClick={onWishlist}
                    className={cn(
                        "flex items-center gap-2 text-[10px] font-bold uppercase transition-colors",
                        isWishlisted ? "text-red-500" : "text-slate-400 hover:text-red-500"
                    )}
                >
                    <Heart className={cn("w-3 h-3", isWishlisted && "fill-current")} />
                    Wishlist
                </button>
                <button
                    onClick={onShare}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <Share2 className="w-3 h-3" />
                    Share
                </button>
            </div>
        </div>
    );
};

