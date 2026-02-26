"use client";

import { useEffect, useState } from "react";
import { Product } from "@/utils/types";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { ProductTabs } from "@/components/product/ProductTabs";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductReviews } from "@/components/product/ProductReviews";
import { SellerInfo } from "./SellerInfo";
import { Badge } from "@/components/ui/badge";

export default function ProductDetailsClient({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState("spaceblack");
    const [selectedWeight, setSelectedWeight] = useState("250g");
    const [selectedSize, setSelectedSize] = useState("M");
    const [pincode, setPincode] = useState("");
    const [mounted, setMounted] = useState(false); // Added mounted state
    const { addItem } = useCart();
    const router = useRouter();

    const colors = [
        { id: "spaceblack", name: "Space Black", color: "#2c2c2e" },
        { id: "gold", name: "Gold", color: "#f5e3ce" },
        { id: "silver", name: "Silver", color: "#f1f1f2" },
        { id: "deeppurple", name: "Deep Purple", color: "#4e465a" },
    ];

    const weightOptions = ["250g", "500g", "1kg", "2kg"];
    const sizeOptions = ["S", "M", "L", "XL"];

    const handleAddToCart = () => {
        addItem(product);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push("/cart");
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Electronics", href: "/category/electronics" },
        { label: "Smartphones", href: "/category/smartphones" },
        { label: product.title }
    ];

    if (!mounted) {
        return null; // Prevent rendering on the server to avoid hydration mismatches
    }

    return (
        <div className="bg-white min-h-screen relative">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 pt-6">
                <Breadcrumb items={breadcrumbItems} className="mb-6" />
            </div>

            <div className="container mx-auto px-4 pb-20 max-w-screen-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column: Image Gallery */}
                    <div className="space-y-6 lg:sticky lg:top-24">
                        <div className="relative bg-slate-50 rounded-[40px] p-8 border border-slate-100 shadow-sm overflow-hidden">
                            <div className="absolute top-6 left-6 z-30">
                                <Badge className="bg-orange-500 text-white border-none px-4 py-1.5 font-black text-xs uppercase rounded-full">Sale</Badge>
                            </div>
                            <ImageGallery
                                images={[product.image, "https://picsum.photos/seed/iphone1/800/800", "https://picsum.photos/seed/iphone2/800/800", "https://picsum.photos/seed/iphone3/800/800"]}
                                title={product.title}
                            />
                        </div>
                    </div>

                    {/* Right Column: Information & Actions */}
                    <div className="flex flex-col gap-8">
                        <ProductInfo
                            title={product.title}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            discountPercent={product.discountPercent} // Fixed typo here
                            description={product.description || ""}
                        />

                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-900">Quantity</span>
                            <QuantitySelector
                                quantity={quantity}
                                onChange={setQuantity}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 h-16 rounded-2xl border-2 border-slate-900 bg-white text-slate-900 font-black text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 h-16 rounded-2xl bg-orange-500 text-white font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-100 active:scale-95"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Buy Now
                            </button>
                        </div>

                        {/* Colors */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-widest text-slate-900">Select Color</span>
                                <span className="text-[11px] font-bold text-slate-400 capitalize">{selectedColor}</span>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {colors.map((color) => (
                                    <button
                                        key={color.id}
                                        onClick={() => setSelectedColor(color.id)}
                                        className={cn(
                                            "group relative w-12 h-12 rounded-full border-2 transition-all p-1",
                                            selectedColor === color.id ? "border-orange-500 scale-110" : "border-transparent hover:border-slate-200"
                                        )}
                                    >
                                        <div
                                            className="w-full h-full rounded-full shadow-inner"
                                            style={{ backgroundColor: color.color }}
                                        />
                                        {selectedColor === color.id && (
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor font-bold">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Variants */}
                        <div className="space-y-4 pt-6 border-t border-slate-100">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-900">Size Variant</span>
                            <div className="flex flex-wrap gap-3">
                                {sizeOptions.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={cn(
                                            "min-w-14 h-12 rounded-xl border-2 text-sm font-black transition-all flex items-center justify-center uppercase",
                                            selectedSize === size ? "border-orange-500 bg-white text-orange-600 shadow-sm" : "border-white bg-white text-slate-400 hover:border-slate-200"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Weight Variants */}
                        <div className="space-y-4 pt-6 border-t border-slate-100">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-900">Weight Variant</span>
                            <div className="flex flex-wrap gap-3">
                                {weightOptions.map((weight) => (
                                    <button
                                        key={weight}
                                        onClick={() => setSelectedWeight(weight)}
                                        className={cn(
                                            "px-6 h-12 rounded-xl border-2 text-[11px] font-black transition-all flex items-center justify-center uppercase tracking-tighter",
                                            selectedWeight === weight ? "border-orange-500 bg-white text-orange-600 shadow-sm" : "border-white bg-white text-slate-400 hover:border-slate-200"
                                        )}
                                    >
                                        {weight}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Delivery Options */}
                        <div className="space-y-6 pt-2">
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Check Delivery</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        placeholder="Enter Delivery Pincode"
                                        className="w-full h-14 pl-12 pr-24 rounded-2xl border-2 border-slate-100 bg-white focus:border-orange-500 focus:outline-none font-bold text-sm transition-all"
                                    />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-orange-500 text-white font-black text-[10px] uppercase rounded-xl hover:bg-orange-600 transition-colors">
                                        Check
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">Delivery by</p>
                                        <p className="text-xs font-bold text-slate-600">Monday, 3rd March</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">Fastest Delivery</p>
                                        <p className="text-xs font-bold text-slate-600">Tomorrow, by 10 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Seller Info */}
                        <SellerInfo />
                    </div>
                </div>

                {/* Bottom Sections */}
                <div className="mt-20 space-y-16">
                    {/* Tabs Section */}
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

                    {/* Reviews Section */}
                    <ProductReviews />
                </div>
            </div>
        </div>

    );
}
