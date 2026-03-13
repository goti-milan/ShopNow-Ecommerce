"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Zap, ShieldCheck, Truck, RotateCcw, MapPin } from "lucide-react";
import { SellerInfo } from "./SellerInfo";

interface BuyBoxProps {
    price: number;
    originalPrice?: number;
    discount?: number;
    coupon?: number;
    onAddToCart: () => void;
    onBuyNow: () => void;
}

export const BuyBox = ({
    price,
    originalPrice = 149900,
    discount = 20901,
    coupon = 10000,
    onAddToCart,
    onBuyNow
}: BuyBoxProps) => {
    const [pincode, setPincode] = useState("");

    return (
        <div className="flex flex-col gap-6 p-6 bg-background border border-border rounded-3xl shadow-sm lg:sticky lg:top-32 z-10">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-foreground">Buy Now</h3>
                <div className="flex items-center gap-1.5 bg-accent px-2 py-1 rounded-full border border-primary/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent0 animate-pulse" />
                    <span className="text-[10px] font-black text-primary uppercase">In Stock</span>
                </div>
            </div>

            <div className="space-y-3 pb-6 border-b border-border">
                <div className="text-xs font-bold text-muted-foreground flex items-center justify-between">
                    <span>Selected Variant:</span>
                    <span className="text-foreground underline underline-offset-4 decoration-slate-200">Space Black • 256GB</span>
                </div>

                <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm font-medium text-muted-foreground">
                        <span>Price</span>
                        <span className="text-foreground">₹{originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-primary">
                        <span>Discount</span>
                        <span>- ₹{discount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-primary">
                        <span>Coupon (SAVE10)</span>
                        <span>- ₹{coupon.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-50">
                        <span className="text-lg font-black text-foreground uppercase tracking-tighter">Total</span>
                        <span className="text-2xl font-black text-foreground">₹{price.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <Button
                    variant="outline"
                    className="w-full h-14 rounded-xl border-primary text-primary-dark hover:bg-accent font-black text-base uppercase flex items-center gap-2"
                    onClick={onAddToCart}
                >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                </Button>
                <Button
                    className="w-full h-14 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-base uppercase flex items-center gap-2 shadow-lg shadow-green-100"
                    onClick={onBuyNow}
                >
                    <Zap className="w-5 h-5 fill-current" />
                    Buy Now
                </Button>
            </div>

            <div className="flex items-center justify-center gap-4 py-2 opacity-60">
                <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black uppercase text-foreground tracking-tighter">Safe Payment</span>
                </div>
                <div className="flex items-center gap-3 grayscale">
                    <div className="w-8 h-4 relative">
                        {/* Placeholder for Visa icon */}
                        <div className="absolute inset-0 bg-primary-dark rounded-sm flex items-center justify-center text-[10px] text-white font-italic italic">VISA</div>
                    </div>
                    <div className="w-8 h-4 relative">
                        {/* Placeholder for Mastercard icon */}
                        <div className="absolute inset-0 bg-slate-800 rounded-sm flex items-center justify-center text-[8px] text-white">CARD</div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-foreground uppercase tracking-widest">Delivery Options</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="Enter Pincode"
                            className="h-12 pl-10 pr-20 rounded-xl border-border focus:ring-0 focus:border-slate-400 font-bold"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary font-black text-xs uppercase hover:underline">
                            Check
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border border-border rounded-2xl bg-muted/50">
                        <div className="flex items-center gap-2 mb-1">
                            <Truck className="w-4 h-4 text-foreground" />
                            <span className="text-[10px] font-black text-foreground uppercase tracking-tighter">Standard</span>
                        </div>
                        <p className="text-[11px] font-bold text-muted-foreground leading-tight">3-5 days • <span className="text-primary uppercase">Free</span></p>
                    </div>
                    <div className="p-3 border border-border rounded-2xl bg-muted/50">
                        <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-primary fill-primary" />
                            <span className="text-[10px] font-black text-foreground uppercase tracking-tighter">Express</span>
                        </div>
                        <p className="text-[11px] font-bold text-muted-foreground leading-tight">1-2 days • <span className="text-foreground font-black uppercase">₹299</span></p>
                    </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-2xl border border-primary/20">
                    <RotateCcw className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-foreground uppercase tracking-tighter">
                        Return Policy <span className="text-muted-foreground font-bold">|</span> <span className="text-primary underline underline-offset-2">7 Days Replacement</span>
                    </span>
                </div>
            </div>
            <SellerInfo />
        </div>
    );
};
