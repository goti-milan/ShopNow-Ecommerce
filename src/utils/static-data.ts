import { Product } from "./types";
import { Laptop, Shirt, Sofa, Sparkles, Trophy, Book } from "lucide-react";

export const CATEGORIES = [
  { name: "Electronics", slug: "electronics", icon: Laptop, count: 120, image: "https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", discount: "Up to 40% OFF" },
  { name: "Fashion", slug: "fashion", icon: Shirt, count: 350, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", discount: "Flat 30% OFF" },
  { name: "Home & Living", slug: "home", icon: Sofa, count: 200, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", discount: "20-50% OFF" },
  { name: "Beauty", slug: "beauty", icon: Sparkles, count: 80, image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", discount: "Min 25% OFF" },
  { name: "Sports", slug: "sports", icon: Trophy, count: 150, image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", discount: "Buy 1 Get 1" },
  { name: "Books", slug: "books", icon: Book, count: 50, image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", discount: "Flat 15% OFF" },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 23192,
    originalPrice: 28990,
    discountPercent: 20,
    badgeText: "20% OFF • Today",
  },
  {
    id: 2,
    title: "Apple iPad 10th Gen (64GB, Wi-Fi)",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 35999,
    originalPrice: 44900,
    discountPercent: 20,
    badgeText: "Hot Deal",
  },
  {
    id: 3,
    title: "Samsung Galaxy S23 5G (256GB)",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 64999,
    originalPrice: 79999,
    discountPercent: 19,
    badgeText: "Limited Stock",
  },
  {
    id: 4,
    title: "Nike Air Zoom Pegasus 40 Running Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 9995,
    originalPrice: 12995,
    discountPercent: 23,
    badgeText: "Best Seller",
  },
  {
    id: 5,
    title: "Boat Rockerz 550 Bluetooth Headphones",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 1799,
    originalPrice: 2999,
    discountPercent: 40,
    badgeText: "Mega Deal",
  },
  {
    id: 6,
    title: "Premium Leather Office Chair",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 12999,
    originalPrice: 15999,
    discountPercent: 18,
    badgeText: "New Arrival",
  },
  {
    id: 7,
    title: "Minimalist Wooden Dining Table",
    image: "https://images.unsplash.com/photo-1530018607912-eff23138842b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 8499,
    originalPrice: 9999,
    discountPercent: 15,
  },
  {
    id: 8,
    title: "MacBook Air M2 Chip",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 94990,
    originalPrice: 114990,
    discountPercent: 17,
    badgeText: "Apple Special",
  },
];

