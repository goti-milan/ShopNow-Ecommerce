"use client";

import ProductCard from "@/components/common/Product";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/utils/static-data";
import { Filter, Search, X, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense, useMemo } from "react";

export const dynamic = 'force-dynamic';

// ─── PRODUCT CATEGORIES ──────────────────────────────────────────────────────

const SHOP_CATEGORIES = [
    { id: "all", label: "All Products", count: 0 },
    { id: "electronics", label: "Electronics", count: 0 },
    { id: "fashion", label: "Fashion", count: 0 },
    { id: "home", label: "Home & Kitchen", count: 0 },
    { id: "beauty", label: "Beauty", count: 0 },
    { id: "groceries", label: "Grocery", count: 0 },
    { id: "sports", label: "Sports", count: 0 },
];

// ─── FILTER SIDEBAR COMPONENT ───────────────────────────────────────────────

function FilterSidebar({
    onFilterChange,
    filters,
}: {
    onFilterChange: (filterKey: string, value: any) => void
    filters: {
        priceRange: [number, number]
        minRating: number
        brands: string[]
        discount: number | null
        availability: string | null
    }
}) {
    const BRANDS = ["Samsung", "iPhone", "Sony", "OnePlus", "Boat", "LG", "Apple"];
    const DISCOUNT_OPTIONS = [10, 20, 30, 50];

    const handleBrandToggle = (brand: string) => {
        const newBrands = filters.brands.includes(brand)
            ? filters.brands.filter(b => b !== brand)
            : [...filters.brands, brand];
        onFilterChange("brands", newBrands);
    };

    return (
        <div className="w-full lg:w-64 space-y-6 bg-white p-5 rounded-lg border border-gray-200 h-fit sticky top-4">
            <h2 className="text-lg font-bold text-gray-900">FILTERS</h2>

            {/* Search */}
            <div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products, brands..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                </div>
            </div>

            {/* Categories */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>Categories</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                </h3>
                <div className="space-y-2 pl-2">
                    {SHOP_CATEGORIES.slice(1, 7).map(cat => (
                        <div key={cat.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={`cat-${cat.id}`}
                                className="rounded w-4 h-4 cursor-pointer"
                                onChange={(e) => onFilterChange("category", e.target.checked ? cat.id : null)}
                            />
                            <label htmlFor={`cat-${cat.id}`} className="text-sm text-gray-600 cursor-pointer">
                                {cat.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>Price Range</span>
                </h3>
                <div className="space-y-3">
                    <input
                        type="range"
                        min="0"
                        max="150000"
                        step="5000"
                        value={filters.priceRange[1]}
                        onChange={(e) => onFilterChange("priceRange", [filters.priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">₹{filters.priceRange[0].toLocaleString()}</span>
                        <span className="text-gray-600">₹{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Brand */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>Brand</span>
                    <div className="ml-auto w-8 h-5 bg-gray-300 rounded-full"></div>
                </h3>
                <div className="space-y-2 pl-2">
                    {BRANDS.map(brand => (
                        <div key={brand} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={`brand-${brand}`}
                                checked={filters.brands.includes(brand)}
                                onChange={() => handleBrandToggle(brand)}
                                className="rounded w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor={`brand-${brand}`} className="text-sm text-gray-600 cursor-pointer">
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rating */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>Rating</span>
                    <div className="ml-auto w-8 h-5 bg-gray-300 rounded-full"></div>
                </h3>
                <div className="space-y-2">
                    {[4, 3].map(rating => (
                        <div key={rating} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={`rating-${rating}`}
                                checked={filters.minRating === rating}
                                onChange={(e) => onFilterChange("minRating", e.target.checked ? rating : 0)}
                                className="rounded w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor={`rating-${rating}`} className="text-sm text-gray-600 cursor-pointer">
                                {rating}+ Rating
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Discount */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Discount</h3>
                <div className="space-y-2">
                    {DISCOUNT_OPTIONS.map(discount => (
                        <div key={discount} className="flex items-center gap-2">
                            <input
                                type="radio"
                                id={`discount-${discount}`}
                                name="discount"
                                checked={filters.discount === discount}
                                onChange={() => onFilterChange("discount", filters.discount === discount ? null : discount)}
                                className="w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor={`discount-${discount}`} className="text-sm text-gray-600 cursor-pointer">
                                {discount}% or more
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Availability */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Availability</h3>
                <div className="space-y-2">
                    {["In Stock", "Out of Stock"].map(option => (
                        <div key={option} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id={`avail-${option}`}
                                checked={filters.availability === option}
                                onChange={(e) => onFilterChange("availability", e.target.checked ? option : null)}
                                className="rounded w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor={`avail-${option}`} className="text-sm text-gray-600 cursor-pointer">
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Apply Filters Button */}
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition-all duration-200">
                Apply Filters
            </Button>
        </div>
    );
}

// ─── SHOP CONTENT ───────────────────────────────────────────────────────────

function ShopContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialSearch = searchParams.get("search") || "";

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("featured");
    const [filters, setFilters] = useState({
        priceRange: [0, 150000] as [number, number],
        minRating: 0,
        brands: [] as string[],
        discount: null as number | null,
        availability: null as string | null,
    });

    const filteredProducts = useMemo(() => {
        let products = [...PRODUCTS];

        // Filter by search query
        if (initialSearch) {
            const query = initialSearch.toLowerCase();
            products = products.filter(product =>
                product.title.toLowerCase().includes(query)
            );
        }

        // Filter by category
        if (selectedCategory !== "all") {
            products = products.filter(p => {
                const category = p.category?.toLowerCase() || "";
                return category.includes(selectedCategory);
            });
        }

        // Filter by price range
        products = products.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

        // Filter by rating
        if (filters.minRating > 0) {
            products = products.filter(p => (p.rating || 0) >= filters.minRating);
        }

        // Filter by discount
        if (filters.discount !== null) {
            products = products.filter(p => (p?.discount || 0) >= (filters.discount || 0));
        }

        // Sort
        if (sortBy === "price-low") products.sort((a, b) => a.price - b.price);
        if (sortBy === "price-high") products.sort((a, b) => b.price - a.price);
        if (sortBy === "newest") products.reverse();

        return products;
    }, [initialSearch, selectedCategory, sortBy, filters]);

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

    const handleFilterChange = (filterKey: string, value: any) => {
        if (filterKey === "category") {
            setSelectedCategory(value || "all");
        } else {
            setFilters(prev => ({
                ...prev,
                [filterKey]: value,
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Category Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
                        {SHOP_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${selectedCategory === cat.id
                                        ? "bg-primary text-white shadow-md"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-6">
                    {/* Sidebar - Hidden on mobile, visible on lg+ */}
                    <div className="hidden lg:block">
                        <FilterSidebar onFilterChange={handleFilterChange} filters={filters} />
                    </div>

                    {/* Main Area */}
                    <div className="flex-1">
                        {/* Header & Controls */}
                        <div className="mb-8">
                            {/* Title */}
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {initialSearch ? `Search Results for "${initialSearch}"` : "Products"}
                                </h1>
                                <p className="text-gray-600 text-sm mt-1">
                                    Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
                                </p>
                            </div>

                            {/* Search & Sort */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Search Bar */}
                                <form onSubmit={handleSearch} className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-gray-50"
                                        />
                                        {searchQuery && (
                                            <button
                                                type="button"
                                                onClick={clearSearch}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </form>

                                {/* Sort Dropdown */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                >
                                    <option value="featured">Sort: Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="newest">Newest Arrivals</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {filteredProducts.map((product, index) => (
                                    <div key={`${product.id}-${index}`} className="flex justify-center">
                                        <ProductCard item={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-10 h-10 text-gray-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
                                <p className="text-gray-600 mb-6">
                                    Try adjusting your filters or search terms
                                </p>
                                <Button onClick={clearSearch} className="bg-primary hover:bg-primary/90">Clear Filters</Button>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredProducts.length > 0 && (
                            <div className="mt-12 flex justify-center gap-2">
                                <Button variant="outline" disabled>Previous</Button>
                                <Button className="bg-primary text-white">1</Button>
                                <Button variant="outline">2</Button>
                                <Button variant="outline">3</Button>
                                <Button variant="outline">Next</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50">
                <div className="h-12 bg-white border-b border-gray-200"></div>
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-10 w-64 bg-gray-200 rounded mb-4"></div>
                        <div className="h-6 w-32 bg-gray-200 rounded mb-8"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
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

