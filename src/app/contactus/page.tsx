"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactUsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We'd love to hear from you. Whether you have a question about our
                    products, pricing, or anything else, our team is ready to answer all
                    your questions.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="flex gap-4 items-start">
                        <div className="bg-primary/10 p-3 rounded-lg text-primary">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Our Office</h3>
                            <p className="text-muted-foreground">
                                123 Commerce St, Market City
                                <br />
                                New York, NY 10012, USA
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="bg-primary/10 p-3 rounded-lg text-primary">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Email Us</h3>
                            <p className="text-muted-foreground">support@shopnow.com</p>
                            <p className="text-muted-foreground">info@shopnow.com</p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="bg-primary/10 p-3 rounded-lg text-primary">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Call Us</h3>
                            <p className="text-muted-foreground">+1 (555) 123-4567</p>
                            <p className="text-muted-foreground">Mon-Fri from 8am to 5pm</p>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="w-full h-64 bg-muted rounded-xl flex items-center justify-center">
                        <p className="text-muted-foreground">Map Integration Placeholder</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-card border rounded-xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">First Name</label>
                                <Input placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Last Name</label>
                                <Input placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input type="email" placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone (Optional)</label>
                            <Input type="tel" placeholder="+1 (555) 000-0000" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <Textarea
                                placeholder="How can we help you?"
                                className="min-h-[120px]"
                            />
                        </div>

                        <Button className="w-full gap-2">
                            Send Message <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
