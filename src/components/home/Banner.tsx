"use client";

import { ChevronRight, Zap } from "lucide-react";

export default function Banner() {
  return (
    <div className="relative bg-pink-300 text-white overflow-hidden py-16 md:py-24 rounded-lg mt-6 mb-8">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-10 rounded-full -ml-40 -mb-40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6,xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase tracking-widest">Limited Time Offer</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Summer Sale Up to 50% Off
        </h1>

        <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl">
          Discover our exclusive collection of premium products at unbeatable prices. Shop now and save big on your favorite items!
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2">
            Shop Now
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/20">
          <div>
            <p className="text-3xl font-bold">2M+</p>
            <p className="text-orange-100 text-sm">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl font-bold">50K+</p>
            <p className="text-orange-100 text-sm">Products</p>
          </div>
          <div>
            <p className="text-3xl font-bold">24/7</p>
            <p className="text-orange-100 text-sm">Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}
