"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Zap, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";

type BannerSlide = {
  id: number;
  badge: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  bgGradient: string;
  shadowColor: string;
};

const slides: BannerSlide[] = [
  {
    id: 1,
    badge: "Limited Time Offer",
    title: "Summer Sale Up to 50% Off",
    description: "Discover our exclusive collection of premium products at unbeatable prices. Shop now and save big on your favorite items!",
    stats: [
      { value: "2M+", label: "Happy Customers" },
      { value: "50K+", label: "Products" },
      { value: "24/7", label: "Support" },
    ],
    bgGradient: "from-primary via-primary to-orange-600",
    shadowColor: "shadow-primary/20",
  },
  {
    id: 2,
    badge: "New Arrivals",
    title: "Explore the Latest Trends",
    description: "Be the first to discover our newest collection of innovative products designed for modern living.",
    stats: [
      { value: "500+", label: "New Items" },
      { value: "100+", label: "Brands" },
      { value: "Free", label: "Shipping" },
    ],
    bgGradient: "from-blue-600 via-blue-700 to-skyblue-800",
    shadowColor: "shadow-blue-600/20",
  },
  {
    id: 3,
    badge: "Customer Choice",
    title: "Premium Quality Guaranteed",
    description: "Experience excellence with our handpicked selection of top-rated products that our customers love.",
    stats: [
      { value: "4.9★", label: "Rating" },
      { value: "98%", label: "Satisfaction" },
      { value: "30D", label: "Returns" },
    ],
    bgGradient: "from-emerald-600 via-teal-700 to-cyan-800",
    shadowColor: "shadow-emerald-600/20",
  },
];

function SlideNavigation({
  slides,
  currentSlide,
  onDotClick,
}: {
  slides: BannerSlide[];
  currentSlide: number;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
              ? "bg-white scale-110"
              : "bg-white/50 hover:bg-white/70"
            }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

function ArrowButton({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction: "left" | "right";
}) {
  const isLeft = direction === "left";
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${isLeft ? "left-4" : "right-4"
        }`}
      aria-label={isLeft ? "Previous slide" : "Next slide"}
    >
      {isLeft ? (
        <ChevronLeft className="w-6 h-6 text-white" />
      ) : (
        <ChevronRightIcon className="w-6 h-6 text-white" />
      )}
    </button>
  );
}

function SlideContent({ slide }: { slide: BannerSlide }) {
  return (
    <>
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 blur-3xl rounded-full -mr-48 -mt-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 blur-3xl rounded-full -ml-40 -mb-40 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase tracking-widest">{slide.badge}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {slide.title}
        </h1>

        <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
          {slide.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-background text-foreground px-8 py-3 rounded-lg font-bold hover:bg-muted transition flex items-center justify-center gap-2">
            Shop Now
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="border-2 border-background text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-background hover:text-foreground transition">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-primary-foreground/20">
          {slide.stats.map((stat, index) => (
            <div key={index}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-primary-foreground/80 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

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
    <div className="relative overflow-hidden">
      <div
        className={`relative bg-gradient-to-br ${slides[currentSlide].bgGradient} text-primary-foreground overflow-hidden px-4 py-16 md:py-24 shadow-2xl ${slides[currentSlide].shadowColor} transition-all duration-500`}
      >
        <SlideContent slide={slides[currentSlide]} />

        <ArrowButton direction="left" onClick={goToPrevious} />
        <ArrowButton direction="right" onClick={goToNext} />
        <SlideNavigation
          slides={slides}
          currentSlide={currentSlide}
          onDotClick={goToSlide}
        />
      </div>
    </div>
  );
}
