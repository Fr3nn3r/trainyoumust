"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, MessageCircle, Home, Plus, X, Clock, Crown } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Reminder {
  id: string
  title: string
  date: string
  time: string
  method: string
  type: string
}

export default function Reminders() {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newReminder, setNewReminder] = useState({
    title: "",
    time: "",
    method: "",
    type: "",
  })

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Content Planning Session",
      date: "2024-01-15",
      time: "09:00",
      method: "email",
      type: "content-creation",
    },
    {
      id: "2",
      title: "Weekly Goal Review",
      date: "2024-01-17",
      time: "14:00",
      method: "whatsapp",
      type: "goal-review",
    },
    {
      id: "3",
      title: "Daily Check-in",
      date: "2024-01-18",
      time: "10:00",
      method: "email",
      type: "check-in",
    },
  ])

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const formatDate = (day: number) => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getRemindersForDate = (date: string) => {
    return reminders.filter((reminder) => reminder.date === date)
  }

  const handleDateClick = (day: number | null) => {
    if (day) {
      const dateStr = formatDate(day)
      setSelectedDate(dateStr)
      setShowAddForm(true)
    }
  }

  const addReminder = () => {
    if (newReminder.title && newReminder.time && newReminder.method && newReminder.type && selectedDate) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        title: newReminder.title,
        date: selectedDate,
        time: newReminder.time,
        method: newReminder.method,
        type: newReminder.type,
      }
      setReminders((prev) => [...prev, reminder])
      setNewReminder({ title: "", time: "", method: "", type: "" })
      setShowAddForm(false)
      setSelectedDate("")
    }
  }

  const removeReminder = (id: string) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "content-creation":
        return "bg-blue-100 text-blue-800"
      case "check-in":
        return "bg-green-100 text-green-800"
      case "goal-review":
        return "bg-purple-100 text-purple-800"
      case "custom":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "email":
        return "📧"
      case "whatsapp":
        return "📱"
      case "push":
        return "🔔"
      default:
        return "📧"
    }
  }

  const calendarDays = generateCalendarDays()
  const today = new Date()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Reminders</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
            <Link href="/profile">
              <Avatar className="cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=40&width=40&text=AJ" alt="Alex Johnson" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </Link>
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
                    <Button variant="default" className="w-full justify-start">
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

                {/* Upcoming Reminders */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Upcoming Reminders</h3>
                  <div className="space-y-2">
                    {reminders
                      .filter((reminder) => new Date(reminder.date + "T" + reminder.time) >= new Date())
                      .slice(0, 3)
                      .map((reminder) => (
                        <div key={reminder.id} className="p-2 bg-gray-50 rounded text-xs">
                          <p className="font-medium">{reminder.title}</p>
                          <p className="text-gray-600">
                            {new Date(reminder.date).toLocaleDateString()} at {reminder.time}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="mr-1">{getMethodIcon(reminder.method)}</span>
                            <Badge variant="outline" className="text-xs">
                              {reminder.type.replace("-", " ")}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {monthNames[today.getMonth()]} {today.getFullYear()}
                </CardTitle>
                <CardDescription>Click on a date to add a reminder</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={index} className="p-2"></div>
                    }

                    const dateStr = formatDate(day)
                    const dayReminders = getRemindersForDate(dateStr)
                    const isToday = day === today.getDate()

                    return (
                      <div
                        key={day}
                        className={`p-2 min-h-[60px] border rounded cursor-pointer hover:bg-gray-50 ${
                          isToday ? "bg-blue-50 border-blue-200" : "border-gray-200"
                        }`}
                        onClick={() => handleDateClick(day)}
                      >
                        <div className={`text-sm font-medium ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                          {day}
                        </div>
                        <div className="space-y-1 mt-1">
                          {dayReminders.slice(0, 2).map((reminder) => (
                            <div
                              key={reminder.id}
                              className={`text-xs p-1 rounded ${getTypeColor(reminder.type)} truncate`}
                            >
                              {reminder.title}
                            </div>
                          ))}
                          {dayReminders.length > 2 && (
                            <div className="text-xs text-gray-500">+{dayReminders.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Add Reminder Form */}
            {showAddForm && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Add Reminder for {new Date(selectedDate).toLocaleDateString()}</span>
                    <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Reminder Title</Label>
                    <Input
                      id="title"
                      value={newReminder.title}
                      onChange={(e) => setNewReminder((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter reminder title..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newReminder.time}
                        onChange={(e) => setNewReminder((prev) => ({ ...prev, time: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Notification Method</Label>
                      <Select
                        value={newReminder.method}
                        onValueChange={(value) => setNewReminder((prev) => ({ ...prev, method: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">📧 Email</SelectItem>
                          <SelectItem value="whatsapp">📱 WhatsApp</SelectItem>
                          <SelectItem value="push">🔔 Push Notification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Reminder Type</Label>
                    <Select
                      value={newReminder.type}
                      onValueChange={(value) => setNewReminder((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="content-creation">Content Creation</SelectItem>
                        <SelectItem value="check-in">Check-in Reminder</SelectItem>
                        <SelectItem value="goal-review">Goal Review</SelectItem>
                        <SelectItem value="custom">Custom Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={addReminder}
                      disabled={!newReminder.title || !newReminder.time || !newReminder.method || !newReminder.type}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Reminder
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Reminders List */}
            <Card>
              <CardHeader>
                <CardTitle>All Reminders</CardTitle>
                <CardDescription>Manage your scheduled reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reminders.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No reminders set. Click on a date to add one!</p>
                  ) : (
                    reminders
                      .sort(
                        (a, b) => new Date(a.date + "T" + a.time).getTime() - new Date(b.date + "T" + b.time).getTime(),
                      )
                      .map((reminder) => (
                        <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium">{reminder.title}</h4>
                              <Badge variant="outline" className={getTypeColor(reminder.type)}>
                                {reminder.type.replace("-", " ")}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(reminder.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {reminder.time}
                              </span>
                              <span>
                                {getMethodIcon(reminder.method)} {reminder.method}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeReminder(reminder.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
