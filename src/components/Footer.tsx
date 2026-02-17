import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="font-bold mb-4 text-lg">ShopNow</h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Your one-stop shop for everything you need. Quality products, best prices, and fast delivery.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/aboutus" className="hover:text-white transition">About Us</Link></li>
                            <li><Link href="/shop" className="hover:text-white transition">Shop</Link></li>
                            <li><Link href="/news" className="hover:text-white transition">Blog</Link></li>
                            <li><Link href="/store" className="hover:text-white transition">Store</Link></li>
                            <li><Link href="/market" className="hover:text-white transition">Market</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/contactus" className="hover:text-white transition">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                            <li><Link href="/policy" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link href="/account" className="hover:text-white transition">My Account</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <div className="flex gap-4 mb-4">
                            <a href="#" className="hover:text-white transition"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-white transition"><Instagram className="w-5 h-5" /></a>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
