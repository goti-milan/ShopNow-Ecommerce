"use client"

import { useState } from "react"
import { ChatProvider, useChat } from "./ChatContext"
import UserList from "./UserList"
import PersonalChat from "./PersonalChat"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

function ChatContent() {
    const { selectedUser, setSelectedUser } = useChat()
    const isMobileChatOpen = !!selectedUser

    return (
        <div className="container mx-auto py-6">
            <div className="flex bg-background border rounded-2xl shadow-sm border-border/50 h-[calc(100vh-200px)] min-h-[600px] overflow-hidden relative">
                {/* User List - Hidden on mobile when chat is open */}
                <div className={`
                w-full md:w-80 lg:w-96 shrink-0 border-r
                ${isMobileChatOpen ? 'hidden md:block' : 'block'}
            `}>
                    <UserList />
                </div>

                {/* Personal Chat - Hidden on mobile when chat is not open */}
                <div className={`
                flex-1 flex flex-col
                ${isMobileChatOpen ? 'block' : 'hidden md:block'}
            `}>
                    <PersonalChat onBack={() => setSelectedUser(null)} />
                </div>
            </div>
        </div>
    )
}

export default function ChatLayout() {
    return (
        <ChatProvider>
            <ChatContent />
        </ChatProvider>
    )
}
