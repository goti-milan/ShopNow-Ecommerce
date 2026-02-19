"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
    const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();
    const [couponCode, setCouponCode] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [appliedDiscount, setAppliedDiscount] = useState(0);

    const subtotal = totalPrice;
    const tax = subtotal * 0.18; // 18% GST example
    const shipping = subtotal > 5000 ? 0 : 299;
    const discount = subtotal * (appliedDiscount / 100);
    const total = subtotal + tax + shipping - discount;

    const handleApplyCoupon = () => {
        if (couponCode.toLowerCase() === "save10") {
            setAppliedDiscount(10);
            setCouponMessage("Coupon applied! 10% discount");
        } else if (couponCode.toLowerCase() === "save20") {
            setAppliedDiscount(20);
            setCouponMessage("Coupon applied! 20% discount");
        } else {
            setAppliedDiscount(0);
            setCouponMessage("Invalid coupon code");
        }
        setTimeout(() => setCouponMessage(""), 3000);
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link href="/shop">
                    <Button size="lg" className="gap-2">
                        Start Shopping <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems} items)</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 p-4 border rounded-lg bg-card hover:shadow-sm transition-shadow"
                        >
                            <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between gap-2">
                                    <Link href={`/product/${item.id}`} className="font-semibold line-clamp-2 hover:text-primary transition-colors">
                                        {item.title}
                                    </Link>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex justify-between items-end mt-2">
                                    <div className="flex items-center gap-2 border rounded-md">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:bg-muted transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center text-sm font-medium">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:bg-muted transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="font-bold text-lg">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 bg-card sticky top-24">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        <div className="space-y-2 mb-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            {appliedDiscount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount ({appliedDiscount}% off)</span>
                                    <span>-₹{discount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">GST (18%)</span>
                                <span>₹{tax.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className={shipping === 0 ? "text-green-600" : ""}>
                                    {shipping === 0 ? "Free" : `₹${shipping}`}
                                </span>
                            </div>
                            {shipping > 0 && (
                                <p className="text-xs text-muted-foreground">Free shipping on orders above ₹5,000</p>
                            )}
                        </div>

                        <div className="border-t pt-4 mb-6">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>

                        <Button className="w-full gap-2" size="lg">
                            Proceed to Checkout <ArrowRight className="w-4 h-4" />
                        </Button>

                        <div className="mt-6">
                            <p className="text-xs text-muted-foreground mb-2">
                                Have a coupon code?
                            </p>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter code"
                                    className="bg-background"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <Button variant="outline" onClick={handleApplyCoupon}>Apply</Button>
                            </div>
                            {couponMessage && (
                                <p className={`text-xs mt-2 ${appliedDiscount > 0 ? "text-green-600" : "text-red-500"}`}>
                                    {couponMessage}
                                </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-2">
                                Try: SAVE10 or SAVE20
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

