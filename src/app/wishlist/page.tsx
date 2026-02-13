"use client";

import ProductCard from "@/components/common/Product";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/utils/static-data";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
    // Simulating a wishlist with some items from static data
    const wishlistItems = PRODUCTS.slice(0, 3);

    if (wishlistItems.length === 0) {
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
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Wishlist ({wishlistItems.length})</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {wishlistItems.map((product) => (
                    <div key={product.id} className="relative group">
                        <ProductCard item={product} />
                        <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-destructive hover:bg-white transition-colors shadow-sm opacity-0 group-hover:opacity-100">
                            <Heart className="w-5 h-5 fill-current" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
