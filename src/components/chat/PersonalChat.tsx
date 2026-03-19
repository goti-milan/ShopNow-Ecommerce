"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "./ChatContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Send,
    Paperclip,
    Smile,
    MoreVertical,
    Phone,
    Video,
    Check,
    CheckCheck,
    Image as ImageIcon,
    Mic,
    ArrowLeft,
    MessageCircle
} from "lucide-react"

export default function PersonalChat({ onBack }: { onBack?: () => void }) {
    const { selectedUser, messages, sendMessage } = useChat()
    const [newMessage, setNewMessage] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Filter messages for selected user
    const userMessages = messages.filter(
        msg => selectedUser &&
            (msg.senderId === selectedUser.id || msg.receiverId === selectedUser.id || msg.senderId === 0 || msg.receiverId === 0)
    )

    // Sort messages by ID (chronological)
    const sortedMessages = [...userMessages].sort((a, b) => a.id - b.id)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [sortedMessages])

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            sendMessage(newMessage)
            setNewMessage("")
            inputRef.current?.focus()
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    if (!selectedUser) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center h-full bg-muted/5 border-l border-border/10">
                <div className="text-center p-8 max-w-md">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageCircle className="w-12 h-12 text-primary/40" />
                    </div>
                    <h3 className="text-xl font-medium text-foreground/80 mb-2">Your Messages</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Select a conversation from the sidebar to start chatting with sellers and customers.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full bg-[#f8f9fa] relative overflow-hidden">
            {/* Subtle background layer */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')` }} />

            {/* Header */}
            <div className="p-3 border-b flex items-center justify-between bg-white z-10 shadow-sm">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="md:hidden -ml-2 rounded-full" onClick={onBack}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="relative">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={selectedUser.avatar} alt={selectedUser.username} />
                            <AvatarFallback>{selectedUser.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        {selectedUser.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                        )}
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-semibold text-sm truncate">@{selectedUser.username}</h3>
                        <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                            {selectedUser.isOnline ? (
                                <span className="text-emerald-600 font-medium">Online</span>
                            ) : (
                                "Away"
                            )}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:px-8 space-y-3 z-10 no-scrollbar">
                {/* Date separator */}
                <div className="flex items-center justify-center my-6">
                    <span className="text-[10px] font-bold text-muted-foreground/60 bg-muted/40 backdrop-blur-sm px-4 py-1 rounded-full uppercase tracking-widest">
                        Today
                    </span>
                </div>

                {sortedMessages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`relative px-4 py-2.5 rounded-2xl shadow-sm max-w-[85%] md:max-w-[70%] ${message.isMine
                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                : "bg-white text-foreground rounded-tl-none border border-border/30"
                            }`}>
                            {/* Message content */}
                            <p className="text-[14px] leading-relaxed pr-10">{message.content}</p>

                            {/* Message info (Time + Status) */}
                            <div className={`absolute bottom-1 right-2.5 flex items-center gap-1 ${message.isMine ? "text-primary-foreground/70" : "text-muted-foreground/70"}`}>
                                <span className="text-[9px] font-medium">
                                    {message.timestamp}
                                </span>
                                {message.isMine && (
                                    <CheckCheck className={`w-3.5 h-3.5 ${message.isRead ? "text-white" : "text-white/50"}`} />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 px-4 bg-white border-t z-10">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                        <Button variant="ghost" size="icon" className="shrink-0 rounded-full text-muted-foreground h-10 w-10">
                            <Smile className="h-6 w-6" />
                        </Button>
                        <Button variant="ghost" size="icon" className="shrink-0 rounded-full text-muted-foreground h-10 w-10">
                            <Paperclip className="h-6 w-6" />
                        </Button>
                    </div>

                    <div className="flex-1 bg-muted/40 rounded-full px-5 py-1 flex items-center border border-transparent focus-within:bg-white focus-within:border-primary/20 transition-all duration-200">
                        <Input
                            ref={inputRef}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 p-0 text-[14px] shadow-none"
                        />
                    </div>

                    <div className="shrink-0">
                        {newMessage.trim() ? (
                            <Button
                                size="icon"
                                className="rounded-full h-11 w-11 bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20 active:scale-95 transition-all"
                                onClick={handleSendMessage}
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-11 w-11 text-muted-foreground hover:bg-muted/50"
                            >
                                <Mic className="h-6 w-6" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


