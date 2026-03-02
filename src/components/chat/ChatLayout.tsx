"use client"

import { useState } from "react"
import { ChatProvider } from "./ChatContext"
import UserList from "./UserList"
import PersonalChat from "./PersonalChat"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

function ChatContent() {
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)

    return (
        <div className="flex h-[calc(100vh-80px)] bg-background">
            {/* User List - Hidden on mobile when chat is open */}
            <div className={`
                w-full md:w-80 lg:w-96 shrink-0 
                ${isMobileChatOpen ? 'hidden md:block' : 'block'}
            `}>
                <UserList />
            </div>

            {/* Personal Chat - Hidden on mobile when chat is not open */}
            <div className={`
                flex-1 
                ${isMobileChatOpen ? 'block' : 'hidden md:block'}
            `}>
                <PersonalChat />
            </div>

            {/* Mobile Toggle Button */}
            <Button
                variant="outline"
                size="icon"
                className="fixed bottom-4 right-4 md:hidden rounded-full shadow-lg z-50"
                onClick={() => setIsMobileChatOpen(!isMobileChatOpen)}
            >
                {isMobileChatOpen ? (
                    <X className="h-5 w-5" />
                ) : (
                    <MessageCircle className="h-5 w-5" />
                )}
            </Button>
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
