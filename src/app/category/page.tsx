import { ArrowRight, Laptop, Shirt, Sofa, Sparkles, Trophy, Book } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categories = [
    { name: "Electronics", slug: "electronics", icon: Laptop, count: 120, image: "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Fashion", slug: "fashion", icon: Shirt, count: 350, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Home & Living", slug: "home", icon: Sofa, count: 200, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Beauty", slug: "beauty", icon: Sparkles, count: 80, image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Sports", slug: "sports", icon: Trophy, count: 150, image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { name: "Books", slug: "books", icon: Book, count: 50, image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

export default function CategoryPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Shop by Category</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
