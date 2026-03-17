"use client"

import { useState, useRef, useEffect } from "react"
import {
    Play,
    Pause,
    Heart,
    MessageCircle,
    Share2,
    Star,
    Users,
    Radio,
    Eye,
    Send,
    Volume2,
    VolumeX,
    X,
    Minimize2,
    Maximize2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { getStoreById } from "@/lib/stores"

export interface VideoReel {
    id: number
    username: string
    userAvatar: string
    caption: string
    thumbnail: string
    videoUrl: string
    likes: number
    comments: number
    shares: number
    views: string
    duration: string
    isLiked: boolean
    isFollowing: boolean
    tags: string[]
}

export interface LiveStream {
    id: number
    streamerName: string
    streamerAvatar: string
    title: string
    thumbnail: string
    viewers: number
    isLive: boolean
    category: string
    startedAt: string
    isFollowing: boolean
    storeId?: number
}

// Sample video data
export const videosData: VideoReel[] = [
    {
        id: 1,
        username: "shopnow_official",
        userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
        caption: "🔥 Summer Collection 2024 is here! Check out these amazing deals 🔥 #SummerVibes #Fashion",
        thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=600&fit=crop",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        likes: 12500,
        comments: 342,
        shares: 156,
        views: "125K",
        duration: "0:45",
        isLiked: false,
        isFollowing: true,
        tags: ["Fashion", "Summer", "Deals"]
    },
    {
        id: 2,
        username: "tech_gadgets",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
        caption: "📱 Latest tech unboxing! This is insane 😱 #Tech #Unboxing",
        thumbnail: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=600&fit=crop",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        likes: 8900,
        comments: 215,
        shares: 89,
        views: "89K",
        duration: "1:20",
        isLiked: true,
        isFollowing: false,
        tags: ["Tech", "Gadgets", "Unboxing"]
    },
    {
        id: 3,
        username: "fashion_insider",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
        caption: "💄 Beauty routine transformation ✨ #Beauty #Makeup",
        thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=600&fit=crop",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        likes: 25000,
        comments: 567,
        shares: 234,
        views: "250K",
        duration: "2:15",
        isLiked: false,
        isFollowing: true,
        tags: ["Beauty", "Makeup", "Tutorial"]
    },
    {
        id: 4,
        username: "home_decor",
        userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
        caption: "🏠 Living room makeover on a budget! #HomeDecor #InteriorDesign",
        thumbnail: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=600&fit=crop",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        likes: 15600,
        comments: 423,
        shares: 178,
        views: "156K",
        duration: "3:30",
        isLiked: false,
        isFollowing: false,
        tags: ["HomeDecor", "DIY", "Interior"]
    },
    {
        id: 5,
        username: "fitness_pro",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
        caption: "💪 10 minute home workout! No equipment needed 💪 #Fitness #Workout",
        thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=600&fit=crop",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        likes: 32000,
        comments: 789,
        shares: 456,
        views: "320K",
        duration: "10:00",
        isLiked: true,
        isFollowing: true,
        tags: ["Fitness", "Workout", "Health"]
    },
    {
        id: 6,
        username: "foodie_paradise",
        userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        caption: "🍕 Making the perfect pizza at home! #Food #Cooking #Recipe",
        thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=600&fit=crop",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        likes: 18900,
        comments: 456,
        shares: 234,
        views: "189K",
        duration: "5:45",
        isLiked: false,
        isFollowing: true,
        tags: ["Food", "Cooking", "Recipe"]
    }
]

// Sample live stream data
export const liveStreamsData: LiveStream[] = [
    {
        id: 1,
        streamerName: "shopnow_live",
        streamerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
        title: "Live Shopping Event - Up to 70% Off! 🛍️",
        thumbnail: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=600&fit=crop",
        viewers: 12500,
        isLive: true,
        category: "Shopping",
        startedAt: "30 min ago",
        isFollowing: true,
        storeId: 1,
    },
    {
        id: 2,
        streamerName: "tech_expert",
        streamerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
        title: "Live Tech Review - iPhone 16 Pro Max",
        thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=600&fit=crop",
        viewers: 8900,
        isLive: true,
        category: "Technology",
        startedAt: "1 hour ago",
        isFollowing: false,
        storeId: 1,
    },
    {
        id: 3,
        streamerName: "beauty_guru",
        streamerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
        title: "Summer Makeup Tutorial - Live Q&A",
        thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=600&fit=crop",
        viewers: 5600,
        isLive: true,
        category: "Beauty",
        startedAt: "15 min ago",
        isFollowing: true,
        storeId: 2,
    },
    {
        id: 4,
        streamerName: "fitness_coach",
        streamerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
        title: "Live Workout Session - Full Body HIIT",
        thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
        viewers: 12300,
        isLive: true,
        category: "Fitness",
        startedAt: "45 min ago",
        isFollowing: true,
        storeId: 4,
    },
    {
        id: 5,
        streamerName: "cooking_master",
        streamerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        title: "Cooking Live - Italian Pasta Making",
        thumbnail: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=600&fit=crop",
        viewers: 4200,
        isLive: true,
        category: "Food",
        startedAt: "20 min ago",
        isFollowing: false,
        storeId: 3,
    },
    {
        id: 6,
        streamerName: "home_designer",
        streamerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
        title: "Interior Design Consultation - Live",
        thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=600&fit=crop",
        viewers: 3100,
        isLive: true,
        category: "Home & Living",
        startedAt: "1 hour ago",
        isFollowing: false,
        storeId: 3,
    }
]

interface VideoCardProps {
    video: VideoReel
    onPlay: (video: VideoReel) => void
}

function VideoCard({ video, onPlay }: VideoCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isLiked, setIsLiked] = useState(video.isLiked)

    return (
        <Card
            className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onPlay(video)}
        >
            <div className="relative aspect-9/16 bg-muted overflow-hidden">
                <img
                    src={video.thumbnail}
                    alt={video.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                </div>

                {/* Duration badge */}
                <Badge className="absolute bottom-2 right-2 bg-secondary/60 text-white hover:bg-secondary/70 text-xs">
                    {video.duration}
                </Badge>

                {/* Live indicator */}
                {video.isLiked && (
                    <div className="absolute top-2 left-2">
                        <Heart className="w-5 h-5 text-primary fill-primary" />
                    </div>
                )}
            </div>

            <CardContent className="p-3">
                <div className="flex gap-2">
                    <Avatar className="h-8 w-8 shrink-0">
                        <AvatarImage src={video.userAvatar} />
                        <AvatarFallback>{video.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{video.caption}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">@{video.username}</span>
                            {video.isFollowing && (
                                <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
                                    Following
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-3 pt-0 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <Heart className={`w-3 h-3 ${isLiked ? 'text-primary fill-primary' : ''}`} />
                        {video.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {video.comments}
                    </span>
                </div>
                <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views}
                </span>
            </CardFooter>
        </Card>
    )
}

interface LiveCardProps {
    stream: LiveStream
    onWatch: (stream: LiveStream) => void
}

function LiveCard({ stream, onWatch }: LiveCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Card
            className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onWatch(stream)}
        >
            <div className="relative aspect-video bg-muted overflow-hidden">
                <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Live badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-primary text-white px-2 py-0.5 rounded text-xs font-bold animate-pulse">
                    <Radio className="w-3 h-3 fill-current" />
                    LIVE
                </div>

                {/* Viewers badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-secondary/60 text-white px-2 py-0.5 rounded text-xs">
                    <Users className="w-3 h-3" />
                    {stream.viewers.toLocaleString()}
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Watch button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button className="bg-primary hover:bg-primary-dark text-white rounded-full px-6">
                        <Eye className="w-4 h-4 mr-2" />
                        Watch Live
                    </Button>
                </div>
            </div>

            <CardContent className="p-3">
                <div className="flex gap-2">
                    <Avatar className="h-9 w-9 shrink-0 ring-2 ring-primary">
                        <AvatarImage src={stream.streamerAvatar} />
                        <AvatarFallback>{stream.streamerName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold line-clamp-1">{stream.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">@{stream.streamerName}</span>
                            {stream.isFollowing && (
                                <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
                                    Following
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-3 pt-0 flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                    {stream.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                    Started {stream.startedAt}
                </span>
            </CardFooter>
        </Card>
    )
}

interface VideoPlayerModalProps {
    video: VideoReel | null
    isOpen: boolean
    onClose: () => void
}

function VideoPlayerModal({ video, isOpen, onClose }: VideoPlayerModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [progress, setProgress] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.play().catch(() => { })
        }
    }, [isOpen])

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
            setProgress(progress)
        }
    }

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play().catch(() => { })
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    if (!isOpen || !video) return null

    return (
        <div className="fixed inset-0 z-50 bg-secondary/90 flex items-center justify-center">
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-background/20 z-10"
                onClick={onClose}
            >
                <X className="w-6 h-6" />
            </Button>

            <div className={`relative ${isFullscreen ? 'w-screen h-screen' : 'w-full max-w-4xl aspect-9/16 lg:aspect-video'}`}>
                <video
                    ref={videoRef}
                    src={video.videoUrl}
                    className="w-full h-full object-cover rounded-lg"
                    playsInline
                    loop
                    muted={isMuted}
                    onTimeUpdate={handleTimeUpdate}
                    onClick={togglePlay}
                />

                {/* Progress bar */}
                <div className="absolute bottom-20 left-0 right-0 px-4">
                    <div className="h-1 bg-background/30 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-background rounded-full transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent rounded-b-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-background/20"
                                onClick={togglePlay}
                            >
                                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-background/20"
                                onClick={toggleMute}
                            >
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-background/20"
                            onClick={toggleFullscreen}
                        >
                            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Side actions */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-background/20 h-12 w-12">
                        <Heart className="w-6 h-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-background/20 h-12 w-12">
                        <MessageCircle className="w-6 h-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-background/20 h-12 w-12">
                        <Share2 className="w-6 h-6" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

interface LivePlayerModalProps {
    stream: LiveStream | null
    isOpen: boolean
    onClose: () => void
}

function LivePlayerModal({ stream, isOpen, onClose }: LivePlayerModalProps) {
    const [isMuted, setIsMuted] = useState(true)
    const [showChat, setShowChat] = useState(true)
    const [messages, setMessages] = useState([
        { id: 1, user: "user1", text: "This is amazing! 🔥", time: "2m ago" },
        { id: 2, user: "user2", text: "Love this product!", time: "1m ago" },
        { id: 3, user: "user3", text: "Is this available in other colors?", time: "30s ago" },
    ])
    const [newMessage, setNewMessage] = useState("")
    const chatEndRef = useRef<HTMLDivElement>(null)

    const toggleMute = () => {
        setIsMuted(!isMuted)
    }

    const sendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, {
                id: Date.now(),
                user: "you",
                text: newMessage,
                time: "Just now"
            }])
            setNewMessage("")
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }

    if (!isOpen || !stream) return null

    const store = typeof stream.storeId === "number" ? getStoreById(stream.storeId) : undefined

    return (
        <div className="fixed inset-0 z-50 bg-secondary flex flex-col lg:flex-row">
            {/* Close button */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-background/20 z-10"
                onClick={onClose}
            >
                <X className="w-6 h-6" />
            </Button>

            {/* Video area */}
            <div className="flex-1 relative flex items-center justify-center bg-secondary">
                {/* Placeholder for live stream video */}
                <div className="relative w-full aspect-video max-h-screen">
                    <img
                        src={stream.thumbnail}
                        alt={stream.title}
                        className="w-full h-full object-contain"
                    />

                    {/* Live indicator */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                        <div className="flex items-center gap-1.5 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                            <Radio className="w-4 h-4 fill-current" />
                            LIVE
                        </div>
                        <div className="flex items-center gap-1 bg-secondary/60 text-white px-2 py-1 rounded text-sm">
                            <Users className="w-4 h-4" />
                            {stream.viewers.toLocaleString()}
                        </div>
                    </div>

                    {/* Store card */}
                    {store && (
                        <div className="absolute left-4 bottom-20 w-[min(360px,calc(100%-2rem))]">
                            <Link
                                href={`/market?storeId=${store.id}`}
                                onClick={onClose}
                                className="block"
                            >
                                <Card className="border-white/10 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={store.logo} />
                                                <AvatarFallback>{store.name[0]}</AvatarFallback>
                                            </Avatar>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold text-foreground">
                                                            {store.name}
                                                        </p>
                                                        <p className="truncate text-xs text-muted-foreground">
                                                            {store.tagline ?? store.category}
                                                        </p>
                                                    </div>
                                                    <div className="shrink-0 text-right text-xs text-muted-foreground">
                                                        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                                                            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                                                            {store.rating.toFixed(1)}
                                                        </span>
                                                        <div>({store.reviewsLabel})</div>
                                                    </div>
                                                </div>

                                                <div className="mt-3 inline-flex items-center rounded-lg bg-primary px-3 py-1 text-xs font-semibold text-white">
                                                    Open Market
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    )}

                    {/* Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-background/20 bg-secondary/40"
                                onClick={toggleMute}
                            >
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-background/20 bg-secondary/40"
                            onClick={() => setShowChat(!showChat)}
                        >
                            {showChat ? "Hide Chat" : "Show Chat"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Chat area */}
            {showChat && (
                <div className="w-full lg:w-80 h-1/3 lg:h-full bg-background flex flex-col border-l">
                    <div className="p-4 border-b">
                        <h3 className="font-semibold">Live Chat</h3>
                        <p className="text-xs text-muted-foreground">@{stream.streamerName}</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg) => (
                            <div key={msg.id} className="flex gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-[10px]">
                                        {msg.user[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-xs">@{msg.user}</span>
                                        <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                                    </div>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="p-4 border-t">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Send a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <Button size="icon" onClick={sendMessage}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

interface VideoGalleryProps {
    videos?: VideoReel[]
}

interface LiveGalleryProps {
    streams?: LiveStream[]
}

export function VideoGallery({ videos = videosData }: VideoGalleryProps) {
    const [selectedVideo, setSelectedVideo] = useState<VideoReel | null>(null)
    const [videoModalOpen, setVideoModalOpen] = useState(false)

    const handlePlayVideo = (video: VideoReel) => {
        setSelectedVideo(video)
        setVideoModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Latest Videos</h1>
                    <p className="text-muted-foreground">Watch product demos, collections, and creator highlights.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <article
                            key={video.id}
                            className="group border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handlePlayVideo(video)}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={video.caption}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                                    {video.tags[0] ?? "Video"}
                                </span>
                                <span className="absolute bottom-3 right-3 bg-secondary/70 text-white text-xs font-semibold px-2 py-1 rounded">
                                    {video.duration}
                                </span>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={video.userAvatar} />
                                            <AvatarFallback>{video.username[0]}</AvatarFallback>
                                        </Avatar>
                                        <span>@{video.username}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {video.views} views
                                    </div>
                                </div>

                                <h2 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {video.caption}
                                </h2>

                                <Button variant="link" className="p-0 h-auto gap-1 text-primary">
                                    Watch Now <Play className="w-3 h-3" />
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <VideoPlayerModal
                video={selectedVideo}
                isOpen={videoModalOpen}
                onClose={() => setVideoModalOpen(false)}
            />
        </div>
    )
}

export function LiveGallery({ streams = liveStreamsData }: LiveGalleryProps) {
    const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null)
    const [liveModalOpen, setLiveModalOpen] = useState(false)

    const handleWatchStream = (stream: LiveStream) => {
        setSelectedStream(stream)
        setLiveModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Live Streams</h1>
                    <p className="text-muted-foreground">Join live shopping shows, launches, and creator Q&A.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {streams.map((stream) => (
                        <article
                            key={stream.id}
                            className="group border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleWatchStream(stream)}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={stream.thumbnail}
                                    alt={stream.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Live
                                </span>
                                <span className="absolute top-4 right-4 bg-secondary/70 text-white text-xs font-semibold px-2 py-1 rounded">
                                    {stream.category}
                                </span>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={stream.streamerAvatar} />
                                            <AvatarFallback>{stream.streamerName[0]}</AvatarFallback>
                                        </Avatar>
                                        <span>@{stream.streamerName}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {stream.viewers.toLocaleString()} watching
                                    </div>
                                </div>

                                <h2 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {stream.title}
                                </h2>

                                <Button variant="link" className="p-0 h-auto gap-1 text-primary">
                                    Watch Live <Radio className="w-3 h-3" />
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <LivePlayerModal
                stream={selectedStream}
                isOpen={liveModalOpen}
                onClose={() => setLiveModalOpen(false)}
            />
        </div>
    )
}

export default function VideoAndLive({ videos = videosData }: VideoGalleryProps) {
    return <VideoGallery videos={videos} />
}
