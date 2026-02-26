"use client";

import ProductCard from "@/components/common/Product";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/utils/static-data";
import { MapPin, Star, Verified } from "lucide-react";
import Image from "next/image";

export default function StoreClient() {
  return (
    <div>
      {/* Store Header */}
      <div className="relative h-64 bg-slate-900">
        <Image
          src="https://picsum.photos/seed/cover/1200/400"
          alt="Cover"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="container mx-auto flex flex-col md:flex-row items-end gap-6">
            <div className="w-24 h-24 rounded-xl border-4 border-background bg-background overflow-hidden relative shadow-xl">
              <Image
                src="https://picsum.photos/seed/shoplogo/200/200"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 text-white mb-2">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold">Tech Haven</h1>
                <Verified className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-slate-300 mb-2">Premium Electronics & Gadgets</p>
              <div className="flex gap-4 text-sm text-slate-300">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.9 (1.2k Reviews)</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> New York, USA</span>
              </div>
            </div>

            <div className="flex gap-4 mb-2">
              <Button>Follow</Button>
              <Button variant="secondary">Contact</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Store Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-8">
            <div>
              <h3 className="font-bold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-primary font-medium">All Products</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Smartphones</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Laptops</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Accessories</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Audio</a></li>
              </ul>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Store Info</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tech Haven is your one-stop shop for all things tech. We offer the latest gadgets at competitive prices with full warranty support.
              </p>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">All Products</h2>
              <select className="text-sm border rounded px-2 py-1 bg-background">
                <option>Sort by: Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...PRODUCTS, ...PRODUCTS].slice(0, 8).map((product, index) => (
                <div key={`${product.id}-${index}`} className="flex justify-center">
                  <ProductCard item={product} />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}