export type NewsArticle = {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  image: string
  category: string
  content: string[]
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "10 Must-Have Gadgets for 2024",
    excerpt:
      "Discover the latest tech trends that are shaping the future of home automation and personal productivity.",
    date: "Feb 10, 2024",
    author: "Tech Insider",
    image: "https://picsum.photos/seed/tech/1200/800",
    category: "Technology",
    content: [
      "Smart devices keep getting smaller, faster, and more helpful. But the best gadgets aren’t just shiny—they reduce friction in your day-to-day.",
      "In 2024, the biggest shift is interoperability: products that work together out of the box, with fewer apps and more automation.",
      "When shopping, prioritize battery life, privacy controls, and long-term software support. A good gadget should stay useful after the hype fades.",
    ],
  },
  {
    id: "2",
    title: "Sustainable Fashion: A Guide to Eco-Friendly Shopping",
    excerpt:
      "Learn how to build a wardrobe that looks good and feels good for the planet.",
    date: "Feb 08, 2024",
    author: "Style Guru",
    image: "https://picsum.photos/seed/eco/1200/800",
    category: "Fashion",
    content: [
      "Sustainable fashion starts with buying less—and buying better. Look for durable fabrics, timeless fits, and repairable construction.",
      "Second-hand and certified materials can reduce environmental impact, but transparency matters. Prefer brands that publish supply-chain details.",
      "If you’re upgrading your basics, focus on versatile pieces you can wear often. Cost-per-wear beats impulse deals every time.",
    ],
  },
  {
    id: "3",
    title: "Top 5 Home Workout Equipment",
    excerpt:
      "Stay fit and healthy with these essential pieces of gym equipment for your home.",
    date: "Feb 05, 2024",
    author: "Fitness Pro",
    image: "https://picsum.photos/seed/gym/1200/800",
    category: "Health",
    content: [
      "Home workouts are all about consistency, not complexity. The best gear is the gear you’ll actually use.",
      "A few compact staples cover most training goals: strength, cardio, mobility, and recovery. Choose equipment that fits your space and routine.",
      "Start with fundamentals, then add specialized tools only when you’ve built the habit. Your future self will thank you.",
    ],
  },
]

export function getNewsArticleById(id: string) {
  return newsArticles.find((article) => article.id === id)
}

