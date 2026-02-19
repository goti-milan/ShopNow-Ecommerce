"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                    </div>
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
                                </div>
                            ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};
