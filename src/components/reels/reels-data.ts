export interface Reel {
    id: number;
    username: string;
    userAvatar: string;
    caption: string;
    music: string;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    views: string;
    videoUrl: string;
    isLiked: boolean;
    isSaved: boolean;
    isFollowing: boolean;
}

export const reelsData: Reel[] = [
    {
        id: 1,
        username: "shopnow_official",
        userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
        caption: "🔥 Summer Collection 2024 is here! Check out these amazing deals 🔥 #SummerVibes #Fashion #ShopNow",
        music: "Summer Vibes - Official Sound",
        likes: 12500,
        comments: 342,
        shares: 156,
        saves: 890,
        views: "125K",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        isLiked: false,
        isSaved: false,
        isFollowing: true
    },
    {
        id: 2,
        username: "tech_gadgets",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
        caption: "📱 Latest tech unboxing! This is insane 😱 #Tech #Unboxing #Gadgets",
        music: "Tech Beats - Mix",
        likes: 8900,
        comments: 215,
        shares: 89,
        saves: 456,
        views: "89K",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        isLiked: true,
        isSaved: false,
        isFollowing: false
    },
    {
        id: 3,
        username: "fashion_insider",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
        caption: "💄 Beauty routine transformation ✨ #Beauty #Makeup #Transformation",
        music: "Glow Up - Trendy Beats",
        likes: 25000,
        comments: 567,
        shares: 234,
        saves: 1200,
        views: "250K",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        isLiked: false,
        isSaved: true,
        isFollowing: true
    },
    {
        id: 4,
        username: "home_decor",
        userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
        caption: "🏠 Living room makeover on a budget! #HomeDecor #InteriorDesign #DIY",
        music: "Cozy Home - Ambient",
        likes: 15600,
        comments: 423,
        shares: 178,
        saves: 934,
        views: "156K",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        isLiked: false,
        isSaved: false,
        isFollowing: false
    },
    {
        id: 5,
        username: "fitness_pro",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
        caption: "💪 10 minute home workout! No equipment needed 💪 #Fitness #Workout #HomeGym",
        music: "Pump Up - Workout Mix",
        likes: 32000,
        comments: 789,
        shares: 456,
        saves: 2100,
        views: "320K",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        isLiked: true,
        isSaved: true,
        isFollowing: true
    },
];
