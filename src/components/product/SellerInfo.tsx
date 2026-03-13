"use client";

import { Star, MessageSquare, Store, ShieldCheck, Package, Phone, Mail, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";


export const SellerInfo = () => {
    return (
        <div className="flex flex-col gap-5 p-6 bg-background border border-border rounded-3xl shadow-sm mt-6">
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-foreground uppercase tracking-widest">Seller Information</span>
                <div className="flex items-center gap-1 bg-accent text-primary-dark px-2 py-0.5 rounded text-[10px] font-bold border border-primary/20 uppercase tracking-tighter">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    Top Rated Seller
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-14 h-14 relative rounded-xl border border-border overflow-hidden shrink-0 bg-muted flex items-center justify-center">
                    <Store className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-foreground">TechWorld Electronics</h4>
                        <div className="flex items-center gap-1 text-primary">
                            <span className="text-xs font-black">4.9</span>
                            <Star className="w-3 h-3 fill-current" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 bg-accent text-primary px-1.5 py-0.5 rounded text-[9px] font-bold border border-primary/20 uppercase tracking-tighter">
                            <ShieldCheck className="w-2.5 h-2.5" />
                            8+ Years Experience
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent0" />
                    <span className="text-xs font-bold text-foreground">95% Positive Reviews (12,340 Sales)</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-10 rounded-xl border-primary text-primary-dark hover:bg-accent font-black text-xs uppercase bg-accent0 text-white border-none hover:bg-primary-dark">
                        Visit Shop
                    </Button>
                    <Button variant="outline" className="h-10 rounded-xl border-border text-muted-foreground hover:bg-muted font-black text-xs uppercase flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat with Seller
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-foreground uppercase">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-foreground uppercase">Great Packaging</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    391.98565.49310
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    Support@incsofy.com
                </div>
            </div>
        </div>
    );
};
