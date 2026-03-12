"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import OrderHistory from "@/components/account/OrderHistory";

export default function OrdersPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/account">
                            <Button variant="ghost" size="icon" className="rounded-xl">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
                    </div>
                    <Link href="/shop">
                        <Button variant="outline" className="rounded-xl gap-2">
                            Shop More <ChevronRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="max-w-5xl mx-auto">
                    <OrderHistory showHeader={false} />
                    <div className="text-center mt-8">
                        <p className="text-gray-500 mb-4">You have reached the end of your orders.</p>
                        <Link href="/shop">
                            <Button className="rounded-xl">Continue Shopping</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
