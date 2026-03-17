"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import OrderHistory from "@/components/account/OrderHistory";
import {
    LogOut,
    MapPin,
    Package,
    User,
    Settings,
    Wrench,
    Bell,
    Shield,
    Trash2,
    CheckCircle2,
    Clock,
    Star,
    Heart,
    Tag,
    LifeBuoy,
    CreditCard,
    Share2,
    Link2,
    QrCode,
    CalendarDays,
    MailCheck,
    Smartphone,
    Globe,
    Eye,
    EyeOff,
    Camera,
    ArrowLeft,
    Map,
    MapPinned,
    Check,
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const SERVICE_BOOKINGS = [
    { id: "SB001", name: "Deep Home Cleaning", provider: "CleanPro Services", date: "Mar 5, 2026", time: "10:00 AM", amount: 1499, status: "Upcoming", statusColor: "bg-accent text-primary-dark", rating: null },
    { id: "SB002", name: "Personal Training Session", provider: "FitLife Pro", date: "Feb 22, 2026", time: "07:00 AM", amount: 999, status: "Completed", statusColor: "bg-accent text-primary-dark", rating: 5 },
    { id: "SB003", name: "Hair Cut & Styling", provider: "StyleHub", date: "Feb 15, 2026", time: "02:00 PM", amount: 599, status: "Completed", statusColor: "bg-accent text-primary-dark", rating: 4 },
    { id: "SB004", name: "Laptop/PC Repair", provider: "TechFix", date: "Jan 28, 2026", time: "11:00 AM", amount: 599, status: "Cancelled", statusColor: "bg-accent text-primary-dark", rating: null },
];

const FAVOURITES = [
    { id: "FAV-001", name: "Noise Cancelling Headphones", category: "Electronics", price: 8999, rating: 5 },
    { id: "FAV-002", name: "Minimalist Leather Wallet", category: "Accessories", price: 1299, rating: 4 },
    { id: "FAV-003", name: "Smart Home Security Camera", category: "Home", price: 3499, rating: 4 },
    { id: "FAV-004", name: "Ergonomic Office Chair", category: "Furniture", price: 12499, rating: 5 },
];

const DISCOUNTS = [
    { id: "DISC-1", code: "SHOPNOW15", title: "15% off on electronics", expiry: "Apr 30, 2026", minSpend: 4999, status: "Active" },
    { id: "DISC-2", code: "FREESHIP", title: "Free shipping on orders over ₹999", expiry: "May 15, 2026", minSpend: 999, status: "Active" },
    { id: "DISC-3", code: "WELCOME250", title: "₹250 off on first purchase", expiry: "Mar 31, 2026", minSpend: 1499, status: "Active" },
    { id: "DISC-4", code: "SERVE10", title: "10% off on service bookings", expiry: "Feb 28, 2026", minSpend: 799, status: "Expired" },
];

const SUPPORT_CARDS = [
    { id: "sup-1", title: "Order & Delivery", description: "Track shipments, change delivery dates, or report delays." },
    { id: "sup-2", title: "Returns & Refunds", description: "Start a return, check refund status, or update pickup details." },
    { id: "sup-3", title: "Payments & Billing", description: "Payment issues, invoices, and billing address updates." },
];

const PAYMENT_METHODS = [
    { id: "pm-1", type: "Visa", last4: "4521", expiry: "08/28", default: true },
    { id: "pm-2", type: "Mastercard", last4: "9912", expiry: "11/27", default: false },
    { id: "pm-3", type: "UPI", last4: "john@upi", expiry: "Auto-pay", default: false },
];

// ─── SWITCH COMPONENT ─────────────────────────────────────────────────────────
function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
    return (
        <button
            id={id}
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 ${checked ? "bg-primary" : "bg-muted"}`}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-background shadow-md transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
            />
        </button>
    );
}

// ─── SETTINGS ROW ─────────────────────────────────────────────────────────────
function SettingRow({ icon: Icon, label, description, children }: { icon: React.ElementType; label: string; description?: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-border last:border-0 gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    {description && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>}
                </div>
            </div>
            <div className="flex-shrink-0">{children}</div>
        </div>
    );
}

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`h-3.5 w-3.5 ${s <= rating ? "fill-primary text-primary" : "text-gray-200 fill-gray-200"}`} />
            ))}
        </div>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AccountPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [addressType, setAddressType] = useState<"home" | "office" | "other">("home");

    // Notification preferences
    const [notifOrderUpdates, setNotifOrderUpdates] = useState(true);
    const [notifPromotions, setNotifPromotions] = useState(false);
    const [notifSMS, setNotifSMS] = useState(true);
    const [notifNewsletter, setNotifNewsletter] = useState(false);
    const [notifServiceReminders, setNotifServiceReminders] = useState(true);
    const [notifAppPush, setNotifAppPush] = useState(true);
    const [twoFA, setTwoFA] = useState(false);
    const [publicProfile, setPublicProfile] = useState(false);

    return (
        <div className="bg-muted min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-foreground">My Account</h1>

                <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-6">
                    {/* ── Sidebar ────────────────────────────── */}
                    <div className="w-full md:w-60 flex-shrink-0 space-y-3">
                        {/* Avatar Card */}
                        <div className="bg-background rounded-2xl p-5 text-center border border-border shadow-sm">
                            <div className="relative w-20 h-20 mx-auto mb-3">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                    <User className="w-10 h-10 text-primary" />
                                </div>
                                <button className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary-hover transition-colors">
                                    <Camera className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>
                            <h2 className="font-bold text-base text-foreground">John Doe</h2>
                            <p className="text-xs text-muted-foreground mt-0.5">john.doe@example.com</p>
                            <span className="inline-block mt-2 text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">Premium Member</span>
                        </div>

                        {/* Nav Tabs */}
                        <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden">
                            <TabsList className="flex flex-col w-full h-auto bg-transparent gap-0 p-2">
                                {[
                                    { value: "profile", label: "Profile", icon: User },
                                    { value: "orders", label: "Orders", icon: Package },
                                    { value: "services", label: "My Services", icon: Wrench },
                                    { value: "favourites", label: "Favourites", icon: Heart },
                                    { value: "discounts", label: "Discounts", icon: Tag },
                                    { value: "payments", label: "Payment Methods", icon: CreditCard },
                                    { value: "address", label: "Addresses", icon: MapPin },
                                    { value: "support", label: "Support", icon: LifeBuoy },
                                    { value: "share", label: "Share Profile", icon: Share2 },
                                    { value: "settings", label: "Settings", icon: Settings },
                                ].map(({ value, label, icon: Icon }) => (
                                    <TabsTrigger
                                        key={value}
                                        value={value}
                                        className="w-full justify-start gap-3 px-4 py-2.5 text-sm font-medium text-muted-foreground rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold hover:bg-muted transition-all"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full gap-2 border-primary/30 text-primary hover:bg-accent hover:text-primary-dark rounded-xl font-medium"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </Button>
                    </div>

                    {/* ── Main Content ───────────────────────── */}
                    <div className="flex-1 min-w-0">

                        {/* ── PROFILE TAB ── */}
                        <TabsContent value="profile" className="mt-0">
                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <h2 className="text-xl font-bold mb-6 text-foreground">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">First Name</Label>
                                        <Input id="first-name" defaultValue="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last Name</Label>
                                        <Input id="last-name" defaultValue="Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" defaultValue="john.doe@example.com" disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" defaultValue="+91 98765 43210" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Input id="bio" placeholder="A short bio about yourself..." />
                                    </div>
                                </div>

                                {/* Change Password */}
                                <div className="mt-8 pt-6 border-t border-border">
                                    <h3 className="font-semibold text-foreground mb-4">Change Password</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <div className="relative">
                                                <Input id="current-password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                                                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-muted-foreground">
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input id="new-password" type="password" placeholder="••••••••" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <Button className="bg-primary hover:bg-primary-hover text-white">Save Changes</Button>
                                    <Button variant="outline">Cancel</Button>
                                </div>
                            </div>
                        </TabsContent>

                        {/* ── ORDERS TAB ── */}
                        <TabsContent value="orders" className="mt-0">
                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <OrderHistory />
                            </div>
                        </TabsContent>

                        {/* ── SERVICES TAB ── */}
                        <TabsContent value="services" className="mt-0">
                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-foreground">My Service Bookings</h2>
                                    <Link href="/booking">
                                        <Button size="sm" className="bg-primary hover:bg-primary-hover text-white rounded-xl">
                                            Book a Service
                                        </Button>
                                    </Link>
                                </div>

                                <div className="space-y-5">
                                    {SERVICE_BOOKINGS.map((s) => (
                                        <div key={s.id} className="border border-border rounded-3xl p-5 hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                        <Wrench className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-bold text-foreground">{s.name}</p>
                                                        <p className="text-sm text-muted-foreground mt-1">{s.provider}</p>
                                                        <div className="flex items-center gap-4 mt-3 flex-wrap text-sm text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <CalendarDays className="h-4 w-4" /> {s.date}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Clock className="h-4 w-4" /> {s.time}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                                                Booking ID: {s.id}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${s.statusColor}`}>
                                                        {s.status === "Upcoming" && <Clock className="h-3 w-3 inline mr-1" />}
                                                        {s.status === "Completed" && <CheckCircle2 className="h-3 w-3 inline mr-1" />}
                                                        {s.status}
                                                    </span>
                                                    <p className="text-lg font-bold text-foreground">₹{s.amount.toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <div className="mt-4 border border-border rounded-2xl p-4 bg-muted/60">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-semibold text-foreground">Service Summary</p>
                                                        <p className="text-xs text-muted-foreground mt-1">Professional assigned · On-time guarantee</p>
                                                    </div>
                                                    {s.rating && (
                                                        <div className="flex items-center gap-2">
                                                            <StarRating rating={s.rating} />
                                                            <span className="text-xs text-muted-foreground">Your rating</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-5 flex flex-wrap gap-2 justify-end">
                                                {s.status === "Upcoming" && (
                                                    <>
                                                        <Button variant="outline" size="sm" className="rounded-xl">
                                                            Reschedule
                                                        </Button>
                                                        <Button variant="outline" size="sm" className="rounded-xl border-primary/30 text-primary hover:bg-accent">
                                                            Cancel
                                                        </Button>
                                                    </>
                                                )}
                                                {s.status === "Completed" && !s.rating && (
                                                    <Button variant="outline" size="sm" className="rounded-xl">
                                                        Rate Service
                                                    </Button>
                                                )}
                                                <Button size="sm" className="rounded-xl bg-primary hover:bg-primary-hover text-white">
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {SERVICE_BOOKINGS.length === 0 && (
                                    <div className="text-center py-16">
                                        <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                        <p className="text-muted-foreground font-medium">No service bookings yet</p>
                                        <Link href="/booking"><Button className="mt-4 bg-primary hover:bg-primary-hover text-white">Browse Services</Button></Link>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* ── FAVOURITES TAB ── */}
                        <TabsContent value="favourites" className="mt-0">
                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-foreground">My Favourites</h2>
                                    <Link href="/shop">
                                        <Button variant="outline" size="sm" className="rounded-xl">Explore More</Button>
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {FAVOURITES.map((item) => (
                                        <div key={item.id} className="border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition-all duration-200 group">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center">
                                                        <Heart className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-foreground">{item.name}</p>
                                                        <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
                                                        <div className="mt-2">
                                                            <StarRating rating={item.rating} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-foreground">₹{item.price.toLocaleString()}</p>
                                                    <Button size="sm" className="mt-2 h-7 rounded-lg text-xs bg-primary hover:bg-primary-hover text-white">
                                                        Add to Cart
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {FAVOURITES.length === 0 && (
                                    <div className="text-center py-16">
                                        <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                        <p className="text-muted-foreground font-medium">No favourites yet</p>
                                        <Link href="/shop"><Button className="mt-4 bg-primary hover:bg-primary-hover text-white">Browse Products</Button></Link>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* ── DISCOUNTS TAB ── */}
                        <TabsContent value="discounts" className="mt-0">
                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6 space-y-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-foreground">Discounts & Coupons</h2>
                                        <p className="text-sm text-muted-foreground">Save more with your available offers.</p>
                                    </div>
                                    <Link href="/shop">
                                        <Button variant="outline" size="sm" className="rounded-xl">Use Discounts</Button>
                                    </Link>
                                </div>

                                <div className="grid gap-4">
                                    {DISCOUNTS.map((coupon) => (
                                        <div key={coupon.id} className="border border-border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${coupon.status === "Active" ? "bg-accent" : "bg-muted"}`}>
                                                    <Tag className={`w-5 h-5 ${coupon.status === "Active" ? "text-primary" : "text-muted-foreground"}`} />
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Coupon Code</p>
                                                    <p className="text-lg font-extrabold text-foreground">{coupon.code}</p>
                                                    <p className="text-sm text-muted-foreground mt-1">{coupon.title}</p>
                                                    <p className="text-xs text-muted-foreground mt-2">Min spend ₹{coupon.minSpend.toLocaleString()} · Expires {coupon.expiry}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${coupon.status === "Active" ? "bg-accent text-primary-dark" : "bg-muted text-muted-foreground"}`}>
                                                    {coupon.status}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    variant={coupon.status === "Active" ? "primary" : "outline"}
                                                    className={`rounded-xl ${coupon.status === "Active" ? "bg-primary hover:bg-primary-hover text-white" : "cursor-not-allowed"}`}
                                                    disabled={coupon.status !== "Active"}
                                                >
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        {/* ── PAYMENTS TAB ── */}
                        <TabsContent value="payments" className="mt-0 space-y-5">
                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-foreground">Payment Methods</h2>
                                        <p className="text-sm text-muted-foreground">Manage your saved cards and UPI IDs.</p>
                                    </div>
                                    <Button className="rounded-xl bg-primary hover:bg-primary-hover text-white">
                                        Add New Method
                                    </Button>
                                </div>

                                <div className="grid gap-4">
                                    {PAYMENT_METHODS.map((pm) => (
                                        <div key={pm.id} className="border border-border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
                                                    <CreditCard className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground">{pm.type}</p>
                                                    <p className="text-sm text-muted-foreground">•••• {pm.last4}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">{pm.expiry}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {pm.default && (
                                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent text-primary-dark">
                                                        Default
                                                    </span>
                                                )}
                                                <Button variant="outline" size="sm" className="rounded-xl">Edit</Button>
                                                <Button variant="outline" size="sm" className="rounded-xl border-primary/30 text-primary hover:bg-accent">
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {PAYMENT_METHODS.length === 0 && (
                                    <div className="text-center py-16">
                                        <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                        <p className="text-muted-foreground font-medium">No payment methods saved</p>
                                        <Button className="mt-4 bg-primary hover:bg-primary-hover text-white">Add a Payment Method</Button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <h3 className="text-lg font-bold text-foreground mb-4">Add New Payment Method</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="card-name">Cardholder Name</Label>
                                        <Input id="card-name" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="card-number">Card Number</Label>
                                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="card-expiry">Expiry Date</Label>
                                        <Input id="card-expiry" placeholder="MM/YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="card-cvv">CVV</Label>
                                        <Input id="card-cvv" placeholder="***" />
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                    <Button className="bg-primary hover:bg-primary-hover text-white">Save Payment Method</Button>
                                    <Button variant="outline">Cancel</Button>
                                </div>
                            </div>
                        </TabsContent>

                        {/* ── ADDRESS TAB ── */}
                        <TabsContent value="address" className="mt-0">
                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-foreground">My Addresses</h2>
                                    <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setIsAddressModalOpen(true)}>
                                        Add New Address
                                    </Button>
                                </div>
                                <div className="border border-primary/30 bg-primary/5 rounded-xl p-4 relative">
                                    <span className="absolute top-4 right-4 text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                                    <p className="font-bold mb-1 text-foreground">🏠 Home</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        123 Main Street, Apt 4B<br />
                                        New York, NY 10001<br />
                                        United States
                                    </p>
                                    <div className="mt-4 flex gap-3">
                                        <Button variant="link" size="sm" className="h-auto p-0 text-primary">Edit</Button>
                                        <span className="text-muted-foreground">|</span>
                                        <Button variant="link" size="sm" className="h-auto p-0 text-primary">Delete</Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* ── SUPPORT TAB ── */}
                        <TabsContent value="support" className="mt-0 space-y-5">
                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-foreground">Support Center</h2>
                                        <p className="text-sm text-muted-foreground">We&apos;re here 24/7 to help you with anything.</p>
                                    </div>
                                    <Button className="rounded-xl bg-primary hover:bg-primary-hover text-white">
                                        Start Live Chat
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {SUPPORT_CARDS.map((card) => (
                                        <div key={card.id} className="border border-border rounded-2xl p-4 hover:border-primary/30 hover:shadow-sm transition-all">
                                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                                                <LifeBuoy className="w-4 h-4 text-primary" />
                                            </div>
                                            <p className="font-semibold text-foreground">{card.title}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                                            <Button variant="link" className="px-0 text-primary mt-2 h-auto">View Help</Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <h3 className="text-lg font-bold text-foreground mb-4">Submit a Support Request</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="support-name">Full Name</Label>
                                        <Input id="support-name" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="support-email">Email Address</Label>
                                        <Input id="support-email" placeholder="john.doe@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="support-topic">Topic</Label>
                                        <Input id="support-topic" placeholder="Order delayed / Payment issue / Return" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="support-order">Order or Booking ID (optional)</Label>
                                        <Input id="support-order" placeholder="ORD-1001 / SB001" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="support-message">Message</Label>
                                        <Textarea id="support-message" placeholder="Tell us what happened and how we can help." />
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                    <Button className="bg-primary hover:bg-primary-hover text-white">Submit Request</Button>
                                    <Button variant="outline">Clear</Button>
                                </div>
                            </div>
                        </TabsContent>

                        {/* ── SHARE TAB ── */}
                        <TabsContent value="share" className="mt-0 space-y-5">
                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-foreground">Share Your Profile</h2>
                                        <p className="text-sm text-muted-foreground">Let others view your reviews and public activity.</p>
                                    </div>
                                    <Button className="rounded-xl bg-primary hover:bg-primary-hover text-white">
                                        Generate Share Link
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
                                    <div className="rounded-2xl border border-border p-4">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                            <Link2 className="h-4 w-4 text-primary" />
                                            Shareable Link
                                        </div>
                                        <div className="mt-3 flex flex-col sm:flex-row gap-3">
                                            <Input
                                                readOnly
                                                value="https://shopnow.com/u/john-doe"
                                                className="rounded-xl bg-muted"
                                            />
                                            <Button variant="outline" className="rounded-xl">
                                                Copy Link
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-3">
                                            Anyone with this link can view your public profile details.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-border p-4 flex flex-col items-center text-center">
                                        <div className="w-28 h-28 rounded-2xl border border-dashed border-primary/30 flex items-center justify-center bg-primary/5">
                                            <QrCode className="h-10 w-10 text-primary" />
                                        </div>
                                        <p className="text-sm font-semibold text-foreground mt-3">Scan to view profile</p>
                                        <p className="text-xs text-muted-foreground">Share this QR with your friends.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <h3 className="text-lg font-bold text-foreground mb-4">Quick Share</h3>
                                <div className="flex flex-wrap gap-3">
                                    <Button variant="outline" className="rounded-xl">Share via WhatsApp</Button>
                                    <Button variant="outline" className="rounded-xl">Share via Email</Button>
                                    <Button variant="outline" className="rounded-xl">Share via SMS</Button>
                                    <Button variant="outline" className="rounded-xl">Share via X</Button>
                                </div>
                            </div>
                        </TabsContent>

                        {/* ── SETTINGS TAB ── */}
                        <TabsContent value="settings" className="mt-0 space-y-5">

                            {/* Notifications & Subscriptions */}
                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <h2 className="text-xl font-bold text-foreground mb-1">Notifications & Subscriptions</h2>
                                <p className="text-sm text-muted-foreground mb-5">Control how and when we communicate with you.</p>

                                <div className="divide-y divide-gray-50">
                                    <SettingRow
                                        icon={MailCheck}
                                        label="Newsletter Subscription"
                                        description="Receive our weekly newsletter with latest deals, new arrivals, and exclusive member offers."
                                    >
                                        <Toggle id="newsletter" checked={notifNewsletter} onChange={setNotifNewsletter} />
                                    </SettingRow>

                                    <SettingRow
                                        icon={Package}
                                        label="Order Updates"
                                        description="Get notified about your order status, shipping, and delivery."
                                    >
                                        <Toggle id="order-updates" checked={notifOrderUpdates} onChange={setNotifOrderUpdates} />
                                    </SettingRow>

                                    <SettingRow
                                        icon={Wrench}
                                        label="Service Reminders"
                                        description="Reminders before your booked service appointments."
                                    >
                                        <Toggle id="service-reminders" checked={notifServiceReminders} onChange={setNotifServiceReminders} />
                                    </SettingRow>

                                    <SettingRow
                                        icon={Bell}
                                        label="Promotions & Offers"
                                        description="Flash sales, discount coupons, and seasonal promotions."
                                    >
                                        <Toggle id="promotions" checked={notifPromotions} onChange={setNotifPromotions} />
                                    </SettingRow>

                                    <SettingRow
                                        icon={Smartphone}
                                        label="SMS Notifications"
                                        description="Receive important updates via SMS on your registered number."
                                    >
                                        <Toggle id="sms" checked={notifSMS} onChange={setNotifSMS} />
                                    </SettingRow>

                                    <SettingRow
                                        icon={Globe}
                                        label="Push Notifications"
                                        description="In-app and browser push notifications for real-time updates."
                                    >
                                        <Toggle id="push" checked={notifAppPush} onChange={setNotifAppPush} />
                                    </SettingRow>
                                </div>

                                {/* Newsletter CTA when subscribed */}
                                {notifNewsletter && (
                                    <div className="mt-4 flex items-center gap-3 bg-accent border border-primary/30 rounded-xl p-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                        <p className="text-sm text-primary-dark font-medium">
                                            You&apos;re subscribed! Expect great deals in your inbox every week. 🎉
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Security */}
                            <div className="bg-background rounded-2xl border border-border shadow-sm p-6">
                                <h2 className="text-xl font-bold text-foreground mb-1">Security</h2>
                                <p className="text-sm text-muted-foreground mb-5">Keep your account safe and secure.</p>

                                <div className="divide-y divide-gray-50">
                                    <SettingRow
                                        icon={Shield}
                                        label="Two-Factor Authentication"
                                        description="Add an extra layer of security with OTP verification on each login."
                                    >
                                        <Toggle id="2fa" checked={twoFA} onChange={setTwoFA} />
                                    </SettingRow>
                                    <SettingRow
                                        icon={Eye}
                                        label="Public Profile"
                                        description="Allow other users to see your reviews and activity on ShopNow."
                                    >
                                        <Toggle id="public-profile" checked={publicProfile} onChange={setPublicProfile} />
                                    </SettingRow>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-background rounded-2xl border border-primary/20 shadow-sm p-6">
                                <h2 className="text-xl font-bold text-primary-dark mb-1">Danger Zone</h2>
                                <p className="text-sm text-muted-foreground mb-5">These actions are permanent and cannot be undone.</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button variant="outline" className="border-primary/30 text-primary hover:bg-accent gap-2 rounded-xl">
                                        <LogOut className="h-4 w-4" /> Sign Out of All Devices
                                    </Button>
                                    <Button variant="outline" className="border-primary/40 text-primary-dark hover:bg-accent gap-2 rounded-xl">
                                        <Trash2 className="h-4 w-4" /> Delete Account
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                    </div>
                </Tabs>
            </div>

            {isAddressModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
                    <button
                        type="button"
                        onClick={() => setIsAddressModalOpen(false)}
                        className="absolute inset-0 bg-secondary/40 backdrop-blur-sm"
                        aria-label="Close address modal"
                    />
                    <div className="relative w-full max-w-3xl rounded-3xl border border-primary/20 bg-gradient-to-br from-white via-white to-accent shadow-2xl">
                        <div className="flex items-center justify-between border-b border-primary/20 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddressModalOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-background text-primary hover:bg-accent"
                                    aria-label="Go back"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </button>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-primary">New address</p>
                                    <h3 className="text-xl font-bold text-foreground">Add New Address</h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="hidden text-sm text-muted-foreground md:inline">Save &amp; continue</span>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent0 text-white">
                                    <Check className="h-5 w-5" />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.1fr_1fr]">
                            <div className="space-y-5">
                                <div className="grid grid-cols-3 gap-3 rounded-2xl border border-primary/20 bg-background p-2">
                                    {[
                                        { key: "home", label: "Home", icon: MapPinned },
                                        { key: "office", label: "Office", icon: Map },
                                        { key: "other", label: "Other", icon: MapPin },
                                    ].map((item) => (
                                        <button
                                            key={item.key}
                                            type="button"
                                            onClick={() => setAddressType(item.key as typeof addressType)}
                                            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                                                addressType === item.key
                                                    ? "bg-accent0 text-white shadow-sm"
                                                    : "text-muted-foreground hover:bg-accent"
                                            }`}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.label}
                                        </button>
                                    ))}
                                </div>

                                <div className="rounded-2xl border border-primary/20 bg-background p-4 shadow-sm">
                                    <h4 className="text-sm font-semibold text-foreground">Address Information</h4>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <Label className="text-xs uppercase text-muted-foreground">Recipient Name *</Label>
                                            <Input className="mt-2 rounded-xl" placeholder="Rahul Sharma" />
                                        </div>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <div>
                                                <Label className="text-xs uppercase text-muted-foreground">Phone Number</Label>
                                                <Input className="mt-2 rounded-xl" placeholder="+91 9876543210" />
                                            </div>
                                            <div>
                                                <Label className="text-xs uppercase text-muted-foreground">Country</Label>
                                                <Input className="mt-2 rounded-xl" placeholder="India" />
                                            </div>
                                        </div>
                                        <div>
                                            <Label className="text-xs uppercase text-muted-foreground">Full Address</Label>
                                            <Textarea className="mt-2 min-h-[120px] rounded-xl" placeholder="Street, building, landmark..." />
                                        </div>
                                        <div className="grid gap-3 sm:grid-cols-3">
                                            <div>
                                                <Label className="text-xs uppercase text-muted-foreground">City</Label>
                                                <Input className="mt-2 rounded-xl" placeholder="Mumbai" />
                                            </div>
                                            <div>
                                                <Label className="text-xs uppercase text-muted-foreground">State</Label>
                                                <Input className="mt-2 rounded-xl" placeholder="Maharashtra" />
                                            </div>
                                            <div>
                                                <Label className="text-xs uppercase text-muted-foreground">Postal Code</Label>
                                                <Input className="mt-2 rounded-xl" placeholder="400050" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                        <MapPinned className="h-4 w-4 text-primary" />
                                        Address Details
                                    </div>
                                    <Button variant="outline" size="sm" className="rounded-full">
                                        Detect Current Location
                                    </Button>
                                </div>
                                <div className="relative h-56 overflow-hidden rounded-2xl border border-primary/20">
                                    <img
                                        src="https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1200&q=80"
                                        alt="Map preview"
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                                    <div className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-muted-foreground shadow">
                                        Latitude: 19.1138 • Longitude: 72.8688
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground">Drag the pin on the map to select your exact location.</p>

                                <div className="rounded-2xl border border-primary/20 bg-background p-4">
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {[
                                            { id: "default", label: "Set as default address" },
                                            { id: "delivery", label: "Use for delivery" },
                                            { id: "services", label: "Use for services" },
                                            { id: "billing", label: "Use for billing" },
                                        ].map((item) => (
                                            <label key={item.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Checkbox id={`address-${item.id}`} defaultChecked />
                                                {item.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Button variant="outline" className="w-full rounded-xl" onClick={() => setIsAddressModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button className="w-full rounded-xl bg-primary text-white hover:bg-primary-dark">
                                        Save Address
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
