"use client"

import { cn } from "@/lib/utils"

const services = [
    {
        title: "Bills & Recharge",
        description: "Pay your bills & recharge instantly with Justdial",
        items: [
            { name: "Mobile" },
            { name: "Electricity" },
            { name: "DTH" },
            { name: "Water" },
            { name: "Gas" },
        ],
    },
    {
        title: "Travel Bookings",
        description: "Instant ticket bookings for your best travel experience",
        items: [
            { name: "Flight", subtitle: "Powered by Easemytrip.com" },
            { name: "Bus", subtitle: "Affordable Rides" },
            { name: "Train" },
            { name: "Hotel", subtitle: "Budget-friendly Stay" },
            { name: "Car Rentals", subtitle: "Drive Easy Anywhere" },
        ],
    },
]

export default function ServicesSection() {
    return (
        <section className="w-full py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 gap-16">

                    {services.map((section, index) => (
                        <div
                            key={section.title}
                            className={cn(
                                "flex flex-col lg:flex-row gap-12",
                                index !== services.length - 1 && "pb-16 border-b border-border/50"
                            )}
                        >
                            {/* Left Side Header */}
                            <div className="lg:w-1/4 space-y-4">
                                <h2 className="text-3xl font-bold text-foreground tracking-tight">
                                    {section.title}
                                </h2>

                                <p className="text-muted-foreground text-base leading-relaxed">
                                    {section.description}
                                </p>

                                <button className="inline-flex items-center text-primary text-sm font-semibold hover:tracking-wide transition-all">
                                    View All options →
                                </button>
                            </div>

                            {/* Right Side Icons Grid */}
                            <div className="lg:w-3/4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-8">
                                {section.items.map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex flex-col items-center text-center space-y-4 cursor-pointer group"
                                    >
                                        {/* Icon Circle */}
                                        <div className="relative w-16 h-16 flex items-center justify-center">
                                            <div className="absolute inset-0 bg-primary/5 rounded-full scale-100 group-hover:scale-110 transition-transform duration-500 ease-out" />
                                            <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center transition-colors">
                                                {/* Placeholder icon */}
                                                <div className="w-4 h-4 bg-primary/40 rounded-sm" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                                                {item.name}
                                            </p>

                                            {item.subtitle && (
                                                <p className="text-xs text-green-600 font-medium">
                                                    {item.subtitle}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}
