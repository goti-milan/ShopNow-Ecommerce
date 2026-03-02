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
    ArrowLeft,
    Check,
    CheckCheck,
    Image,
    File,
    Mic
} from "lucide-react"

export default function PersonalChat() {
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
            <div className="flex-1 flex flex-col items-center justify-center h-full bg-muted/30">
                <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <Send className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">Choose a user from the list to start chatting</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between bg-background">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedUser.avatar} alt={selectedUser.username} />
                        <AvatarFallback>{selectedUser.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">@{selectedUser.username}</h3>
                        <p className="text-xs text-muted-foreground">
                            {selectedUser.isOnline ? (
                                <span className="text-green-500 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Online
                                </span>
                            ) : (
                                "Offline"
                            )}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
                {/* Date separator */}
                <div className="flex items-center justify-center">
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        Today
                    </span>
                </div>

                {sortedMessages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`flex gap-2 max-w-[70%] ${message.isMine ? "flex-row-reverse" : ""}`}>
                            {!message.isMine && (
                                <Avatar className="h-8 w-8 shrink-0">
                                    <AvatarImage src={selectedUser.avatar} />
                                    <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
                                </Avatar>
                            )}
                            <div>
                                <div
                                    className={`px-4 py-2 rounded-2xl ${message.isMine
                                            ? "bg-primary text-primary-foreground rounded-br-sm"
                                            : "bg-muted rounded-bl-sm"
                                        }`}
                                >
                                    <p className="text-sm">{message.content}</p>
                                </div>
                                <div className={`flex items-center gap-1 mt-1 ${message.isMine ? "justify-end" : ""}`}>
                                    <span className="text-[10px] text-muted-foreground">
                                        {message.timestamp}
                                    </span>
                                    {message.isMine && (
                                        message.isRead ? (
                                            <CheckCheck className="w-3 h-3 text-blue-500" />
                                        ) : (
                                            <Check className="w-3 h-3 text-muted-foreground" />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-background">
                <div className="flex items-end gap-2">
                    <div className="flex-1 flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
                        <Button variant="ghost" size="icon" className="shrink-0 rounded-full">
                            <Image className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="shrink-0 rounded-full">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <Input
                            ref={inputRef}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none h-auto py-1"
                            style={{ height: 'auto', minHeight: '24px' }}
                        />
                        <Button variant="ghost" size="icon" className="shrink-0 rounded-full">
                            <Mic className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="shrink-0 rounded-full">
                            <Smile className="h-5 w-5" />
                        </Button>
                    </div>
                    <Button
                        size="icon"
                        className="shrink-0 rounded-full h-12 w-12"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
