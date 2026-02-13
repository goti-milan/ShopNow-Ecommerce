"use client";

import { Button } from "@/components/ui/button";
import { Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/account">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">My Order History</h1>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
                {[1, 2, 3].map((order) => (
                    <div key={order} className="border rounded-lg p-4 flex gap-4 items-center bg-card hover:shadow-sm transition-shadow">
                        <div className="p-3 bg-muted rounded-md hidden sm:block">
                            <Package className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between mb-1">
                                <span className="font-bold">Order #{1000 + order}</span>
                                <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Delivered</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Placed on Oct {10 + order}, 2024</p>
                            <p className="text-xs text-muted-foreground mt-1">3 Items • Shipped to Home</p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                            <p className="font-bold">₹{(2000 * order).toLocaleString()}</p>
                            <Button variant="outline" size="sm" className="h-8">View Details</Button>
                        </div>
                    </div>
                ))}

                <div className="text-center mt-8">
                    <p className="text-muted-foreground mb-4">You have reached the end of your orders.</p>
                    <Link href="/shop">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
