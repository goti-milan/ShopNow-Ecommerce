"use client";

import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function TrendingProduct() {

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <span className="text-primary font-semibold tracking-widest uppercase text-xs">What&apos;s Hot Right Now</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Trending Products</h2>
                        <p className="text-muted-foreground text-sm max-w-md">The most loved items by our community — see what everyone&apos;s buying.</p>
                    </div>

                  
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {[...PRODUCTS, ...PRODUCTS].map((product, index) => (
                        <div key={`${product.id}-${index}`} className="transform transition-transform duration-500 hover:-translate-y-2">
                            <ProductCard item={product} showActions={false} />
                        </div>
                    ))}
                </div>

                <div className="pt-10 flex justify-center">
                    <Button variant="outline" className="rounded-full px-12 py-6 text-base border-2 border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300 gap-2">
                        View All Trending Products <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
