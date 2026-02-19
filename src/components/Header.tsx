"use client"

import React, { useState } from "react"
import { Heart, MapPin, Package, ShoppingCart, User, Search, Menu, Bell, Calendar } from "lucide-react"
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
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import { PRODUCTS } from "@/utils/static-data"

// E-commerce menu items
const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/category" },
  { name: "Flash Sale", href: "/flashsale" },
  { name: "Contact", href: "/contactus" },
  { name: "Reels", href: "/reels" },
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
  const { totalItems: cartCount } = useCart()
  const { totalItems: wishlistCount } = useWishlist()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p className="hidden sm:block">Free shipping on orders over $50 🚚</p>
          <div className="flex items-center gap-4 ml-auto">
            <Link href="/faq" className="hover:text-primary-light transition-colors">Help</Link>
            <Link href="/track-order" className="hover:text-primary-light transition-colors">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* LEFT: Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
                🛒
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-primary">ShopNow</span>
                <p className="text-xs text-muted-foreground -mt-1">Your Store</p>
              </div>
            </Link>
          </div>

          {/* CENTER: Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 bg-muted/50 border-input focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 bg-primary hover:bg-primary/90"
              >
                Search
              </Button>
            </div>
          </form>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2">
            {/* Location */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden lg:flex gap-2 text-muted-foreground hover:text-foreground hover:bg-muted">
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
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground hover:bg-muted">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <Link href="/account" className="hover:text-primary transition-colors cursor-pointer">My Account</Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders" className="cursor-pointer">
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist" className="cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/auth" className="cursor-pointer">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Create Account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notification */}
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary hover:bg-primary/10">
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
              >
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Booking */}
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10">
              <Calendar className="h-5 w-5" />
              <span className="sr-only">Booking</span>
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-red-500 hover:bg-red-50"
              onClick={() => router.push("/wishlist")}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-red-500"
                >
                  {wishlistCount}
                </Badge>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-primary hover:bg-primary/10"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary"
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 h-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-primary font-medium">
                    <Menu className="h-4 w-4" />
                    All Categories
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  {shopCategories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <Link href={category.href} className="flex flex-col items-start py-3 cursor-pointer">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-xs text-muted-foreground">{category.description}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <nav className="flex items-center gap-1 ml-4 border-l border-border pl-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </nav>

            {/* Mobile & Tablet Right Side */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Search Toggle */}
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Search className="h-5 w-5" />
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
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
                  <form onSubmit={handleSearch} className="mt-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 bg-muted/50"
                      />
                    </div>
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="mt-6 space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Categories */}
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-sm font-semibold mb-3">Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {shopCategories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          className="px-3 py-2 text-sm text-muted-foreground bg-muted/50 rounded-md hover:text-primary transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Account */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-3 px-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Guest User</p>
                        <p className="text-xs text-muted-foreground">Sign in for better experience</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Link href="/auth">
                        <Button variant="outline" size="sm" className="flex-1">Sign In</Button>
                      </Link>
                      <Link href="/auth">
                        <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">Join Now</Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Quick Links */}
            <div className="hidden lg:flex items-center gap-4 text-sm">
              <Link href="/track-order" className="text-muted-foreground hover:text-primary transition-colors">
                <Package className="h-4 w-4 inline mr-1" />
                Track Order
              </Link>
              <Link href="/store" className="text-muted-foreground hover:text-primary transition-colors">
                Sell on ShopNow
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

