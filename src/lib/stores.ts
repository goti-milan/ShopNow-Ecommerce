export type StoreProfile = {
  id: number
  name: string
  category: string
  tagline: string
  rating: number
  reviewsLabel: string
  location: string
  verified?: boolean
  logo: string
  cover: string
}

export const stores: StoreProfile[] = [
  {
    id: 1,
    name: "Tech Haven",
    category: "Electronics",
    tagline: "Premium electronics & gadgets",
    rating: 4.8,
    reviewsLabel: "5.2k",
    location: "Silicon Valley, USA",
    verified: true,
    logo: "https://picsum.photos/seed/techhaven-logo/200/200",
    cover: "https://picsum.photos/seed/techhaven-cover/1200/400",
  },
  {
    id: 2,
    name: "Style Studio",
    category: "Fashion",
    tagline: "Modern fashion & accessories",
    rating: 4.5,
    reviewsLabel: "3.1k",
    location: "New York, USA",
    verified: true,
    logo: "https://picsum.photos/seed/stylestudio-logo/200/200",
    cover: "https://picsum.photos/seed/stylestudio-cover/1200/400",
  },
  {
    id: 3,
    name: "Green Living",
    category: "Home & Garden",
    tagline: "Eco-friendly home essentials",
    rating: 4.9,
    reviewsLabel: "1.9k",
    location: "Portland, USA",
    verified: true,
    logo: "https://picsum.photos/seed/greenliving-logo/200/200",
    cover: "https://picsum.photos/seed/greenliving-cover/1200/400",
  },
  {
    id: 4,
    name: "Sports Gear Pro",
    category: "Sports",
    tagline: "Performance gear for athletes",
    rating: 4.6,
    reviewsLabel: "2.8k",
    location: "Chicago, USA",
    verified: true,
    logo: "https://picsum.photos/seed/sportsgearpro-logo/200/200",
    cover: "https://picsum.photos/seed/sportsgearpro-cover/1200/400",
  },
]

export function getStoreById(storeId: number) {
  return stores.find((store) => store.id === storeId)
}

