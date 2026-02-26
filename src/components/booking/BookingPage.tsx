"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import {
    Search,
    Star,
    Clock,
    MapPin,
    ChevronRight,
    X,
    CheckCircle2,
    ShoppingCart,
    Wrench,
    Sparkles,
    Heart,
    Laptop,
    Car,
    Music2,
    BookOpen,
    PawPrint,
    Zap,
    ShieldCheck,
    CalendarDays,
} from "lucide-react"

// ─── DATA ───────────────────────────────────────────────────────────────────

const CATEGORIES = [
    { id: "all", label: "All Services", icon: Zap },
    { id: "home", label: "Home Care", icon: Wrench },
    { id: "beauty", label: "Beauty & Spa", icon: Sparkles },
    { id: "health", label: "Health & Fitness", icon: Heart },
    { id: "tech", label: "Tech Support", icon: Laptop },
    { id: "auto", label: "Auto Services", icon: Car },
    { id: "events", label: "Events", icon: Music2 },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "pets", label: "Pet Care", icon: PawPrint },
]

export interface Service {
    id: number
    name: string
    category: string
    description: string
    price: number
    duration: string
    rating: number
    reviewCount: number
    location: string
    badge?: string
    badgeColor?: string
    highlights: string[]
    image: string
    provider: string
    providerAvatar: string
}

const SERVICES: Service[] = [
    // Home
    {
        id: 1,
        name: "Deep Home Cleaning",
        category: "home",
        description: "Full deep clean of your home including kitchen, bathrooms, and all rooms. Eco-friendly supplies included.",
        price: 1499,
        duration: "4–6 hrs",
        rating: 4.8,
        reviewCount: 1240,
        location: "At Your Home",
        badge: "Top Rated",
        badgeColor: "bg-amber-500",
        highlights: ["Eco-friendly supplies", "Background-verified staff", "100% satisfaction guarantee"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop",
        provider: "CleanPro Services",
        providerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80&fit=crop",
    },
    {
        id: 2,
        name: "Plumbing Repair",
        category: "home",
        description: "Expert plumbing repair for leaks, blockages, pipe replacement, and fixture installations.",
        price: 499,
        duration: "1–3 hrs",
        rating: 4.6,
        reviewCount: 890,
        location: "At Your Home",
        highlights: ["Same-day availability", "Genuine spare parts", "90-day warranty"],
        image: "https://images.unsplash.com/photo-1585704032915-c3400305e979?w=600&q=80&fit=crop",
        provider: "FixIt Pros",
        providerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&fit=crop",
    },
    {
        id: 3,
        name: "Electrical Services",
        category: "home",
        description: "Qualified electricians for wiring, fan installation, switchboard repair, and more.",
        price: 399,
        duration: "1–2 hrs",
        rating: 4.7,
        reviewCount: 670,
        location: "At Your Home",
        badge: "Popular",
        badgeColor: "bg-blue-500",
        highlights: ["ISI-certified electricians", "Safety audit included", "Insured service"],
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80&fit=crop",
        provider: "Volt Masters",
        providerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop",
    },
    {
        id: 4,
        name: "Pest Control",
        category: "home",
        description: "Professional treatment for cockroaches, bed bugs, termites, and rodents.",
        price: 899,
        duration: "2–3 hrs",
        rating: 4.5,
        reviewCount: 540,
        location: "At Your Home",
        highlights: ["WHO-approved chemicals", "Child & pet safe", "3-month guarantee"],
        image: "https://images.unsplash.com/photo-1634912278024-3c0462e3e5e7?w=600&q=80&fit=crop",
        provider: "BugBusters",
        providerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&fit=crop",
    },

    // Beauty
    {
        id: 5,
        name: "Full Body Massage",
        category: "beauty",
        description: "Relaxing therapeutic massage using premium oils. Great for stress relief and muscle recovery.",
        price: 1299,
        duration: "60–90 min",
        rating: 4.9,
        reviewCount: 2100,
        location: "At Home / In Salon",
        badge: "Best Seller",
        badgeColor: "bg-rose-500",
        highlights: ["Certified therapists", "Premium aroma oils", "Post-massage wellness tips"],
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80&fit=crop",
        provider: "ZenTouch Spa",
        providerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&fit=crop",
    },
    {
        id: 6,
        name: "Bridal Makeup",
        category: "beauty",
        description: "Stunning bridal makeup by professional artists with HD airbrushing, contouring & draping.",
        price: 4999,
        duration: "3–4 hrs",
        rating: 4.8,
        reviewCount: 870,
        location: "At Your Venue",
        highlights: ["HD airbrush finish", "Includes hair styling", "Trial session available"],
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80&fit=crop",
        provider: "Glam Studio",
        providerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop",
    },
    {
        id: 7,
        name: "Hair Cut & Styling",
        category: "beauty",
        description: "Professional haircut, wash, and styling for men and women at your doorstep.",
        price: 599,
        duration: "30–60 min",
        rating: 4.6,
        reviewCount: 3400,
        location: "At Home / Salon",
        badge: "Popular",
        badgeColor: "bg-blue-500",
        highlights: ["Expert stylists", "All hair types", "Products included"],
        image: "https://images.unsplash.com/photo-1562322140-8baeababf5db?w=600&q=80&fit=crop",
        provider: "StyleHub",
        providerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80&fit=crop",
    },

    // Health
    {
        id: 8,
        name: "Personal Training Session",
        category: "health",
        description: "One-on-one fitness session with a certified trainer. Custom workout and diet plan included.",
        price: 999,
        duration: "60 min",
        rating: 4.9,
        reviewCount: 1540,
        location: "At Home / Gym",
        badge: "Top Rated",
        badgeColor: "bg-amber-500",
        highlights: ["Certified ISSA trainer", "Custom plan", "Progress tracking"],
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80&fit=crop",
        provider: "FitLife Pro",
        providerAvatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&q=80&fit=crop",
    },
    {
        id: 9,
        name: "Yoga & Meditation",
        category: "health",
        description: "Guided yoga and mindfulness sessions for beginners to advanced practitioners.",
        price: 799,
        duration: "60–75 min",
        rating: 4.8,
        reviewCount: 1120,
        location: "At Home / Online",
        highlights: ["Certified yoga instructor", "Flexible timings", "Equipment provided"],
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80&fit=crop",
        provider: "ZenFlow",
        providerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&fit=crop",
    },
    {
        id: 10,
        name: "Doctor Home Visit",
        category: "health",
        description: "Qualified general physician visits at your home for consultation, diagnosis, and prescription.",
        price: 699,
        duration: "30–45 min",
        rating: 4.7,
        reviewCount: 980,
        location: "At Your Home",
        badge: "Trusted",
        badgeColor: "bg-green-600",
        highlights: ["Registered MBBS doctors", "Prescription included", "Available on weekends"],
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&fit=crop",
        provider: "MediCare Home",
        providerAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&q=80&fit=crop",
    },

    // Tech
    {
        id: 11,
        name: "Laptop/PC Repair",
        category: "tech",
        description: "Hardware and software repair for laptops, PCs, and Macs. Data recovery available.",
        price: 599,
        duration: "1–3 hrs",
        rating: 4.6,
        reviewCount: 720,
        location: "At Home / Pickup",
        highlights: ["Certified technicians", "No fix, no charge", "Data privacy guaranteed"],
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80&fit=crop",
        provider: "TechFix",
        providerAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80&fit=crop",
    },
    {
        id: 12,
        name: "Smart Home Setup",
        category: "tech",
        description: "Installation and configuration of smart home devices — lights, cameras, door locks, voice assistants.",
        price: 1999,
        duration: "2–4 hrs",
        rating: 4.8,
        reviewCount: 430,
        location: "At Your Home",
        badge: "New",
        badgeColor: "bg-purple-500",
        highlights: ["Google & Alexa compatible", "WiFi optimisation", "Training included"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop",
        provider: "SmartNest",
        providerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80&fit=crop",
    },

    // Auto
    {
        id: 13,
        name: "Car Wash & Detailing",
        category: "auto",
        description: "Premium exterior and interior car clean, wax polish, and ceramic coat application.",
        price: 1199,
        duration: "2–3 hrs",
        rating: 4.7,
        reviewCount: 1890,
        location: "At Your Location",
        badge: "Popular",
        badgeColor: "bg-blue-500",
        highlights: ["Waterless option available", "Premium shampoo", "Tyre shine included"],
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80&fit=crop",
        provider: "AutoGlam",
        providerAvatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&q=80&fit=crop",
    },
    {
        id: 14,
        name: "Bike Service",
        category: "auto",
        description: "Complete two-wheeler servicing including oil change, brake check, and chain lubrication.",
        price: 399,
        duration: "1–2 hrs",
        rating: 4.5,
        reviewCount: 2200,
        location: "Doorstep Pickup",
        highlights: ["Genuine spare parts", "Engine tuning", "Free pickup & drop"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop",
        provider: "BikeDoc",
        providerAvatar: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=80&q=80&fit=crop",
    },

    // Events
    {
        id: 15,
        name: "Birthday Party Planning",
        category: "events",
        description: "End-to-end birthday party planning with decorations, catering, and entertainment.",
        price: 7999,
        duration: "Full Day",
        rating: 4.9,
        reviewCount: 540,
        location: "At Your Venue",
        badge: "Premium",
        badgeColor: "bg-rose-500",
        highlights: ["Custom theme decor", "Cake included", "Photography optional add-on"],
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80&fit=crop",
        provider: "CelebrationCo",
        providerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&fit=crop",
    },
    {
        id: 16,
        name: "Photography & Videography",
        category: "events",
        description: "Professional DSLR/drone photography and video coverage for events, portraits, and products.",
        price: 4999,
        duration: "4–8 hrs",
        rating: 4.8,
        reviewCount: 760,
        location: "At Your Location",
        highlights: ["Drone shots available", "Edited photos in 48 hrs", "Raw footage included"],
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80&fit=crop",
        provider: "LensCraft",
        providerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80&fit=crop",
    },

    // Education
    {
        id: 17,
        name: "Home Tutoring (K-12)",
        category: "education",
        description: "Expert subject tutors for Math, Science, English, and more — tailored to your child's syllabus.",
        price: 499,
        duration: "60 min / session",
        rating: 4.8,
        reviewCount: 3200,
        location: "At Home / Online",
        badge: "Top Rated",
        badgeColor: "bg-amber-500",
        highlights: ["CBSE / ICSE / State boards", "Progress reports", "Flexible scheduling"],
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80&fit=crop",
        provider: "EduHome",
        providerAvatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=80&q=80&fit=crop",
    },
    {
        id: 18,
        name: "Music Lessons",
        category: "education",
        description: "Learn guitar, piano, vocals, or tabla with experienced music teachers at your home.",
        price: 699,
        duration: "45–60 min",
        rating: 4.7,
        reviewCount: 870,
        location: "At Home / Online",
        highlights: ["All levels welcome", "Multiple instruments", "Customised curriculum"],
        image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80&fit=crop",
        provider: "MusicVerse",
        providerAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80&fit=crop",
    },

    // Pets
    {
        id: 19,
        name: "Pet Grooming",
        category: "pets",
        description: "Bathing, haircut, nail trim, and ear cleaning for dogs and cats at your doorstep.",
        price: 799,
        duration: "60–90 min",
        rating: 4.9,
        reviewCount: 1400,
        location: "At Your Home",
        badge: "Pet Favourite",
        badgeColor: "bg-teal-500",
        highlights: ["Vet-approved products", "Breed-specific cuts", "Stress-free experience"],
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80&fit=crop",
        provider: "PawPerfect",
        providerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80&fit=crop",
    },
    {
        id: 20,
        name: "Dog Walking",
        category: "pets",
        description: "Reliable daily or weekly dog walking service by trained and insured pet handlers.",
        price: 299,
        duration: "30–60 min",
        rating: 4.8,
        reviewCount: 920,
        location: "Picked From Home",
        highlights: ["GPS-tracked walks", "Post-walk report", "Insured handler"],
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80&fit=crop",
        provider: "WoofWalk",
        providerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&fit=crop",
    },
]

// ─── SUB-COMPONENTS ─────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                />
            ))}
        </div>
    )
}

function ServiceCard({ service, onBook }: { service: Service; onBook: (s: Service) => void }) {
    return (
        <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {service.badge && (
                    <span className={`absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full ${service.badgeColor}`}>
                        {service.badge}
                    </span>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{service.duration}</span>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 flex flex-col flex-1 gap-3">
                {/* Provider */}
                <div className="flex items-center gap-2">
                    <img src={service.providerAvatar} alt={service.provider} className="w-7 h-7 rounded-full object-cover ring-2 ring-white shadow" />
                    <span className="text-xs text-gray-500 font-medium">{service.provider}</span>
                </div>

                {/* Title & Desc */}
                <div>
                    <h3 className="font-bold text-gray-900 text-base leading-tight">{service.name}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{service.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <StarRating rating={service.rating} />
                    <span className="text-sm font-semibold text-gray-700">{service.rating}</span>
                    <span className="text-xs text-gray-400">({service.reviewCount.toLocaleString()} reviews)</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                    {service.location}
                </div>

                {/* Highlights */}
                <ul className="space-y-1">
                    {service.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-1.5 text-xs text-gray-600">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                            {h}
                        </li>
                    ))}
                </ul>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div>
                        <span className="text-xs text-gray-400">Starting at</span>
                        <p className="text-xl font-bold text-gray-900">₹{service.price.toLocaleString()}</p>
                    </div>
                    <button
                        onClick={() => onBook(service)}
                        className="flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-primary/30 active:scale-95"
                    >
                        Book Now
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── BOOKING MODAL ───────────────────────────────────────────────────────────

function BookingModal({
    service,
    onClose,
    onConfirm,
}: {
    service: Service
    onClose: () => void
    onConfirm: (form: { date: string; time: string; notes: string }) => void
}) {
    const [form, setForm] = useState({ date: "", time: "", notes: "" })

    const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onConfirm(form)
    }

    const today = new Date().toISOString().split("T")[0]

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto">
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-1 sm:hidden">
                    <div className="w-10 h-1 bg-gray-300 rounded-full" />
                </div>

                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b">
                    <div className="flex items-center gap-3">
                        <img src={service.image} alt={service.name} className="w-14 h-14 rounded-xl object-cover" />
                        <div>
                            <h2 className="font-bold text-gray-900">{service.name}</h2>
                            <p className="text-sm text-gray-500">{service.provider}</p>
                            <p className="text-lg font-bold text-primary">₹{service.price.toLocaleString()}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    {/* Date & Time */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Schedule</h3>
                        <div className="relative">
                            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="date"
                                required
                                min={today}
                                value={form.date}
                                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                            />
                        </div>

                        {/* Time Slots */}
                        <div className="grid grid-cols-4 gap-2">
                            {timeSlots.map(slot => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setForm(f => ({ ...f, time: slot }))}
                                    className={`py-1.5 rounded-lg text-xs font-medium border transition-all ${form.time === slot
                                        ? "bg-primary text-white border-primary shadow-md"
                                        : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Special Instructions</h3>
                        <textarea
                            placeholder="Any specific requirements or notes for the service provider..."
                            value={form.notes}
                            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                            rows={2}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                        />
                    </div>

                    {/* Trust Row */}
                    <div className="flex items-center gap-4 py-3 px-4 bg-green-50 rounded-xl text-xs text-green-700">
                        <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
                        <span>100% secure booking. Verified professionals only. Cancel anytime before service date.</span>
                    </div>

                    {/* Submit → Add to Cart */}
                    <button
                        type="submit"
                        disabled={!form.date || !form.time}
                        className="w-full py-3 bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart — ₹{service.price.toLocaleString()}
                    </button>
                    <p className="text-center text-xs text-gray-400">You&apos;ll review and pay in the cart</p>
                </form>
            </div>
        </div>
    )
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function BookingPage() {
    const router = useRouter()
    const { addServiceItem } = useCart()
    const [activeCategory, setActiveCategory] = useState("all")
    const [search, setSearch] = useState("")
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [sortBy, setSortBy] = useState<"rating" | "price_asc" | "price_desc">("rating")

    const handleConfirmBooking = (
        service: Service,
        form: { date: string; time: string; notes: string }
    ) => {
        addServiceItem({
            id: service.id,
            title: service.name,
            image: service.image,
            price: service.price,
            type: 'service',
            provider: service.provider,
            providerAvatar: service.providerAvatar,
            duration: service.duration,
            bookingDate: form.date,
            bookingTime: form.time,
            bookingNotes: form.notes,
        })
        setSelectedService(null)
        router.push("/cart?tab=service-cart")
    }

    const filtered = useMemo(() => {
        let list = SERVICES
        if (activeCategory !== "all") list = list.filter(s => s.category === activeCategory)
        if (search.trim()) list = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()))
        if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating)
        if (sortBy === "price_asc") list = [...list].sort((a, b) => a.price - b.price)
        if (sortBy === "price_desc") list = [...list].sort((a, b) => b.price - a.price)
        return list
    }, [activeCategory, search, sortBy])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-indigo-700 text-white">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="relative container mx-auto px-4 py-14 text-center space-y-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                        ✨ 500+ Verified Service Professionals
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                        Book a Service <br className="sm:hidden" />
                        <span className="text-yellow-300">You Can Trust</span>
                    </h1>
                    <p className="text-white/80 text-lg max-w-xl mx-auto">
                        From home care to beauty, health, tech & more — we bring expert professionals to your doorstep.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-lg mx-auto mt-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search services (e.g. cleaning, massage, yoga...)"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-sm font-medium shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 placeholder:text-gray-400"
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-6 pt-2 text-sm text-white/80">
                        {[["🛡️", "Verified Pros"], ["⭐", "Avg. 4.7 Rating"], ["📅", "Flexible Scheduling"], ["💳", "Secure Payment"]].map(([icon, label]) => (
                            <span key={label} className="flex items-center gap-1.5">{icon} {label}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
                        {CATEGORIES.map(cat => {
                            const Icon = cat.icon
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${activeCategory === cat.id
                                        ? "bg-primary text-white shadow-md shadow-primary/30"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {cat.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Results Row */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold text-gray-900">{filtered.length}</span> services found
                        {activeCategory !== "all" && (
                            <span> in <span className="text-primary font-medium">{CATEGORIES.find(c => c.id === activeCategory)?.label}</span></span>
                        )}
                    </p>
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value as typeof sortBy)}
                        className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                    >
                        <option value="rating">Sort: Top Rated</option>
                        <option value="price_asc">Sort: Price ↑</option>
                        <option value="price_desc">Sort: Price ↓</option>
                    </select>
                </div>

                {/* Grid */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                        <Search className="h-12 w-12 text-gray-300" />
                        <h3 className="text-xl font-semibold text-gray-700">No services found</h3>
                        <p className="text-gray-400">Try a different keyword or category</p>
                        <button onClick={() => { setSearch(""); setActiveCategory("all") }} className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90">
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filtered.map(service => (
                            <ServiceCard key={service.id} service={service} onBook={setSelectedService} />
                        ))}
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            {selectedService && (
                <BookingModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                    onConfirm={(form) => handleConfirmBooking(selectedService, form)}
                />
            )}
        </div>
    )
}
