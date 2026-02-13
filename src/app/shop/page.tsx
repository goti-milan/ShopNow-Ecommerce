import ProductCard from "@/components/common/Product";
import SectionHeader from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/utils/static-data";
import { Filter } from "lucide-react";

export default function ShopPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Shop All Products</h1>
                    <p className="text-muted-foreground">Explore our complete collection of premium items</p>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>
                    <select className="h-10 px-3 rounded-md border border-input bg-background/50 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option>Sort by: Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest Arrivals</option>
                    </select>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {/* Repeating PRODUCTS to simulate more items */}
                {[...PRODUCTS, ...PRODUCTS, ...PRODUCTS].map((product, index) => (
                    <div key={`${product.id}-${index}`} className="flex justify-center">
                        <ProductCard item={product} />
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="primary" className="bg-primary text-primary-foreground">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
            </div>
        </div>
    );
}
