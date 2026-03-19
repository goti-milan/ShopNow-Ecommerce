"use client"

import React, { useState } from "react"
import { Heart, MapPin, Package, ShoppingCart, User, Search, Menu, Bell } from "lucide-react"
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
import LocationSheet from "@/components/location/LocationSheet"
import { useLocation } from "@/context/LocationContext"
import { cn } from "@/lib/utils"
import { NOTIFICATIONS } from "@/utils/notifications"

// E-commerce menu items
const navItems = [
  { name: "Home", href: "/" },
  { name: "Shopping", href: "/shop" },
  { name: "Market", href: "/market" },
  { name: "Store", href: "/store" },
  { name: "Chat", href: "/chat" },
  { name: "News", href: "/news" },
  { name: "Reels", href: "/reels" },
  { name: "Video", href: "/video" },
  { name: "Live", href: "/live" },
  { name: "Services", href: "/booking" },
  { name: "Wallet", href: "/wallet" },
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
  const { location } = useLocation()
  const [searchQuery, setSearchQuery] = useState("")
  const unreadNotificationsCount = NOTIFICATIONS.filter((n) => !n.read).length

  const locationLabel = location?.address
    ? location.address.split(",").slice(0, 2).join(",").trim()
    : "Location"

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-white text-[10px] sm:text-sm py-2">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 sm:gap-4 overflow-hidden">
          <p className="hidden sm:block">Free shipping on orders over $50 🚚</p>
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            <Link href="/faq" className="hover:text-primary-light transition-colors">Help</Link>
            <Link href="/track-order" className="hover:text-primary-light transition-colors">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between gap-4 relative">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-2 lg:gap-4 lg:w-1/4">
            {/* Mobile Menu Trigger (Visible only on mobile) */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground -ml-2">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] sm:w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-semibold text-xl">
                        🛒
                      </div>
                      <span className="text-xl font-semibold text-primary">ShopNow</span>
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
                    <Link
                      href="/wishlist"
                      className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <Heart className="h-4 w-4" />
                        Wishlist
                      </span>
                      {wishlistCount > 0 && <Badge variant="secondary" className="h-5 min-w-5 flex items-center justify-center p-0 text-[10px]">{wishlistCount}</Badge>}
                    </Link>
                    <Link
                      href="/notifications"
                      className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <Bell className="h-4 w-4" />
                        Notifications
                      </span>
                      {unreadNotificationsCount > 0 && <Badge variant="secondary" className="h-5 min-w-5 flex items-center justify-center p-0 text-[10px]">{unreadNotificationsCount}</Badge>}
                    </Link>
                  </nav>

                  {/* Mobile Categories */}
                  <div className="mt-6 pt-6 border-t font-sans">
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
                  <div className="mt-6 pt-6 border-t font-sans">
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
                      <Link href="/auth" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                      </Link>
                      <Link href="/auth" className="flex-1">
                        <Button size="sm" className="w-full">Join Now</Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Logo (Left aligned on lg) */}
            <Link href="/" className="hidden lg:flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-semibold text-xl">
                🛒
              </div>
              <div>
                <span className="text-xl font-semibold text-primary">ShopNow</span>
                <p className="text-xs text-muted-foreground -mt-1">Your Store</p>
              </div>
            </Link>
          </div>

          {/* CENTER SECTION: Logo on mobile, Search on desktop */}
          <div className="flex-1 flex items-center justify-center md:max-w-xl">
            {/* Mobile Logo (Absolute center on small screens) */}
            <Link href="/" className="lg:hidden flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-semibold text-lg">
                🛒
              </div>
              <span className="text-lg font-bold text-primary tracking-tight">ShopNow</span>
            </Link>

            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="w-full hidden lg:block">
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
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2">
            {/* Location */}
            <LocationSheet
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden lg:flex gap-2 text-muted-foreground hover:text-foreground hover:bg-muted max-w-[220px]"
                >
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm truncate">
                    {locationLabel}
                  </span>
                </Button>
              }
            />

            {/* Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground hover:bg-muted hidden sm:flex">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-sm">Account</span>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-muted-foreground hover:text-primary hover:bg-primary/10 hidden md:flex"
                >
                  <Bell className="h-5 w-5" />
                  {unreadNotificationsCount > 0 ? (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                    >
                      {Math.min(9, unreadNotificationsCount)}
                      {unreadNotificationsCount > 9 ? "+" : null}
                    </Badge>
                  ) : null}
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96 max-w-[90vw] p-0">
                <div className="px-4 py-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">Notifications</p>
                    <p className="text-xs text-muted-foreground">
                      {unreadNotificationsCount} unread
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="max-h-[320px] overflow-y-auto">
                  {NOTIFICATIONS.slice(0, 5).map((n) => (
                    <DropdownMenuItem key={n.id} asChild className="cursor-pointer p-0">
                      <Link
                        href={n.href || "/notifications"}
                        className="w-full px-4 py-3 flex items-start gap-3"
                      >
                        <span
                          className={cn(
                            "mt-1.5 h-2 w-2 rounded-full shrink-0",
                            n.read ? "bg-muted-foreground/30" : "bg-primary"
                          )}
                          aria-hidden="true"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p
                              className={cn(
                                "text-sm truncate",
                                n.read ? "text-foreground" : "font-medium text-foreground"
                              )}
                            >
                              {n.title}
                            </p>
                            <span className="text-[10px] text-muted-foreground shrink-0">
                              {n.time}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {n.message}
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  {NOTIFICATIONS.length === 0 ? (
                    <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                      You&apos;re all caught up.
                    </div>
                  ) : null}
                </div>
                <div className="p-3 border-t border-border">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/notifications">View all</Link>
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-primary hidden sm:flex"
              onClick={() => router.push("/wishlist")}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent0"
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
        <div className="container mx-auto">
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
