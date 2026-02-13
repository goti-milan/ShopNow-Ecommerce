"use client"

import React from "react"
import { Heart, MapPin, Package, ShoppingCart, User, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// E-commerce menu items
const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop", dropdown: true },
  { name: "Categories", href: "/category", dropdown: true },
  { name: "Flash Sale", href: "/flashsale" },
  { name: "Contact", href: "/contactus" },
]

const shopCategories = [
  { name: "Electronics", href: "/category/electronics", description: "Phones, laptops & gadgets" },
  { name: "Fashion", href: "/category/fashion", description: "Clothing, shoes & accessories" },
  { name: "Home & Living", href: "/category/home", description: "Furniture & decor" },
  { name: "Beauty", href: "/category/beauty", description: "Skincare & makeup" },
  { name: "Sports", href: "/category/sports", description: "Equipment & gear" },
  { name: "Books", href: "/category/books", description: "Books & media" },
]

const Header = () => {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p className="hidden sm:block">Free shipping on orders over $50 🚚</p>
          <div className="flex items-center gap-4 ml-auto">
            <a href="#" className="hover:text-primary-light transition-colors">Help</a>
            <a href="#" className="hover:text-primary-light transition-colors">Track Order</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* LEFT: Logo */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
                🛒
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-text-primary">ShopNow</span>
                <p className="text-xs text-text-muted -mt-1">Your Store</p>
              </div>
            </a>
          </div>

          {/* CENTER: Search */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                type="search"
                placeholder="Search products, brands, categories..."
                className="w-full pl-10 pr-4 bg-bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 bg-primary hover:bg-primary-dark"
              >
                Search
              </Button>
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2">
            {/* Location */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden lg:flex gap-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">Location</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Delivery Location</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Detect Current Location</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>New York, NY</DropdownMenuItem>
                <DropdownMenuItem>Los Angeles, CA</DropdownMenuItem>
                <DropdownMenuItem>Chicago, IL</DropdownMenuItem>
                <DropdownMenuItem>Miami, FL</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <a href="/account" className="hover:text-primary transition-colors cursor-pointer">My Account</a>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/account/orders" className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/wishlist" className="cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/auth" className="cursor-pointer">Sign In</a>
                </DropdownMenuItem>
                <DropdownMenuItem>Create Account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative text-text-secondary hover:text-error hover:bg-error/10">
              <Heart className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-error"
              >
                2
              </Badge>
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-text-secondary hover:text-primary hover:bg-primary/10"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge
                variant="default"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary"
              >
                5
              </Badge>
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-border bg-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 h-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1 text-text-secondary hover:text-primary font-medium">
                    <Menu className="h-4 w-4" />
                    All Categories
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  {shopCategories.map((category) => (
                    <DropdownMenuItem key={category.name} className="flex flex-col items-start py-3">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs text-text-muted">{category.description}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <nav className="flex items-center gap-1 ml-4 border-l border-border pl-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </nav>

            {/* Mobile & Tablet Right Side */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Search Toggle */}
              <Button variant="ghost" size="icon" className="text-text-secondary">
                <Search className="h-5 w-5" />
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-text-secondary">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
                        🛒
                      </div>
                      <span className="text-xl font-bold text-primary">ShopNow</span>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Mobile Search */}
                  <div className="mt-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full pl-10 bg-bg-secondary"
                      />
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="mt-6 space-y-1">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-surface-hover rounded-md transition-colors"
                      >
                        {item.name}
                        {item.dropdown && (
                          <span className="text-text-muted">›</span>
                        )}
                      </a>
                    ))}
                  </nav>

                  {/* Mobile Categories */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="text-sm font-semibold text-text-primary mb-3">Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {shopCategories.map((cat) => (
                        <a
                          key={cat.name}
                          href={cat.href}
                          className="px-3 py-2 text-sm text-text-secondary bg-bg-secondary rounded-md hover:text-primary transition-colors"
                        >
                          {cat.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Account */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-3 px-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-text-primary">Guest User</p>
                        <p className="text-xs text-text-muted">Sign in for better experience</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">Sign In</Button>
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary-dark">Join Now</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Quick Links */}
            <div className="hidden lg:flex items-center gap-4 text-sm">
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Package className="h-4 w-4 inline mr-1" />
                Track Order
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                Sell on ShopNow
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
