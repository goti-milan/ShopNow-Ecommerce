
export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  badgeText?: string;
};
