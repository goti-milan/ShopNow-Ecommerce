import InstagramReels from "@/components/reels/InstagramReels"
import { reelsData } from "@/components/reels/reels-data"
import HighlightGroups, { HighlightGroup } from "@/components/common/HighlightGroups"

export default function ReelsPage() {
    const sortedByLikes = [...reelsData].sort((a, b) => b.likes - a.likes)
    const sortedByViews = [...reelsData].sort((a, b) => Number(b.views.replace("K", "")) - Number(a.views.replace("K", "")))

    const highlightGroups: HighlightGroup[] = [
        {
            id: "latest",
            label: "Latest",
            description: "Newest reels today",
            items: reelsData.slice(0, 3).map((reel) => ({
                id: reel.id,
                title: reel.caption.split(" ").slice(0, 3).join(" ") + "...",
                subtitle: `@${reel.username}`,
                image: reel.userAvatar,
                meta: `${reel.views} views · ${reel.comments} comments`,
            })),
        },
        {
            id: "trending",
            label: "Trending",
            description: "What people watch",
            items: sortedByLikes.slice(0, 3).map((reel) => ({
                id: `${reel.id}-t`,
                title: reel.caption.split(" ").slice(0, 3).join(" ") + "...",
                subtitle: `@${reel.username}`,
                image: reel.userAvatar,
                meta: `${reel.likes.toLocaleString()} likes`,
                tag: "Hot",
            })),
        },
        {
            id: "popular",
            label: "Popular",
            description: "Most saved reels",
            items: sortedByViews.slice(0, 3).map((reel) => ({
                id: `${reel.id}-p`,
                title: reel.caption.split(" ").slice(0, 3).join(" ") + "...",
                subtitle: `@${reel.username}`,
                image: reel.userAvatar,
                meta: `${reel.saves.toLocaleString()} saves`,
            })),
        },
    ]

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-10">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-slate-900">ShopNow Reels</h1>
                    <p className="text-sm text-slate-500">Discover the latest drops, creators, and trends.</p>
                </div>
                <HighlightGroups groups={highlightGroups} />
            </div>
            <InstagramReels />
        </div>
    )
}
