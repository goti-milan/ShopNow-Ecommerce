"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, SlidersHorizontal, Star } from "lucide-react";
import ProductCard from "@/components/common/Product";
import { PRODUCTS } from "@/utils/static-data";

type CategoryNode = {
    id: string;
    name: string;
    productCategory?: string;
    children?: CategoryNode[];
};

type FlattenEntry = {
    node: CategoryNode;
    trail: string[];
};

const CATEGORY_SHELL = [
    { name: "Electronics", slug: "electronics" },
    { name: "Fashion", slug: "fashion" },
    { name: "Home & Living", slug: "home" },
    { name: "Beauty", slug: "beauty" },
    { name: "Sports", slug: "sports" },
    { name: "Books", slug: "books" },
];

const CATEGORY_TREE: Record<
    string,
    {
        title: string;
        description: string;
        heroImage: string;
        rootProductCategory: string;
        subcategories: CategoryNode[];
    }
> = {
    electronics: {
        title: "Electronics",
        description: "Explore smartphones, laptops, TVs, audio and accessories tailored for you.",
        heroImage:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
        rootProductCategory: "Electronics",
        subcategories: [
            { id: "smartphones", name: "Smartphones", productCategory: "Electronics" },
            { id: "laptops", name: "Laptops", productCategory: "Electronics" },
            { id: "smart-tvs", name: "Smart TVs", productCategory: "Electronics" },
            { id: "audio", name: "Audio", productCategory: "Electronics" },
            { id: "tablets", name: "Tablets", productCategory: "Electronics" },
            {
                id: "accessories",
                name: "Accessories",
                children: [
                    { id: "mobile-cases", name: "Mobile Cases", productCategory: "Electronics" },
                    { id: "chargers", name: "Chargers", productCategory: "Electronics" },
                    { id: "cables", name: "Cables", productCategory: "Electronics" },
                    { id: "screen-protectors", name: "Screen Protectors", productCategory: "Electronics" },
                ],
            },
        ],
    },
    fashion: {
        title: "Fashion",
        description: "Seasonal styles, everyday essentials and statement pieces.",
        heroImage:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
        rootProductCategory: "Fashion",
        subcategories: [
            { id: "mens", name: "Men's", productCategory: "Fashion" },
            { id: "womens", name: "Women's", productCategory: "Fashion" },
            { id: "footwear", name: "Footwear", productCategory: "Fashion" },
            { id: "watches", name: "Watches", productCategory: "Fashion" },
            {
                id: "accessories",
                name: "Accessories",
                children: [
                    { id: "bags", name: "Bags", productCategory: "Fashion" },
                    { id: "sunglasses", name: "Sunglasses", productCategory: "Fashion" },
                    { id: "belts", name: "Belts", productCategory: "Fashion" },
                ],
            },
        ],
    },
    home: {
        title: "Home & Living",
        description: "Refresh your space with modern decor, furniture and essentials.",
        heroImage:
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
        rootProductCategory: "Home",
        subcategories: [
            { id: "furniture", name: "Furniture", productCategory: "Home" },
            { id: "kitchen", name: "Kitchen", productCategory: "Home" },
            { id: "decor", name: "Decor", productCategory: "Home" },
            { id: "lighting", name: "Lighting", productCategory: "Home" },
        ],
    },
    beauty: {
        title: "Beauty",
        description: "Curated skincare, makeup, fragrance and wellness staples.",
        heroImage:
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
        rootProductCategory: "Beauty",
        subcategories: [
            { id: "skincare", name: "Skincare", productCategory: "Beauty" },
            { id: "makeup", name: "Makeup", productCategory: "Beauty" },
            { id: "fragrance", name: "Fragrance", productCategory: "Beauty" },
            { id: "tools", name: "Tools & Devices", productCategory: "Beauty" },
        ],
    },
    sports: {
        title: "Sports",
        description: "Performance gear and apparel built for your next personal best.",
        heroImage:
            "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=80",
        rootProductCategory: "Sports",
        subcategories: [
            { id: "fitness", name: "Fitness", productCategory: "Fitness" },
            { id: "outdoor", name: "Outdoor", productCategory: "Sports" },
            { id: "team-sports", name: "Team Sports", productCategory: "Sports" },
            { id: "accessories", name: "Accessories", productCategory: "Sports" },
        ],
    },
    books: {
        title: "Books",
        description: "Bestsellers, biographies, fiction and educational reads.",
        heroImage:
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80",
        rootProductCategory: "Media",
        subcategories: [
            { id: "fiction", name: "Fiction", productCategory: "Media" },
            { id: "nonfiction", name: "Non-fiction", productCategory: "Media" },
            { id: "kids", name: "Kids", productCategory: "Media" },
            { id: "business", name: "Business", productCategory: "Media" },
        ],
    },
};

const FILTERS = {
    brands: ["Apple", "Samsung", "Sony", "Dell", "LG"],
    price: ["Under $100", "$100 - $500", "$500 - $1000", "Above $1000"],
    rating: [5, 4, 3],
};

function flattenNodes(nodes: CategoryNode[], parentTrail: string[] = []): FlattenEntry[] {
    return nodes.flatMap((node) => {
        const currentTrail = [...parentTrail, node.id];
        const entry: FlattenEntry = { node, trail: currentTrail };
        const childEntries = node.children ? flattenNodes(node.children, currentTrail) : [];
        return [entry, ...childEntries];
    });
}

export default function CategoryClient({ slug }: { slug: string }) {
    const categoryData = CATEGORY_TREE[slug] ?? CATEGORY_TREE.electronics;
    const [activeTrail, setActiveTrail] = useState<string[]>([]);

    const allNodes = useMemo(() => flattenNodes(categoryData.subcategories), [categoryData.subcategories]);

    const trailMap = useMemo(() => {
        const map = new Map<string, string[]>();
        allNodes.forEach((entry) => map.set(entry.node.id, entry.trail));
        return map;
    }, [allNodes]);

    const activeNode = useMemo(() => {
        if (!activeTrail.length) return null;
        return allNodes.find((entry) => entry.trail.join("/") === activeTrail.join("/"))?.node ?? null;
    }, [activeTrail, allNodes]);

    const displayedNodes = activeNode?.children?.length
        ? activeNode.children
        : activeTrail.length
            ? []
            : categoryData.subcategories;

    const productCategory = activeNode?.productCategory ?? (activeTrail.length ? undefined : categoryData.rootProductCategory);

    const products = useMemo(() => {
        if (!productCategory) return [];
        return PRODUCTS.filter((product) => product.category === productCategory);
    }, [productCategory]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-100">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-foreground">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span>{categoryData.title}</span>
                    {activeTrail.length > 0 && (
                        <>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-foreground font-medium">
                                {activeNode?.name ?? ""}
                            </span>
                        </>
                    )}
                </div>

                <div className="relative overflow-hidden rounded-3xl border bg-white/70 p-6 shadow-xl backdrop-blur">
                    <div className="absolute inset-0">
                        <Image
                            src={categoryData.heroImage}
                            alt={categoryData.title}
                            fill
                            className="object-cover opacity-20"
                            priority
                        />
                    </div>
                    <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-violet-500">Shop now</p>
                            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{categoryData.title}</h1>
                            <p className="max-w-2xl text-sm text-slate-600 md:text-base">{categoryData.description}</p>
                        </div>
                        <div className="w-full max-w-md rounded-full border bg-white/80 px-4 py-2 shadow-sm">
                            <input
                                type="search"
                                placeholder="Search products, brands..."
                                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    {categoryData.subcategories.map((subcategory) => (
                        <button
                            key={subcategory.id}
                            type="button"
                            onClick={() => setActiveTrail(trailMap.get(subcategory.id) ?? [subcategory.id])}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                activeTrail[0] === subcategory.id
                                    ? "border-violet-400 bg-violet-100 text-violet-700"
                                    : "border-transparent bg-white/80 text-slate-600 hover:border-violet-200"
                            }`}
                        >
                            {subcategory.name}
                        </button>
                    ))}
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
                    <aside className="space-y-6">
                        <div className="rounded-2xl border bg-white/80 p-4 shadow-sm">
                            <h2 className="text-sm font-semibold text-slate-700">All Categories</h2>
                            <div className="mt-4 space-y-2">
                                {CATEGORY_SHELL.map((item) => (
                                    <Link
                                        key={item.slug}
                                        href={`/category/${item.slug}`}
                                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition ${
                                            item.slug === slug
                                                ? "bg-violet-100 text-violet-700"
                                                : "text-slate-600 hover:bg-slate-50"
                                        }`}
                                    >
                                        {item.name}
                                        <ChevronRight className="h-4 w-4 text-slate-400" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border bg-white/80 p-4 shadow-sm">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <SlidersHorizontal className="h-4 w-4" />
                                Filters
                            </div>
                            <div className="mt-4 space-y-4 text-sm text-slate-600">
                                <details open className="rounded-xl border bg-white/70 px-4 py-3">
                                    <summary className="cursor-pointer font-medium">Brand</summary>
                                    <div className="mt-3 space-y-2">
                                        {FILTERS.brands.map((brand) => (
                                            <label key={brand} className="flex items-center gap-2">
                                                <input type="checkbox" className="accent-violet-500" />
                                                {brand}
                                            </label>
                                        ))}
                                    </div>
                                </details>
                                <details className="rounded-xl border bg-white/70 px-4 py-3">
                                    <summary className="cursor-pointer font-medium">Price</summary>
                                    <div className="mt-3 space-y-2">
                                        {FILTERS.price.map((price) => (
                                            <label key={price} className="flex items-center gap-2">
                                                <input type="checkbox" className="accent-violet-500" />
                                                {price}
                                            </label>
                                        ))}
                                    </div>
                                </details>
                                <details className="rounded-xl border bg-white/70 px-4 py-3">
                                    <summary className="cursor-pointer font-medium">Rating</summary>
                                    <div className="mt-3 space-y-2">
                                        {FILTERS.rating.map((rating) => (
                                            <label key={rating} className="flex items-center gap-2">
                                                <input type="checkbox" className="accent-violet-500" />
                                                <span className="flex items-center gap-1">
                                                    {Array.from({ length: rating }).map((_, index) => (
                                                        <Star key={`${rating}-${index}`} className="h-3.5 w-3.5 text-amber-400" />
                                                    ))}
                                                    <span>&amp; up</span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </details>
                            </div>
                        </div>
                    </aside>

                    <section className="space-y-8">
                        {displayedNodes.length > 0 && (
                            <div className="rounded-2xl border bg-white/80 p-6 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-slate-800">Explore Categories</h2>
                                    {activeTrail.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setActiveTrail([])}
                                            className="text-sm font-medium text-violet-600 hover:text-violet-700"
                                        >
                                            View all
                                        </button>
                                    )}
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {displayedNodes.map((node) => (
                                        <button
                                            key={node.id}
                                            type="button"
                                            onClick={() => setActiveTrail(trailMap.get(node.id) ?? [node.id])}
                                            className="group rounded-2xl border bg-white/70 p-4 text-left transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">{node.name}</p>
                                                    <p className="text-xs text-slate-500">
                                                        {node.children?.length
                                                            ? `${node.children.length} sub categories`
                                                            : "Shop products"}
                                                    </p>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:text-violet-500" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="rounded-2xl border bg-white/80 p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    {activeNode?.name ? `${activeNode.name} Products` : `${categoryData.title} Products`}
                                </h2>
                                {activeTrail.length > 0 && activeNode?.children?.length && (
                                    <button
                                        type="button"
                                        onClick={() => setActiveTrail([])}
                                        className="text-sm font-medium text-violet-600 hover:text-violet-700"
                                    >
                                        Back to {categoryData.title}
                                    </button>
                                )}
                            </div>
                            {products.length === 0 ? (
                                <div className="rounded-2xl border border-dashed bg-white/60 p-8 text-center text-sm text-slate-500">
                                    Select a sub category to view products.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {products.map((product) => (
                                        <div key={product.id} className="flex justify-center">
                                            <ProductCard item={product} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
