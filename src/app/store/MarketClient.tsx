"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Store, Search, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const shops = [
  { id: 1, name: "Tech Haven", category: "Electronics", rating: 4.8, image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Style Studio", category: "Fashion", rating: 4.5, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Green Living", category: "Home & Garden", rating: 4.9, image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Sports Gear Pro", category: "Sports", rating: 4.6, image: "https://images.unsplash.com/photo-1556817411-31ae08ee1b75?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
];

export default function MarketClient() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-primary/5 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4">Discover Top Sellers</h1>
          <p className="text-muted-foreground mb-6">
            Explore thousands of trusted shops and brands. Find unique products directly from the makers.
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search shops..." className="pl-10 bg-background" />
            </div>
            <Button>Search</Button>
          </div>
        </div>
        <div className="hidden md:block">
          <Store className="w-32 h-32 text-primary opacity-20" />
        </div>
      </div>

      {/* Popular Shops */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" /> Popular Shops
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shops.map((shop) => (
          <Link key={shop.id} href={`/store`} className="group border rounded-xl overflow-hidden hover:shadow-lg transition-all">
            <div className="relative h-40 bg-muted">
              <Image
                src={shop.image}
                alt={shop.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{shop.name}</h3>
                <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded">
                  ★ {shop.rating}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{shop.category}</p>
              <Button variant="outline" size="sm" className="w-full">Visit Store</Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}