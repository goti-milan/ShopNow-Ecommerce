"use client";

import { useState } from "react";
import { Product } from "@/utils/types";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { ActionButtons } from "@/components/product/ActionButtons";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";

interface ProductDetailsClientProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Mock specifications
    const specifications = {
        "Material": "Premium Composite",
        "Weight": "250g",
        "Dimensions": "10 x 5 x 2 inches",
        "Warranty": "1 Year Manufacturer",
        "Connection": "Wireless / USB-C",
        "Color": "Obsidian Black"
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Minimal Breadcrumb */}
            <div className="container mx-auto px-4 pt-8 md:pt-12">
                <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
                    <a href="/" className="hover:text-primary transition-colors">Home</a>
                    <span>/</span>
                    <a href="/shop" className="hover:text-primary transition-colors">Store</a>
                    <span>/</span>
                    <span className="text-slate-900 truncate max-w-[200px]">{product.title}</span>
                </nav>
            </div>

            <div className="container mx-auto px-4 pb-20 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 items-start">
                    {/* Left Section: Image Gallery */}
                    <div className="w-full lg:sticky lg:top-32">
                        <ImageGallery
                            images={[product.image, "https://picsum.photos/seed/tech/800/800", "https://picsum.photos/seed/gadget/800/800"]}
                            title={product.title}
                        />
                    </div>

                    {/* Right Section: Product Info & Actions */}
                    <div className="flex flex-col pt-4 lg:pt-0">
                        <ProductInfo
                            title={product.title}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            discountPercent={product.discountPercent}
                            badgeText={product.badgeText}
                            description="Experience the pinnacle of innovation and design. This premium product is crafted with precision to provide you with best-in-class performance and an unparalleled user experience. Every detail from the materials to the finish has been meticulously considered."
                        />

                        <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Select Quantity</span>
                                <QuantitySelector
                                    quantity={quantity}
                                    onChange={setQuantity}
                                    maxStock={10}
                                />
                            </div>

                            <ActionButtons
                                isWishlisted={isWishlisted}
                                onWishlist={() => setIsWishlisted(!isWishlisted)}
                                onAddToCart={() => console.log(`Added ${quantity} to cart`)}
                                onBuyNow={() => console.log("Proceeding to checkout")}
                                onShare={() => console.log("Sharing product")}
                            />

                            {/* Short trust indicators below buttons */}
                            <div className="flex items-center justify-center gap-6 py-4 px-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 grayscale opacity-60">
                                    <div className="w-6 h-6 bg-slate-200 rounded-full" />
                                    <span className="text-[10px] font-bold uppercase tracking-tighter">Safe Payment</span>
                                </div>
                                <div className="flex items-center gap-2 grayscale opacity-60">
                                    <div className="w-6 h-6 bg-slate-200 rounded-full" />
                                    <span className="text-[10px] font-bold uppercase tracking-tighter">Verified Brand</span>
                                </div>
                                <div className="flex items-center gap-2 grayscale opacity-60">
                                    <div className="w-6 h-6 bg-slate-200 rounded-full" />
                                    <span className="text-[10px] font-bold uppercase tracking-tighter">Eco-Friendly</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <ProductTabs
                    description="This premium product represents the intersection of luxury and technology. Built using high-grade materials and featuring the latest advancements in its field, it offers a seamless experience for both professional and personal use. Its ergonomic design ensures comfort, while its robust build quality guarantees longevity."
                    specifications={specifications}
                    reviews={[]}
                />

                {/* Related Products Section */}
                <RelatedProducts products={relatedProducts} />
            </div>
        </div>
    );
}
