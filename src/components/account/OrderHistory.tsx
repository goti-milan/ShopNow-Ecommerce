import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Package, RefreshCw, Star, Trash2 } from "lucide-react";

const ORDERS = [
    {
        id: 1001,
        date: "Feb 20, 2026",
        status: "Delivered",
        statusColor: "bg-accent text-primary-dark",
        total: 4599,
        items: [
            {
                id: "i-1",
                name: "Royal Canin Dog Food 10kg",
                qty: 1,
                price: 4599,
                image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=240&q=80",
            },
            {
                id: "i-2",
                name: "Dog Toy Rope",
                qty: 2,
                price: 0,
                image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=240&q=80",
            },
        ],
        note: "Delivered to your address",
        noteSecondary: "Eligible for return/refund within 7 days",
    },
    {
        id: 1002,
        date: "Feb 14, 2026",
        status: "Processing",
        statusColor: "bg-accent text-primary-dark",
        total: 12999,
        items: [
            {
                id: "i-3",
                name: "Smart Air Purifier XL",
                qty: 1,
                price: 12999,
                image: "https://images.unsplash.com/photo-1581579185169-1c3d2b50d7b4?auto=format&fit=crop&w=240&q=80",
            },
        ],
        note: "Your order is being prepared",
        noteSecondary: "You can cancel before shipment",
    },
];

export default function OrderHistory({ showHeader = true }: { showHeader?: boolean }) {
    return (
        <div className="space-y-6">
            {showHeader && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground font-display">Order History</h2>
                        <p className="text-sm text-muted-foreground mt-1">Track and manage your recent orders.</p>
                    </div>
                    <Link href="/shop" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto rounded-xl gap-2 h-11 border-primary/20 hover:bg-accent text-primary font-semibold">
                            Shop More <ChevronRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            )}

            <div className="grid gap-6">
                {ORDERS.map((order) => (
                    <div key={order.id} className="bg-background border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        {/* Order Header */}
                        <div className="p-5 sm:p-6 border-b border-border bg-muted/30">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Package className="w-5 h-5 text-primary" />
                                        <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">Order #{order.id}</h3>
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">{order.date}</p>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-3">
                                    <span className={`text-[10px] sm:text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-full ${order.statusColor}`}>
                                        {order.status}
                                    </span>
                                    <div className="sm:hidden text-lg font-bold text-foreground">
                                        ₹{order.total.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-5 sm:p-6 space-y-5">
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={item.id} className={`flex items-center justify-between gap-4 ${index !== order.items.length - 1 ? "border-b border-border pb-4" : ""}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-muted border border-border overflow-hidden flex-shrink-0">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-foreground text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">{item.name}</p>
                                                <p className="text-xs sm:text-sm text-muted-foreground mt-1 bg-muted w-fit px-2 py-0.5 rounded-md">Qty: {item.qty}</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            {item.price > 0 ? (
                                                <p className="font-bold text-foreground">₹{item.price.toLocaleString()}</p>
                                            ) : (
                                                <p className="text-xs font-bold text-primary uppercase tracking-tighter bg-accent px-2 py-0.5 rounded-md">Free Gift</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary & Notes */}
                            <div className="grid sm:grid-cols-2 gap-6 pt-5 border-t border-border mt-2">
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-foreground flex items-center gap-2">
                                        <ChevronRight className="w-3 h-3 text-primary" /> Delivery Note
                                    </p>
                                    <div className="bg-muted p-3 rounded-2xl">
                                        <p className="text-xs text-foreground font-medium">{order.note}</p>
                                        <p className="text-[10px] text-muted-foreground mt-1 italic">{order.noteSecondary}</p>
                                    </div>
                                </div>
                                <div className="bg-primary/5 rounded-2xl p-4 flex flex-col justify-center items-end border border-primary/10">
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Amount</p>
                                    <p className="text-2xl sm:text-3xl font-extrabold text-primary">₹{order.total.toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 flex flex-wrap gap-2.5 justify-end">
                                {order.status === "Delivered" && (
                                    <>
                                        <Button variant="outline" size="sm" className="rounded-xl h-9 text-xs sm:text-sm border-border hover:bg-muted font-semibold">
                                            Return
                                        </Button>
                                        <Button variant="outline" size="sm" className="rounded-xl h-9 text-xs sm:text-sm border-border hover:bg-muted font-semibold gap-1.5">
                                            <Star className="w-3.5 h-3.5" /> Review
                                        </Button>
                                        <Button size="sm" className="rounded-xl h-9 text-xs sm:text-sm bg-primary hover:bg-primary-dark text-white font-bold gap-1.5 shadow-md shadow-orange-100">
                                            <RefreshCw className="w-3.5 h-3.5" /> Buy Again
                                        </Button>
                                    </>
                                )}
                                {order.status === "Processing" && (
                                    <Button variant="outline" size="sm" className="rounded-xl h-9 text-xs sm:text-sm border-primary/20 text-primary hover:bg-accent font-semibold gap-1.5">
                                        <Trash2 className="w-3.5 h-3.5" /> Cancel Order
                                    </Button>
                                )}
                                <Button size="sm" variant="ghost" className="rounded-xl h-9 text-xs sm:text-sm text-muted-foreground hover:text-primary hover:bg-accent/50 font-bold gap-1.5 group">
                                    View Details <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {ORDERS.length === 0 && (
                <div className="text-center py-16 bg-background rounded-3xl border border-border">
                    <p className="text-muted-foreground font-medium">No orders yet</p>
                    <Link href="/shop">
                        <Button className="mt-4 rounded-xl">Start Shopping</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
