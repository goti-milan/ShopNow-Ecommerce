"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Trash2,
    ArrowRight,
    ShoppingBag,
    Heart,
    ShieldCheck,
    Truck,
    RotateCcw,
    CheckCircle2,
    Star,
    Calendar,
    Clock,
    MapPin,
    Check,
    CalendarDays,
    User2,
    X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem } from "@/context/CartContext";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PRODUCTS } from "@/utils/static-data";
import { Badge } from "@/components/ui/badge";
import { QuantitySelector } from "@/components/product/QuantitySelector";

export default function CartPage() {
    const { items, addItem, updateQuantity, removeItem, rescheduleItem } = useCart();
    const searchParams = useSearchParams();
    const [couponCode, setCouponCode] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [appliedDiscount, setAppliedDiscount] = useState(0);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [activeTab, setActiveTab] = useState("shopping-cart");
    const [hasInitializedSelection, setHasInitializedSelection] = useState(false);

    // Auto-select all items on initial load
    useEffect(() => {
        if (items.length > 0 && !hasInitializedSelection) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedIds(new Set(items.map(item => item.id)));
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHasInitializedSelection(true);
        }
    }, [items, hasInitializedSelection]);

    // Auto-switch to service-cart tab if URL param is set
    useEffect(() => {
        const tab = searchParams.get("tab");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (tab === "service-cart") setActiveTab("service-cart");
    }, [searchParams]);

    // Filter items by type
    const productItems = useMemo(() => items.filter(item => !item.type || item.type === 'product'), [items]);
    const serviceItems = useMemo(() => items.filter(item => item.type === 'service'), [items]);

    // Items for current tab
    const currentTabItems = activeTab === "shopping-cart" ? productItems : serviceItems;

    // ── Order Summary Calculations ─────────────────────────────────────────
    const selectedItems = items.filter(item => selectedIds.has(item.id));
    const selectedProductItems = selectedItems.filter(item => !item.type || item.type === 'product');
    const selectedServiceItems = selectedItems.filter(item => item.type === 'service');

    const productSubtotal = selectedProductItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const serviceSubtotal = selectedServiceItems.reduce((acc, i) => acc + i.price, 0);
    const subtotal = productSubtotal + serviceSubtotal;

    // MRP (original prices) — for savings calc
    const productMrp = selectedProductItems.reduce((acc, i) => acc + (i.originalPrice ?? i.price) * i.quantity, 0);
    const mrpDiscount = Math.max(0, productMrp - productSubtotal);

    // Delivery: free when product selection sum ≥ ₹999, else ₹99 (only if products selected)
    const deliveryCharges = selectedProductItems.length === 0 || productSubtotal >= 999 ? 0 : 99;
    const totalSavings = mrpDiscount + (subtotal > 0 ? appliedDiscount : 0);
    const total = Math.max(0, subtotal - (subtotal > 0 ? appliedDiscount : 0) + deliveryCharges);

    const handleApplyCoupon = () => {
        const code = couponCode.trim().toLowerCase();
        if (code === "save2000" || code === "SAVE2000") {
            setAppliedDiscount(2000);
            setCouponMessage("Success! ₹2,000 discount applied.");
        } else if (code === "welcome50") {
            setAppliedDiscount(50);
            setCouponMessage("Success! ₹50 welcome discount applied.");
        } else if (code === "") {
            setCouponMessage("Please enter a coupon code");
        } else {
            setAppliedDiscount(0);
            setCouponMessage("Invalid coupon code. Try 'SAVE2000'");
        }
        setTimeout(() => setCouponMessage(""), 5000);
    };

    const toggleSelectAll = (itemList: CartItem[]) => {
        const itemIds = itemList.map(item => item.id);
        const allSelected = itemList.length > 0 && itemIds.every(id => selectedIds.has(id));

        const newSelected = new Set(selectedIds);
        if (allSelected) {
            itemIds.forEach(id => newSelected.delete(id));
        } else {
            itemIds.forEach(id => newSelected.add(id));
        }
        setSelectedIds(newSelected);
    };

    const toggleSelectItem = (id: number) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const [rescheduleTarget, setRescheduleTarget] = useState<CartItem | null>(null);
    const openReschedule = (item: CartItem) => {
        setRescheduleTarget(item);
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">{`Looks like you haven't added anything to your cart yet.`}</p>
                <Link href="/shop">
                    <Button size="lg" className="gap-2">Start Shopping <ArrowRight className="w-4 h-4" /></Button>
                </Link>
            </div>
        );
    }

    const isAllSelected = currentTabItems.length > 0 && currentTabItems.every(item => selectedIds.has(item.id));

    return (
        <div className="min-h-screen bg-[#f1f3f6] pb-20 pt-8 font-sans">
            <div className="container mx-auto px-4 max-w-7xl">
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/">Home</Link>
                    <span>&gt;</span>
                    <Link href="/categories">Categories</Link>
                    <span>&gt;</span>
                    <span className="text-[#2d3139] font-medium">Shopping Cart</span>
                </nav>

                <h1 className="text-4xl font-black text-[#2d3139] mb-8">Cart List</h1>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="bg-transparent h-auto p-0 gap-4 mb-8">
                        <TabsTrigger
                            value="shopping-cart"
                            className="px-8 py-3 rounded-lg data-[state=active]:bg-[#f47424] data-[state=active]:text-white bg-[#2d3139] text-white transition-all font-bold text-lg"
                        >
                            Products ({productItems.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="service-cart"
                            className="px-8 py-3 rounded-lg data-[state=active]:bg-[#f47424] data-[state=active]:text-white bg-[#2d3139] text-white transition-all font-bold text-lg"
                        >
                            Services ({serviceItems.length})
                        </TabsTrigger>
                    </TabsList>

                    <div className="grid lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-8 space-y-12">
                            {activeTab === "shopping-cart" ? (
                                <>
                                    <ProductSection
                                        items={productItems}
                                        selectedIds={selectedIds}
                                        onSelect={toggleSelectItem}
                                        onSelectAll={() => toggleSelectAll(productItems)}
                                        onRemove={removeItem}
                                        onUpdateQty={updateQuantity}
                                    />
                                    {serviceItems.length > 0 && (
                                        <ServiceSection
                                            items={serviceItems}
                                            selectedIds={selectedIds}
                                            onSelect={toggleSelectItem}
                                            onSelectAll={() => toggleSelectAll(serviceItems)}
                                            onRemove={removeItem}
                                            onReschedule={openReschedule}
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    <ServiceSection
                                        items={serviceItems}
                                        selectedIds={selectedIds}
                                        onSelect={toggleSelectItem}
                                        onSelectAll={() => toggleSelectAll(serviceItems)}
                                        onRemove={removeItem}
                                        onReschedule={openReschedule}
                                    />
                                    {productItems.length > 0 && (
                                        <ProductSection
                                            items={productItems}
                                            selectedIds={selectedIds}
                                            onSelect={toggleSelectItem}
                                            onSelectAll={() => toggleSelectAll(productItems)}
                                            onRemove={removeItem}
                                            onUpdateQty={updateQuantity}
                                        />
                                    )}
                                </>
                            )}
                        </div>

                        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
                            <div className="bg-white rounded-3xl border shadow-sm p-8 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-[#2d3139]">Order Summary</h2>
                                    <div
                                        onClick={() => toggleSelectAll(currentTabItems)}
                                        className="flex items-center gap-2 cursor-pointer group"
                                    >
                                        <span className="text-sm font-bold text-gray-400 group-hover:text-[#f47424] transition-colors">Select All</span>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isAllSelected ? 'bg-[#f47424] border-[#f47424]' : 'border-gray-300'}`}>
                                            {isAllSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                        </div>
                                    </div>
                                </div>

                                {/* Coupon Section */}
                                <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-dashed border-gray-300 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-[#f47424] hover:bg-[#f47424] text-white">PROMO</Badge>
                                        <span className="text-sm font-black text-[#2d3139]">Apply Promo Code</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Input
                                                placeholder="Enter code (e.g. SAVE2000)"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                className="rounded-xl border-gray-200 h-12 font-bold focus-visible:ring-[#f47424]/30"
                                            />
                                            {appliedDiscount > 0 && (
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                        <Check className="w-3 h-3 text-white" strokeWidth={4} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            onClick={handleApplyCoupon}
                                            className="bg-[#2d3139] hover:bg-black text-white px-6 rounded-xl font-black h-12 transition-all active:scale-95"
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                    {couponMessage && (
                                        <p className={`text-xs font-bold animate-in fade-in slide-in-from-top-1 ${couponMessage.includes("Invalid") ? "text-red-500" : "text-green-600"}`}>
                                            {couponMessage}
                                        </p>
                                    )}

                                    <div className="pt-2 flex flex-wrap gap-2">
                                        <button
                                            onClick={() => { setCouponCode("SAVE2000"); }}
                                            className="text-[10px] font-black uppercase tracking-wider text-[#f47424] bg-orange-50 px-2 py-1 rounded border border-orange-100 hover:bg-orange-100 transition-colors"
                                        >
                                            SAVE2000
                                        </button>
                                        <button
                                            className="text-[10px] font-black uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100 cursor-not-allowed"
                                            disabled
                                        >
                                            WELCOME50
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {activeTab === "service-cart" ? (
                                        <>
                                            {selectedServiceItems.length > 0 && (
                                                <div className="flex justify-between items-center text-gray-500 font-bold">
                                                    <span>{selectedServiceItems.length} selected service{selectedServiceItems.length !== 1 ? 's' : ''}</span>
                                                    <span className="text-[#2d3139]">₹{serviceSubtotal.toLocaleString()}</span>
                                                </div>
                                            )}
                                            {selectedProductItems.length > 0 && (
                                                <div className="flex justify-between items-center text-gray-500 font-bold">
                                                    <span>{selectedProductItems.length} selected product{selectedProductItems.length !== 1 ? 's' : ''}</span>
                                                    <span className="text-[#2d3139]">₹{productSubtotal.toLocaleString()}</span>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {selectedProductItems.length > 0 && (
                                                <div className="flex justify-between items-center text-gray-500 font-bold">
                                                    <span>{selectedProductItems.length} selected product{selectedProductItems.length !== 1 ? 's' : ''}</span>
                                                    <span className="text-[#2d3139]">₹{productSubtotal.toLocaleString()}</span>
                                                </div>
                                            )}
                                            {selectedServiceItems.length > 0 && (
                                                <div className="flex justify-between items-center text-gray-500 font-bold">
                                                    <span>{selectedServiceItems.length} selected service{selectedServiceItems.length !== 1 ? 's' : ''}</span>
                                                    <span className="text-[#2d3139]">₹{serviceSubtotal.toLocaleString()}</span>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {mrpDiscount > 0 && (
                                        <div className="flex justify-between items-center text-green-600 font-bold">
                                            <span>Savings</span>
                                            <span>- ₹{mrpDiscount.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="py-6 border-y border-gray-100 space-y-4">
                                    {appliedDiscount > 0 && (
                                        <div className="flex justify-between items-center text-green-600 font-bold">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="border-green-600 text-green-600 bg-green-50 text-[10px] h-5">COUPON APPLIED</Badge>
                                                <span className="text-sm">Discount</span>
                                            </div>
                                            <span className="text-[#f47424]">- ₹{appliedDiscount.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-gray-500 font-bold text-lg">
                                        <span>Subtotal</span>
                                        <span className="text-[#2d3139]">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500 font-bold text-lg">
                                        <span>Delivery</span>
                                        {deliveryCharges === 0 ? <span className="text-green-600 font-black">Free</span> : <span className="text-[#2d3139]">₹{deliveryCharges}</span>}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-lg font-black text-[#2d3139]">
                                    <span>Total Savings</span>
                                    <span className="text-[#f47424]">₹{totalSavings.toLocaleString()}</span>
                                </div>

                                <div className="relative overflow-hidden group">
                                    <div className="bg-[#2d3139] p-6 rounded-2xl flex justify-between items-center relative z-10">
                                        <div className="bg-[#f47424] text-white text-[10px] px-2.5 py-1 rounded font-black uppercase tracking-widest">Total</div>
                                        <div className="text-3xl font-black text-white italic tracking-tighter">₹{total.toLocaleString()}</div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#f47424]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#f47424]/30 transition-all duration-700" />
                                </div>

                                <Button className="w-full bg-[#f47424] hover:bg-[#e0661e] text-white py-8 text-xl font-black rounded-2xl shadow-xl shadow-orange-100 transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-tighter">
                                    {activeTab === "service-cart" ? "Schedule & Pay" : "Proceed to Checkout"}
                                </Button>

                                <div className="flex justify-center gap-6 pt-2 grayscale opacity-50 contrast-125">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={40} height={25} style={{ height: 'auto' }} />
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={40} height={25} style={{ height: 'auto' }} />
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" width={40} height={25} style={{ height: 'auto' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Tabs>

                <div className="mt-20 space-y-8">
                    <div className="flex items-center gap-3">
                        <Heart className="w-6 h-6 text-[#f47424] fill-[#f47424]/20" />
                        <h2 className="text-3xl font-black text-[#2d3139]">Item also like</h2>
                        <div className="flex-1 border-t border-gray-200 ml-4" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {PRODUCTS.slice(0, 5).map((product) => (
                            <div key={product.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                                <div className="relative aspect-square bg-[#f8f9fa] rounded-xl overflow-hidden mb-4 p-4 border border-gray-100">
                                    <Image src={product.image} alt={product.title} fill className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="font-bold text-[#2d3139] line-clamp-2 text-sm h-10 leading-snug">{product.title}</h3>
                                    <div className="text-lg font-black text-[#2d3139]">₹{product.price.toLocaleString()}</div>
                                    <div className="pt-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                        <Button
                                            onClick={() => addItem(product)}
                                            className="w-full bg-[#f47424] hover:bg-[#e0661e] text-white !text-[10px] h-7 px-3 font-bold rounded-lg shadow-sm shadow-orange-100 whitespace-nowrap"
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 border-t border-gray-200 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 grayscale opacity-60">
                    <div className="flex items-center gap-3 justify-center">
                        <ShieldCheck className="w-8 h-8 text-gray-800" />
                        <span className="font-black text-xs uppercase tracking-widest text-gray-800">Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                        <CheckCircle2 className="w-8 h-8 text-gray-800" />
                        <span className="font-black text-xs uppercase tracking-widest text-gray-800">100% Original</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                        <Truck className="w-8 h-8 text-gray-800" />
                        <span className="font-black text-xs uppercase tracking-widest text-gray-800">Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                        <RotateCcw className="w-8 h-8 text-gray-800" />
                        <span className="font-black text-xs uppercase tracking-widest text-gray-800">Easy Returns</span>
                    </div>
                </div>
            </div>

            {rescheduleTarget && (
                <RescheduleModal
                    item={rescheduleTarget}
                    onClose={() => setRescheduleTarget(null)}
                    onConfirm={(date, time) => {
                        rescheduleItem(rescheduleTarget.id, date, time);
                        setRescheduleTarget(null);
                    }}
                />
            )}
        </div>
    );
}

// ── Shared Cart Sections ──────────────────────────────────────

interface ProductSectionProps {
    items: CartItem[];
    selectedIds: Set<number>;
    onSelect: (id: number) => void;
    onSelectAll: () => void;
    onRemove: (id: number) => void;
    onUpdateQty: (id: number, qty: number) => void;
}

function ProductSection({ items, selectedIds, onSelect, onSelectAll, onRemove, onUpdateQty }: ProductSectionProps) {
    const isAllSelected = items.length > 0 && items.every((i) => selectedIds.has(i.id));

    if (items.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
                <div onClick={onSelectAll} className="flex items-center gap-4 cursor-pointer group">
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${isAllSelected ? 'bg-[#f47424] border-[#f47424]' : 'border-gray-300'}`}>
                        {isAllSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                    </div>
                    <span className="font-black text-xl text-[#2d3139]">Shopping Cart <span className="text-gray-400 font-medium text-sm ml-2">({items.length} items)</span></span>
                </div>
            </div>

            <div className="space-y-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border flex gap-8 shadow-sm hover:shadow-lg transition-all relative group">
                        <div className="flex items-start gap-4">
                            <div
                                onClick={() => onSelect(item.id)}
                                className={`w-5 h-5 mt-2 rounded border flex items-center justify-center cursor-pointer transition-colors ${selectedIds.has(item.id) ? 'bg-[#f47424] border-[#f47424]' : 'border-gray-300'}`}
                            >
                                {selectedIds.has(item.id) && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                            </div>
                            <div className="relative w-44 h-44 bg-[#f8f9fa] rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 p-2">
                                <Image src={item.image} alt={item.title} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="space-y-2">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-black text-[#2d3139] leading-tight line-clamp-1">{item.title}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400 font-medium">Titanium Blue</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                                            <span className="text-gray-400 font-medium whitespace-nowrap">256GB</span>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <div className="text-3xl font-black text-[#2d3139]">₹{item.price.toLocaleString()}</div>
                                        <div className="flex items-center justify-end gap-2 mt-1">
                                            <span className="text-sm text-gray-400 line-through font-medium">₹{(item.price * 1.2).toLocaleString()}</span>
                                            <span className="text-sm text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">1.4% OFF</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-4 h-4 fill-orange-400 text-orange-400" />
                                        ))}
                                        <span className="text-sm font-black text-orange-500 ml-1">4.8</span>
                                    </div>
                                    <span className="text-sm text-gray-400 font-medium">(1,248 Reviews)</span>
                                    <Badge className="bg-[#fff4ed] text-[#f47424] border-none font-bold text-[10px] uppercase tracking-wider">Best Seller</Badge>
                                </div>

                                <div className="flex items-center gap-6 pt-2">
                                    <QuantitySelector
                                        quantity={item.quantity}
                                        onChange={(val: number) => onUpdateQty(item.id, val)}
                                    />
                                    <div className="flex items-center gap-1.5 text-green-600 text-sm font-bold">
                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                                            <Check className="w-3 h-3" strokeWidth={4} />
                                        </div>
                                        In Stock
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#f8f9fa] flex items-center justify-center border border-gray-100 shadow-inner overflow-hidden">
                                        <Image src="https://images.unsplash.com/photo-1610819013583-2947a164c017?q=80&w=100&h=100&auto=format&fit=crop" alt="Store" width={40} height={40} className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-[#2d3139]">Apple Official Store</div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                                            <span className="text-xs text-gray-500 font-bold">4.9 <span className="font-normal">(50,000+ Sales)</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" size="sm" className="h-10 px-5 text-gray-600 border-gray-200 font-bold rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all" onClick={() => onRemove(item.id)}>
                                        <Trash2 className="w-4 h-4 mr-2" /> Remove
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-10 px-5 text-gray-600 border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-all">
                                        <Heart className="w-4 h-4 mr-2" /> Save for Later
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface ServiceSectionProps {
    items: CartItem[];
    selectedIds: Set<number>;
    onSelect: (id: number) => void;
    onSelectAll: () => void;
    onRemove: (id: number) => void;
    onReschedule: (item: CartItem) => void;
}

function ServiceSection({ items, selectedIds, onSelect, onSelectAll, onRemove, onReschedule }: ServiceSectionProps) {
    const isAllSelected = items.length > 0 && items.every((i) => selectedIds.has(i.id));

    if (items.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between">
                <div onClick={onSelectAll} className="flex items-center gap-4 cursor-pointer group">
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${isAllSelected ? 'bg-[#f47424] border-[#f47424]' : 'border-gray-300'}`}>
                        {isAllSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-xl text-[#2d3139]">Service Cart <span className="text-gray-400 font-medium text-sm ml-2">({items.length} bookings)</span></span>
                    </div>
                </div>
                <Link href="/booking">
                    <Button variant="outline" size="sm" className="font-bold rounded-xl gap-2">
                        <ShoppingBag className="w-4 h-4" /> Add More Services
                    </Button>
                </Link>
            </div>

            <div className="space-y-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-lg transition-all relative group">
                        <div className="flex items-start gap-5">
                            <div
                                onClick={() => onSelect(item.id)}
                                className={`w-5 h-5 mt-1 rounded border flex items-center justify-center cursor-pointer transition-colors shrink-0 ${selectedIds.has(item.id) ? 'bg-[#f47424] border-[#f47424]' : 'border-gray-300'}`}
                            >
                                {selectedIds.has(item.id) && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                            </div>

                            <div className="relative w-28 h-28 bg-[#f8f9fa] rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 flex-wrap">
                                    <div>
                                        <h3 className="text-xl font-black text-[#2d3139] leading-tight">{item.title}</h3>
                                        {item.provider && (
                                            <div className="flex items-center gap-2 mt-1">
                                                {item.providerAvatar && <Image src={item.providerAvatar} alt={item.provider} width={20} height={20} className="rounded-full object-cover" />}
                                                <span className="text-sm text-gray-500 font-medium">{item.provider}</span>
                                                <span className="flex items-center gap-1 text-xs text-blue-600 font-bold"><ShieldCheck className="w-3 h-3" /> Verified</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-2xl font-black text-[#2d3139] whitespace-nowrap">₹{item.price.toLocaleString()}</div>
                                </div>

                                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                                    {item.bookingDate && (
                                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                                            <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                                            {new Date(item.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                    )}
                                    {item.bookingTime && (
                                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                                            <Clock className="w-4 h-4 text-primary shrink-0" />
                                            {item.bookingTime}
                                        </div>
                                    )}
                                </div>

                                {item.bookingNotes && (
                                    <div className="mt-2 px-3 py-2 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-800">
                                        📝 {item.bookingNotes}
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                                    <Button variant="outline" size="sm" className="h-9 px-4 text-red-500 border-red-100 hover:bg-red-50 font-bold rounded-xl" onClick={() => onRemove(item.id)}>
                                        <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Remove
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-9 px-4 font-bold rounded-xl text-[#f47424] border-orange-100 hover:bg-orange-50" onClick={() => onReschedule(item)}>
                                        <Calendar className="w-3.5 h-3.5 mr-1.5" /> Reschedule
                                    </Button>
                                    <span className="ml-auto flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                        <User2 className="w-3.5 h-3.5" /> At-home service
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RescheduleModal({
    item,
    onClose,
    onConfirm,
}: {
    item: CartItem;
    onClose: () => void;
    onConfirm: (date: string, time: string) => void;
}) {
    const today = new Date().toISOString().split("T")[0];
    const timeSlots = [
        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
        "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
        "04:00 PM", "05:00 PM", "06:00 PM",
    ];
    const [date, setDate] = useState(item.bookingDate ?? "");
    const [time, setTime] = useState(item.bookingTime ?? "");

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div>
                        <h2 className="text-lg font-black text-gray-900">Reschedule Booking</h2>
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{item.title}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div className="flex items-center gap-4 px-4 py-3 bg-orange-50 border border-orange-100 rounded-2xl text-sm">
                        <CalendarDays className="w-5 h-5 text-[#f47424] shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Current booking</p>
                            <p className="font-bold text-gray-800">
                                {item.bookingDate
                                    ? new Date(item.bookingDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                                    : "—"}
                                {item.bookingTime ? ` • ${item.bookingTime}` : ""}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">New Date</label>
                        <div className="relative">
                            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="date"
                                min={today}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#f47424]/30 focus:border-[#f47424]"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">New Time Slot</label>
                        <div className="grid grid-cols-4 gap-2">
                            {timeSlots.map((slot) => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setTime(slot)}
                                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${time === slot
                                        ? "bg-[#f47424] text-white border-[#f47424] shadow-md shadow-orange-100"
                                        : "border-gray-200 text-gray-600 hover:border-[#f47424] hover:text-[#f47424]"
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-1">
                        <Button variant="outline" className="flex-1 rounded-xl font-bold" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            className="flex-1 bg-[#f47424] hover:bg-[#e0661e] text-white rounded-xl font-bold shadow-lg shadow-orange-100"
                            disabled={!date || !time}
                            onClick={() => onConfirm(date, time)}
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
