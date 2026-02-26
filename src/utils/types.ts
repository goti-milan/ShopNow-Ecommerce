
export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  badgeText?: string;
  description?: string;
  type?: 'product' | 'service';
  // Service booking metadata
  bookingDate?: string;
  bookingTime?: string;
  provider?: string;
  providerAvatar?: string;
  duration?: string;
  bookingNotes?: string;
};

export type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  type: 'product' | 'service';
  description?: string;
};

