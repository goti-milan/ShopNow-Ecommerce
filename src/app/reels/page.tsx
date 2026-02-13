import { Play } from "lucide-react";

const reels = [
    { id: 1, title: "Summer Collection", views: "1.2M", image: "https://picsum.photos/seed/reel1/300/500" },
    { id: 2, title: "Tech Unboxing", views: "850K", image: "https://picsum.photos/seed/reel2/300/500" },
    { id: 3, title: "Kitchen Hacks", views: "2.5M", image: "https://picsum.photos/seed/reel3/300/500" },
    { id: 4, title: "Outfit Ideas", views: "500K", image: "https://picsum.photos/seed/reel4/300/500" },
];

export default function ReelsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Trending Reels</h1>

            <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory justify-center">
                {reels.map((reel) => (
                    <div
                        key={reel.id}
                        className="flex-shrink-0 w-72 h-[500px] bg-black rounded-2xl relative overflow-hidden group snap-center cursor-pointer"
                    >
                        {/* Using img for simplicity in reels simulation, normally use video */}
                        <img
                            src={reel.image}
                            alt={reel.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-8 h-8 text-white fill-white ml-1" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                            <h3 className="font-bold text-lg mb-1">{reel.title}</h3>
                            <p className="text-sm opacity-80">{reel.views} views</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
