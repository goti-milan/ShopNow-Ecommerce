"use client";

import { useState } from "react";
import { Product } from "@/utils/types";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductReviews } from "@/components/product/ProductReviews";
import { BuyBox } from "./BuyBox";
import { SellerInfo } from "./SellerInfo";
import { SimilarProductsList } from "./SimilarProductsList";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ProductDetailsClientProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState("spaceblack");
    const [selectedStorage, setSelectedStorage] = useState("256GB");
    const { addItem } = useCart();
    const router = useRouter();

    const colors = [
        { id: "spaceblack", name: "Space Black", color: "bg-[#2c2c2e]", image: "https://picsum.photos/seed/iphone-black/100/100" },
        { id: "gold", name: "Gold", color: "bg-[#f5e3ce]", image: "https://picsum.photos/seed/iphone-gold/100/100" },
        { id: "silver", name: "Silver", color: "bg-[#f1f1f2]", image: "https://picsum.photos/seed/iphone-silver/100/100" },
        { id: "deeppurple", name: "Deep Purple", color: "bg-[#4e465a]", image: "https://picsum.photos/seed/iphone-purple/100/100" },
    ];

    const storageOptions = ["128 GB", "256 GB", "512 GB", "1 TB"];

    const handleAddToCart = () => {
        addItem(product);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push("/cart");
    };

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Electronics", href: "/category/electronics" },
        { label: "Smartphones", href: "/category/smartphones" },
        { label: product.title }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen relative z-0">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 pt-6 relative z-40">
                <Breadcrumb items={breadcrumbItems} className="mb-6" />
            </div>

            <div className="container mx-auto px-4 pb-20 max-w-screen-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Column 1: Image Gallery (lg:span-4) */}
                    <div className="lg:col-span-4 bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm lg:sticky lg:top-24 z-20">
                        <div className="relative">
                            <div className="absolute top-0 left-0 z-30">
                                <Badge className="bg-green-600 text-white border-none px-3 py-1 font-black text-[10px] uppercase rounded-tl-[30px] rounded-br-[20px]">Sale</Badge>
                            </div>
                            <ImageGallery
                                images={[product.image, "https://picsum.photos/seed/iphone1/800/800", "https://picsum.photos/seed/iphone2/800/800", "https://picsum.photos/seed/iphone3/800/800"]}
                                title={product.title}
                            />
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-slate-100 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                Zoom
                            </button>
                            <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-slate-100 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
                                View in 3D
                            </button>
                        </div>
                    </div>

                    {/* Column 2: Product Info & Variants (lg:span-5) */}
                    <div className="lg:col-span-5 flex flex-col gap-8 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                        <ProductInfo
                            title={product.title}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            discountPercent={product.discountPercent}
                            description={product.description || ""}
                        />

                        {/* Variants: Color */}
                        <div className="space-y-4 pt-6 border-t border-slate-50">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Color Variants:</span>
                                <button className="text-[10px] font-black text-blue-500 uppercase hover:underline">View All</button>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color.id}
                                        onClick={() => setSelectedColor(color.id)}
                                        className={cn(
                                            "flex flex-col items-center gap-2 p-2 rounded-2xl border transition-all",
                                            selectedColor === color.id ? "border-orange-500 bg-orange-50/30" : "border-slate-100 hover:border-slate-200"
                                        )}
                                    >
                                        <div className="w-12 h-12 relative rounded-xl overflow-hidden bg-slate-50">
                                            <Image src={color.image} alt={color.name} fill className="object-contain p-1" />
                                        </div>
                                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">{color.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Variants: Storage */}
                        <div className="space-y-4 pt-6 border-t border-slate-50">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Storage Variants:</span>
                            <div className="flex flex-wrap gap-2">
                                {storageOptions.map((storage) => (
                                    <button
                                        key={storage}
                                        onClick={() => setSelectedStorage(storage)}
                                        className={cn(
                                            "px-6 py-3 rounded-xl border text-xs font-black uppercase tracking-tighter transition-all",
                                            selectedStorage === storage ? "border-orange-500 bg-orange-50/50 text-orange-600" : "border-slate-100 text-slate-400 hover:border-slate-300"
                                        )}
                                    >
                                        {storage}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <SimilarProductsList products={relatedProducts} />
                    </div>

                    {/* Column 3: Buy Box & Seller Info (lg:span-3) */}
                    <div className="lg:col-span-3 space-y-6">
                        <BuyBox
                            price={product.price}
                            onAddToCart={handleAddToCart}
                            onBuyNow={handleBuyNow}
                        />
                        {/* <SellerInfo /> */}
                    </div>
                </div>

                {/* Bottom Sections */}
                <div className="mt-12 space-y-12">
                    {/* Tabs Section */}
                    <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                        <ProductTabs
                            description={product.description || ""}
                            specifications={{
                                "Material": "Premium Composite",
                                "Weight": "250g",
                                "Dimensions": "10 x 5 x 2 inches",
                                "Warranty": "1 Year Manufacturer",
                                "Connection": "Wireless / USB-C",
                                "Color": "Obsidian Black"
                            }}
                        />
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                        <ProductReviews />
                    </div>

                    {/* Full Width Related Products */}
                    <div className="mt-20">
                        <RelatedProducts products={relatedProducts} />
                    </div>
                </div>
            </div>
        </div>
    );
}
