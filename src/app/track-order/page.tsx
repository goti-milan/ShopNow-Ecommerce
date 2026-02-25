"use client"

import React, { useState } from "react"
import { Package, Search, MapPin, Truck, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface TimelineStep {
    status: string;
    date: string;
    completed: boolean;
}

interface TrackingData {
    orderId: string;
    status: string;
    estimatedDelivery: string;
    currentLocation: string;
    timeline: TimelineStep[];
}

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("")
    const [emailOrPhone, setEmailOrPhone] = useState("")
    const [isTracking, setIsTracking] = useState(false)
    const [trackingData, setTrackingData] = useState<TrackingData | null>(null)

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault()
        setIsTracking(true)

        // Simulate API call
        setTimeout(() => {
            setTrackingData({
                orderId: orderId || "ORD-73295-X2",
                status: "In Transit",
                estimatedDelivery: "February 20, 2026",
                currentLocation: "Los Angeles, CA",
                timeline: [
                    { status: "Order Placed", date: "Feb 15, 2026, 10:30 AM", completed: true },
                    { status: "Processing", date: "Feb 15, 2026, 2:45 PM", completed: true },
                    { status: "Shipped", date: "Feb 16, 2026, 9:20 AM", completed: true },
                    { status: "In Transit", date: "Feb 17, 2026, 8:00 AM", completed: false },
                    { status: "Out for Delivery", date: "Expected Feb 20, 2026", completed: false },
                ]
            })
            setIsTracking(false)
        }, 1500)
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-text-primary mb-2">Track Your Order</h1>
                <p className="text-text-muted">Enter your order details below to see the current status of your shipment.</p>
            </div>

            <Card className="mb-8 border-border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Shipping Details</CardTitle>
                    <CardDescription>You can find your order ID in the confirmation email sent to you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="orderId">Order ID</Label>
                            <div className="relative">
                                <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                                <Input
                                    id="orderId"
                                    placeholder="e.g. ORD-12345"
                                    className="pl-10"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="emailOrPhone">Email or Phone Number</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                                <Input
                                    id="emailOrPhone"
                                    placeholder="Email or phone used at checkout"
                                    className="pl-10"
                                    value={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <Button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary-dark transition-colors h-11 text-lg font-medium"
                                disabled={isTracking}
                            >
                                {isTracking ? "Searching..." : "Track Order"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {trackingData && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="border-primary/20 bg-primary/5">
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div>
                                    <p className="text-sm text-text-muted uppercase tracking-wider font-semibold">Order ID</p>
                                    <p className="text-xl font-bold text-primary">{trackingData.orderId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-text-muted uppercase tracking-wider font-semibold">Current Status</p>
                                    <div className="flex items-center gap-2 text-primary">
                                        <Truck className="h-5 w-5" />
                                        <p className="text-xl font-bold">{trackingData.status}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-text-muted uppercase tracking-wider font-semibold">Estimated Delivery</p>
                                    <p className="text-xl font-bold text-text-primary">{trackingData.estimatedDelivery}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                            <h3 className="text-xl font-bold text-text-primary">Shipment Timeline</h3>
                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-border before:to-border">
                                {trackingData.timeline.map((step, index) => (
                                    <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            {step.completed ? (
                                                <CheckCircle2 className="h-6 w-6 text-primary" />
                                            ) : (
                                                <div className={`h-3 w-3 rounded-full ${index === 3 ? 'bg-primary animate-pulse' : 'bg-border'}`} />
                                            )}
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-white shadow-sm">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-bold text-text-primary">{step.status}</div>
                                                <time className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{step.date.split(',')[0]}</time>
                                            </div>
                                            <div className="text-sm text-text-muted">{step.date}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg">Delivery Address</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-text-muted space-y-2">
                                    <div className="flex gap-2">
                                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                                        <p>
                                            John Doe<br />
                                            123 Ocean View Dr<br />
                                            Apt 4B<br />
                                            Los Angeles, CA 90210<br />
                                            United States
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg">Help & Support</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm space-y-4">
                                    <p className="text-text-muted">Need help with your shipment? Contact our support team.</p>
                                    <Button variant="outline" className="w-full">Contact Support</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            )}

            {/* FAQs or helpful notes */}
            <div className="mt-16 pt-8 border-t border-border">
                <h3 className="text-xl font-bold text-text-primary mb-6">Frequently Asked Questions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold mb-2">When will my order ship?</h4>
                        <p className="text-sm text-text-muted">Orders are typically processed within 1-2 business days. You&apos;ll receive an email with your tracking number once it&apos;s on its way.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Can I change my delivery address?</h4>
                        <p className="text-sm text-text-muted">If your order hasn&apos;t shipped yet, we might be able to update it. Please contact support as soon as possible.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">My tracking hasn&apos;t updated in days.</h4>
                        <p className="text-sm text-text-muted">Tracking information may not update every day as the package moves between hubs. If it hasn&apos;t moved in more than 5 days, please contact us.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">What if my package is lost?</h4>
                        <p className="text-sm text-text-muted">If your package is marked as delivered but you haven&apos;t received it, or if it&apos;s significantly delayed, we&apos;ll open an investigation with the carrier.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
