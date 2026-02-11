"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CategoryCard from "../common/CategoryCard";
import SectionHeader from "../common/SectionHeader";

export default function Category() {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 5,
            spacing: 8,
        },
        breakpoints: {
            "(max-width: 1024px)": { slides: { perView: 3, spacing: 8 } },
            "(max-width: 640px)": { slides: { perView: 2, spacing: 8 } },
        },
    });

    return (
        <div className="pb-12">
            <SectionHeader
                title="Shop by Category"
                subtitle="Browse by product category"
            />
            <div ref={sliderRef} className="keen-slider">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="keen-slider__slide px-2">
                        <CategoryCard />
                    </div>
                ))}
            </div>
        </div>
    );
}
