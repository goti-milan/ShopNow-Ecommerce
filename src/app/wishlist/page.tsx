"use client";

import ProductCard from "@/components/common/Product";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
    const { items, removeItem, totalItems } = useWishlist();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
                <p className="text-muted-foreground mb-8">
                    Save items you love to your wishlist and review them later.
                </p>
                <Link href="/shop">
                    <Button size="lg" className="gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">My Wishlist ({totalItems})</h1>
                    <p className="text-muted-foreground mt-1">Items you've saved for later</p>
                </div>
                <Link href="/shop">
                    <Button variant="outline">Continue Shopping</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {items.map((product) => (
                    <div key={product.id} className="relative group">
                        <ProductCard item={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

