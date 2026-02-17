import { PRODUCTS } from "@/utils/static-data";
import { notFound } from "next/navigation";
import ProductDetailsClient from "@/components/product/ProductDetailsClient";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = PRODUCTS.find((p) => p.id === parseInt(id));

    if (!product) {
        notFound();
    }

    const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 5);

    return (
        <main className="bg-background min-h-screen">
            <ProductDetailsClient
                product={product}
                relatedProducts={relatedProducts}
            />
        </main>
    );
}
