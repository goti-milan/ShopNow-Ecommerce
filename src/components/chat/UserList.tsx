"use client"

import { useChat, ChatUser } from "./ChatContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Phone, Video } from "lucide-react"

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
        <div className="flex flex-col h-full bg-background border-r">
            {/* Header */}
            <div className="p-4 border-b">
                <h2 className="text-xl font-bold mb-4">Messages</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search conversations..."
                        className="pl-9 bg-muted/50"
                    />
                </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto">
                {sortedUsers.map((user) => (
                    <div
                        key={user.id}
                        className={`p-4 border-b cursor-pointer transition-colors hover:bg-muted/50 ${selectedUser?.id === user.id ? "bg-muted" : ""
                            }`}
                        onClick={() => handleSelectUser(user)}
                    >
                        <div className="flex items-start gap-3">
                            {/* Avatar with online indicator */}
                            <div className="relative shrink-0">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={user.avatar} alt={user.username} />
                                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                {user.isOnline && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent0 border-2 border-background rounded-full" />
                                )}
                            </div>

                            {/* User Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold truncate">@{user.username}</span>
                                    <span className="text-xs text-muted-foreground shrink-0">
                                        {user.lastMessageTime}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    {user.isTyping ? (
                                        <span className="text-sm text-primary italic">typing...</span>
                                    ) : (
                                        <p className="text-sm text-muted-foreground truncate">
                                            {user.lastMessage}
                                        </p>
                                    )}
                                    {user.unreadCount > 0 && (
                                        <Badge className="ml-2 bg-primary text-primary-foreground rounded-full h-5 min-w-5 px-1.5">
                                            {user.unreadCount}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t flex justify-center gap-4">
                <button className="p-2 rounded-full hover:bg-muted transition-colors">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-full hover:bg-muted transition-colors">
                    <Video className="h-5 w-5 text-muted-foreground" />
                </button>
            </div>
        </div>
    )
}
