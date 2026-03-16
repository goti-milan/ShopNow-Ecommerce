"use client";

import BrowseProducts from "@/components/shop/BrowseProducts";
import { SHOP_CATEGORIES } from "@/components/shop/constants";
import { PRODUCTS } from "@/utils/static-data";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

function ShopContent() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get("search") || "";

    return (
        <BrowseProducts
            basePath="/shop"
            products={PRODUCTS}
            categories={SHOP_CATEGORIES}
            initialSearch={initialSearch}
            title="Products"
            syncSearchToUrl
        />
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-muted">
                <div className="h-12 bg-background border-b border-border"></div>
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-10 w-64 bg-muted rounded mb-4"></div>
                        <div className="h-6 w-32 bg-muted rounded mb-8"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-80 bg-muted rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
