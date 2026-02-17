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
        <div className="w-full mt-24 bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm">
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="bg-slate-50 p-2 rounded-2xl mb-12 flex w-fit max-w-full overflow-x-auto no-scrollbar border border-slate-100">
                    <TabsTrigger value="description" className="rounded-xl px-10 py-3.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300 font-bold text-slate-500">
                        Description
                    </TabsTrigger>
                    <TabsTrigger value="specifications" className="rounded-xl px-10 py-3.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300 font-bold text-slate-500">
                        Specifications
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="rounded-xl px-10 py-3.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300 font-bold text-slate-500">
                        Reviews ({reviews.length || 3})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-8 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="max-w-4xl">
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-6">Product Experience</h3>
                        <p className="text-slate-600 leading-loose text-lg">
                            {description || "Discover a new level of excellence with this meticulously crafted product. Designed for those who demand the best, it combines form and function in a way that feels both timeless and innovative."}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-2">Key Highlights</h4>
                                <ul className="space-y-2 text-slate-600">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Premium build quality</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Ergonomic design focus</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Industry-leading performance</li>
                                </ul>
                            </div>
                            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                                <h4 className="font-bold text-slate-900 mb-2">Inside the Box</h4>
                                <ul className="space-y-2 text-slate-600">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> 1x Main Unit</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Premium Charging Cable</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Quick Start Guide</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="specifications" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
                        {Object.entries(specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-4 border-b border-slate-100">
                                <span className="font-bold text-slate-500">{key}</span>
                                <span className="text-slate-900 font-semibold">{value}</span>
                            </div>
                        ))}
                        {Object.keys(specifications).length === 0 && (
                            <p className="text-slate-500 italic">Advanced technical specifications available upon request.</p>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="reviews" className="focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="space-y-12">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Customer Reviews</h3>
                                <p className="text-slate-500">Join over 1,000 satisfied customers</p>
                            </div>
                            <Button className="rounded-2xl px-8 font-bold shadow-lg shadow-primary/20">Write a Review</Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 group">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center font-bold text-primary border border-slate-100 group-hover:scale-110 transition-transform">
                                            {i === 1 ? 'AS' : i === 2 ? 'MK' : 'RV'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{i === 1 ? 'Arjun Sharma' : i === 2 ? 'Meera Kapoor' : 'Rahul Verma'}</h4>
                                            <div className="flex text-yellow-400 text-xs mt-0.5">★★★★★</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 italic leading-relaxed">
                                        "{i === 1
                                            ? "The quality is unmatched for this price. Truly a premium experience from unboxing to daily use."
                                            : i === 2
                                                ? "Stunning design and works flawlessly. Fast delivery and great customer support!"
                                                : "A must-have! I've tried many similar products but this one stands out in every category."}"
                                    </p>
                                    <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-400 font-medium">
                                        Verified Purchase • {i} week{i > 1 ? 's' : ''} ago
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};
