"use client"

import { useChat, ChatUser } from "./ChatContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Phone, Video, Edit, MoreVertical, Settings, MessageCircle } from "lucide-react"

export default function UserList() {
    const { users, selectedUser, setSelectedUser, markAsRead } = useChat()

    const handleSelectUser = (user: ChatUser) => {
        setSelectedUser(user)
        markAsRead(user.id)
    }

    const sortedUsers = [...users].sort((a, b) => {
        // Sort by unread count first, then by time
        if (a.unreadCount > 0 && b.unreadCount === 0) return -1
        if (a.unreadCount === 0 && b.unreadCount > 0) return 1
        return 0
    })

    return (
        <div className="flex flex-col h-full bg-white border-r border-border/10">
            {/* Sidebar Header */}
            <div className="p-4 bg-muted/30 flex items-center justify-between shrink-0">
                <Avatar className="h-10 w-10 border-2 border-background">
                    <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                        <MessageCircle className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>
            </div>

            {/* Search Bar Container */}
            <div className="px-3 py-2 shrink-0 border-b border-border/10">
                <div className="relative flex items-center bg-muted/30 rounded-xl px-4 py-1.5 focus-within:bg-white focus-within:ring-1 focus-within:ring-primary/50">
                    <Search className="h-4 w-4 text-muted-foreground mr-4" />
                    <Input
                        placeholder="Search conversations"
                        className="pl-0 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-[14px] shadow-none"
                    />
                </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {sortedUsers.map((user) => (
                    <div
                        key={user.id}
                        className={`flex items-center gap-3 p-3 px-4 cursor-pointer transition-colors relative hover:bg-[#f5f6f6] ${selectedUser?.id === user.id ? "bg-[#f0f2f5]" : ""
                            }`}
                        onClick={() => handleSelectUser(user)}
                    >
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <Avatar className="h-[49px] w-[49px]">
                                <AvatarImage src={user.avatar} alt={user.username} />
                                <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>

                        {/* User Info Content */}
                        <div className="flex-1 min-w-0 border-b border-border/10 py-2 h-full">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className={`text-[17px] truncate ${user.unreadCount > 0 ? "font-semibold" : "font-normal"}`}>
                                    {user.username}
                                </span>
                                <span className={`text-[12px] truncate ml-2 mb-0.5 opacity-60 ${user.unreadCount > 0 ? "text-primary font-semibold" : "text-muted-foreground font-normal"}`}>
                                    {user.lastMessageTime}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                {user.isTyping ? (
                                    <span className="text-[14px] text-primary font-medium animate-pulse">typing...</span>
                                ) : (
                                    <p className={`text-[14px] truncate flex-1 opacity-70 leading-tight ${user.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground font-normal"}`}>
                                        {user.lastMessage}
                                    </p>
                                )}
                                {user.unreadCount > 0 && (
                                    <div className="ml-2 bg-primary text-primary-foreground text-[11px] font-semibold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5 shadow-sm">
                                        {user.unreadCount}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


