import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const articles = [
    {
        id: 1,
        title: "10 Must-Have Gadgets for 2024",
        excerpt: "Discover the latest tech trends that are shaping the future of home automation and personal productivity.",
        date: "Feb 10, 2024",
        author: "Tech Insider",
        image: "https://picsum.photos/seed/tech/800/600",
        category: "Technology",
    },
    {
        id: 2,
        title: "Sustainable Fashion: A Guide to Eco-Friendly Shopping",
        excerpt: "Learn how to build a wardrobe that looks good and feels good for the planet.",
        date: "Feb 08, 2024",
        author: "Style Guru",
        image: "https://picsum.photos/seed/eco/800/600",
        category: "Fashion",
    },
    {
        id: 3,
        title: "Top 5 Home Workout Equipment",
        excerpt: "Stay fit and healthy with these essential pieces of gym equipment for your home.",
        date: "Feb 05, 2024",
        author: "Fitness Pro",
        image: "https://picsum.photos/seed/gym/800/600",
        category: "Health",
    },
];

export default function NewsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Latest News & Articles</h1>
                <p className="text-muted-foreground">Insights, trends, and stories from the world of e-commerce.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                    <article key={article.id} className="group border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                                {article.category}
                            </span>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {article.date}
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {article.author}
                                </div>
                            </div>

                            <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                <Link href={`/news/${article.id}`}>{article.title}</Link>
                            </h2>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                {article.excerpt}
                            </p>

                            <Button variant="link" className="p-0 h-auto gap-1 text-primary">
                                Read More <ArrowRight className="w-3 h-3" />
                            </Button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
