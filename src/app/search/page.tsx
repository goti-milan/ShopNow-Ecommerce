"use client";

import ProductCard from "@/components/common/Product";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES } from "@/utils/static-data";
import { Filter, Search, X, SlidersHorizontal, ChevronDown, Star, LayoutGrid, List } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense, useMemo, useEffect } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export const dynamic = 'force-dynamic';

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialSearch = searchParams.get("search") || "";
    const categoryFilter = searchParams.get("category") || "";

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryFilter ? [categoryFilter] : []);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState("featured");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // Sync state with URL params
    useEffect(() => {
        setSearchQuery(initialSearch);
        if (categoryFilter) {
            setSelectedCategories([categoryFilter]);
        }
    }, [initialSearch, categoryFilter]);

    // Derived data for filters
    const allBrands = useMemo(() => {
        const brands = new Set(PRODUCTS.map(p => p.brand).filter(Boolean));
        return Array.from(brands) as string[];
    }, []);

    const filteredProducts = useMemo(() => {
        let products = [...PRODUCTS];

        // Search Filter
        if (initialSearch) {
            const query = initialSearch.toLowerCase();
            products = products.filter(product =>
                product.title.toLowerCase().includes(query) ||
                product.brand?.toLowerCase().includes(query) ||
                product.category?.toLowerCase().includes(query)
            );
        }

        // Category Filter
        if (selectedCategories.length > 0) {
            products = products.filter(product =>
                product.category && selectedCategories.includes(product.category)
            );
        }

        // Brand Filter
        if (selectedBrands.length > 0) {
            products = products.filter(product =>
                product.brand && selectedBrands.includes(product.brand)
            );
        }

        // Price Filter
        products = products.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Rating Filter
        if (minRating > 0) {
            products = products.filter(product =>
                (product.rating || 0) >= minRating
            );
        }

        // Sorting
        switch (sortBy) {
            case "price-low":
                products.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                products.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case "newest":
                products.sort((a, b) => b.id - a.id); // Assuming higher ID is newer
                break;
            default:
                break;
        }

        return products;
    }, [initialSearch, selectedCategories, selectedBrands, priceRange, minRating, sortBy]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery.trim()) {
            params.set("search", searchQuery.trim());
        } else {
            params.delete("search");
        }
        router.push(`/search?${params.toString()}`);
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange([0, 100000]);
        setMinRating(0);
        setSortBy("featured");
    };

    return (
        <div className="bg-background min-h-screen">
            {/* Top Navigation / Breadcrumbs */}
            <div className="border-b bg-muted/30">
                <div className="container mx-auto px-4 py-4">
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search Results" }]} />
                </div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* PC Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold">Filters</h2>
                                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <FilterSidebar
                                selectedCategories={selectedCategories}
                                toggleCategory={toggleCategory}
                                selectedBrands={selectedBrands}
                                toggleBrand={toggleBrand}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                allBrands={allBrands}
                                minRating={minRating}
                                setMinRating={setMinRating}
                                clearFilters={clearFilters}
                            />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header Controls */}
                        <div className="flex flex-col gap-6 mb-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                                        {initialSearch ? `Search Results for "${initialSearch}"` : "Discover Products"}
                                    </h1>
                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                        Showing <span className="text-foreground font-medium">{filteredProducts.length}</span> results
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-auto">
                                    {/* Mobile Filter Trigger */}
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" className="lg:hidden gap-2 h-9 sm:h-10 text-xs sm:text-sm">
                                                <Filter className="w-4 h-4" />
                                                Filters
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                                            <SheetHeader className="mb-6">
                                                <SheetTitle className="text-left">Filters</SheetTitle>
                                            </SheetHeader>
                                            <FilterSidebar
                                                selectedCategories={selectedCategories}
                                                toggleCategory={toggleCategory}
                                                selectedBrands={selectedBrands}
                                                toggleBrand={toggleBrand}
                                                priceRange={priceRange}
                                                setPriceRange={setPriceRange}
                                                allBrands={allBrands}
                                                minRating={minRating}
                                                setMinRating={setMinRating}
                                                clearFilters={clearFilters}
                                            />
                                        </SheetContent>
                                    </Sheet>

                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="appearance-none h-10 pl-3 pr-10 rounded-lg border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer w-[160px]"
                                        >
                                            <option value="featured">Sort by: Featured</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="rating">Top Rated</option>
                                            <option value="newest">Newest Arrivals</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Active Chips */}
                            {(selectedCategories.length > 0 || selectedBrands.length > 0 || minRating > 0) && (
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="text-xs font-medium text-muted-foreground mr-1">Active:</span>
                                    {selectedCategories.map(cat => (
                                        <div key={cat} className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full border border-primary/20">
                                            {cat} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleCategory(cat)} />
                                        </div>
                                    ))}
                                    {selectedBrands.map(brand => (
                                        <div key={brand} className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full border border-primary/20">
                                            {brand} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleBrand(brand)} />
                                        </div>
                                    ))}
                                    {minRating > 0 && (
                                        <div className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full border border-primary/20">
                                            {minRating}+ Stars <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating(0)} />
                                        </div>
                                    )}
                                    <button
                                        className="text-xs text-muted-foreground hover:text-destructive underline decoration-dotted ml-2"
                                        onClick={clearFilters}
                                    >
                                        Clear All
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Product Grid / List */}
                        {filteredProducts.length > 0 ? (
                            <div className={viewMode === "grid"
                                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
                                : "flex flex-col gap-4"
                            }>
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className={viewMode === "grid" ? "flex justify-center" : "w-full"}>
                                        <ProductCard item={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-card border border-dashed rounded-2xl py-20 text-center">
                                <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="w-12 h-12 text-muted-foreground opacity-20" />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mb-2">No matches found</h2>
                                <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                                    {"We couldn't find any products matching your current filters. Try adjusting them or start a new search."}
                                </p>
                                <div className="flex items-center justify-center gap-4">
                                    <Button onClick={clearFilters}>Clear Filters</Button>
                                    <Button variant="outline" onClick={() => { setSearchQuery(""); router.push("/search") }}>
                                        Browse New Arrivals
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredProducts.length > 0 && (
                            <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
                                <p className="text-sm text-muted-foreground hidden sm:block">
                                    Showing <span className="text-foreground">1-{filteredProducts.length}</span> of <span className="text-foreground">{filteredProducts.length}</span> products
                                </p>
                                <div className="flex items-center gap-2 mx-auto sm:mx-0">
                                    <Button variant="outline" size="sm" disabled>Previous</Button>
                                    <Button size="sm" className="bg-primary text-primary-foreground min-w-[40px]">1</Button>
                                    <Button variant="outline" size="sm" className="min-w-[40px]">2</Button>
                                    <Button variant="outline" size="sm" className="min-w-[40px]">3</Button>
                                    <span className="text-muted-foreground px-1">...</span>
                                    <Button variant="outline" size="sm" className="min-w-[40px]">12</Button>
                                    <Button variant="outline" size="sm">Next</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-6 w-32 bg-muted rounded mb-8"></div>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="hidden lg:block w-64 h-[600px] bg-muted rounded"></div>
                        <div className="flex-1">
                            <div className="h-10 w-full bg-muted rounded mb-8"></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="h-80 bg-muted rounded"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}

const FilterSidebar = ({ selectedCategories, toggleCategory, selectedBrands, toggleBrand, priceRange, setPriceRange, allBrands, minRating, setMinRating, clearFilters }: any) => (
    <div className="space-y-8">
        {/* Categories */}
        <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Categories</h3>
            <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                    <div key={cat.slug} className="flex items-center gap-2 group cursor-pointer" onClick={() => toggleCategory(cat.name)}>
                        <Checkbox
                            id={`cat-${cat.slug}`}
                            checked={selectedCategories.includes(cat.name)}
                            onCheckedChange={() => toggleCategory(cat.name)}
                        />
                        <label
                            htmlFor={`cat-${cat.slug}`}
                            className="text-sm text-muted-foreground group-hover:text-primary transition-colors cursor-pointer flex-1"
                        >
                            {cat.name}
                        </label>
                        <span className="text-xs text-muted-foreground/50">({PRODUCTS.filter(p => p.category === cat.name).length})</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Brands */}
        <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Brands</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                {allBrands.map((brand: any) => (
                    <div key={brand} className="flex items-center gap-2 group cursor-pointer" onClick={() => toggleBrand(brand)}>
                        <Checkbox
                            id={`brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => toggleBrand(brand)}
                        />
                        <label
                            htmlFor={`brand-${brand}`}
                            className="text-sm text-muted-foreground group-hover:text-primary transition-colors cursor-pointer flex-1"
                        >
                            {brand}
                        </label>
                    </div>
                ))}
            </div>
        </div>

        {/* Price Range */}
        <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Price Range</h3>
            <div className="px-2">
                <Slider
                    defaultValue={[0, 100000]}
                    max={100000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                />
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 p-2 bg-muted rounded text-xs">
                        <span className="text-muted-foreground block mb-1">Min</span>
                        ₹{priceRange[0].toLocaleString()}
                    </div>
                    <div className="flex-1 p-2 bg-muted rounded text-xs">
                        <span className="text-muted-foreground block mb-1">Max</span>
                        ₹{priceRange[1].toLocaleString()}
                    </div>
                </div>
            </div>
        </div>

        {/* Rating */}
        <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Customer Rating</h3>
            <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                    <div
                        key={rating}
                        className="flex items-center gap-2 group cursor-pointer"
                        onClick={() => setMinRating(rating)}
                    >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${minRating === rating ? 'bg-primary border-primary' : 'border-input'}`}>
                            {minRating === rating && <div className="w-1.5 h-1.5 bg-background rounded-full" />}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                            {rating}+ <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                        </div>
                    </div>
                ))}
                <div
                    className="flex items-center gap-2 group cursor-pointer"
                    onClick={() => setMinRating(0)}
                >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${minRating === 0 ? 'bg-primary border-primary' : 'border-input'}`}>
                        {minRating === 0 && <div className="w-1.5 h-1.5 bg-background rounded-full" />}
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">All Ratings</span>
                </div>
            </div>
        </div>

        <Button variant="outline" className="w-full text-xs h-9" onClick={clearFilters}>
            Clear All Filters
        </Button>
    </div>
);