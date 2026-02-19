import ProductCard from "@/components/common/Product";
import { PRODUCTS } from "@/utils/static-data";
import { notFound } from "next/navigation";

// This is a dynamic route for categories
export default async function CategorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Basic validation/simulation
    const validCategories = ["electronics", "fashion", "home", "beauty", "sports", "books"];

    // In a real app, you'd fetch data based on slug. 
    // For now, we'll just capitalise it for the title.

    const title = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 p-8 bg-primary/5 rounded-2xl text-center">
                <h1 className="text-4xl font-bold mb-2">{title}</h1>
                <p className="text-muted-foreground">Browse our collection of {slug}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {/* Repeating PRODUCTS to simulate category items */}
                {[...PRODUCTS, ...PRODUCTS].map((product, index) => (
                    <div key={`${product.id}-${index}`} className="flex justify-center">
                        <ProductCard item={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
