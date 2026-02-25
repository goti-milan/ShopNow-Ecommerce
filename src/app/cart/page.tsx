"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Minus,
    Plus,
    Trash2,
    ArrowRight,
    ShoppingBag,
    Heart,
    Settings,
    MoreHorizontal,
    ShieldCheck,
    Truck,
    RotateCcw,
    CheckCircle2,
    Star,
    Calendar,
    Clock,
    MapPin,
    Verified,
    Check
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem } from "@/context/CartContext";
import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "@/utils/static-data";
import { QuantitySelector } from "@/components/product/QuantitySelector";

export default function CartPage() {
    const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();
    const [couponCode, setCouponCode] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [appliedDiscount, setAppliedDiscount] = useState(2000); // Default to match image mock
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [activeTab, setActiveTab] = useState("shopping-cart");

    // Filter items by type
    const productItems = useMemo(() => items.filter(item => !item.type || item.type === 'product'), [items]);
    const serviceItems = useMemo(() => items.filter(item => item.type === 'service'), [items]);

    // Items for current tab
    const currentTabItems = activeTab === "shopping-cart" ? productItems : serviceItems;

    const subtotal = totalPrice;
    const discount = appliedDiscount;
    const deliveryCharges = subtotal > 5000 ? 0 : 299;
    const serviceCharges = serviceItems.length > 0 ? 429 : 0;
    const totalSavings = (subtotal * (20 / 100)) + discount; // Example mock savings
    const total = subtotal - discount + deliveryCharges + serviceCharges;

    const handleApplyCoupon = () => {
        if (couponCode.toLowerCase() === "save2000") {
            setAppliedDiscount(2000);
            setCouponMessage("Coupon applied! ₹2,000 discount");
        } else {
            setAppliedDiscount(0);
            setCouponMessage("Invalid coupon code");
        }
        setTimeout(() => setCouponMessage(""), 3000);
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

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">
                    Looks like you haven&apos;t added anything to your cart yet.
                </p>
                <Link href="/shop">
                    <Button size="lg" className="gap-2">
                        Start Shopping <ArrowRight className="w-4 h-4" />
                    </Button>
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
                            Shopping Cart
                        </TabsTrigger>
                        <TabsTrigger
                            value="service-cart"
                            className="px-8 py-3 rounded-lg data-[state=active]:bg-[#f47424] data-[state=active]:text-white bg-[#2d3139] text-white transition-all font-bold text-lg"
                        >
                            Service Cart
                        </TabsTrigger>
                    </TabsList>

                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Main Content Area */}
                        <div className="lg:col-span-8 space-y-6">

                            <TabsContent value="shopping-cart" className="mt-0 space-y-6">
                                {/* Select All Action Bar */}
                                <div className="bg-white p-5 rounded-2xl border flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div
                                            onClick={() => toggleSelectAll(productItems)}
                                            className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${isAllSelected ? 'bg-[#f47424] border-[#f47424]' : 'border-gray-300'}`}
                                        >
                                            {isAllSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                                        </div>
                                        <span className="font-bold text-lg text-[#2d3139]">Select All</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" size="sm" className="text-gray-500 font-semibold h-10 hover:bg-gray-50 rounded-lg">
                                            <Calendar className="w-4 h-4 mr-2" /> Sent for Later
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-500 hover:bg-gray-50 rounded-lg">
                                            <Settings className="w-5 h-5" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-500 hover:bg-gray-50 rounded-lg">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Product List */}
                                <div className="space-y-6">
                                    {productItems.map((item) => (
                                        <div key={item.id} className="bg-white p-6 rounded-2xl border flex gap-8 shadow-sm hover:shadow-lg transition-all relative group">
                                            <div className="flex items-start gap-4">
                                                <div
                                                    onClick={() => toggleSelectItem(item.id)}
                                                    className={`w-5 h-5 mt-2 rounded border flex items-center justify-center cursor-pointer transition-colors ${selectedIds.has(item.id) ? 'bg-[#f47424] border-[#f47424]' : 'border-gray-300'}`}
                                                >
                                                    {selectedIds.has(item.id) && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                                </div>
                                                <div className="relative w-44 h-44 bg-[#f8f9fa] rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 p-2">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                                    />
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
                                                            onChange={(val: number) => updateQuantity(item.id, val)}
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
                                                        <Button variant="outline" size="sm" className="h-10 px-5 text-gray-600 border-gray-200 font-bold rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all" onClick={() => removeItem(item.id)}>
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
                            </TabsContent>

                            <TabsContent value="service-cart" className="mt-0 space-y-6">
                                {/* Service Cart Header */}
                                <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div
                                                onClick={() => toggleSelectAll(serviceItems)}
                                                className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${isAllSelected ? 'bg-[#f47424] border-[#f47424]' : 'border-gray-300'}`}
                                            >
                                                {isAllSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-xl text-[#2d3139]">Service Cart</span>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-400 font-medium">
                                                    <Calendar className="w-4 h-4" /> Thurs Apr 25 | 11:00 AM
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button variant="ghost" size="sm" className="text-gray-500 font-bold h-10 hover:bg-gray-50 rounded-lg">
                                                <ShoppingBag className="w-4 h-4 mr-2" /> Get Services
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-gray-500 font-bold h-10 hover:bg-gray-50 rounded-lg">
                                                <Settings className="w-4 h-4 mr-2" /> Edit
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Service List */}
                                <div className="space-y-6">
                                    {serviceItems.length > 0 ? (
                                        serviceItems.map((item) => (
                                            <div key={item.id} className="bg-white p-6 rounded-2xl border flex gap-8 shadow-sm hover:shadow-lg transition-all relative group">
                                                <div className="flex items-start gap-4">
                                                    <div
                                                        onClick={() => toggleSelectItem(item.id)}
                                                        className={`w-5 h-5 mt-2 rounded border flex items-center justify-center cursor-pointer transition-colors ${selectedIds.has(item.id) ? 'bg-[#f47424] border-[#f47424]' : 'border-gray-300'}`}
                                                    >
                                                        {selectedIds.has(item.id) && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                                    </div>
                                                    <div className="relative w-44 h-44 bg-[#f8f9fa] rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex-1 flex flex-col justify-between py-1">
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between items-start gap-4">
                                                            <div className="space-y-1">
                                                                <h3 className="text-2xl font-black text-[#2d3139] leading-tight line-clamp-1">{item.title}</h3>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex items-center gap-1">
                                                                        <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                                                        <span className="text-sm font-black text-orange-500 ml-1">4.8</span>
                                                                    </div>
                                                                    <span className="text-sm text-gray-400 font-medium">(10,000+ Bookings)</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-3xl font-black text-[#2d3139] whitespace-nowrap">₹{item.price.toLocaleString()}</div>
                                                        </div>

                                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-3">
                                                            <div className="flex items-center gap-1.5 text-blue-600 font-black tracking-tight">
                                                                <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden">
                                                                    <ShieldCheck className="w-3 h-3" />
                                                                </div>
                                                                Safe & Verified
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                                                                <MapPin className="w-4 h-4" /> Doctor Apr 25 | 11:00 AM
                                                            </div>
                                                            <div className="w-full flex items-center gap-3 text-gray-500 font-medium pt-1">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-[#f47424]" />
                                                                Filter Cleaning + Membrane Check
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-8 text-sm text-gray-500 font-bold py-2">
                                                            <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center"><Verified className="w-3 h-3 text-blue-600" /></div> Service</div>
                                                            <div className="flex items-center gap-2 font-black text-[#2d3139]"><Clock className="w-4 h-4 text-gray-400" /> 1 hour</div>
                                                            <div className="flex items-center gap-2 font-black text-[#2d3139]"><Clock className="w-4 h-4 text-gray-400" /> 1 hour</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-6 mt-6">
                                                        <Button variant="outline" size="sm" className="h-10 px-5 text-gray-600 border-gray-200 font-black rounded-xl hover:bg-red-50 hover:text-red-500 transition-all" onClick={() => removeItem(item.id)}>
                                                            <Trash2 className="w-4 h-4 mr-2" /> Remove
                                                        </Button>
                                                        <Button variant="outline" size="sm" className="h-10 px-5 text-gray-600 border-gray-200 font-black rounded-xl hover:bg-gray-50 transition-all">
                                                            <Heart className="w-4 h-4 mr-2" /> Save for Later
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-white p-24 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                <ShoppingBag className="w-10 h-10 text-gray-200" />
                                            </div>
                                            <p className="text-xl font-bold text-gray-400">No services in your cart yet.</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
                            <div className="bg-white rounded-3xl border shadow-sm p-8 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-[#2d3139]">Order Summary</h2>
                                    <div
                                        onClick={() => toggleSelectAll(currentTabItems)}
                                        className={`flex items-center gap-2 cursor-pointer group`}
                                    >
                                        <span className="text-sm font-bold text-gray-400 group-hover:text-[#f47424] transition-colors">Select All</span>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isAllSelected ? 'bg-[#f47424] border-[#f47424]' : 'border-gray-300'}`}>
                                            {isAllSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-gray-500 font-bold">
                                        <span>{productItems.length} Shopping items</span>
                                        <span className="text-[#2d3139]">₹{productItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500 font-bold">
                                        <span>{serviceItems.length} service Bookings</span>
                                        <span className="text-[#2d3139]">₹{serviceItems.reduce((acc, curr) => acc + curr.price, 0).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="py-6 border-y border-gray-100 space-y-4">
                                    <div className="flex justify-between items-center text-gray-400 font-bold text-sm uppercase tracking-wider">
                                        <span>Offers & Coupons</span>
                                        <span className="text-[#f47424]">₹{appliedDiscount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500 font-bold text-lg">
                                        <span>Subtotal</span>
                                        <span className="text-[#2d3139]">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500 font-bold text-lg">
                                        <span>Discount</span>
                                        <span className="text-[#f47424]">- ₹2,000</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500 font-bold text-lg">
                                        <span>Delivery Charges</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500 font-bold text-lg">
                                        <span>Service Charges</span>
                                        <span className="text-[#2d3139]">₹429</span>
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
                                    Proceed to Checkout
                                </Button>

                                <div className="flex justify-center gap-6 pt-2 grayscale opacity-50 contrast-125">
                                    <div className="w-12 h-8 bg-gray-50 rounded flex items-center justify-center p-1.5 border border-gray-100"><Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={40} height={40} className="object-contain" /></div>
                                    <div className="w-12 h-8 bg-gray-50 rounded flex items-center justify-center p-1.5 border border-gray-100"><Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={40} height={40} className="object-contain" /></div>
                                    <div className="w-12 h-8 bg-gray-50 rounded flex items-center justify-center p-1.5 border border-gray-100"><Image src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" width={40} height={40} className="object-contain" /></div>
                                    <div className="w-12 h-8 bg-gray-50 rounded flex items-center justify-center p-1.5 border border-gray-100"><Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" width={40} height={40} className="object-contain" /></div>
                                </div>

                                <div className="space-y-4 pt-8 border-t border-gray-100">
                                    <div className="flex items-center justify-between group cursor-help">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center transition-colors group-hover:bg-green-100"><ShieldCheck className="w-5 h-5 text-green-600" /></div>
                                            <span className="font-bold text-gray-500">Secure Payment</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 rounded-full border-2 border-gray-200" />
                                            <div className="w-2 h-2 rounded-full border-2 border-gray-200" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between group cursor-help">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center transition-colors group-hover:bg-green-100"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
                                            <span className="font-bold text-gray-500">100% Original</span>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full border-2 border-gray-200" />
                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between group cursor-help">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center transition-colors group-hover:bg-green-100"><Truck className="w-5 h-5 text-green-600" /></div>
                                            <span className="font-bold text-gray-500">Free Shipping</span>
                                        </div>
                                        <div className="text-xs font-black text-gray-300">₹</div>
                                    </div>
                                    <div className="flex items-center justify-between group cursor-help">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center transition-colors group-hover:bg-green-100"><RotateCcw className="w-5 h-5 text-green-600" /></div>
                                            <span className="font-bold text-gray-500">Easy Returns</span>
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-green-600" strokeWidth={3} />
                                    </div>
                                </div>
                            </div>

                            {/* Bee Payment Card */}
                            <div className="bg-[#2d3139] p-6 rounded-3xl space-y-5 overflow-hidden relative group">
                                <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500" />
                                <div className="flex items-center justify-between font-black text-white relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-[#f47424] flex items-center justify-center"><ShieldCheck className="w-5 h-5" /></div>
                                        Bee Payment
                                    </div>
                                    <div className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"><Plus className="w-5 h-5" /></div>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-400 font-bold relative z-10">
                                    <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center"><ShieldCheck className="w-3.5 h-3.5" /></div>
                                    Ton irer <span className="w-1 h-1 rounded-full bg-white/20 mx-1" /> erlerts
                                </div>
                                <div className="flex items-center gap-6 text-[11px] text-gray-500 font-black uppercase tracking-widest relative z-10">
                                    <div className="flex items-center gap-2">1.5 Bds</div>
                                    <div className="p-0.5 px-1.5 rounded bg-white/5 border border-white/10 whitespace-nowrap">Deli Bookings</div>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-white font-bold border-t border-white/10 pt-5 relative z-10">
                                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center font-black"><Check className="w-3 h-3 text-green-500" strokeWidth={4} /></div>
                                    Payment 900
                                </div>
                            </div>
                        </div>
                    </div>
                </Tabs>

                {/* Also Like Section */}
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
                                    <div className="flex items-center gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                        <div className="flex-1 flex items-center justify-around bg-[#f8f9fa] rounded-lg border border-gray-200">
                                            <button className="p-1 hover:text-[#f47424] transition-colors"><Minus className="w-3 h-3" /></button>
                                            <span className="text-[10px] font-bold">1</span>
                                            <button className="p-1 hover:text-[#f47424] transition-colors"><Plus className="w-3 h-3" /></button>
                                        </div>
                                        <Button className="bg-[#f47424] text-white !text-[10px] h-7 px-3 font-bold rounded-lg shadow-sm shadow-orange-100 whitespace-nowrap">Add to Cart</Button>
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
        </div>
    );
}
