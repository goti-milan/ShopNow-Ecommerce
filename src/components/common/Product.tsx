"use client";

import { Product } from "@/utils/types";
import Image from "next/image";
import { Heart, ShoppingCart, Loader2, Share2, Check } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const ProductCard = ({ item, showActions = true, className }: { item: Product; showActions?: boolean; className?: string }) => {
    const { id, badgeText, title, price, originalPrice, discountPercent, image } = item;
    const { addItem } = useCart();
    const { isInWishlist, toggleItem } = useWishlist();
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [didCopyShareLink, setDidCopyShareLink] = useState(false);
    const router = useRouter();

    const inWishlist = isInWishlist(id);

    const copyText = async (text: string) => {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return;
        }

        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAddingToCart(true);
        addItem(item);
        setTimeout(() => setIsAddingToCart(false), 500);
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(item);
        router.push("/cart");
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(item);
    };

    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const url = `${window.location.origin}/product/${id}`;

        try {
            if (navigator.share) {
                await navigator.share({ title, url });
                return;
            }
            await copyText(url);
            setDidCopyShareLink(true);
            window.setTimeout(() => setDidCopyShareLink(false), 1200);
        } catch {
            // no-op: sharing is best-effort
        }
    };

    return (
        <Link
            href={`/product/${id}`}
            className={cn(
                "group w-full rounded-xl bg-card transition-all duration-300 ease-out hover:shadow-hover overflow-hidden border border-transparent hover:border-border block",
                className
            )}
        >
            {/* Image Wrapper */}
            <div className="relative flex h-[240px] items-center justify-center bg-transparent overflow-hidden">
                {badgeText && (
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground shadow-sm">
                        {badgeText}
                    </span>
                )}

                {/* Top-right actions */}
                <div className="absolute right-2 top-2 z-10 flex flex-col gap-2">
                    <button
                        className={`rounded-full bg-background/80 p-1.5 backdrop-blur-sm transition-colors shadow-sm ${inWishlist ? "text-primary hover:text-primary-dark" : "text-muted-foreground hover:text-primary hover:bg-background"}`}
                        onClick={handleWishlist}
                        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                        title={inWishlist ? "Wishlisted" : "Add to wishlist"}
                    >
                        <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
                    </button>
                    <button
                        className="rounded-full bg-background/80 p-1.5 backdrop-blur-sm transition-colors shadow-sm text-muted-foreground hover:text-primary hover:bg-background"
                        onClick={handleShare}
                        aria-label="Share product"
                        title={didCopyShareLink ? "Link copied" : "Share"}
                    >
                        {didCopyShareLink ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                    </button>
                </div>

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
                            <p className="text-xs font-bold text-primary bg-accent px-1.5 py-0.5 rounded-sm">
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
                            onClick={handleAddToCart}
                            disabled={isAddingToCart}
                        >
                            {isAddingToCart ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                    Added!
                                </>
                            ) : (
                                <>
                                    <ShoppingCart className="w-4 h-4 mr-1" />
                                    Add to Cart
                                </>
                            )}
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            className="w-full text-xs font-semibold rounded-lg h-9 shadow-sm"
                            onClick={handleBuyNow}
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
