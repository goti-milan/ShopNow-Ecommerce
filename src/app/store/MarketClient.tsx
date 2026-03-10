"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BadgePercent,
  Bike,
  Filter,
  ChevronDown,
  ChevronRight,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type StoreItem = {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: string;
  distance: string;
  openHours: string;
  isOpen: boolean;
  image: string;
};

const categories = [
  { label: "Restaurants", icon: Store },
  { label: "Grocery", icon: Bike },
  { label: "Electronics", icon: BadgePercent },
  { label: "Fashion", icon: ShieldCheck },
  { label: "Pharmacy", icon: MapPin },
  { label: "Bakery", icon: Star },
  { label: "More", icon: ChevronRight },
];

const exploreStores = [
  {
    id: 1,
    name: "Restaurants",
    stores: 25,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Grocery",
    stores: 25,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Electronics",
    stores: 25,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Fashion & Apparel",
    stores: 25,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
];

const allStores: StoreItem[] = [
  {
    id: 1,
    name: "Cafe Delight",
    category: "Restaurant",
    rating: 4.6,
    reviews: "4.5k",
    distance: "2.5 km",
    openHours: "8:00 AM - 11:00 PM",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Fresh Mart",
    category: "Grocery",
    rating: 4.6,
    reviews: "6.24k",
    distance: "2.1 km",
    openHours: "7:00 AM - 10:00 PM",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Tech World",
    category: "Electronics",
    rating: 4.6,
    reviews: "5.1k",
    distance: "3.0 km",
    openHours: "10:00 AM - 9:00 PM",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Spice Garden",
    category: "Restaurant",
    rating: 4.8,
    reviews: "7.9k",
    distance: "1.8 km",
    openHours: "9:00 AM - 11:00 PM",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Style Hub",
    category: "Fashion",
    rating: 4.5,
    reviews: "3.2k",
    distance: "4.3 km",
    openHours: "10:30 AM - 9:30 PM",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "MediPlus",
    category: "Pharmacy",
    rating: 4.7,
    reviews: "2.3k",
    distance: "1.2 km",
    openHours: "24 hours",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Royal Bakery",
    category: "Bakery",
    rating: 4.4,
    reviews: "1.6k",
    distance: "2.1 km",
    openHours: "7:00 AM - 11:00 PM",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Urban Pharmacy",
    category: "Pharmacy",
    rating: 4.3,
    reviews: "2.1k",
    distance: "0.5 km",
    openHours: "8:00 AM - 11:00 PM",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    name: "Mega Electronics",
    category: "Electronics",
    rating: 4.1,
    reviews: "1.9k",
    distance: "5.2 km",
    openHours: "11:00 AM - 9:00 PM",
    isOpen: false,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    name: "Fit & Fresh",
    category: "Grocery",
    rating: 4.2,
    reviews: "2.8k",
    distance: "2.0 km",
    openHours: "6:00 AM - 9:00 PM",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 11,
    name: "Urban Brunch",
    category: "Restaurant",
    rating: 4.4,
    reviews: "5.4k",
    distance: "3.9 km",
    openHours: "9:00 AM - 11:00 PM",
    isOpen: true,
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 12,
    name: "Daily Grocery",
    category: "Grocery",
    rating: 4.0,
    reviews: "1.1k",
    distance: "6.0 km",
    openHours: "7:00 AM - 10:00 PM",
    isOpen: false,
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  },
];

const topRated = [
  { id: 4, name: "Spice Garden", category: "Restaurant", rating: 4.8, distance: "11 km" },
  { id: 5, name: "Style Hub", category: "Fashion", rating: 4.6, distance: "8 km" },
  { id: 6, name: "MediPlus", category: "Pharmacy", rating: 4.7, distance: "4 km" },
];

const storeCategories = ["All", "Restaurant", "Grocery", "Electronics", "Fashion", "Pharmacy", "Bakery"];

function parseDistance(distance: string) {
  const value = Number.parseFloat(distance.replace("km", "").trim());
  return Number.isNaN(value) ? Number.MAX_VALUE : value;
}

function StoreListCard({ store }: { store: StoreItem }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="relative h-36">
        <Image src={store.image} alt={store.name} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{store.name}</h3>
          <p className="text-sm text-slate-500">{store.category}</p>
        </div>

        <div className="text-sm text-slate-700">
          <span className="font-bold text-amber-600">{store.rating}</span>
          <span className="ml-1 text-slate-500">({store.reviews})</span>
        </div>

        <p className="text-sm text-slate-700">
          <span className={`font-semibold ${store.isOpen ? "text-emerald-600" : "text-rose-600"}`}>
            {store.isOpen ? "Open" : "Closed"}
          </span>{" "}
          • {store.openHours}
        </p>

        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" size="sm">
            <Navigation className="h-4 w-4" /> Direction
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4" /> Call
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="h-4 w-4" /> Chat
          </Button>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-sm font-semibold text-slate-600">{store.distance}</span>
          <Link href={`/store/${store.id}`}>
            <Button size="sm" className="rounded-lg bg-emerald-600 hover:bg-emerald-700">
              Visit Store
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function NearbyStoreRow({ store }: { store: StoreItem }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex gap-3">
        <div className="relative h-28 w-36 shrink-0 overflow-hidden rounded-lg">
          <Image src={store.image} alt={store.name} fill className="object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <div>
              <h3 className="truncate text-2xl font-bold text-slate-900">{store.name}</h3>
              <p className="text-sm text-slate-500">{store.category}</p>
            </div>
            <span className="text-xl font-semibold text-slate-700">{store.distance}</span>
          </div>

          <div className="mb-2 flex items-center gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
              <Star className="h-4 w-4 fill-amber-400" /> {store.rating}
            </span>
            <span>({store.reviews})</span>
          </div>

          <p className="text-sm text-slate-700">
            <span className={`font-semibold ${store.isOpen ? "text-emerald-600" : "text-rose-600"}`}>
              {store.isOpen ? "Open" : "Closed"}
            </span>{" "}
            • {store.openHours}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        <Button size="sm" className="rounded-lg bg-emerald-600 hover:bg-emerald-700">
          <Navigation className="h-4 w-4" /> Direction
        </Button>
        <Button variant="outline" size="sm">
          <Phone className="h-4 w-4" /> Call
        </Button>
        <Button variant="outline" size="sm">
          <MessageCircle className="h-4 w-4" /> Chat
        </Button>
        <Link href={`/store/${store.id}`}>
          <Button variant="outline" size="sm" className="w-full">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function MarketClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showAllStores = searchParams.get("view") === "all";
  const sortFromQuery = searchParams.get("sort");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [openNow, setOpenNow] = useState(false);
  const [maxDistance, setMaxDistance] = useState(3);
  const [sortBy, setSortBy] = useState(
    sortFromQuery === "rating" || sortFromQuery === "distance" || sortFromQuery === "name"
      ? sortFromQuery
      : "relevance"
  );

  const filteredStores = useMemo(() => {
    let items = [...allStores];

    if (search.trim()) {
      const needle = search.toLowerCase();
      items = items.filter(
        (store) =>
          store.name.toLowerCase().includes(needle) ||
          store.category.toLowerCase().includes(needle)
      );
    }

    if (selectedCategory !== "All") {
      items = items.filter((store) => store.category === selectedCategory);
    }

    if (minRating > 0) {
      items = items.filter((store) => store.rating >= minRating);
    }

    if (openNow) {
      items = items.filter((store) => store.isOpen);
    }

    items = items.filter((store) => parseDistance(store.distance) <= maxDistance);

    if (sortBy === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "distance") {
      items.sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance));
    } else if (sortBy === "name") {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }, [search, selectedCategory, minRating, openNow, maxDistance, sortBy]);

  if (showAllStores) {
    return (
      <div className="min-h-screen bg-slate-50 pb-10">
        <div className="container mx-auto space-y-5 px-4 py-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="space-y-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">

                <div>
                  <button
                    type="button"
                    className="mb-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                    onClick={() => router.push("/store")}
                  >
                    ← Back to store home
                  </button>
                  <h1 className="text-4xl font-bold text-slate-900">Nearby Stores</h1>
                  <p className="mt-1 text-slate-600">Find stores directly from map and distance filters</p>
                </div>

                <div className="relative w-full lg:w-[360px] ">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search stores..."
                    className="h-11 bg-white pl-10"
                  />
                </div>
              </div>

            </div>
          </section>

          <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="space-y-4">
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">Filter Stores</h2>
                  <span className="text-xs font-semibold text-slate-500">{filteredStores.length} results</span>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700">Distance</label>
                  <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                    <div className="relative h-[320px] overflow-hidden rounded-xl bg-slate-100 md:h-[420px]">
                      <iframe
                        title="Nearby stores map"
                        className="h-full w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=77.18%2C28.54%2C77.32%2C28.66&layer=mapnik&marker=28.60%2C77.25`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 3, 5, 10].map((distance) => (
                      <button
                        key={distance}
                        type="button"
                        onClick={() => setMaxDistance(distance)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${maxDistance === distance
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-slate-200 bg-white text-slate-700"
                          }`}
                      >
                        {distance} km
                      </button>
                    ))}
                  </div>

                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {storeCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${selectedCategory === category
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 text-slate-600"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  <label className="text-sm font-semibold text-slate-700">Minimum Rating</label>
                  <select
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                  >
                    <option value={0}>All Ratings</option>
                    <option value={3.5}>3.5+</option>
                    <option value={4}>4.0+</option>
                    <option value={4.5}>4.5+</option>
                  </select>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-700">Open now</span>
                    <button
                      type="button"
                      onClick={() => setOpenNow((prev) => !prev)}
                      className={`inline-flex h-9 shrink-0 items-center rounded-full px-3 text-xs font-semibold ${openNow ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                        }`}
                    >
                      {openNow ? "Open now" : "All hours"}
                    </button>
                  </div>

                  <label className="text-sm font-semibold text-slate-700">Sort by</label>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="rating">Top rated</option>
                    <option value="distance">Nearest</option>
                    <option value="name">Name A-Z</option>
                  </select>

                  <p className="text-xs text-slate-500">
                    Showing {filteredStores.length} stores within {maxDistance} km
                  </p>
                </div>
              </section>
            </aside>

            <section className="space-y-4">

              <div className="grid grid-cols-3 gap-4">
                {filteredStores.map((store) => (
                  <NearbyStoreRow key={store.id} store={store} />
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <div className="container mx-auto space-y-5 px-4 py-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className=" flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Store Listings</h1>
              <p className="mt-1 text-lg text-slate-600">Find best stores near you</p>
            </div>
            <div className="relative w-full lg:w-[360px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input placeholder="Search stores, products..." className="h-11 bg-white pl-10" />
            </div>
          </div>
        </section>

         <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-4 lg:grid-cols-7">
            {categories.map((item) => (
              <button
                key={item.label}
                type="button"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-white"
              >
                <item.icon className="h-4 w-4 text-emerald-600" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="space-y-4 lg:w-72">
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-xl font-bold text-slate-900">Filter & Search</h2>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input className="pl-10" placeholder="Search by store..." />
                </div>

                <label className="text-sm font-semibold text-slate-700">Category</label>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-left text-sm text-slate-600"
                >
                  <span>All categories</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <label className="text-sm font-semibold text-slate-700">Price Range</label>
                <input type="range" min={0} max={100} defaultValue={60} className="w-full accent-emerald-600" />
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Rs0</span>
                  <span>Rs0 - Rs10,000+</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-slate-700">Open now</span>
                  <span className="inline-flex h-6 w-11 items-center rounded-full bg-emerald-500 p-1">
                    <span className="h-4 w-4 rounded-full bg-white" />
                  </span>
                </div>

                <Link href="/store?view=all">
                  <Button className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700">Show all stores</Button>
                </Link>
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-xl font-bold text-slate-900">Top Rated Stores</h2>
              <div className="space-y-3">
                {topRated.map((item) => (
                  <Link
                    key={item.id}
                    href={`/store/${item.id}`}
                    className="flex items-center justify-between rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.name}</h3>
                      <p className="text-sm text-slate-500">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                        <Star className="h-4 w-4 fill-amber-400" /> {item.rating}
                      </p>
                      <p className="text-xs text-slate-500">{item.distance}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/store?view=all&sort=rating">
                <Button variant="outline" className="mt-3 w-full">
                  View all stores
                </Button>
              </Link>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-56">
                <Image
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
                  alt="Offers and deals"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent p-4">
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Offers & deals</p>
                    <h3 className="mt-1 text-2xl font-bold text-slate-900">Flat 30% OFF</h3>
                    <p className="text-sm text-slate-600">On all stores</p>
                    <Link href="/store?view=all">
                      <Button size="sm" className="mt-3 rounded-lg bg-emerald-600 hover:bg-emerald-700">
                        Grab now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </aside>

          <div className="flex-1 space-y-5">
            <main className="space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-slate-900">Explore Stores</h2>
                  <Link href="/store?view=all">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      View all <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {exploreStores.map((store) => (
                    <Link
                      key={store.id}
                      href={`/store/${store.id}`}
                      className="group overflow-hidden rounded-xl border border-slate-200"
                    >
                      <div className="relative h-32">
                        <Image src={store.image} alt={store.name} fill className="object-cover transition group-hover:scale-105" />
                      </div>
                      <div className="space-y-2 p-3">
                        <h3 className="text-lg font-bold text-slate-900">{store.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <div className="flex text-amber-500">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star key={idx} className="h-4 w-4 fill-amber-400" />
                            ))}
                          </div>
                          <span>{store.stores} stores</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-slate-900">Popular Stores</h2>
                  <Link href="/store?view=all">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      View all <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-4 xl:grid-cols-3">
                  {allStores.slice(0, 3).map((store) => (
                    <StoreListCard key={store.id} store={store} />
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-slate-900">Nearby Stores</h2>
                  <Link href="/store?view=all&sort=distance">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      View all <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-[280px_minmax(0,1fr)]">
                  <div className="relative h-72 overflow-hidden rounded-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1611765083444-a3ce30f1c885?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
                      alt="Nearby stores map"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    {allStores.slice(6, 9).map((store) => (
                      <div key={store.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{store.name}</h3>
                          <p className="text-sm text-slate-600">
                            {store.distance} • <span className="font-semibold text-emerald-600">Open</span> • {store.openHours}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Navigation className="h-4 w-4" /> Direction
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" /> Call
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </main>


          </div>
        </div>
      </div>
    </div>
  );
}
