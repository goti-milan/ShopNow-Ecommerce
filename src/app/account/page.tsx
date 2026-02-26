"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    ChevronRight,
    CheckCircle2,
    Clock,
    Star,
    CalendarDays,
    MailCheck,
    Smartphone,
    Globe,
    Eye,
    EyeOff,
    Camera,
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const ORDERS = [
    { id: 1001, date: "Feb 20, 2026", items: 3, amount: 4599, status: "Delivered", statusColor: "bg-green-100 text-green-700" },
    { id: 1002, date: "Feb 14, 2026", items: 1, amount: 12999, status: "Shipped", statusColor: "bg-blue-100 text-blue-700" },
    { id: 1003, date: "Jan 30, 2026", items: 5, amount: 2350, status: "Delivered", statusColor: "bg-green-100 text-green-700" },
    { id: 1004, date: "Jan 10, 2026", items: 2, amount: 899, status: "Cancelled", statusColor: "bg-red-100 text-red-700" },
];

const SERVICE_BOOKINGS = [
    { id: "SB001", name: "Deep Home Cleaning", provider: "CleanPro Services", date: "Mar 5, 2026", time: "10:00 AM", amount: 1499, status: "Upcoming", statusColor: "bg-blue-100 text-blue-700", rating: null },
    { id: "SB002", name: "Personal Training Session", provider: "FitLife Pro", date: "Feb 22, 2026", time: "07:00 AM", amount: 999, status: "Completed", statusColor: "bg-green-100 text-green-700", rating: 5 },
    { id: "SB003", name: "Hair Cut & Styling", provider: "StyleHub", date: "Feb 15, 2026", time: "02:00 PM", amount: 599, status: "Completed", statusColor: "bg-green-100 text-green-700", rating: 4 },
    { id: "SB004", name: "Laptop/PC Repair", provider: "TechFix", date: "Jan 28, 2026", time: "11:00 AM", amount: 599, status: "Cancelled", statusColor: "bg-red-100 text-red-700", rating: null },
];

// ─── SWITCH COMPONENT ─────────────────────────────────────────────────────────
function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
    return (
        <button
            id={id}
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 ${checked ? "bg-primary" : "bg-gray-200"}`}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
            />
        </button>
    );
}

// ─── SETTINGS ROW ─────────────────────────────────────────────────────────────
function SettingRow({ icon: Icon, label, description, children }: { icon: React.ElementType; label: string; description?: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{label}</p>
                    {description && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>}
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
                <Star key={s} className={`h-3.5 w-3.5 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`} />
            ))}
        </div>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AccountPage() {
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-900">My Account</h1>

                <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-6">
                    {/* ── Sidebar ────────────────────────────── */}
                    <div className="w-full md:w-60 flex-shrink-0 space-y-3">
                        {/* Avatar Card */}
                        <div className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm">
                            <div className="relative w-20 h-20 mx-auto mb-3">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                    <User className="w-10 h-10 text-primary" />
                                </div>
                                <button className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
                                    <Camera className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>
                            <h2 className="font-bold text-base text-gray-900">John Doe</h2>
                            <p className="text-xs text-gray-500 mt-0.5">john.doe@example.com</p>
                            <span className="inline-block mt-2 text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">Premium Member</span>
                        </div>

                        {/* Nav Tabs */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <TabsList className="flex flex-col w-full h-auto bg-transparent gap-0 p-2">
                                {[
                                    { value: "profile", label: "Profile", icon: User },
                                    { value: "orders", label: "Orders", icon: Package },
                                    { value: "services", label: "My Services", icon: Wrench },
                                    { value: "address", label: "Addresses", icon: MapPin },
                                    { value: "settings", label: "Settings", icon: Settings },
                                ].map(({ value, label, icon: Icon }) => (
                                    <TabsTrigger
                                        key={value}
                                        value={value}
                                        className="w-full justify-start gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold hover:bg-gray-50 transition-all"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full gap-2 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </Button>
                    </div>

                    {/* ── Main Content ───────────────────────── */}
                    <div className="flex-1 min-w-0">

                        {/* ── PROFILE TAB ── */}
                        <TabsContent value="profile" className="mt-0">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h2 className="text-xl font-bold mb-6 text-gray-900">Personal Information</h2>
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
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <h3 className="font-semibold text-gray-800 mb-4">Change Password</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <div className="relative">
                                                <Input id="current-password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                                                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
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
                                    <Button className="bg-primary hover:bg-primary/90 text-white">Save Changes</Button>
                                    <Button variant="outline">Cancel</Button>
                                </div>
                            </div>
                        </TabsContent>

                        {/* ── ORDERS TAB ── */}
                        <TabsContent value="orders" className="mt-0">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Order History</h2>
                                    <Link href="/shop">
                                        <Button variant="outline" size="sm" className="rounded-xl">Shop More</Button>
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {ORDERS.map((order) => (
                                        <div key={order.id} className="border border-gray-100 rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition-all duration-200 group">
                                            <div className="flex items-center justify-between flex-wrap gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                                                        <Package className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">Order #{order.id}</p>
                                                        <p className="text-xs text-gray-500">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${order.statusColor}`}>{order.status}</span>
                                                    <p className="font-bold text-gray-900">₹{order.amount.toLocaleString()}</p>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl group-hover:text-primary">
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {ORDERS.length === 0 && (
                                    <div className="text-center py-16">
                                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500 font-medium">No orders yet</p>
                                        <Link href="/shop"><Button className="mt-4 bg-primary hover:bg-primary/90 text-white">Start Shopping</Button></Link>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* ── SERVICES TAB ── */}
                        <TabsContent value="services" className="mt-0">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">My Service Bookings</h2>
                                    <Link href="/booking">
                                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-xl">
                                            Book a Service
                                        </Button>
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {SERVICE_BOOKINGS.map((s) => (
                                        <div key={s.id} className="border border-gray-100 rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition-all duration-200 group">
                                            <div className="flex items-start justify-between flex-wrap gap-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <Wrench className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{s.name}</p>
                                                        <p className="text-xs text-gray-500 mt-0.5">{s.provider}</p>
                                                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                                                            <span className="flex items-center gap-1 text-xs text-gray-500">
                                                                <CalendarDays className="h-3.5 w-3.5" /> {s.date}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-xs text-gray-500">
                                                                <Clock className="h-3.5 w-3.5" /> {s.time}
                                                            </span>
                                                        </div>
                                                        {s.rating && (
                                                            <div className="flex items-center gap-1.5 mt-2">
                                                                <StarRating rating={s.rating} />
                                                                <span className="text-xs text-gray-400">Your rating</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end gap-2">
                                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${s.statusColor}`}>
                                                        {s.status === "Upcoming" && <Clock className="h-3 w-3 inline mr-1" />}
                                                        {s.status === "Completed" && <CheckCircle2 className="h-3 w-3 inline mr-1" />}
                                                        {s.status}
                                                    </span>
                                                    <p className="font-bold text-gray-900">₹{s.amount.toLocaleString()}</p>
                                                    {s.status === "Upcoming" && (
                                                        <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg border-red-200 text-red-500 hover:bg-red-50">
                                                            Cancel
                                                        </Button>
                                                    )}
                                                    {s.status === "Completed" && !s.rating && (
                                                        <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg">
                                                            Rate Service
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {SERVICE_BOOKINGS.length === 0 && (
                                    <div className="text-center py-16">
                                        <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500 font-medium">No service bookings yet</p>
                                        <Link href="/booking"><Button className="mt-4 bg-primary hover:bg-primary/90 text-white">Browse Services</Button></Link>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        {/* ── ADDRESS TAB ── */}
                        <TabsContent value="address" className="mt-0">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
                                    <Button variant="outline" size="sm" className="rounded-xl">Add New Address</Button>
                                </div>
                                <div className="border border-primary/30 bg-primary/5 rounded-xl p-4 relative">
                                    <span className="absolute top-4 right-4 text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                                    <p className="font-bold mb-1 text-gray-900">🏠 Home</p>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        123 Main Street, Apt 4B<br />
                                        New York, NY 10001<br />
                                        United States
                                    </p>
                                    <div className="mt-4 flex gap-3">
                                        <Button variant="link" size="sm" className="h-auto p-0 text-primary">Edit</Button>
                                        <span className="text-gray-300">|</span>
                                        <Button variant="link" size="sm" className="h-auto p-0 text-red-500">Delete</Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* ── SETTINGS TAB ── */}
                        <TabsContent value="settings" className="mt-0 space-y-5">

                            {/* Notifications & Subscriptions */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Notifications & Subscriptions</h2>
                                <p className="text-sm text-gray-500 mb-5">Control how and when we communicate with you.</p>

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
                                    <div className="mt-4 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3">
                                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                        <p className="text-sm text-green-700 font-medium">
                                            You&apos;re subscribed! Expect great deals in your inbox every week. 🎉
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Security */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Security</h2>
                                <p className="text-sm text-gray-500 mb-5">Keep your account safe and secure.</p>

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
                            <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
                                <h2 className="text-xl font-bold text-red-600 mb-1">Danger Zone</h2>
                                <p className="text-sm text-gray-500 mb-5">These actions are permanent and cannot be undone.</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button variant="outline" className="border-red-200 text-red-500 hover:bg-red-50 gap-2 rounded-xl">
                                        <LogOut className="h-4 w-4" /> Sign Out of All Devices
                                    </Button>
                                    <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 gap-2 rounded-xl">
                                        <Trash2 className="h-4 w-4" /> Delete Account
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                    </div>
                </Tabs>
            </div>
        </div>
    );
}
