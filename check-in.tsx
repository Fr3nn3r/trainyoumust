"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Calendar, User, MessageCircle, Home, Crown } from "lucide-react"
import Link from "next/link"
import { getCurrentUser, signOut } from "@/lib/auth"
import { getUserProfile } from "@/lib/profile"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  content: string
  sender: "user" | "coach"
  timestamp: Date
}

const quickResponses = [
  "I made progress on my goals",
  "I had to deprioritize",
  "I'm feeling stuck",
  "I need help with content ideas",
  "I published new content",
  "I'm feeling overwhelmed",
  "I need accountability",
  "I had a win yesterday!",
]

export default function CheckIn() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey there! How did yesterday go with your LinkedIn content creation?",
      sender: "coach",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isSending, setIsSending] = useState(false)
  const endOfMessagesRef = useRef<null | HTMLDivElement>(null)
  const [user, setUser] = useState<{
    avatar: string
    firstName: string
    lastName: string
  } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadInitialData = async () => {
      const { user: authUser } = await getCurrentUser()
      if (authUser) {
        const { profile } = await getUserProfile(authUser.id)
        setUser({
          avatar: profile?.avatar_url || "/placeholder.svg?height=40&width=40&text=U",
          firstName: profile?.first_name || "",
          lastName: profile?.last_name || "",
        })
      }
    }
    loadInitialData()
  }, [])

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate coach response after a short delay
    setTimeout(() => {
      const coachResponses = [
        "That's great to hear! What specific progress did you make?",
        "I understand. What were your priorities instead?",
        "Thanks for sharing. What's your plan for today?",
        "That's interesting! Tell me more about that.",
        "How did that make you feel?",
        "What can I help you with specifically today?",
      ]
      const randomResponse = coachResponses[Math.floor(Math.random() * coachResponses.length)]

      const coachMessage: Message = {
        id: `coach-${Date.now()}`,
        content: randomResponse,
        sender: "coach",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, coachMessage])
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Daily Check-in</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.avatar} alt={user ? `${user.firstName} ${user.lastName}` : "User"} />
                  <AvatarFallback>
                    {user?.firstName?.[0] || "U"}
                    {user?.lastName?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2 mb-6">
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="h-4 w-4 mr-3" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/check-in">
                    <Button variant="default" className="w-full justify-start">
                      <MessageCircle className="h-4 w-4 mr-3" />
                      Check-in
                    </Button>
                  </Link>
                  <Link href="/reminders">
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-3" />
                      Reminders
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Button>
                  </Link>
                </nav>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium mb-2">Quick Responses</h3>
                  {quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2 px-3 whitespace-normal"
                      onClick={() => handleSendMessage(response)}
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-12rem)]">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex items-start max-w-[80%]">
                        {message.sender === "coach" && (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" alt="AI Coach" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div
                            className={`rounded-lg p-3 ${
                              message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <p>{message.content}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{formatTime(message.timestamp)}</p>
                        </div>
                        {message.sender === "user" && (
                          <Avatar className="h-8 w-8 ml-2">
                            <AvatarImage src="/placeholder.svg?height=32&width=32&text=You" alt="You" />
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={endOfMessagesRef} />
                </div>

                {/* Input Area */}
                <div className="border-t p-4">
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!inputValue.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
