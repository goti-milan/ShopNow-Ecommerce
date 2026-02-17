

export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  badgeText?: string;
};

export type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  type: 'product' | 'service';
  description?: string;
};

