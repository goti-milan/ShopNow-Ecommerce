"use client";

import ProductCard from "@/components/common/Product";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import EmptyState from "@/components/common/EmptyState";

export default function WishlistPage() {
    const { items, totalItems } = useWishlist();

    if (items.length === 0) {
        return (
            <EmptyState
                icon={<Heart className="w-10 h-10 text-muted-foreground" />}
                title="Your Wishlist is Empty"
                description="Save items you love to your wishlist and review them later."
                action={(
                    <Link href="/shop">
                        <Button size="lg" className="gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            Start Shopping
                        </Button>
                    </Link>
                )}
            />
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">My Wishlist ({totalItems})</h1>
                    <p className="text-muted-foreground mt-1">Items you&apos;ve saved for later</p>
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

