"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import SectionHeader from "../common/SectionHeader";
import ProductCard from "../common/Product";
import { PRODUCTS } from "@/utils/static-data";

export default function TrendingProduct() {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 6,
            spacing: 16,
        },
        breakpoints: {
            "(max-width: 1024px)": {
                slides: { perView: 4.2, spacing: 12 },
            },
            "(max-width: 640px)": {
                slides: { perView: 2, spacing: 12 },
            },
        },
    });

    return (
        <section className="mt-10">
            <SectionHeader title="Trending Products" />

            <div ref={sliderRef} className="keen-slider mt-6 my-4">
                {PRODUCTS.map((product) => (
                    <div key={product.id} className="keen-slider__slide">
                        <ProductCard item={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}
