import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="bg-black text-white mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-xl font-bold">
                                🛒
                            </div>
                            <span className="text-xl font-bold">ShopNow</span>
                        </div>
                        <p className="text-white/70 text-sm mb-4">
                            Your one-stop shop for everything you need. Quality products, best prices, and fast delivery.
                        </p>
                        <div className="space-y-2 text-sm text-white/70">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>123 Commerce Street, New York, NY 10001</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>support@shopnow.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-white/70 text-sm">
                            <li><Link href="/aboutus" className="hover:text-white transition">About Us</Link></li>
                            <li><Link href="/shop" className="hover:text-white transition">Shop</Link></li>
                            <li><Link href="/category" className="hover:text-white transition">Categories</Link></li>
                            <li><Link href="/news" className="hover:text-white transition">Blog</Link></li>
                            <li><Link href="/store" className="hover:text-white transition">Become a Seller</Link></li>
                            <li><Link href="/market" className="hover:text-white transition">Marketplace</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-white/70 text-sm">
                            <li><Link href="/contactus" className="hover:text-white transition">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                            <li><Link href="/policy" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link href="/policy" className="hover:text-white transition">Terms & Conditions</Link></li>
                            <li><Link href="/policy" className="hover:text-white transition">Return Policy</Link></li>
                            <li><Link href="/track-order" className="hover:text-white transition">Track Order</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold mb-4">Stay Connected</h4>
                        <p className="text-white/70 text-sm mb-4">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                            <Button size="icon" className="bg-white text-primary hover:bg-white/90">
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="hover:text-white transition"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition"><Instagram className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
                    <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

