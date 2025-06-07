"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  CreditCard,
  Settings,
  Shield,
  Trash2,
  Crown,
  Calendar,
  MessageCircle,
  Plus,
  X,
  Download,
  AlertTriangle,
  Home,
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getCurrentUser, signOut } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface Goal {
  id: string
  title: string
  description: string
}

export default function Profile() {
  const router = useRouter()
  // Mock user data - replace with actual user data
  const [userData, setUserData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@example.com",
    age: "28",
    gender: "male",
    job: "Marketing Manager",
    whatsappNumber: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=80&width=80&text=AJ",

    // Coaching preferences
    coachingStyle: "supportive",
    motivationStyle: "goal-tracking",
    personalityType: "ambivert",
    workSchedule: "9-5-weekdays",
    hobbies: ["Reading", "Writing", "Technology", "Networking"],

    // Notification preferences
    notificationPreferences: ["email", "whatsapp"],
    reminderFrequency: "daily",
    preferredTime: "14:00",

    // Subscription
    plan: "Pro",
    billingCycle: "monthly",
    nextBilling: "2024-02-15",
    usage: {
      checkIns: 12,
      limit: 30,
    },
  })

  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", title: "Improve Content Quality", description: "Create more engaging and valuable LinkedIn posts" },
    { id: "2", title: "Increase Posting Frequency", description: "Post consistently 3 times per week" },
    { id: "3", title: "Build Network", description: "Connect with 50 new industry professionals" },
  ])

  const [newGoal, setNewGoal] = useState({ title: "", description: "" })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const billingHistory = [
    { date: "2024-01-15", amount: "$0.00", status: "Free Plan", invoice: "#" },
    { date: "2023-12-15", amount: "$0.00", status: "Free Plan", invoice: "#" },
  ]

  const updateUserData = (field: string, value: any) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleArrayValue = (field: string, value: string) => {
    const currentArray = userData[field as keyof typeof userData] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateUserData(field, newArray)
  }

  const addGoal = () => {
    if (newGoal.title.trim() && newGoal.description.trim()) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
      }
      setGoals((prev) => [...prev, goal])
      setNewGoal({ title: "", description: "" })
    }
  }

  const removeGoal = (id: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
  }

  const handleSave = () => {
    console.log("Saving profile data:", userData)
    // Add your save logic here
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
            <h1 className="text-xl font-bold">Profile Settings</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={handleSave}>Save Changes</Button>
            <Button variant="outline" size="sm">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={userData.avatar} alt={`${userData.firstName} ${userData.lastName}`} />
                  <AvatarFallback>
                    {userData.firstName?.[0] || ""}
                    {userData.lastName?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
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
                    <Button variant="ghost" className="w-full justify-start">
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
                    <Button variant="default" className="w-full justify-start">
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Button>
                  </Link>
                </nav>

                {/* Profile Summary */}
                <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={userData.avatar || "/placeholder.svg"}
                        alt={`${userData.firstName} ${userData.lastName}`}
                      />
                      <AvatarFallback>
                        {userData.firstName[0]}
                        {userData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {userData.firstName} {userData.lastName}
                      </p>
                      <Badge variant={userData.plan === "Pro" ? "default" : "secondary"}>{userData.plan} Plan</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="personal">
                  <User className="h-4 w-4 mr-2" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="coaching">
                  <Settings className="h-4 w-4 mr-2" />
                  Coaching
                </TabsTrigger>
                <TabsTrigger value="subscription">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Subscription
                </TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="account">
                  <Shield className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={userData.firstName}
                          onChange={(e) => updateUserData("firstName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={userData.lastName}
                          onChange={(e) => updateUserData("lastName", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) => updateUserData("email", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Select value={userData.age} onValueChange={(value) => updateUserData("age", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 50 }, (_, i) => i + 18).map((age) => (
                              <SelectItem key={age} value={age.toString()}>
                                {age}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select value={userData.gender} onValueChange={(value) => updateUserData("gender", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="non-binary">Non-binary</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job">Job/Profession</Label>
                      <Input id="job" value={userData.job} onChange={(e) => updateUserData("job", e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp Number</Label>
                      <Input
                        id="whatsapp"
                        value={userData.whatsappNumber}
                        onChange={(e) => updateUserData("whatsappNumber", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Coaching Preferences Tab */}
              <TabsContent value="coaching">
                <Card>
                  <CardHeader>
                    <CardTitle>Coaching Preferences</CardTitle>
                    <CardDescription>Customize your coaching experience and notification settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label>Coaching Style</Label>
                      <RadioGroup
                        value={userData.coachingStyle}
                        onValueChange={(value) => updateUserData("coachingStyle", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="supportive" id="supportive" />
                          <Label htmlFor="supportive">Supportive & Encouraging</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="direct" id="direct" />
                          <Label htmlFor="direct">Direct & Challenging</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="analytical" id="analytical" />
                          <Label htmlFor="analytical">Analytical & Data-Driven</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="creative" id="creative" />
                          <Label htmlFor="creative">Creative & Inspirational</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Motivation Style</Label>
                      <Select
                        value={userData.motivationStyle}
                        onValueChange={(value) => updateUserData("motivationStyle", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="positive-reinforcement">Positive Reinforcement</SelectItem>
                          <SelectItem value="goal-tracking">Goal Tracking & Progress</SelectItem>
                          <SelectItem value="accountability">Accountability & Check-ins</SelectItem>
                          <SelectItem value="competition">Friendly Competition</SelectItem>
                          <SelectItem value="rewards">Rewards & Milestones</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Hobbies & Interests</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          "Reading",
                          "Writing",
                          "Photography",
                          "Travel",
                          "Fitness",
                          "Cooking",
                          "Music",
                          "Art",
                          "Technology",
                          "Sports",
                          "Gaming",
                          "Networking",
                        ].map((hobby) => (
                          <div key={hobby} className="flex items-center space-x-2">
                            <Checkbox
                              id={hobby}
                              checked={userData.hobbies.includes(hobby)}
                              onCheckedChange={() => toggleArrayValue("hobbies", hobby)}
                            />
                            <Label htmlFor={hobby} className="text-sm">
                              {hobby}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Settings</h3>

                      <div className="space-y-3">
                        <Label>Notification Methods</Label>
                        <div className="space-y-2">
                          {[
                            { value: "email", label: "Email Notifications" },
                            { value: "whatsapp", label: "WhatsApp Messages" },
                            { value: "push", label: "Push Notifications" },
                          ].map((pref) => (
                            <div key={pref.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={pref.value}
                                checked={userData.notificationPreferences.includes(pref.value)}
                                onCheckedChange={() => toggleArrayValue("notificationPreferences", pref.value)}
                              />
                              <Label htmlFor={pref.value}>{pref.label}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Reminder Frequency</Label>
                          <Select
                            value={userData.reminderFrequency}
                            onValueChange={(value) => updateUserData("reminderFrequency", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="every-other-day">Every Other Day</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="preferredTime">Preferred Time</Label>
                          <Input
                            id="preferredTime"
                            type="time"
                            value={userData.preferredTime}
                            onChange={(e) => updateUserData("preferredTime", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Subscription Tab */}
              <TabsContent value="subscription">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Plan</CardTitle>
                      <CardDescription>Manage your subscription and billing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-medium">{userData.plan} Plan</h3>
                            {userData.plan === "Pro" && <Crown className="h-5 w-5 text-yellow-500" />}
                          </div>
                          <p className="text-gray-600">
                            {userData.plan === "Free" ? "Limited features" : "Full access to all features"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {userData.plan === "Free" ? "$0" : "$19"}
                            <span className="text-sm font-normal">/month</span>
                          </p>
                          {userData.plan === "Pro" && (
                            <p className="text-sm text-gray-600">Next billing: {userData.nextBilling}</p>
                          )}
                        </div>
                      </div>

                      {userData.plan === "Free" && (
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Monthly Check-ins</span>
                            <span className="text-sm">
                              {userData.usage.checkIns}/{userData.usage.limit}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(userData.usage.checkIns / userData.usage.limit) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-3">
                        {userData.plan === "Free" ? (
                          <Button className="flex-1">
                            <Crown className="h-4 w-4 mr-2" />
                            Upgrade to Pro
                          </Button>
                        ) : (
                          <>
                            <Button variant="outline" className="flex-1">
                              Change Plan
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Cancel Subscription
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Billing History</CardTitle>
                      <CardDescription>View your past payments and invoices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {billingHistory.map((bill, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{bill.date}</p>
                              <p className="text-sm text-gray-600">{bill.status}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{bill.amount}</p>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Invoice
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Goals Tab */}
              <TabsContent value="goals">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Goals</CardTitle>
                    <CardDescription>Manage your personal and professional goals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Add New Goal */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div className="space-y-3">
                        <Input
                          placeholder="Goal title..."
                          value={newGoal.title}
                          onChange={(e) => setNewGoal((prev) => ({ ...prev, title: e.target.value }))}
                        />
                        <Textarea
                          placeholder="Goal description..."
                          value={newGoal.description}
                          onChange={(e) => setNewGoal((prev) => ({ ...prev, description: e.target.value }))}
                          rows={2}
                        />
                        <Button onClick={addGoal} disabled={!newGoal.title.trim() || !newGoal.description.trim()}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Goal
                        </Button>
                      </div>
                    </div>

                    {/* Existing Goals */}
                    <div className="space-y-3">
                      {goals.map((goal) => (
                        <div key={goal.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{goal.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeGoal(goal.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Basic account settings and security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" placeholder="Enter current password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" placeholder="Enter new password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                      </div>
                      <Button>Update Password</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Data Export</CardTitle>
                      <CardDescription>Download your data and conversation history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export My Data
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Danger Zone */}
                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-600 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Danger Zone
                      </CardTitle>
                      <CardDescription>Irreversible and destructive actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!showDeleteConfirm ? (
                        <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-sm text-red-600">
                            This action cannot be undone. This will permanently delete your account and all associated
                            data.
                          </p>
                          <div className="flex space-x-3">
                            <Button
                              variant="destructive"
                              onClick={() => {
                                console.log("Account deleted")
                                // Add delete logic here
                              }}
                            >
                              Yes, Delete My Account
                            </Button>
                            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
