import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { LocationProvider } from "@/context/LocationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background min-h-screen flex flex-col font-sans antialiased">
        <CartProvider>
          <WishlistProvider>
            <LocationProvider>
              <Header />

              {/* Main Content */}
              <main className="flex-1">
                {children}
              </main>

              <Footer />
            </LocationProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
