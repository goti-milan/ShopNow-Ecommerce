"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ProductTabsProps {
    description: string;
    specifications: Record<string, string>;
    reviews: any[];
}

export const ProductTabs = ({ description, specifications, reviews }: ProductTabsProps) => {
    return (
        <div className="w-full mt-4 border border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="bg-white p-0 rounded-none flex w-full h-auto border-b border-slate-100">
                    <TabsTrigger
                        value="description"
                        className="flex-1 py-3 text-[10px] font-bold uppercase tracking-tight data-[state=active]:text-[#f36f21] data-[state=active]:border-b-2 data-[state=active]:border-[#f36f21] rounded-none bg-transparent"
                    >
                        Description
                    </TabsTrigger>
                    <TabsTrigger
                        value="specifications"
                        className="flex-1 py-3 text-[10px] font-bold uppercase tracking-tight data-[state=active]:text-[#f36f21] data-[state=active]:border-b-2 data-[state=active]:border-[#f36f21] rounded-none bg-transparent"
                    >
                        Specifications
                    </TabsTrigger>
                    <TabsTrigger
                        value="reviews"
                        className="flex-1 py-3 text-[10px] font-bold uppercase tracking-tight data-[state=active]:text-[#f36f21] data-[state=active]:border-b-2 data-[state=active]:border-[#f36f21] rounded-none bg-transparent"
                    >
                        Reviews ({reviews.length || 5134})
                    </TabsTrigger>
                </TabsList>

                <div className="p-4">
                    <TabsContent value="description" className="focus-visible:outline-none">
                        <p className="text-xs text-slate-600 leading-normal">
                            {description || "Premium noise-cancelling wireless headphones with LDAC and 30-hour battery."}
                        </p>
                </TabsContent>

                <TabsContent value="specifications" className="focus-visible:outline-none">
                    <div className="space-y-2">
                        {Object.entries(specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-1 border-b border-slate-50 text-[10px]">
                                <span className="text-slate-500">{key}</span>
                                <span className="text-slate-900 font-bold">{value}</span>
                            </div>
                        ))}
                   </div>
               </TabsContent>

                <TabsContent value="reviews" className="focus-visible:outline-none">
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-slate-900">User {i}</span>
                                        <div className="bg-green-600 text-[8px] text-white px-1 rounded font-bold">5.0 ★</div>
                                    </div>
                                    <p className="text-[10px] text-slate-600 italic">"Great product, highly recommended!"</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};
