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
    MoreHorizontal,
    X,
    ChevronUp,
    ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { reelsData, type Reel } from "./reels-data"


// ─────────────────────────────────────────────────────────────
// Full-screen Reel Player (Modal)
// ─────────────────────────────────────────────────────────────
interface FullscreenReelPlayerProps {
    reels: Reel[]
    startIndex: number
    onClose: () => void
    onLike: (id: number) => void
    onSave: (id: number) => void
    onFollow: (id: number) => void
}

function FullscreenReelPlayer({ reels, startIndex, onClose, onLike, onSave, onFollow }: FullscreenReelPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(startIndex)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [showComments, setShowComments] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const currentReel = reels[currentIndex]
    const goNext = () => setCurrentIndex(i => Math.min(i + 1, reels.length - 1))
    const goPrev = () => setCurrentIndex(i => Math.max(i - 1, 0))

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => { document.body.style.overflow = "" }
    }, [])

    // Play/reset video when reel changes
    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        video.currentTime = 0
        video.muted = isMuted
        video.play().catch(() => { })
        setIsPlaying(true)
        setProgress(0)
    }, [currentIndex]) // eslint-disable-line react-hooks/exhaustive-deps

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowDown") goNext()
            if (e.key === "ArrowUp") goPrev()
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }) // intentionally no dep array — always sees fresh goNext/goPrev

    const togglePlay = () => {
        const video = videoRef.current
        if (!video) return
        if (isPlaying) { video.pause() } else { video.play().catch(() => { }) }
        setIsPlaying(!isPlaying)
    }

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation()
        const video = videoRef.current
        if (!video) return
        video.muted = !isMuted
        setIsMuted(!isMuted)
    }

    const handleTimeUpdate = () => {
        const video = videoRef.current
        if (!video || !video.duration) return
        setProgress((video.currentTime / video.duration) * 100)
    }

    const formatCount = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString()

    return (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
            {/* Backdrop – click outside the card to close */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* ── Main card ── */}
            <div className="relative z-10 flex items-center justify-center w-full h-full max-w-screen-lg mx-auto px-4">

                {/* Previous reel arrow */}
                {currentIndex > 0 && (
                    <button
                        onClick={goPrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                    >
                        <ChevronUp className="w-5 h-5" />
                    </button>
                )}

                {/* Next reel arrow */}
                {currentIndex < reels.length - 1 && (
                    <button
                        onClick={goNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all lg:right-auto lg:left-[calc(50%-220px-56px)]"
                    >
                        <ChevronDown className="w-5 h-5" />
                    </button>
                )}

                {/* ── Video + Side Actions layout ── */}
                <div className="flex items-end gap-3 h-full py-6 justify-center">
                    {/* ── Video panel ── */}
                    <div
                        className="relative rounded-2xl overflow-hidden bg-black shadow-2xl"
                        style={{ aspectRatio: "9/16", height: "min(calc(100vh - 48px), 780px)" }}
                        onClick={togglePlay}
                    >
                        {/* Video */}
                        <video
                            ref={videoRef}
                            src={currentReel.videoUrl}
                            className="absolute inset-0 w-full h-full object-cover"
                            playsInline
                            loop
                            muted={isMuted}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={() => {
                                if (videoRef.current) {
                                    videoRef.current.currentTime = 0
                                    videoRef.current.play().catch(() => { })
                                }
                            }}
                        />

                        {/* Progress bar */}
                        <div className="absolute top-0 left-0 right-0 px-3 pt-3 z-10">
                            <div className="h-0.5 bg-white/30 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-100"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Top controls */}
                        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); onClose() }}
                                className="w-9 h-9 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <button
                                onClick={toggleMute}
                                className="w-9 h-9 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                            >
                                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Play/Pause center overlay */}
                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10 pointer-events-none">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                                </div>
                            </div>
                        )}

                        {/* Bottom gradient + user info */}
                        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 pointer-events-none">
                            <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-8 w-8 border border-white/60">
                                    <AvatarImage src={currentReel.userAvatar} />
                                    <AvatarFallback>{currentReel.username[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-white font-semibold text-sm drop-shadow">@{currentReel.username}</span>
                                {!currentReel.isFollowing && (
                                    <button
                                        className="pointer-events-auto ml-1 text-white text-xs border border-white/60 rounded-full px-2 py-0.5 hover:bg-white/20 transition-all"
                                        onClick={(e) => { e.stopPropagation(); onFollow(currentReel.id) }}
                                    >
                                        Follow
                                    </button>
                                )}
                            </div>
                            <p className="text-white text-sm line-clamp-2 drop-shadow leading-relaxed">{currentReel.caption}</p>
                            <div className="flex items-center gap-1.5 mt-2">
                                <Music2Icon className="w-3 h-3 text-white/80" />
                                <span className="text-white/80 text-xs">{currentReel.music}</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Side Action Buttons ── */}
                    <div className="flex flex-col items-center gap-5 mb-20">
                        {/* Like */}
                        <button
                            onClick={(e) => { e.stopPropagation(); onLike(currentReel.id) }}
                            className="flex flex-col items-center gap-1 group"
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${currentReel.isLiked ? 'bg-red-500/20' : 'bg-white/10 hover:bg-white/20'}`}>
                                <Heart className={`w-6 h-6 transition-all ${currentReel.isLiked ? 'text-red-500 fill-red-500 scale-110' : 'text-white'}`} />
                            </div>
                            <span className="text-white text-xs font-medium">{formatCount(currentReel.likes)}</span>
                        </button>

                        {/* Comment */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowComments(true) }}
                            className="flex flex-col items-center gap-1 group"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-white text-xs font-medium">{formatCount(currentReel.comments)}</span>
                        </button>

                        {/* Share */}
                        <button
                            onClick={(e) => { e.stopPropagation() }}
                            className="flex flex-col items-center gap-1 group"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                                <Send className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-white text-xs font-medium">{formatCount(currentReel.shares)}</span>
                        </button>

                        {/* Bookmark */}
                        <button
                            onClick={(e) => { e.stopPropagation(); onSave(currentReel.id) }}
                            className="flex flex-col items-center gap-1 group"
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${currentReel.isSaved ? 'bg-yellow-500/20' : 'bg-white/10 hover:bg-white/20'}`}>
                                <Bookmark className={`w-6 h-6 transition-all ${currentReel.isSaved ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`} />
                            </div>
                            <span className="text-white text-xs font-medium">{formatCount(currentReel.saves)}</span>
                        </button>

                        {/* More */}
                        <button
                            onClick={(e) => { e.stopPropagation() }}
                            className="flex flex-col items-center gap-1"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                                <MoreHorizontal className="w-6 h-6 text-white" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Comment Drawer ── */}
            {showComments && (
                <div className="absolute inset-0 z-30 flex items-end justify-center sm:items-center" onClick={() => setShowComments(false)}>
                    <div
                        className="bg-background w-full sm:w-[420px] rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[70vh] flex flex-col overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Drawer header */}
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h3 className="font-semibold text-sm">Comments</h3>
                            <button onClick={() => setShowComments(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Comments list */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground opacity-50">
                                <MessageCircle className="h-10 w-10 mb-2" />
                                <p className="text-sm font-medium">No comments yet</p>
                                <p className="text-xs">Start the conversation!</p>
                            </div>
                        </div>

                        {/* Comment input */}
                        <div className="p-4 border-t border-border">
                            <div className="flex items-center gap-2">
                                <Input placeholder="Add a comment..." className="text-sm" />
                                <Button variant="primary" size="sm" className="shrink-0">Post</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// Reel Card (used in the reels page grid/list)
// ─────────────────────────────────────────────────────────────
interface ReelCardProps {
    reel: Reel
    isActive: boolean
    onClick: () => void
}

function ReelCard({ reel, isActive, onClick }: ReelCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (videoRef.current) {
            if (isActive) {
                videoRef.current.play().catch(() => { })
                setIsPlaying(true)
            } else {
                videoRef.current.pause()
                videoRef.current.currentTime = 0
                setIsPlaying(false)
                setProgress(0)
            }
        }
    }, [isActive])

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const p = (videoRef.current.currentTime / videoRef.current.duration) * 100
            setProgress(p)
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
            className="relative w-full h-full bg-black flex items-center justify-center cursor-pointer"
            onClick={onClick}
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
                onEnded={() => {
                    if (videoRef.current) {
                        videoRef.current.currentTime = 0
                        videoRef.current.play().catch(() => { })
                    }
                }}
                onLoadedMetadata={() => {
                    if (isActive && videoRef.current) {
                        videoRef.current.play().catch(() => { })
                    }
                }}
            />

            {/* Play/Pause Overlay */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-10 h-10 text-white fill-white ml-1" />
                    </div>
                </div>
            )}

            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 px-2 pt-2">
                <div className="h-0.5 bg-white/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Mute button */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white bg-black/20 hover:bg-black/40 h-10 w-10 rounded-full backdrop-blur-sm shadow-sm"
                    onClick={toggleMute}
                >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
            </div>

            {/* Expand hint */}
            <div className="absolute bottom-20 right-4 z-10">
                <div className="bg-black/30 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full border border-white/20">
                    Tap to expand
                </div>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────────
// Main InstagramReels component (page layout – unchanged UI)
// ─────────────────────────────────────────────────────────────
interface InstagramReelsProps {
    initialReels?: Reel[]
    onClose?: () => void
}

export default function InstagramReels({ initialReels = reelsData }: InstagramReelsProps) {
    const router = useRouter()

    const [reels, setReels] = useState<Reel[]>(initialReels)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const videoContainerRefs = useRef<(HTMLDivElement | null)[]>([])

    const currentReel = reels[currentIndex]

    // Intersection Observer for in-page scroll
    useEffect(() => {
        const currentContainer = containerRef.current
        const observerOptions = { root: currentContainer, threshold: 0.6 }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.getAttribute("data-index"))
                    if (!isNaN(index)) setCurrentIndex(index)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)
        videoContainerRefs.current.forEach((ref) => { if (ref) observer.observe(ref) })

        const handleKeyDown = (e: KeyboardEvent) => {
            // Only handle keys when fullscreen is NOT open
            if (fullscreenIndex !== null) return
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
    }, [reels.length, currentIndex, fullscreenIndex])

    const handleLike = useCallback((id: number) => {
        setReels(prev => prev.map(reel => {
            if (reel.id === id) {
                return { ...reel, isLiked: !reel.isLiked, likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1 }
            }
            return reel
        }))
    }, [])

    const handleSave = useCallback((id: number) => {
        setReels(prev => prev.map(reel => {
            if (reel.id === id) {
                return { ...reel, isSaved: !reel.isSaved, saves: reel.isSaved ? reel.saves - 1 : reel.saves + 1 }
            }
            return reel
        }))
    }, [])

    const handleFollow = useCallback((id: number) => {
        setReels(prev => prev.map(reel => {
            if (reel.id === id) return { ...reel, isFollowing: true }
            return reel
        }))
    }, [])

    return (
        <>
            {/* ── Full-screen player modal ── */}
            {fullscreenIndex !== null && (
                <FullscreenReelPlayer
                    reels={reels}
                    startIndex={fullscreenIndex}
                    onClose={() => setFullscreenIndex(null)}
                    onLike={handleLike}
                    onSave={handleSave}
                    onFollow={handleFollow}
                />
            )}

            {/* ── Normal page layout (unchanged) ── */}
            <div className="flex-1 bg-background">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center max-w-6xl mx-auto h-[calc(100vh-160px)] min-h-[600px]">
                        {/* Video Column – vertical scroll */}
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
                                    <ReelCard
                                        reel={reel}
                                        isActive={currentIndex === index}
                                        onClick={() => setFullscreenIndex(index)}
                                    />

                                    {/* Mobile metadata overlay */}
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

                        {/* Comments & Info Column (desktop) */}
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
                                        className="h-8 rounded-full text-xs font-semibold"
                                        onClick={() => handleFollow(currentReel.id)}
                                    >
                                        {currentReel.isFollowing ? "Following" : "Follow"}
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Description & Comments */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
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
        </>
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
