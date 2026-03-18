export type AppNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  href?: string;
  read?: boolean;
};

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "order-shipped",
    title: "Order shipped",
    message: "Your order #SN-20491 is on the way. Track it anytime from your orders.",
    time: "2h ago",
    href: "/account/orders",
    read: false,
  },
  {
    id: "flash-sale",
    title: "Flash sale is live",
    message: "Up to 70% off on premium products. Limited time only.",
    time: "5h ago",
    href: "/flashsale",
    read: false,
  },
  {
    id: "wishlist-price-drop",
    title: "Price drop on your wishlist",
    message: "An item you saved just dropped in price. Check it out before it sells out.",
    time: "1d ago",
    href: "/wishlist",
    read: false,
  },
  {
    id: "new-arrivals",
    title: "New arrivals",
    message: "Fresh products added today. Discover what’s trending right now.",
    time: "2d ago",
    href: "/shop",
    read: true,
  },
  {
    id: "review-reminder",
    title: "Review your purchase",
    message: "Tell us what you think about your recent order to help other shoppers.",
    time: "3d ago",
    href: "/review",
    read: true,
  },
];

