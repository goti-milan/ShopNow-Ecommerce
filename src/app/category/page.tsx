import { Button } from "@/components/ui/button";
import { ArrowRight, Laptop, Shirt, Sofa, Sparkles, Trophy, Book } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categories = [
    { name: "Electronics", slug: "electronics", icon: Laptop, count: 120, image: "https://picsum.photos/seed/electronics/400/300" },
    { name: "Fashion", slug: "fashion", icon: Shirt, count: 350, image: "https://picsum.photos/seed/fashion/400/300" },
    { name: "Home & Living", slug: "home", icon: Sofa, count: 200, image: "https://picsum.photos/seed/furniture/400/300" },
    { name: "Beauty", slug: "beauty", icon: Sparkles, count: 80, image: "https://picsum.photos/seed/beauty/400/300" },
    { name: "Sports", slug: "sports", icon: Trophy, count: 150, image: "https://picsum.photos/seed/sports/400/300" },
    { name: "Books", slug: "books", icon: Book, count: 50, image: "https://picsum.photos/seed/books/400/300" },
];

export default function CategoryPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Shop by Category</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="group relative overflow-hidden rounded-xl border bg-background hover:shadow-lg transition-all duration-300"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <category.icon className="w-12 h-12 mb-2" />
                                <h3 className="text-2xl font-bold">{category.name}</h3>
                                <span className="text-sm opacity-90">{category.count} Products</span>
                            </div>
                        </div>
                        <div className="p-4 flex justify-between items-center bg-card">
                            <span className="font-semibold text-primary group-hover:underline">Explore</span>
                            <ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
