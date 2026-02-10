import { Heart, MapPin, Package, ShoppingCart, User } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <header className="h-18 w-full border-b border-border bg-white">
      <div className="h-full max-w-360 mx-auto px-6 flex items-center justify-between">

        {/* LEFT: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-brand-primary flex items-center justify-center text-white font-bold">
            🛒
          </div>
          <span className="text-xl font-semibold text-brand-primary">
            ShopNow
          </span>
        </div>

        {/* CENTER: Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-text-secondary">
          {["Shopping", "Market", "Services", "Store", "News"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-text-primary transition"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-6">

          {/* Location */}
          <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary">
            <MapPin size={16} className="text-brand-primary" />
            Select Location
          </button>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <HeaderIcon icon={User} label="Profile" />
            <HeaderIcon icon={Package} label="Orders" />
            <HeaderIcon icon={Heart} label="Wishlist" />
            <HeaderIcon icon={ShoppingCart} label="Cart" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


function HeaderIcon({
  icon: Icon,
  label,
}: {
  icon: any;
  label: string;
}) {
  return (
    <button className="flex flex-col items-center text-xs text-text-secondary hover:text-text-primary transition">
      <Icon size={18} />
      <span className="mt-1">{label}</span>
    </button>
  );
}