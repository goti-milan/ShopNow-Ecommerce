"use client";

import BrowseProducts from "@/components/shop/BrowseProducts";
import { SHOP_CATEGORIES } from "@/components/shop/constants";
import { Button } from "@/components/ui/button";
import { getStoreById } from "@/lib/stores";
import { PRODUCTS } from "@/utils/static-data";
import { MapPin, Star, Verified } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function StoreClient() {
  const searchParams = useSearchParams();
  const storeIdParam = searchParams.get("storeId");
  const storeId = storeIdParam ? Number.parseInt(storeIdParam, 10) : 1;
  const store = getStoreById(Number.isFinite(storeId) ? storeId : 1) ?? getStoreById(1);

  return (
    <div>
      {/* Store Header */}
      <div className="relative h-64 bg-secondary">
        <Image
          src={store?.cover ?? "https://picsum.photos/seed/cover/1200/400"}
          alt="Cover"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="container mx-auto flex flex-col md:flex-row items-end gap-6">
            <div className="w-24 h-24 rounded-xl border-4 border-background bg-background overflow-hidden relative shadow-xl">
              <Image
                src={store?.logo ?? "https://picsum.photos/seed/shoplogo/200/200"}
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 text-white mb-2">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold">{store?.name ?? "Tech Haven"}</h1>
                {store?.verified && <Verified className="w-5 h-5 text-primary" />}
              </div>
              <p className="text-muted-foreground mb-2">{store?.tagline ?? "Premium Electronics & Gadgets"}</p>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" /> {store?.rating ?? 4.9} (
                  {store?.reviewsLabel ?? "1.2k"} Reviews)
                </span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {store?.location ?? "New York, USA"}</span>
              </div>
            </div>

            <div className="flex gap-4 mb-2">
              <Button>Follow</Button>
              <Button variant="secondary">Contact</Button>
            </div>
          </div>
        </div>
      </div>

      <BrowseProducts
        basePath="/market"
        products={PRODUCTS}
        categories={SHOP_CATEGORIES}
        title="Products"
      />
    </div>
  );
}
