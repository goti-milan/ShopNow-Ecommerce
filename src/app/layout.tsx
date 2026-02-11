import "./globals.css";
import { ShoppingCart, Search, Menu, X } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-ne">
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-primary">ShopNow</div>

            {/* Search Bar */}
            <div className="flex-1 mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-text w-5 h-5" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              <button className="text-secondary hover:text-primary transition">
                <ShoppingCart className="w-6 h-6" />
              </button>
              <button className="hidden md:block px-4 py-2 text-secondary-text hover:text-secondary transition">
                Sign In
              </button>
              <button className="md:hidden text-secondary">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white border-b border-border hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex gap-8 py-4 text-secondary-text">
              <li>
                <a href="#" className="hover:text-primary transition font-medium">
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition font-medium">
                  Fashion
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition font-medium">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition font-medium">
                  Sports
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition font-medium">
                  More
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="bg-surface min-h-screen">
          <div className=" mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-black text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-bold mb-4">About</h4>
                <ul className="space-y-2 text-secondary-text text-sm">
                  <li><a href="#" className="hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-secondary-text text-sm">
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition">Shipping</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Policies</h4>
                <ul className="space-y-2 text-secondary-text text-sm">
                  <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition">Refunds</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Connect</h4>
                <ul className="space-y-2 text-secondary-text text-sm">
                  <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                  <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition">Instagram</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-8 text-center text-secondary-text text-sm">
              <p>&copy; 2026 ShopNow. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
