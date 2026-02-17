"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProductCard from "@/components/common/Product";
import SectionHeader from "@/components/common/SectionHeader";
import { Product } from "@/utils/types";

interface RelatedProductsProps {
    products: Product[];
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 1.2,
            spacing: 16,
        },
        breakpoints: {
            "(min-width: 640px)": {
                slides: { perView: 2.2, spacing: 20 },
            },
            "(min-width: 1024px)": {
                slides: { perView: 4, spacing: 24 },
            },
            "(min-width: 1280px)": {
                slides: { perView: 5, spacing: 32 },
            },
        },
    });

    if (products.length === 0) return null;

    return (
        <div className="mt-32 pt-16 border-t border-slate-100">
            <SectionHeader
                title="Related Products"
                subtitle="Complete your collection with these handpicked items"
            />

            {/* Mobile/Tablet Slider */}
            <div ref={sliderRef} className="keen-slider mt-12 !overflow-visible">
                {products.map((item) => (
                    <div key={item.id} className="keen-slider__slide pb-4 h-full">
                        <div className="h-full flex justify-center transition-all hover:-translate-y-2 duration-300">
                            <ProductCard item={item} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Explore More Button for desktop */}
            <div className="mt-12 flex justify-center lg:justify-end">
                <button className="text-slate-900 font-bold hover:text-primary transition-colors flex items-center gap-2 group">
                    View all products
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
