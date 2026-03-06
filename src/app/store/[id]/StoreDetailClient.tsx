"use client";

import Image from "next/image";
import { PRODUCTS } from "@/utils/static-data";
import {
    Star,
    MapPin,
    Phone,
    MessageCircle,
    Heart,
    Navigation,
    Search,
    ChevronDown,
    CheckCircle2,
    Clock3,
    Mail,
    UserCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const shops = [
    {
        id: 1,
        name: "Tech Haven",
        category: "Electronics",
        rating: 4.8,
        reviewCount: 5200,
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
        heroImage:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description:
            "Tech Haven is a trusted electronics store offering a wide range of latest gadgets and electronic products. Our team helps you pick the right device at the best value.",
        address: "123 Tech Square, Silicon Valley",
        phone: "+1 234 567 890",
        email: "hello@techhaven.com",
        hours: [
            "Mon - Sat: 10:00 AM - 9:00 PM",
            "Sunday: 11:00 AM - 7:00 PM",
        ],
    },
    {
        id: 2,
        name: "Style Studio",
        category: "Fashion",
        rating: 4.5,
        reviewCount: 3100,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
        heroImage:
            "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description:
            "Style Studio brings modern fashion and accessories with premium quality and clean fits for daily wear.",
        address: "45 Fashion Avenue, New York",
        phone: "+1 987 654 321",
        email: "contact@stylestudio.com",
        hours: ["Mon - Sat: 11:00 AM - 8:00 PM", "Sunday: Closed"],
    },
    {
        id: 3,
        name: "Green Living",
        category: "Home & Garden",
        rating: 4.9,
        reviewCount: 1900,
        image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
        heroImage:
            "https://images.unsplash.com/photo-1616047006789-b7af5af4363f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description:
            "Green Living offers sustainable home and garden products designed for comfort, utility, and eco-friendly lifestyles.",
        address: "78 Eco Drive, Portland",
        phone: "+1 555 123 456",
        email: "support@greenliving.com",
        hours: ["Mon - Fri: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 5:00 PM"],
    },
    {
        id: 4,
        name: "Sports Gear Pro",
        category: "Sports",
        rating: 4.6,
        reviewCount: 2800,
        image: "https://images.unsplash.com/photo-1556817411-31ae08ee1b75?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
        heroImage:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description:
            "Sports Gear Pro delivers high-performance equipment for athletes and fitness enthusiasts at every level.",
        address: "123 Victory Lane, Chicago",
        phone: "+1 777 888 999",
        email: "info@sportsgearpro.com",
        hours: ["Daily: 8:00 AM - 10:00 PM"],
    },
];

const distanceFilters = ["3 km", "5 km", "10 km", "15 km"];
const tabs = ["Overview", "Products", "Services", "Reviews", "Q&A"];
const topCategories = [
    { name: "Smartphones", value: "27%" },
    { name: "Laptops", value: "25%" },
    { name: "Tablets", value: "21%" },
    { name: "Smartwatches", value: "15%" },
    { name: "Headphones", value: "7%" },
    { name: "Home Appliances", value: "4%" },
    { name: "Accessories", value: "3%" },
];

function formatCompactNumber(value: number) {
    if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k`;
    }
    return `${value}`;
}

export default function StoreDetailClient({ storeId }: { storeId: string }) {
    const store = shops.find((s) => s.id === Number.parseInt(storeId, 10)) ?? shops[0];

    const storeProducts =
        store.category === "Electronics"
            ? PRODUCTS.filter((p) => p.category === "Electronics").slice(0, 4)
            : PRODUCTS.slice(0, 4);

    return (
        <div className="min-h-screen bg-slate-50 pb-10">
            <div className="container mx-auto space-y-5 px-4 py-6 md:px-6">
                <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <span>Home</span>
                            <span>•</span>
                            <span>Stores</span>
                            <span>•</span>
                            <span className="font-medium text-slate-700">{store.name}</span>
                        </div>

                        <div className="inline-flex rounded-xl border border-slate-200 p-1">
                            {distanceFilters.map((item, index) => (
                                <button
                                    key={item}
                                    type="button"
                                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                                        index === 0
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "text-slate-500 hover:bg-slate-100"
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
                        <div className="rounded-2xl border border-slate-200 p-4">
                            <div className="flex flex-col gap-4 md:flex-row md:items-start">
                                <div className="flex-1 space-y-3">
                                    <div>
                                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{store.name}</h1>
                                        <p className="text-base text-slate-500">{store.category}</p>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <div className="flex items-center text-amber-500">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${
                                                        i < Math.round(store.rating) ? "fill-amber-400" : "fill-none"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span>{formatCompactNumber(store.reviewCount)} reviews</span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 text-sm">
                                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-semibold text-emerald-700">Open</span>
                                        <span className="text-slate-600">10:00 AM - 9:00 PM</span>
                                        <span className="text-slate-400">•</span>
                                        <span className="text-slate-600">2.8 km away</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <Button variant="outline" className="rounded-xl border-emerald-200 text-emerald-700">
                                            <Navigation className="h-4 w-4" /> Direction
                                        </Button>
                                        <Button variant="outline" className="rounded-xl">
                                            <Phone className="h-4 w-4" /> Call
                                        </Button>
                                        <Button variant="outline" className="rounded-xl">
                                            <MessageCircle className="h-4 w-4" /> Chat
                                        </Button>
                                        <Button variant="outline" className="rounded-xl">
                                            <Heart className="h-4 w-4" /> Follow
                                        </Button>
                                        <Button className="rounded-xl bg-amber-400 text-slate-900 hover:bg-amber-500">
                                            <MessageCircle className="h-4 w-4" /> Chat Now
                                        </Button>
                                    </div>
                                </div>

                                <div className="relative h-44 w-full overflow-hidden rounded-xl md:w-64">
                                    <Image src={store.heroImage} alt={store.name} fill className="object-cover" priority />
                                </div>
                            </div>
                        </div>

                        <aside className="rounded-2xl border border-slate-200 p-4">
                            <h2 className="mb-4 text-2xl font-bold text-slate-900">Filter & Search</h2>
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-700">Search Store</label>
                                <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
                                    <Search className="h-4 w-4 text-slate-400" />
                                    <span className="flex-1 text-sm text-slate-500">Search by store...</span>
                                    <ChevronDown className="h-4 w-4 text-slate-400" />
                                </div>

                                <label className="text-sm font-semibold text-slate-700">Category</label>
                                <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
                                    <span>All Categories</span>
                                    <ChevronDown className="h-4 w-4 text-slate-400" />
                                </div>

                                <label className="text-sm font-semibold text-slate-700">Price Range</label>
                                <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
                                    <span>$0</span>
                                    <span>$0 - $10,000+</span>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-sm font-semibold text-slate-700">Rating</span>
                                    <span className="text-sm text-slate-600">★★★★★ 4.8</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-slate-700">Open Now</span>
                                    <span className="inline-flex h-6 w-11 items-center rounded-full bg-emerald-500 p-1">
                                        <span className="h-4 w-4 rounded-full bg-white" />
                                    </span>
                                </div>

                                <Button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700">Apply Filters</Button>
                            </div>
                        </aside>
                    </div>
                </section>

                <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
                    <main className="space-y-5">
                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="mb-4 flex gap-3 overflow-x-auto border-b border-slate-100 pb-2">
                                {tabs.map((tab, idx) => (
                                    <button
                                        type="button"
                                        key={tab}
                                        className={`pb-2 text-sm font-semibold whitespace-nowrap ${
                                            idx === 0
                                                ? "border-b-2 border-emerald-500 text-emerald-600"
                                                : "text-slate-500 hover:text-slate-700"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="grid gap-3 md:grid-cols-[1.15fr_1fr]">
                                <div className="relative h-64 overflow-hidden rounded-xl">
                                    <Image src={store.heroImage} alt={`${store.name} interior`} fill className="object-cover" />
                                    <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-slate-700">
                                        2.8 km
                                    </span>
                                </div>
                                <div className="rounded-xl border border-slate-200 p-4">
                                    <div className="relative mb-3 h-28 overflow-hidden rounded-lg">
                                        <Image src={store.image} alt={`${store.name} map`} fill className="object-cover" />
                                    </div>
                                    <div className="space-y-2 text-sm text-slate-600">
                                        <p className="flex items-center gap-2 text-base font-semibold text-slate-900">
                                            <MapPin className="h-4 w-4 text-emerald-600" /> 2.8 km away
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-emerald-600" /> {store.phone}
                                        </p>
                                        <p className="line-clamp-2">{store.address}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <Button variant="outline" className="rounded-xl">
                                    <Navigation className="h-4 w-4" /> Direction
                                </Button>
                                <Button variant="outline" className="rounded-xl">
                                    <Phone className="h-4 w-4" /> Call
                                </Button>
                                <Button variant="outline" className="rounded-xl">
                                    <MessageCircle className="h-4 w-4" /> Chat
                                </Button>
                                <Button variant="outline" className="rounded-xl">
                                    <Heart className="h-4 w-4" /> Follow
                                </Button>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="mb-4 flex gap-3 overflow-x-auto border-b border-slate-100 pb-2">
                                {tabs.map((tab, idx) => (
                                    <button
                                        type="button"
                                        key={`about-${tab}`}
                                        className={`pb-2 text-sm font-semibold whitespace-nowrap ${
                                            idx === 0
                                                ? "border-b-2 border-emerald-500 text-emerald-600"
                                                : "text-slate-500 hover:text-slate-700"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="grid gap-4 md:grid-cols-[1fr_280px]">
                                <div>
                                    <h3 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">About {store.name}</h3>
                                    <p className="text-sm leading-7 text-slate-600">{store.description}</p>
                                    <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                                        <p className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Authorized Dealer
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 10+ Years in Business
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Free Estimates
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Same-Day Delivery
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Secure Payment
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Certified Technicians
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-slate-200 p-4">
                                    <h4 className="mb-3 text-xl font-bold text-slate-900">Top Categories</h4>
                                    <ul className="space-y-2 text-sm">
                                        {topCategories.slice(0, 6).map((item) => (
                                            <li key={item.name} className="flex items-center justify-between text-slate-700">
                                                <span>{item.name}</span>
                                                <span className="font-semibold text-slate-500">{item.value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-slate-900">Popular Products</h3>
                                <button type="button" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                                    View all
                                </button>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {storeProducts.map((product) => (
                                    <article key={product.id} className="flex gap-3 rounded-xl border border-slate-200 p-3">
                                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                            <Image src={product.image} alt={product.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1">
                                            <p className="line-clamp-2 text-sm font-semibold text-slate-800">{product.title}</p>
                                            <p className="text-xs text-slate-500">
                                                <Star className="mr-1 inline h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                                                {product.rating} ({product.reviews.toLocaleString()})
                                            </p>
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-2xl font-bold text-slate-900">${product.price.toLocaleString()}</p>
                                                <Button variant="outline" size="sm" className="rounded-lg">
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    </main>

                    <aside className="space-y-4">
                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <h4 className="mb-3 text-2xl font-bold text-slate-900">Top Categories</h4>
                            <ul className="space-y-2">
                                {topCategories.map((item) => (
                                    <li key={`sidebar-${item.name}`} className="flex items-center justify-between text-sm text-slate-700">
                                        <span>{item.name}</span>
                                        <span className="font-semibold text-slate-500">{item.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <h4 className="mb-3 text-2xl font-bold text-slate-900">Store Timings</h4>
                            <div className="space-y-2 text-sm">
                                {store.hours.map((timing) => (
                                    <p key={timing} className="flex items-center justify-between rounded-lg border border-slate-100 p-2 text-slate-700">
                                        <span>{timing.split(":")[0]}</span>
                                        <span className="font-medium text-slate-500">{timing.split(":").slice(1).join(":")}</span>
                                    </p>
                                ))}
                                <p className="flex items-center gap-2 pt-2 text-slate-500">
                                    <Clock3 className="h-4 w-4" /> Hours may vary on holidays.
                                </p>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-4">
                            <h4 className="mb-3 text-2xl font-bold text-slate-900">Contact Us</h4>
                            <div className="mb-3 flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                                <UserCircle2 className="h-10 w-10 text-slate-400" />
                                <div>
                                    <p className="font-semibold text-slate-900">Rohan Mehta</p>
                                    <p className="text-xs text-slate-500">Store Manager</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm text-slate-700">
                                <p className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-emerald-600" /> {store.phone}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-emerald-600" /> {store.email}
                                </p>
                            </div>
                            <Button className="mt-4 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700">
                                <Phone className="h-4 w-4" /> Call Now
                            </Button>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
}
