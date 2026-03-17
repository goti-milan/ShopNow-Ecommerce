import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, ChevronLeft, User } from "lucide-react"
import { getNewsArticleById, newsArticles } from "@/lib/news"

export function generateStaticParams() {
  return newsArticles.map((article) => ({ id: article.id }))
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = getNewsArticleById(id)

  if (!article) notFound()

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/news"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to News
      </Link>

      <header className="mb-8">
        <div className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {article.category}
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {article.date}
          </div>
          <div className="inline-flex items-center gap-2">
            <User className="h-4 w-4" />
            {article.author}
          </div>
        </div>
      </header>

      <div className="relative mb-10 overflow-hidden rounded-2xl border bg-muted">
        <div className="relative aspect-[16/9]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <main className="prose prose-neutral max-w-none dark:prose-invert">
        <p className="text-muted-foreground">{article.excerpt}</p>
        {article.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </main>
    </div>
  )
}
