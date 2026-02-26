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
    ChevronRight,
    Home,
    Search,
    PlusSquare,
    X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
    onLike: (id: number) => void
    onSave: (id: number) => void
    onFollow: (id: number) => void
    onShare: (id: number) => void
    onComment: (id: number) => void
}

function ReelVideo({
    reel,
    isActive,
    onLike,
    onSave,
    onFollow,
    onShare,
    onComment
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

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M'
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K'
        }
        return num.toString()
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

            {/* Top Section - Username & Follow */}
            <div className="absolute top-4 left-0 right-0 px-4 flex items-center justify-between">
                {/* Username */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        className="text-white hover:bg-white/10 p-0 h-auto"
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <span className="font-semibold text-sm">@{reel.username}</span>
                    </Button>
                    {!reel.isFollowing && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-white bg-white/20 hover:bg-white/30 px-2 py-0.5 h-6 text-xs rounded-full"
                            onClick={(e) => {
                                e.stopPropagation()
                                onFollow(reel.id)
                            }}
                        >
                            Follow
                        </Button>
                    )}
                </div>

                {/* Sound/Mute Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 h-8 w-8"
                    onClick={toggleMute}
                >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
            </div>

            {/* Bottom Section - Info & Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-10 h-10 border-2 border-white">
                        <AvatarImage src={reel.userAvatar} alt={reel.username} />
                        <AvatarFallback className="bg-primary">U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm">{reel.username}</span>
                            {reel.isFollowing && (
                                <span className="text-white/60 text-xs">• Following</span>
                            )}
                        </div>
                        <span className="text-white/80 text-xs">{reel.views} views</span>
                    </div>
                </div>

                {/* Caption */}
                <p className="text-white text-sm mb-2 line-clamp-2">
                    {reel.caption}
                </p>

                {/* Music - Scrolling Text */}
                <div className="flex items-center gap-2 text-white/80 text-xs mb-4 overflow-hidden">
                    <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                    <div className="overflow-hidden whitespace-nowrap">
                        <span className="animate-marquee inline-block">
                            🎵 {reel.music}
                        </span>
                    </div>
                </div>

                {/* Actions Row */}
                <div className="flex items-center justify-between">
                    {/* Left - Actions */}
                    <div className="flex items-center gap-1">
                        {/* Like Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`h-10 w-10 rounded-full hover:bg-white/10 ${reel.isLiked ? 'text-red-500' : 'text-white'}`}
                            onClick={(e) => {
                                e.stopPropagation()
                                onLike(reel.id)
                            }}
                        >
                            <Heart className={`h-6 w-6 ${reel.isLiked ? 'fill-current' : ''}`} />
                        </Button>
                        <span className="text-white text-xs font-medium -mt-2">{formatNumber(reel.likes)}</span>

                        {/* Comment Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full hover:bg-white/10 text-white ml-2"
                            onClick={(e) => {
                                e.stopPropagation()
                                onComment(reel.id)
                            }}
                        >
                            <MessageCircle className="h-6 w-6" />
                        </Button>
                        <span className="text-white text-xs font-medium -mt-2">{formatNumber(reel.comments)}</span>

                        {/* Share Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full hover:bg-white/10 text-white ml-2"
                            onClick={(e) => {
                                e.stopPropagation()
                                onShare(reel.id)
                            }}
                        >
                            <Send className="h-6 w-6" />
                        </Button>
                        <span className="text-white text-xs font-medium -mt-2">{formatNumber(reel.shares)}</span>
                    </div>

                    {/* Save Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-10 w-10 rounded-full hover:bg-white/10 ${reel.isSaved ? 'text-yellow-400' : 'text-white'}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            onSave(reel.id)
                        }}
                    >
                        <Bookmark className={`h-6 w-6 ${reel.isSaved ? 'fill-current' : ''}`} />
                    </Button>
                </div>
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

    const handleClose = () => {
        if (onClose) {
            onClose()
        } else {
            router.back()
        }
    }
    const [reels, setReels] = useState<Reel[]>(initialReels)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const touchStartY = useRef(0)
    const touchEndY = useRef(0)

    const currentReel = reels[currentIndex]

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

    const goToNext = useCallback(() => {
        if (currentIndex < reels.length - 1 && !isTransitioning) {
            setIsTransitioning(true)
            setCurrentIndex(prev => prev + 1)
            setTimeout(() => setIsTransitioning(false), 300)
        }
    }, [currentIndex, reels.length, isTransitioning])

    const goToPrevious = useCallback(() => {
        if (currentIndex > 0 && !isTransitioning) {
            setIsTransitioning(true)
            setCurrentIndex(prev => prev - 1)
            setTimeout(() => setIsTransitioning(false), 300)
        }
    }, [currentIndex, isTransitioning])

    // Handle touch events for swipe navigation
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndY.current = e.touches[0].clientY
    }

    const handleTouchEnd = () => {
        const diff = touchStartY.current - touchEndY.current
        const threshold = 50

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe up - next reel
                goToNext()
            } else {
                // Swipe down - previous reel
                goToPrevious()
            }
        }

        touchStartY.current = 0
        touchEndY.current = 0
    }

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                goToPrevious()
            } else if (e.key === 'ArrowDown') {
                goToNext()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [goToNext, goToPrevious])

    // Reset video progress when changing reels
    useEffect(() => {
        const video = containerRef.current?.querySelector('video')
        if (video) {
            video.currentTime = 0
        }
    }, [currentIndex])

    return (
        <div className="fixed inset-0 bg-black z-50 flex">
            {/* Main Reels Area */}
            <div
                ref={containerRef}
                className="flex-1 relative"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Current Reel */}
                <div className={`w-full h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
                    <ReelVideo
                        key={currentReel.id}
                        reel={currentReel}
                        isActive={!isTransitioning}
                        onLike={handleLike}
                        onSave={handleSave}
                        onFollow={handleFollow}
                        onShare={handleShare}
                        onComment={handleComment}
                    />
                </div>

                {/* Navigation Arrows - Desktop */}
                <div className="absolute top-1/2 left-4 -translate-y-1/2 hidden md:flex">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                        onClick={goToPrevious}
                        disabled={currentIndex === 0}
                    >
                        <ChevronRight className="h-6 w-6 rotate-180" />
                    </Button>
                </div>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden md:flex">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white ${currentIndex === reels.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                        onClick={goToNext}
                        disabled={currentIndex === reels.length - 1}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>

                {/* Close Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); handleClose() }}
                    className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all duration-200 hover:scale-105"
                    aria-label="Close reels"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Reel Counter */}
                <div className="absolute top-4 right-16 text-white text-sm font-medium bg-black/30 px-3 py-1 rounded-full">
                    {currentIndex + 1} / {reels.length}
                </div>
            </div>

            {/* Side Navigation - Instagram Style */}
            <div className="hidden md:flex flex-col items-center gap-6 py-8 px-4 bg-black/90 w-20">
                {/* Home */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-12 w-12"
                    onClick={onClose}
                >
                    <Home className="h-6 w-6" />
                </Button>

                {/* Search (placeholder) */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-12 w-12"
                >
                    <Search className="h-6 w-6" />
                </Button>

                {/* Create/Reels (placeholder) */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-12 w-12"
                >
                    <PlusSquare className="h-6 w-6" />
                </Button>

                {/* Shop (placeholder) */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-12 w-12"
                >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                </Button>

                {/* Profile Avatar */}
                <div className="mt-auto">
                    <Avatar className="w-10 h-10 border-2 border-white cursor-pointer hover:opacity-80">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" alt="Profile" />
                        <AvatarFallback className="bg-primary">P</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 flex items-center justify-around py-3 px-6">
                <Button variant="ghost" size="icon" className="text-white" onClick={onClose}>
                    <Home className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white">
                    <Search className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white">
                    <PlusSquare className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                </Button>
                <Avatar className="w-8 h-8 border-2 border-white cursor-pointer">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" alt="Profile" />
                    <AvatarFallback className="bg-primary text-xs">P</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

