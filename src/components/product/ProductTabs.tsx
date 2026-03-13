"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTabsProps {
    description: string;
    specifications: Record<string, string>;
}

export const ProductTabs = ({ description, specifications }: ProductTabsProps) => {
    return (
        <div className="w-full mt-24 bg-background rounded-[3rem] p-8 md:p-12 border border-border shadow-sm">
            <Tabs defaultValue="description" className="w-full">
                <TabsList className="bg-muted p-2 rounded-2xl mb-12 flex w-fit max-w-full overflow-x-auto no-scrollbar border border-border">
                    <TabsTrigger value="description" className="rounded-xl px-10 py-3.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300 font-bold text-muted-foreground">
                        Description
                    </TabsTrigger>
                    <TabsTrigger value="specifications" className="rounded-xl px-10 py-3.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300 font-bold text-muted-foreground">
                        Specifications
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-8 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="max-w-4xl">
                        <h3 className="text-2xl font-extrabold text-foreground mb-6">Product Experience</h3>
                        <p className="text-muted-foreground leading-loose text-lg">
                            {description || "Discover a new level of excellence with this meticulously crafted product. Designed for those who demand the best, it combines form and function in a way that feels both timeless and innovative."}
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="specifications" className="focus-visible:outline-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {Object.entries(specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-3 border-b border-slate-50 text-sm">
                                <span className="text-muted-foreground font-medium">{key}</span>
                                <span className="text-foreground font-bold">{value}</span>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};
