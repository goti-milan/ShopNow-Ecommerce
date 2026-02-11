"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function DealOfWeek() {
    return (
        <section className="w-full py-24 bg-secondary overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content Side */}
                    <div className="space-y-8 relative z-10 px-4 lg:px-0 text-center lg:text-left">
                        <div className="inline-block">
                            <span className="text-white/90 font-bold tracking-widest text-sm uppercase mb-2 block">
                                Limited Time Offer
                            </span>
                            <h2 className="text-5xl md:text-7xl font-bold text-primary tracking-tight leading-none mb-4">
                                Future of <br /> <span className="text-white">Sound</span>
                            </h2>
                        </div>

                        <p className="text-lg text-white/85 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Experience audio like never before. Our premium noise-cancelling headphones deliver simplified, high-fidelity sound in a lightweight, comfortable design.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-primary hover:bg-white/90 shadow-lg transition-all duration-300">
                                Buy Now - $299
                            </Button>
                            <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full bg-primary text-white hover:bg-white hover:text-black transition-all duration-300">
                                View Details
                            </Button>
                        </div>

                        <div className="pt-8 flex items-center justify-center lg:justify-start gap-12 opacity-90">
                            <div>
                                <p className="text-3xl font-bold text-white">40h</p>
                                <p className="text-sm text-white/70">Battery Life</p>
                            </div>
                            <div className="w-px h-12 bg-white/30"></div>
                            <div>
                                <p className="text-3xl font-bold text-white">0.2s</p>
                                <p className="text-sm text-white/70">Latency</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="relative h-[500px] lg:h-[700px] w-full flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden group border border-white/20">
                        <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl transform scale-75 animate-pulse"></div>
                        <Image
                            src="/product.png"
                            alt="Premium Headphones"
                            fill
                            className="object-contain p-12 transition-transform duration-700 ease-out group-hover:scale-105 z-10 drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
