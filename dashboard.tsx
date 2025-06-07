"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MessageCircle,
  Calendar,
  User,
  Crown,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Clock,
  Home,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser, signOut } from "@/lib/auth"
import { getUserProfile, getUserStats } from "@/lib/profile"
import { getUserReminders } from "@/lib/reminders"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  plan: string
  profileComplete: number
  isNewUser: boolean
  lastCheckIn: string
  nextReminder: string
  totalCheckIns: number
  currentStreak: number
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Get current authenticated user
        const { user: authUser, error: authError } = await getCurrentUser()

        if (authError || !authUser) {
          router.push("/login")
          return
        }

        // Get user profile
        const { profile, error: profileError } = await getUserProfile(authUser.id)

        if (profileError) {
          console.error("Error loading profile:", profileError)
          return
        }

        // Get user stats
        const { stats, error: statsError } = await getUserStats(authUser.id)

        if (statsError) {
          console.error("Error loading stats:", statsError)
        }

        // Get upcoming reminders
        const { reminders, error: remindersError } = await getUserReminders(authUser.id)

        if (remindersError) {
          console.error("Error loading reminders:", remindersError)
        }

        // Find next reminder
        const now = new Date()
        const upcomingReminders = reminders
          ?.filter((reminder) => {
            const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`)
            return reminderDateTime > now
          })
          .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`)
            const dateB = new Date(`${b.date}T${b.time}`)
            return dateA.getTime() - dateB.getTime()
          })

        const nextReminder = upcomingReminders?.[0]
        const nextReminderText = nextReminder
          ? `${new Date(nextReminder.date).toLocaleDateString()} at ${nextReminder.time}`
          : "No upcoming reminders"

        // Calculate profile completion
        let completionScore = 0
        if (profile?.first_name) completionScore += 20
        if (profile?.last_name) completionScore += 20
        if (profile?.job) completionScore += 20
        if (profile?.whatsapp_number) completionScore += 20
        if (profile?.age && profile?.gender) completionScore += 20

        const userData: UserData = {
          id: authUser.id,
          firstName: profile?.first_name || "",
          lastName: profile?.last_name || "",
          email: profile?.email || authUser.email || "",
          avatar: profile?.avatar_url || "/placeholder.svg?height=40&width=40&text=U",
          plan: "Free", // For MVP, everyone is on free plan
          profileComplete: completionScore,
          isNewUser: !profile?.first_name || !profile?.last_name,
          lastCheckIn: stats?.last_check_in ? new Date(stats.last_check_in).toLocaleDateString() : "Never",
          nextReminder: nextReminderText,
          totalCheckIns: stats?.total_check_ins || 0,
          currentStreak: stats?.current_streak || 0,
        }

        setUser(userData)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Failed to load user data</p>
          <Button onClick={() => router.push("/login")} className="mt-4">
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  const motivationalMessage =
    "You're doing amazing! Remember, consistency beats perfection. Your LinkedIn audience is waiting for your authentic voice. Let's make today count! 🚀"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">CoachAI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback>
                    {user.firstName?.[0] || "U"}
                    {user.lastName?.[0] || ""}
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
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Link href="/dashboard">
                    <Button variant="default" className="w-full justify-start">
                      <Home className="h-4 w-4 mr-3" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/check-in">
                    <Button variant="ghost" className="w-full justify-start">
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

                {/* Profile Completion */}
                <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Profile Setup</span>
                    <span className="text-sm text-gray-600">{user.profileComplete}%</span>
                  </div>
                  <Progress value={user.profileComplete} className="mb-2" />
                  <p className="text-xs text-gray-600 mb-2">Complete your profile to get personalized coaching</p>
                  <Link href="/onboarding">
                    <Button size="sm" className="w-full">
                      Complete Setup
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Message */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">Welcome back, {user.firstName || "there"}! 👋</h2>
                    <p className="text-gray-600 mb-4">{motivationalMessage}</p>
                    <Link href="/check-in">
                      <Button>
                        Start Today's Check-in
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Check-ins</p>
                      <p className="text-2xl font-bold">{user.totalCheckIns}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <Target className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Streak</p>
                      <p className="text-2xl font-bold">{user.currentStreak} days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Check-in</p>
                      <p className="text-lg font-semibold">{user.lastCheckIn}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Quick Check-in
                  </CardTitle>
                  <CardDescription>
                    Chat with your AI coach about your progress and get personalized advice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/check-in">
                    <Button className="w-full">
                      Start Conversation
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Upcoming Reminders
                  </CardTitle>
                  <CardDescription>Stay on track with your LinkedIn content goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Next Reminder</span>
                      <Badge variant="outline">{user.nextReminder}</Badge>
                    </div>
                  </div>
                  <Link href="/reminders">
                    <Button variant="outline" className="w-full">
                      Manage Reminders
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Upgrade Prompt for Free Users */}
            {user.plan === "Free" && (
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Crown className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">Unlock Your Full Potential</h3>
                      <p className="text-gray-600 mb-4">
                        Get unlimited check-ins, advanced coaching insights, and priority support with our Pro plan.
                      </p>
                      <div className="flex space-x-3">
                        <Button>
                          Upgrade to Pro
                          <Crown className="h-4 w-4 ml-2" />
                        </Button>
                        <Button variant="outline">Learn More</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
