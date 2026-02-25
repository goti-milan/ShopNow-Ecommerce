"use client";

import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/utils/types";

interface SimilarProductsListProps {
    products: Product[];
}

export const SimilarProductsList = ({ products }: SimilarProductsListProps) => {
    // Take first 2 for the vertical list as shown in image
    const displayProducts = products.slice(0, 2);

    return (
        <div className="mt-8 pt-8 border-t border-slate-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Similar Products</h3>
                <button className="text-[10px] font-black text-slate-400 hover:text-orange-500 uppercase tracking-tighter bg-slate-100 px-3 py-1 rounded-full transition-colors">View All</button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {displayProducts.map((product) => (
                    <div key={product.id} className="flex-1 flex gap-4 p-4 rounded-3xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-orange-100 transition-all group">
                        <div className="w-24 h-24 relative rounded-2xl overflow-hidden bg-white border border-slate-50 shrink-0 group-hover:scale-105 transition-transform duration-500">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                            <div>
                                <h4 className="text-sm font-black text-slate-900 line-clamp-1 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{product.title}</h4>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-2.5 h-2.5 fill-orange-400 text-orange-400" />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">1.2k</span>
                                </div>
                                <div className="text-base font-black text-slate-900 mt-2">₹{product.price.toLocaleString()}</div>
                            </div>
                            <Button className="mt-3 h-8 bg-orange-500 hover:bg-orange-600 rounded-xl text-[10px] font-black uppercase tracking-tighter flex items-center gap-1.5">
                                <ShoppingCart className="w-3 h-3" />
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
