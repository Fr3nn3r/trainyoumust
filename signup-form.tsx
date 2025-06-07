"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Linkedin, Mail, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { signUpWithEmail, signInWithProvider } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export default function Component() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) return `${name === "firstName" ? "First" : "Last"} name is required`
        if (value.trim().length < 2)
          return `${name === "firstName" ? "First" : "Last"} name must be at least 2 characters`
        return undefined

      case "email":
        if (!value.trim()) return "Email is required"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return "Please enter a valid email address"
        return undefined

      case "password":
        if (!value) return "Password is required"
        if (value.length < 8) return "Password must be at least 8 characters"
        if (!/(?=.*[a-z])/.test(value)) return "Password must contain at least one lowercase letter"
        if (!/(?=.*[A-Z])/.test(value)) return "Password must contain at least one uppercase letter"
        if (!/(?=.*\d)/.test(value)) return "Password must contain at least one number"
        if (!/(?=.*[@$!%*?&])/.test(value)) return "Password must contain at least one special character"
        return undefined

      case "confirmPassword":
        if (!value) return "Please confirm your password"
        if (value !== formData.password) return "Passwords do not match"
        return undefined

      default:
        return undefined
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }

    // Special case: revalidate confirmPassword when password changes
    if (name === "password" && touched.confirmPassword) {
      const confirmError = validateField("confirmPassword", formData.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)

    // Validate all fields
    const newErrors: FormErrors = {}
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) newErrors[key as keyof FormErrors] = error
    })

    setErrors(newErrors)

    // If no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      try {
        const { data, error } = await signUpWithEmail(formData.email, formData.password)

        if (error) {
          setErrors({ email: error.message })
        } else if (data.user) {
          // Update the user's profile with first and last name
          // This will be handled by the trigger we created
          router.push("/onboarding")
        }
      } catch (error) {
        console.error("Signup error:", error)
        setErrors({ email: "An unexpected error occurred. Please try again." })
      }
    }

    setIsLoading(false)
  }

  const handleSocialSignIn = async (provider: "google" | "github" | "linkedin") => {
    setIsLoading(true)
    try {
      const { error } = await signInWithProvider(provider)
      if (error) {
        console.error(`${provider} sign-in error:`, error)
        setErrors({ email: `Failed to sign in with ${provider}. Please try again.` })
      }
    } catch (error) {
      console.error(`${provider} sign-in error:`, error)
      setErrors({ email: `An unexpected error occurred with ${provider} sign-in.` })
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Choose your preferred signup method</CardDescription>
        </CardHeader>
        {/* Development Navigation - Remove in production */}
        <div className="px-6 pb-4 border-b">
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link href="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
            <Link href="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
            <Link href="/onboarding" className="text-blue-600 hover:underline">
              Onboarding
            </Link>
          </div>
        </div>
        <CardContent className="space-y-4">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => handleSocialSignIn("linkedin")}
              disabled={isLoading}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              Continue with LinkedIn
            </Button>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.firstName && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={errors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <div className="flex items-center gap-1 text-sm text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                disabled={isLoading}
              />
              {errors.email && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
                disabled={isLoading}
              />
              {errors.password && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              <Mail className="mr-2 h-4 w-4" />
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          {/* Terms and Privacy */}
          <p className="text-xs text-center text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
          </p>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary underline hover:text-primary/80">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
