"use client";

import SectionHeader from "../common/SectionHeader";
import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { Button } from "../ui/button";

export default function TrendingProduct() {

    return (
        <section className=" my-10">
            <SectionHeader subtitle="Trending Products" />

            <div className="max-w-7xl w-full mx-auto grid grid-cols-5 grid-rows-2 gap-8 mt-6 my-4">
                {[...PRODUCTS, ...PRODUCTS].map((product) => (
                    <div key={product.id} className="keen-slider__slide">
                        <ProductCard item={product} />
                    </div>
                ))}
            </div>
            <div className="pt-10 flex justify-center">
                <Button variant="outline" className="rounded-full px-12 py-6 text-lg border-2 border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300">
                    View All Products
                </Button>
            </div>
        </section>
    );
}
