"use client";

import SectionHeader from "../common/SectionHeader";
import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { Button } from "../ui/button";

export default function RecentlyReviewed() {
    // Using a subset or reshuffled products for "Recently Reviewed"
    const recentlyReviewedProducts = [...PRODUCTS].reverse().slice(0, 5);

    return (
        <section className="my-10">
            <SectionHeader subtitle="Recently Reviewed" />

            <div className="max-w-7xl w-full mx-auto grid grid-cols-5 gap-8 mt-6 my-4 px-4">
                {recentlyReviewedProducts.map((product) => (
                    <div key={product.id}>
                        <ProductCard item={product} showActions={false} />
                    </div>
                ))}
            </div>
            <div className="pt-10 flex justify-center">
                <Button variant="outline" className="rounded-full px-12 py-6 text-lg border-2 border-foreground/10 hover:bg-foreground hover:text-background transition-colors duration-300">
                    View More
                </Button>
            </div>
        </section>
    );
}
