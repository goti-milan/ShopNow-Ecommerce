import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const ORDERS = [
    {
        id: 1001,
        date: "Feb 20, 2026",
        status: "Delivered",
        statusColor: "bg-emerald-100 text-emerald-700",
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
        statusColor: "bg-amber-100 text-amber-700",
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
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Order History</h2>
                        <p className="text-sm text-gray-500">Track and manage your recent orders.</p>
                    </div>
                    <Link href="/shop">
                        <Button variant="outline" className="rounded-xl gap-2">
                            Shop More <ChevronRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            )}

            {ORDERS.map((order) => (
                <div key={order.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">Order #{order.id}</p>
                            <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                        </div>
                        <span className={`text-sm font-semibold px-4 py-1.5 rounded-full ${order.statusColor}`}>
                            {order.status}
                        </span>
                    </div>

                    <div className="mt-6 border border-gray-100 rounded-2xl p-4">
                        <div className="space-y-4">
                            {order.items.map((item, index) => (
                                <div key={item.id} className={`flex items-center justify-between gap-4 ${index !== order.items.length - 1 ? "border-b border-gray-100 pb-4" : ""}`}>
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                        </div>
                                    </div>
                                    {item.price > 0 ? (
                                        <p className="font-semibold text-gray-900">₹{item.price.toLocaleString()}</p>
                                    ) : (
                                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-500">Total: <span className="font-semibold text-gray-900">₹{order.total.toLocaleString()}</span></p>
                            <p className="text-sm text-gray-500">Total: <span className="font-semibold text-gray-900">₹{order.total.toLocaleString()}</span></p>
                        </div>
                    </div>

                    <div className="mt-5 text-sm text-gray-500 space-y-1">
                        <p>{order.note}</p>
                        <p>{order.noteSecondary}</p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 justify-end">
                        {order.status === "Delivered" && (
                            <>
                                <Button variant="outline" className="rounded-xl">Return</Button>
                                <Button variant="outline" className="rounded-xl">Review</Button>
                                <Button className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white">Buy Again</Button>
                            </>
                        )}
                        {order.status === "Processing" && (
                            <Button variant="outline" className="rounded-xl border-red-200 text-red-500 hover:bg-red-50">
                                Cancel Order
                            </Button>
                        )}
                        <Button variant="outline" className="rounded-xl gap-2 text-blue-600 border-blue-100 hover:bg-blue-50">
                            View Order <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}

            {ORDERS.length === 0 && (
                <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
                    <p className="text-gray-500 font-medium">No orders yet</p>
                    <Link href="/shop">
                        <Button className="mt-4 rounded-xl">Start Shopping</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
