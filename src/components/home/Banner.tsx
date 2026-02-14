"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Zap, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import Image from "next/image";

type BannerSlide = {
  id: number;
  badge: string;
  title: string;
  description: string;
  image: string;
  bgGradient: string;
  shadowColor: string;
};

const slides: BannerSlide[] = [
  {
    id: 1,
    badge: "Limited Time Offer",
    title: "Summer Sale Up to 50% Off",
    description: "Discover our exclusive collection of premium products at unbeatable prices. Shop now and save big on your favorite items!",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bgGradient: "from-primary via-primary/90 to-primary/80",
    shadowColor: "shadow-primary/20",
  },
  {
    id: 2,
    badge: "New Arrivals",
    title: "Explore the Latest Trends",
    description: "Be the first to discover our newest collection of innovative products designed for modern living.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bgGradient: "from-blue-600 via-blue-700 to-blue-800",
    shadowColor: "shadow-blue-600/20",
  },
  {
    id: 3,
    badge: "Customer Choice",
    title: "Premium Quality Guaranteed",
    description: "Experience excellence with our handpicked selection of top-rated products that our customers love.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bgGradient: "from-emerald-600 via-emerald-700 to-emerald-800",
    shadowColor: "shadow-emerald-600/20",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl my-6">
      <div
        className={`relative w-full px-6 py-12 md:py-20 transition-all duration-700 ease-in-out bg-gradient-to-r ${slides[currentSlide].bgGradient}`}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

            {/* Text Content */}
            <div className={`flex-1 text-white z-10 transition-all duration-500 transform translate-x-0 opacity-100`}>
              <div className="flex items-center gap-2 mb-4 bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span className="text-sm font-semibold tracking-wide uppercase">{slides[currentSlide].badge}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-sm">
                {slides[currentSlide].title}
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg flex items-center gap-2">
                  Shop Now
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
                <button className="bg-transparent border-2 border-white/30 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-all duration-300">
                  View Collections
                </button>
              </div>
            </div>

            {/* Image Content */}
            <div className="flex-1 relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent rounded-2xl z-0 transform rotate-3 scale-95 opacity-50 blur-sm"></div>
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 hover:scale-[1.02] border-4 border-white/10">
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-white/10 z-20 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-white/10 z-20 group"
        >
          <ChevronRightIcon className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
            />
          ))}
        </div>

        {/* Background blobs for depth */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>

      </div>
    </div>
  );
}
