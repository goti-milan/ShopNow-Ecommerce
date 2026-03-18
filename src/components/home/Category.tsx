"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CategoryCard from "../common/CategoryCard";
import { CATEGORIES } from "@/utils/static-data";
import HomeSectionHeader from "./HomeSectionHeader";

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
        <section className="py-8 sm:py-10 md:py-12 bg-background overflow-x-hidden">
            <div className="container mx-auto px-4 max-w-7xl">
                <HomeSectionHeader
                    label="Explore"
                    heading="Shop by Category"
                    description="Browse our wide range of categories to find exactly what you need."
                />
                <div ref={sliderRef} className="keen-slider -mx-2 sm:-mx-4 px-2 sm:px-4">
                    {CATEGORIES.map((cat, index) => (
                        <div key={index} className="keen-slider__slide px-1 sm:px-2">
                            <CategoryCard
                                title={cat.name}
                                discount={cat.discount}
                                image={cat.image}
                                slug={cat.slug}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
