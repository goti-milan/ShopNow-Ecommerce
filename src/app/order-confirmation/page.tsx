"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    XCircle,
    ArrowLeft,
    ShoppingBag,
    Package,
    Truck,
    CreditCard,
    Home,
    AlertCircle,
    ArrowRight,
    RefreshCw
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="w-10 h-10 text-[#f47424] animate-spin" />
                    <p className="font-bold text-gray-500 italic">Processing order details...</p>
                </div>
            </div>
        }>
            <OrderConfirmationContent />
        </Suspense>
    );
}

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const status = searchParams.get("status") || "success";

    const [orderId, setOrderId] = useState<string>("");
    const [currentTime, setCurrentTime] = useState<string>("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setOrderId(searchParams.get("orderId") || "SN-" + Math.random().toString(36).substring(2, 9).toUpperCase());
        setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, [searchParams]);

    const isSuccess = status === "success";

    if (!mounted) {
        return (
            <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
                <RefreshCw className="w-10 h-10 text-[#f47424] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f1f3f6] pb-20 pt-12 font-sans">
            <div className="container mx-auto px-4 max-w-4xl">
                {isSuccess ? (
                    /* SUCCESS STATE */
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Status Card */}
                        <div className="bg-white rounded-[40px] shadow-2xl shadow-orange-100 overflow-hidden border border-white">
                            <div className="bg-[#2d3139] p-12 text-center relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 left-0 w-64 h-64 bg-[#f47424]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f47424]/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

                                <div className="relative z-10 space-y-6">
                                    <div className="inline-flex items-center justify-center w-24 h-24 bg-[#f47424] rounded-full shadow-2xl shadow-orange-500/50 mb-4 animate-bounce">
                                        <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
                                    </div>
                                    <h1 className="text-5xl font-black text-white tracking-tighter italic">Order Confirmed!</h1>
                                    <p className="text-gray-400 text-lg font-bold max-w-md mx-auto">
                                        Your order has been placed successfully and will be processed soon.
                                    </p>
                                    <div className="inline-block bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                        <span className="text-gray-400 font-bold text-sm uppercase tracking-widest mr-2">Order ID:</span>
                                        <span className="text-white font-black text-xl tracking-wide">{orderId}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 space-y-10">
                                {/* Next Steps */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-100 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                                            <Package className="w-6 h-6 text-[#f47424]" />
                                        </div>
                                        <h3 className="font-black text-gray-900 text-lg">Processing</h3>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">{"We're getting your items ready for quality check and packaging."}</p>
                                    </div>
                                    <div className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-100 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                                            <Truck className="w-6 h-6 text-[#f47424]" />
                                        </div>
                                        <h3 className="font-black text-gray-900 text-lg">Shipping</h3>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">Your package will be handed over to our delivery partner shortly.</p>
                                    </div>
                                    <div className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-100 space-y-4 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                                            <Home className="w-6 h-6 text-[#f47424]" />
                                        </div>
                                        <h3 className="font-black text-gray-900 text-lg">Delivery</h3>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">Estimated delivery in <span className="text-[#f47424] font-black italic underline decoration-2 underline-offset-4">3-5 business days</span>.</p>
                                    </div>
                                </div>

                                {/* Order Info */}
                                <div className="bg-[#2d3139] p-8 rounded-[32px] text-white flex flex-col md:flex-row justify-between items-center gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                                            <CreditCard className="w-7 h-7 text-[#f47424]" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Payment Method</p>
                                            <p className="text-lg font-bold">Credit Card •••• 4242</p>
                                        </div>
                                    </div>
                                    <div className="h-px w-full md:h-12 md:w-px bg-white/10" />
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                                            <ShoppingBag className="w-7 h-7 text-[#f47424]" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Amount Paid</p>
                                            <p className="text-2xl font-black italic tracking-tighter">₹45,990.00</p>
                                        </div>
                                    </div>
                                    <Link href="/account/orders" className="w-full md:w-auto">
                                        <Button className="w-full bg-[#f47424] hover:bg-[#e0661e] text-white font-black px-8 py-7 rounded-2xl shadow-lg shadow-orange-500/20 transform hover:-translate-y-1 transition-all active:scale-95 text-lg">
                                            View Order <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                </div>

                                <div className="pt-4 flex flex-col items-center gap-4">
                                    <p className="text-gray-400 font-bold text-center italic">
                                        A confirmation email has been sent to your registered email address.
                                    </p>
                                    <Link href="/">
                                        <Button variant="ghost" className="text-[#2d3139] hover:text-[#f47424] font-black gap-2 text-lg">
                                            <ArrowLeft className="w-5 h-5" /> Back to Home
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* FAILED STATE */
                    <div className="space-y-8 animate-in zoom-in-95 duration-500">
                        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border-2 border-red-50">
                            <div className="bg-red-500 p-16 text-center relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />

                                <div className="relative z-10 space-y-6">
                                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-2xl shadow-red-500/50 mb-4 animate-pulse">
                                        <XCircle className="w-14 h-14 text-red-500" strokeWidth={2.5} />
                                    </div>
                                    <h1 className="text-5xl font-black text-white tracking-tighter italic">Payment Failed</h1>
                                    <p className="text-red-100 text-xl font-bold max-w-sm mx-auto">
                                        {"We couldn't process your payment. Don't worry, no money was debited from your account."}
                                    </p>
                                </div>
                            </div>

                            <div className="p-12 text-center space-y-10">
                                <div className="max-w-md mx-auto space-y-6">
                                    <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-start gap-4 text-left">
                                        <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                                        <div className="space-y-1">
                                            <h4 className="font-black text-red-900 uppercase tracking-wide text-sm">Suggested Reason</h4>
                                            <p className="text-red-700/80 font-bold text-sm leading-relaxed">
                                                The transaction was declined by your bank or the card issuer. This could be due to insufficient funds, invalid card details, or internet connectivity issues.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Error Code</p>
                                            <p className="font-bold text-gray-900 tracking-wider">ERR_TRANS_901</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Time</p>
                                            <p className="font-bold text-gray-900 tracking-wider">{currentTime}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button
                                        onClick={() => router.push('/cart')}
                                        className="bg-[#2d3139] hover:bg-black text-white font-black px-10 py-8 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-all active:scale-95 text-xl flex-1 sm:flex-none uppercase tracking-tighter"
                                    >
                                        <RefreshCw className="mr-2 w-5 h-5" /> Retry Payment
                                    </Button>
                                    <Link href="/" className="flex-1 sm:flex-none">
                                        <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50 text-gray-600 font-black px-10 py-8 rounded-2xl text-xl uppercase tracking-tighter">
                                            Cancel Order
                                        </Button>
                                    </Link>
                                </div>

                                <div className="pt-4">
                                    <p className="text-gray-400 font-bold italic">
                                        Need help? Contact our <Link href="/contactus" className="text-red-500 underline underline-offset-4 decoration-2">support team</Link> or call <span className="text-black not-italic font-black">+91 0000 000 000</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
