"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
    Volume2,
    VolumeX,
    Play,
    Pause,
    MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export interface Reel {
    id: number
    username: string
    userAvatar: string
    caption: string
    music: string
    likes: number
    comments: number
    shares: number
    saves: number
    views: string
    videoUrl: string
    isLiked: boolean
    isSaved: boolean
    isFollowing: boolean
}

// Sample data for reels
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
    }
]

interface ReelVideoProps {
    reel: Reel
    isActive: boolean
}

function ReelVideo({
    reel,
    isActive
}: ReelVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [progress, setProgress] = useState(0)
    const [showPlayButton, setShowPlayButton] = useState(false)

    useEffect(() => {
        if (videoRef.current) {
            if (isActive) {
                videoRef.current.play().catch(() => { })
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIsPlaying(true)
            } else {
                videoRef.current.pause()
                videoRef.current.currentTime = 0
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIsPlaying(false)
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setProgress(0)
            }
        }
    }, [isActive])

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
            setProgress(progress)
        }
    }

    const handleVideoEnded = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(() => { })
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

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }


    return (
        <div
            className="relative w-full h-full bg-black flex items-center justify-center"
            onClick={togglePlay}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={reel.videoUrl}
                className="w-full h-full object-cover"
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                onLoadedMetadata={() => {
                    if (isActive && videoRef.current) {
                        videoRef.current.play().catch(() => { })
                    }
                }}
            />

            {/* Play/Pause Button Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-10 h-10 text-white fill-white ml-1" />
                    </div>
                </div>
            )}

            {/* Loading State */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {!isPlaying && showPlayButton && (
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                        <Play className="w-10 h-10 text-white fill-white ml-1" />
                    </div>
                )}
            </div>

            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 right-0 px-2 pt-2">
                <div className="h-0.5 bg-white/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Actions & Utilities Overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                {/* Sound/Mute Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white bg-black/20 hover:bg-black/40 h-10 w-10 rounded-full backdrop-blur-sm shadow-sm"
                    onClick={toggleMute}
                >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
            </div>
        </div>
    )
}

interface InstagramReelsProps {
    initialReels?: Reel[]
    onClose?: () => void
}

export default function InstagramReels({ initialReels = reelsData, onClose }: InstagramReelsProps) {
    const router = useRouter()

    const [reels, setReels] = useState<Reel[]>(initialReels)
    const [currentIndex, setCurrentIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const videoContainerRefs = useRef<(HTMLDivElement | null)[]>([])

    const currentReel = reels[currentIndex]

    // Set up Intersection Observer to update currentIndex when scrolling
    useEffect(() => {
        const currentContainer = containerRef.current
        const observerOptions = {
            root: currentContainer,
            threshold: 0.6,
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.getAttribute("data-index"))
                    if (!isNaN(index)) {
                        setCurrentIndex(index)
                    }
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        videoContainerRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        // Keyboard navigation
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault()
                const nextIndex = Math.min(currentIndex + 1, reels.length - 1)
                videoContainerRefs.current[nextIndex]?.scrollIntoView({ behavior: "smooth" })
            } else if (e.key === "ArrowUp") {
                e.preventDefault()
                const prevIndex = Math.max(currentIndex - 1, 0)
                videoContainerRefs.current[prevIndex]?.scrollIntoView({ behavior: "smooth" })
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            observer.disconnect()
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [reels.length, currentIndex])

    const handleLike = useCallback((id: number) => {
        setReels(prev => prev.map(reel => {
            if (reel.id === id) {
                return {
                    ...reel,
                    isLiked: !reel.isLiked,
                    likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1
                }
            }
            return reel
        }))
    }, [])

    const handleSave = useCallback((id: number) => {
        setReels(prev => prev.map(reel => {
            if (reel.id === id) {
                return {
                    ...reel,
                    isSaved: !reel.isSaved,
                    saves: reel.isSaved ? reel.saves - 1 : reel.saves + 1
                }
            }
            return reel
        }))
    }, [])

    const handleFollow = useCallback((id: number) => {
        setReels(prev => prev.map(reel => {
            if (reel.id === id) {
                return {
                    ...reel,
                    isFollowing: true
                }
            }
            return reel
        }))
    }, [])

    const handleShare = useCallback((id: number) => {
        console.log("Share reel:", id)
        // Implement share functionality
    }, [])

    const handleComment = useCallback((id: number) => {
        console.log("Open comments for reel:", id)
        // Implement comments functionality
    }, [])


    return (
        <div className="flex-1 bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start justify-center max-w-6xl mx-auto h-[calc(100vh-160px)] min-h-[600px]">
                    {/* Video Column - Scroll Area */}
                    <div
                        ref={containerRef}
                        className="w-full lg:w-[450px] h-full overflow-y-auto snap-y snap-mandatory no-scrollbar rounded-xl shadow-2xl bg-black shrink-0 relative"
                    >
                        {reels.map((reel, index) => (
                            <div
                                key={reel.id}
                                data-index={index}
                                ref={(el) => { videoContainerRefs.current[index] = el }}
                                className="w-full h-full snap-start shrink-0 relative"
                            >
                                <ReelVideo
                                    reel={reel}
                                    isActive={currentIndex === index}
                                />

                                {/* Mobile Metadata Overlay (Hidden on Desktop) */}
                                <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white pointer-events-none">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Avatar className="h-8 w-8 border border-white">
                                            <AvatarImage src={reel.userAvatar} />
                                            <AvatarFallback>{reel.username[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-semibold text-sm">@{reel.username}</span>
                                    </div>
                                    <p className="text-sm line-clamp-2">{reel.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Comments & Info Column - Sticky behavior via parent flex-start */}
                    <div className="hidden lg:flex flex-1 w-full bg-white rounded-xl border border-border shadow-sm flex-col h-full lg:h-[800px] overflow-hidden sticky top-24">
                        {/* Author Header */}
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border border-primary/20">
                                    <AvatarImage src={currentReel.userAvatar} alt={currentReel.username} />
                                    <AvatarFallback>{currentReel.username[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">@{currentReel.username}</span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Music2Icon className="h-3 w-3" />
                                        {currentReel.music}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant={currentReel.isFollowing ? "outline" : "primary"}
                                    size="sm"
                                    className={`h-8 rounded-full text-xs font-semibold ${!currentReel.isFollowing ? 'bg-primary text-white hover:bg-primary/90' : ''}`}
                                    onClick={() => handleFollow(currentReel.id)}
                                >
                                    {currentReel.isFollowing ? "Following" : "Follow"}
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Description and Comments Scroll Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {/* Description/Caption */}
                            <div className="flex gap-3">
                                <Avatar className="h-8 w-8 shrink-0">
                                    <AvatarImage src={currentReel.userAvatar} />
                                    <AvatarFallback>{currentReel.username[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-sm">@{currentReel.username}</span>
                                        <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded uppercase font-bold">Author</span>
                                    </div>
                                    <p className="text-sm leading-relaxed">{currentReel.caption}</p>
                                    <span className="text-[10px] text-muted-foreground mt-1">2h ago</span>
                                </div>
                            </div>

                            <div className="border-t border-border/50 my-4" />

                            {/* Placeholder for Comments - Relative to active reel */}
                            <div className="flex flex-col items-center justify-center py-20 opacity-40">
                                <MessageCircle className="h-12 w-12 mb-3" />
                                <p className="text-sm font-medium">Comments for @{currentReel.username}</p>
                                <p className="text-xs">No comments yet. Start the conversation!</p>
                            </div>
                        </div>

                        {/* Actions & Metrics */}
                        <div className="p-4 border-t border-border bg-muted/5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`h-10 w-10 hover:bg-primary/10 ${currentReel.isLiked ? 'text-red-500 hover:text-red-600' : 'text-foreground hover:text-primary'}`}
                                        onClick={() => handleLike(currentReel.id)}
                                    >
                                        <Heart className={`h-6 w-6 ${currentReel.isLiked ? 'fill-current' : ''}`} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10 hover:text-primary">
                                        <MessageCircle className="h-6 w-6" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10 hover:text-primary">
                                        <Send className="h-6 w-6" />
                                    </Button>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-10 w-10 hover:bg-primary/10 ${currentReel.isSaved ? 'text-yellow-500 hover:text-yellow-600' : 'text-foreground hover:text-primary'}`}
                                    onClick={() => handleSave(currentReel.id)}
                                >
                                    <Bookmark className={`h-6 w-6 ${currentReel.isSaved ? 'fill-current' : ''}`} />
                                </Button>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <p className="font-bold text-sm">{currentReel.likes.toLocaleString()} likes</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                                    {currentReel.views} views • February 28, 2026
                                </p>
                            </div>
                        </div>

                        {/* Comment Input */}
                        <div className="p-4 border-t border-border">
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Add a comment..."
                                    className="border-none shadow-none focus-visible:ring-0 p-0 text-sm h-auto"
                                />
                                <Button
                                    variant="ghost"
                                    className="text-primary hover:bg-transparent font-bold text-sm h-auto p-0 ml-2"
                                >
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

function Music2Icon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="18" r="4" />
            <path d="M12 18V2l7 4" />
        </svg>
    )
}

