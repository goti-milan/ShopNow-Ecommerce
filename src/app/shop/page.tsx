"use client";

import ProductCard from "@/components/common/Product";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/utils/static-data";
import { Filter, Search, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense, useMemo } from "react";

export const dynamic = 'force-dynamic';

function ShopContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialSearch = searchParams.get("search") || "";

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const filteredProducts = useMemo(() => {
        let products = [...PRODUCTS];

        // Filter by search query
        if (initialSearch) {
            const query = initialSearch.toLowerCase();
            products = products.filter(product =>
                product.title.toLowerCase().includes(query)
            );
        }

        return products;
    }, [initialSearch]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push("/shop");
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        router.push("/shop");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {initialSearch ? `Search Results for "${initialSearch}"` : "Shop All Products"}
                    </h1>
                    <p className="text-muted-foreground">
                        {filteredProducts.length} products found
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>
                    <select className="h-10 px-3 rounded-md border border-input bg-background/50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <option>Sort by: Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest Arrivals</option>
                    </select>
                </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
                <div className="relative max-w-xl">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 h-10 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </form>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredProducts.map((product, index) => (
                        <div key={`${product.id}-${index}`} className="flex justify-center">
                            <ProductCard item={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">No products found</h2>
                    <p className="text-muted-foreground mb-6">
                        Try adjusting your search or browse our categories
                    </p>
                    <Button onClick={clearSearch}>Clear Search</Button>
                </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
                <div className="mt-12 flex justify-center gap-2">
                    <Button variant="outline" disabled>Previous</Button>
                    <Button className="bg-primary text-primary-foreground">1</Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <Button variant="outline">Next</Button>
                </div>
            )}
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-10 w-64 bg-muted rounded mb-4"></div>
                    <div className="h-6 w-32 bg-muted rounded mb-8"></div>
                    <div className="h-10 w-full max-w-xl bg-muted rounded mb-12"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="h-80 bg-muted rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}

