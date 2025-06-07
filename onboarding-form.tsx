"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface OnboardingData {
  // Step 1: Basic Info
  firstName: string
  lastName: string
  age: string
  gender: string
  job: string

  // Step 2: Goals & Coaching Style
  primaryGoal: string
  specificGoals: string
  coachingStyle: string
  motivationStyle: string

  // Step 3: Personal Preferences
  hobbies: string[]
  personalityType: string
  workSchedule: string
  challenges: string

  // Step 4: Contact & Notifications
  whatsappNumber: string
  notificationPreferences: string[]
  reminderFrequency: string
  preferredTime: string
}

interface FormErrors {
  [key: string]: string
}

const TOTAL_STEPS = 4

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<OnboardingData>({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    job: "",
    primaryGoal: "",
    specificGoals: "",
    coachingStyle: "",
    motivationStyle: "",
    hobbies: [],
    personalityType: "",
    workSchedule: "",
    challenges: "",
    whatsappNumber: "",
    notificationPreferences: [],
    reminderFrequency: "",
    preferredTime: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
        if (!formData.age) newErrors.age = "Age is required"
        if (!formData.gender) newErrors.gender = "Gender is required"
        if (!formData.job.trim()) newErrors.job = "Job/profession is required"
        break

      case 2:
        if (!formData.primaryGoal) newErrors.primaryGoal = "Primary goal is required"
        if (!formData.coachingStyle) newErrors.coachingStyle = "Coaching style preference is required"
        if (!formData.motivationStyle) newErrors.motivationStyle = "Motivation style is required"
        break

      case 3:
        if (formData.hobbies.length === 0) newErrors.hobbies = "Please select at least one hobby"
        if (!formData.personalityType) newErrors.personalityType = "Personality type is required"
        if (!formData.workSchedule) newErrors.workSchedule = "Work schedule is required"
        break

      case 4:
        if (!formData.whatsappNumber.trim()) newErrors.whatsappNumber = "WhatsApp number is required"
        if (formData.notificationPreferences.length === 0) {
          newErrors.notificationPreferences = "Please select at least one notification preference"
        }
        if (!formData.reminderFrequency) newErrors.reminderFrequency = "Reminder frequency is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log("Onboarding completed:", formData)
      // Here you would typically save the data and redirect to dashboard
      window.location.href = "/dashboard"
    }
  }

  const updateFormData = (field: keyof OnboardingData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const toggleArrayValue = (field: keyof OnboardingData, value: string) => {
    const currentArray = formData[field] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFormData(field, newArray)
  }

  const progress = (currentStep / TOTAL_STEPS) * 100

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Let's Get You Started</CardTitle>
          <CardDescription>Help us personalize your coaching experience</CardDescription>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Step {currentStep} of {TOTAL_STEPS}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <p className="text-gray-600">Tell us a bit about yourself</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Select value={formData.age} onValueChange={(value) => updateFormData("age", value)}>
                    <SelectTrigger className={errors.age ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select your age" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 50 }, (_, i) => i + 18).map((age) => (
                        <SelectItem key={age} value={age.toString()}>
                          {age}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.age && (
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      {errors.age}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                    <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      {errors.gender}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job">Job/Profession</Label>
                <Input
                  id="job"
                  placeholder="e.g., Marketing Manager, Entrepreneur, Consultant"
                  value={formData.job}
                  onChange={(e) => updateFormData("job", e.target.value)}
                  className={errors.job ? "border-red-500" : ""}
                />
                {errors.job && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.job}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Goals & Coaching Style */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">Goals & Coaching Style</h3>
                <p className="text-gray-600">Help us understand what you want to achieve</p>
              </div>

              <div className="space-y-2">
                <Label>Primary Goal</Label>
                <Select value={formData.primaryGoal} onValueChange={(value) => updateFormData("primaryGoal", value)}>
                  <SelectTrigger className={errors.primaryGoal ? "border-red-500" : ""}>
                    <SelectValue placeholder="What's your main goal?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grow-linkedin-audience">Grow LinkedIn Audience</SelectItem>
                    <SelectItem value="improve-content-quality">Improve Content Quality</SelectItem>
                    <SelectItem value="increase-engagement">Increase Engagement</SelectItem>
                    <SelectItem value="build-personal-brand">Build Personal Brand</SelectItem>
                    <SelectItem value="generate-leads">Generate Leads</SelectItem>
                    <SelectItem value="network-building">Network Building</SelectItem>
                  </SelectContent>
                </Select>
                {errors.primaryGoal && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.primaryGoal}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="specificGoals">Specific Goals (Optional)</Label>
                <Textarea
                  id="specificGoals"
                  placeholder="Tell us more about your specific goals and what success looks like to you..."
                  value={formData.specificGoals}
                  onChange={(e) => updateFormData("specificGoals", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <Label>Preferred Coaching Style</Label>
                <RadioGroup
                  value={formData.coachingStyle}
                  onValueChange={(value) => updateFormData("coachingStyle", value)}
                  className={errors.coachingStyle ? "border border-red-500 rounded p-2" : ""}
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
                {errors.coachingStyle && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.coachingStyle}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>How do you prefer to be motivated?</Label>
                <Select
                  value={formData.motivationStyle}
                  onValueChange={(value) => updateFormData("motivationStyle", value)}
                >
                  <SelectTrigger className={errors.motivationStyle ? "border-red-500" : ""}>
                    <SelectValue placeholder="Choose your motivation style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive-reinforcement">Positive Reinforcement</SelectItem>
                    <SelectItem value="goal-tracking">Goal Tracking & Progress</SelectItem>
                    <SelectItem value="accountability">Accountability & Check-ins</SelectItem>
                    <SelectItem value="competition">Friendly Competition</SelectItem>
                    <SelectItem value="rewards">Rewards & Milestones</SelectItem>
                  </SelectContent>
                </Select>
                {errors.motivationStyle && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.motivationStyle}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Personal Preferences */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">Personal Preferences</h3>
                <p className="text-gray-600">Help us understand your personality and lifestyle</p>
              </div>

              <div className="space-y-3">
                <Label>Hobbies & Interests (Select all that apply)</Label>
                <div className={`grid grid-cols-2 gap-2 ${errors.hobbies ? "border border-red-500 rounded p-2" : ""}`}>
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
                        checked={formData.hobbies.includes(hobby)}
                        onCheckedChange={() => toggleArrayValue("hobbies", hobby)}
                      />
                      <Label htmlFor={hobby} className="text-sm">
                        {hobby}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.hobbies && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.hobbies}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Personality Type</Label>
                <Select
                  value={formData.personalityType}
                  onValueChange={(value) => updateFormData("personalityType", value)}
                >
                  <SelectTrigger className={errors.personalityType ? "border-red-500" : ""}>
                    <SelectValue placeholder="How would you describe yourself?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="extrovert">Extrovert - I gain energy from social interactions</SelectItem>
                    <SelectItem value="introvert">Introvert - I prefer quiet, focused work</SelectItem>
                    <SelectItem value="ambivert">Ambivert - I'm comfortable in both situations</SelectItem>
                  </SelectContent>
                </Select>
                {errors.personalityType && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.personalityType}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Work Schedule</Label>
                <Select value={formData.workSchedule} onValueChange={(value) => updateFormData("workSchedule", value)}>
                  <SelectTrigger className={errors.workSchedule ? "border-red-500" : ""}>
                    <SelectValue placeholder="What's your typical work schedule?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9-5-weekdays">9-5 Weekdays</SelectItem>
                    <SelectItem value="flexible-hours">Flexible Hours</SelectItem>
                    <SelectItem value="shift-work">Shift Work</SelectItem>
                    <SelectItem value="freelancer">Freelancer/Entrepreneur</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                  </SelectContent>
                </Select>
                {errors.workSchedule && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.workSchedule}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenges">Biggest Challenges (Optional)</Label>
                <Textarea
                  id="challenges"
                  placeholder="What are your biggest challenges with LinkedIn content creation?"
                  value={formData.challenges}
                  onChange={(e) => updateFormData("challenges", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 4: Contact & Notifications */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">Contact & Notifications</h3>
                <p className="text-gray-600">Set up your communication preferences</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  placeholder="+1 (555) 123-4567"
                  value={formData.whatsappNumber}
                  onChange={(e) => updateFormData("whatsappNumber", e.target.value)}
                  className={errors.whatsappNumber ? "border-red-500" : ""}
                />
                {errors.whatsappNumber && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.whatsappNumber}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label>Notification Preferences (Select all that apply)</Label>
                <div
                  className={`space-y-2 ${errors.notificationPreferences ? "border border-red-500 rounded p-2" : ""}`}
                >
                  {[
                    { value: "email", label: "Email Notifications" },
                    { value: "whatsapp", label: "WhatsApp Messages" },
                    { value: "push", label: "Push Notifications" },
                  ].map((pref) => (
                    <div key={pref.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={pref.value}
                        checked={formData.notificationPreferences.includes(pref.value)}
                        onCheckedChange={() => toggleArrayValue("notificationPreferences", pref.value)}
                      />
                      <Label htmlFor={pref.value}>{pref.label}</Label>
                    </div>
                  ))}
                </div>
                {errors.notificationPreferences && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.notificationPreferences}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Reminder Frequency</Label>
                <Select
                  value={formData.reminderFrequency}
                  onValueChange={(value) => updateFormData("reminderFrequency", value)}
                >
                  <SelectTrigger className={errors.reminderFrequency ? "border-red-500" : ""}>
                    <SelectValue placeholder="How often should we remind you?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="every-other-day">Every Other Day</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  </SelectContent>
                </Select>
                {errors.reminderFrequency && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.reminderFrequency}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Reminder Time</Label>
                <Input
                  id="preferredTime"
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => updateFormData("preferredTime", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <div>
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>

            <div className="flex space-x-3">
              <Link href="/dashboard">
                <Button variant="ghost">Skip for now</Button>
              </Link>

              {currentStep < TOTAL_STEPS ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Complete Setup
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
