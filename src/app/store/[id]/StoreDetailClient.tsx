"use client";

import Image from "next/image";
import { PRODUCTS } from "@/utils/static-data";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import ProductCard from "@/components/common/Product";
import { Store, Star, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const shops = [
    {
        id: 1,
        name: "Tech Haven",
        category: "Electronics",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        banner: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Your one-stop shop for the latest in technology and gadgets. We pride ourselves on offering premium electronics with exceptional customer service.",
        address: "123 Tech Square, Silicon Valley",
        phone: "+1 234 567 890",
        email: "hello@techhaven.com",
        hours: "Mon - Sat: 10:00 AM - 9:00 PM"
    },
    {
        id: 2,
        name: "Style Studio",
        category: "Fashion",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        banner: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Curated collection of modern fashion and accessories. Our pieces are chosen for their quality, style, and sustainable craftsmanship.",
        address: "45 Fashion Avenue, New York",
        phone: "+1 987 654 321",
        email: "contact@stylestudio.com",
        hours: "Daily: 11:00 AM - 8:00 PM"
    },
    {
        id: 3,
        name: "Green Living",
        category: "Home & Garden",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        banner: "https://images.unsplash.com/photo-1616047006789-b7af5af4363f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "Bringing nature into your home with sustainable garden supplies and eco-friendly home decor. Quality products for a greener lifestyle.",
        address: "78 Eco Drive, Portland",
        phone: "+1 555 123 456",
        email: "support@greenliving.com",
        hours: "Mon - Fri: 9:00 AM - 6:00 PM"
    },
    {
        id: 4,
        name: "Sports Gear Pro",
        category: "Sports",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1556817411-31ae08ee1b75?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        banner: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        description: "High-performance sports equipment for athletes of all levels. From professional gear to casual fitness needs, we have you covered.",
        address: "123 Victory Lane, Chicago",
        phone: "+1 777 888 999",
        email: "info@sportsgearpro.com",
        hours: "Daily: 8:00 AM - 10:00 PM"
    },
];

export default function StoreDetailClient({ storeId }: { storeId: string }) {
    const store = shops.find(s => s.id === parseInt(storeId)) || shops[0];

    // Filter products (mock: electronics products if it's a tech store, etc)
    const storeProducts = store.category === "Electronics"
        ? PRODUCTS.filter(p => !p.title.includes("Shoes") && !p.title.includes("Chair") && !p.title.includes("Dining"))
        : PRODUCTS.slice(0, 6);

    const breadcrumbItems = [
        { label: "Stores", href: "/store" },
        { label: store.name }
    ];

    return (
        <div className="bg-[#fcfcff] min-h-screen">
            {/* Banner Section */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <Image
                    src={store.banner}
                    alt={store.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-8 left-0 right-0">
                    <div className="container mx-auto px-4">
                        <Breadcrumb
                            items={breadcrumbItems}
                            className="text-white/80 mb-6"
                        />
                        <div className="flex flex-col md:flex-row md:items-end gap-6">
                            {/* Profile Image */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white flex-shrink-0">
                                <Image
                                    src={store.image}
                                    alt={store.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 pb-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                                        {store.name}
                                    </h1>
                                    <div className="bg-yellow-400 text-slate-900 px-2 py-1 rounded-lg text-xs font-black flex items-center gap-1">
                                        {store.rating} <Star className="w-3 h-3 fill-slate-900" />
                                    </div>
                                </div>
                                <p className="text-white/90 font-bold uppercase tracking-widest text-xs">
                                    {store.category} Store • Official Partner
                                </p>
                            </div>

                            <div className="flex gap-3 pb-2">
                                <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-50 border-white rounded-2xl font-bold uppercase tracking-wider text-xs px-8">
                                    Follow
                                </Button>
                                <Button variant="primary" className="rounded-2xl font-bold uppercase tracking-wider text-xs px-8">
                                    Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Left Sidebar: Store Info */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                                <Store className="w-5 h-5 text-primary" /> About Store
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                {store.description}
                            </p>

                            <div className="space-y-4 pt-6 border-t border-slate-50">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                                    <span className="text-xs text-slate-600 font-medium">{store.address}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    <span className="text-xs text-slate-600 font-medium">{store.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <span className="text-xs text-slate-600 font-medium">{store.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    <span className="text-xs text-slate-600 font-medium">{store.hours}</span>
                                </div>
                            </div>
                        </div>

                        {/* Store Badges */}
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-100 italic">Verified Seller</span>
                            <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-green-100 italic">Fast Dispatch</span>
                            <span className="bg-primary/5 text-primary px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-primary/10 italic">Top Rated</span>
                        </div>
                    </div>

                    {/* Main Content: Products */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                Products from <span className="text-primary italic">{store.name}</span>
                            </h2>
                            <div className="flex items-center gap-4">
                                <select className="bg-white border-none text-xs font-bold uppercase tracking-widest text-slate-500 focus:ring-0 cursor-pointer">
                                    <option>Most Popular</option>
                                    <option>Newest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {storeProducts.map((product) => (
                                <ProductCard key={product.id} item={product} />
                            ))}
                        </div>

                        {/* Pagination or Load More */}
                        <div className="mt-16 flex justify-center">
                            <Button variant="outline" className="rounded-2xl border-slate-200 text-slate-600 font-bold uppercase tracking-widest px-12 h-14 hover:bg-slate-50">
                                Load More Products
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
