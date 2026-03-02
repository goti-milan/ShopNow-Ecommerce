"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface ChatUser {
    id: number
    username: string
    avatar: string
    lastMessage: string
    lastMessageTime: string
    unreadCount: number
    isOnline: boolean
    isTyping?: boolean
}

export interface Message {
    id: number
    senderId: number
    receiverId: number
    content: string
    timestamp: string
    isRead: boolean
    isMine: boolean
}

export interface ChatContextType {
    users: ChatUser[]
    selectedUser: ChatUser | null
    messages: Message[]
    setSelectedUser: (user: ChatUser | null) => void
    sendMessage: (content: string) => void
    markAsRead: (userId: number) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

// Sample data
const initialUsers: ChatUser[] = [
    {
        id: 1,
        username: "shopnow_official",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
        lastMessage: "Thanks for your purchase! 🎉",
        lastMessageTime: "2 min ago",
        unreadCount: 2,
        isOnline: true
    },
    {
        id: 2,
        username: "tech_gadgets",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
        lastMessage: "The new iPhone is available now!",
        lastMessageTime: "15 min ago",
        unreadCount: 0,
        isOnline: true
    },
    {
        id: 3,
        username: "fashion_insider",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
        lastMessage: "Check out our summer collection 🔥",
        lastMessageTime: "1 hour ago",
        unreadCount: 5,
        isOnline: false
    },
    {
        id: 4,
        username: "home_decor",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
        lastMessage: "Your order has been shipped!",
        lastMessageTime: "3 hours ago",
        unreadCount: 0,
        isOnline: true
    },
    {
        id: 5,
        username: "fitness_pro",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
        lastMessage: "Great workout today! 💪",
        lastMessageTime: "Yesterday",
        unreadCount: 0,
        isOnline: false
    },
    {
        id: 6,
        username: "foodie_paradise",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
        lastMessage: "The recipe is ready! 🍕",
        lastMessageTime: "Yesterday",
        unreadCount: 1,
        isOnline: true
    },
    {
        id: 7,
        username: "beauty_guru",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
        lastMessage: "New makeup tutorial is up!",
        lastMessageTime: "2 days ago",
        unreadCount: 0,
        isOnline: false
    },
    {
        id: 8,
        username: "cooking_master",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
        lastMessage: "Bon appétit! 🇫🇷",
        lastMessageTime: "3 days ago",
        unreadCount: 0,
        isOnline: true
    }
]

const initialMessages: Message[] = [
    {
        id: 1,
        senderId: 1,
        receiverId: 0,
        content: "Hi! Thanks for shopping with us!",
        timestamp: "10:30 AM",
        isRead: true,
        isMine: false
    },
    {
        id: 2,
        senderId: 0,
        receiverId: 1,
        content: "Thank you! When will my order arrive?",
        timestamp: "10:32 AM",
        isRead: true,
        isMine: true
    },
    {
        id: 3,
        senderId: 1,
        receiverId: 0,
        content: "Your order is on its way! Expected delivery is tomorrow.",
        timestamp: "10:35 AM",
        isRead: true,
        isMine: false
    },
    {
        id: 4,
        senderId: 1,
        receiverId: 0,
        content: "Thanks for your purchase! 🎉",
        timestamp: "10:36 AM",
        isRead: false,
        isMine: false
    }
]

export function ChatProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<ChatUser[]>(initialUsers)
    const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
    const [messages, setMessages] = useState<Message[]>(initialMessages)

    const sendMessage = (content: string) => {
        if (!selectedUser) return

        const newMessage: Message = {
            id: Date.now(),
            senderId: 0,
            receiverId: selectedUser.id,
            content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isRead: false,
            isMine: true
        }

        setMessages([...messages, newMessage])

        // Update user's last message
        setUsers(users.map(user =>
            user.id === selectedUser.id
                ? { ...user, lastMessage: content, lastMessageTime: "Just now" }
                : user
        ))

        // Simulate response after 2 seconds
        setTimeout(() => {
            const responseMessage: Message = {
                id: Date.now() + 1,
                senderId: selectedUser.id,
                receiverId: 0,
                content: "Thanks for your message! I'll get back to you soon.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isRead: false,
                isMine: false
            }
            setMessages(prev => [...prev, responseMessage])

            // Update user's last message
            setUsers(users.map(user =>
                user.id === selectedUser.id
                    ? { ...user, lastMessage: responseMessage.content, lastMessageTime: "Just now", isTyping: false }
                    : user
            ))
        }, 2000)

        // Show typing indicator
        setUsers(users.map(user =>
            user.id === selectedUser.id
                ? { ...user, isTyping: true }
                : user
        ))
    }

    const markAsRead = (userId: number) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, unreadCount: 0 }
                : user
        ))
    }

    return (
        <ChatContext.Provider value={{
            users,
            selectedUser,
            messages,
            setSelectedUser,
            sendMessage,
            markAsRead
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider")
    }
    return context
}
