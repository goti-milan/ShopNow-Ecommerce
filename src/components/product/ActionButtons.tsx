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
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button
                    className="flex-1 h-14 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all duration-300 active:scale-[0.98] px-8"
                    onClick={onAddToCart}
                >
                    <ShoppingCart className="mr-3 h-5 w-5" />
                    Add to Cart
                </Button>

                <div className="flex gap-4 sm:flex-initial">
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            "h-14 w-14 rounded-2xl border-2 transition-all duration-300 flex-1 sm:flex-none",
                            isWishlisted
                                ? "border-red-500 bg-red-50 text-red-500 hover:bg-red-100 shadow-sm"
                                : "border-slate-200 hover:border-red-500 hover:bg-red-50 hover:text-red-500"
                        )}
                        onClick={onWishlist}
                    >
                        <Heart className={cn("h-6 w-6 transition-transform duration-300", isWishlisted && "fill-current scale-110")} />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-14 w-14 rounded-2xl border-2 border-slate-200 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300 flex-1 sm:flex-none"
                        onClick={onShare}
                    >
                        <Share2 className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            <Button
                variant="secondary"
                className="w-full h-14 text-lg font-bold rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all duration-300 active:scale-[0.98]"
                onClick={onBuyNow}
            >
                Buy Now
            </Button>
        </div>
    );
};
