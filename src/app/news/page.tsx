import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HighlightGroups, { HighlightGroup } from "@/components/common/HighlightGroups";
import { newsArticles } from "@/lib/news";

export default function NewsPage() {
    const highlightGroups: HighlightGroup[] = [
        {
            id: "latest",
            label: "Latest",
            description: "Fresh from the newsroom",
            items: newsArticles.map((article) => ({
                id: article.id,
                title: article.title,
                subtitle: article.category,
                image: article.image,
                meta: `${article.date} · ${article.author}`,
                href: `/news/${article.id}`,
            })),
        },
        {
            id: "trending",
            label: "Trending",
            description: "Readers are loving",
            items: [
                {
                    id: "t1",
                    title: "Smart Home Starter Kits",
                    subtitle: "Technology",
                    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
                    meta: "4.8k reads · 12 min",
                    tag: "Hot",
                },
                {
                    id: "t2",
                    title: "Athleisure Essentials",
                    subtitle: "Fashion",
                    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
                    meta: "3.2k reads · 8 min",
                },
                {
                    id: "t3",
                    title: "Wellness Routine Reset",
                    subtitle: "Health",
                    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
                    meta: "2.7k reads · 6 min",
                },
            ],
        },
        {
            id: "popular",
            label: "Popular",
            description: "All-time favorites",
            items: [
                {
                    id: "p1",
                    title: "Holiday Gift Guides",
                    subtitle: "Lifestyle",
                    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
                    meta: "9.1k reads · 10 min",
                    tag: "Top",
                },
                {
                    id: "p2",
                    title: "Minimalist Home Decor",
                    subtitle: "Home",
                    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
                    meta: "7.4k reads · 9 min",
                },
                {
                    id: "p3",
                    title: "Productivity Tech Picks",
                    subtitle: "Technology",
                    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
                    meta: "6.9k reads · 11 min",
                },
            ],
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Latest News & Articles</h1>
                <p className="text-muted-foreground">Insights, trends, and stories from the world of e-commerce.</p>
            </div>

            <div className="mb-12">
                <HighlightGroups groups={highlightGroups} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsArticles.map((article) => (
                    <Link
                        key={article.id}
                        href={`/news/${article.id}`}
                        className="group block overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
                        aria-label={`Read article: ${article.title}`}
                    >
                        <article>
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                                    {article.category}
                                </span>
                            </div>

                            <div className="p-6">
                                <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {article.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        {article.author}
                                    </div>
                                </div>

                                <h2 className="mb-3 text-xl font-bold transition-colors group-hover:text-primary">
                                    {article.title}
                                </h2>
                                <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                                    {article.excerpt}
                                </p>

                                <div className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                                    Read More <ArrowRight className="h-3 w-3" />
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
