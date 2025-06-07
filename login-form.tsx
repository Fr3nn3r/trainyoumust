"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Github, Linkedin, LogIn, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { signInWithEmail, signInWithProvider } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface FormErrors {
  email?: string
  password?: string
}

interface FormData {
  email: string
  password: string
  remember: boolean
}

export default function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    remember: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "email":
        if (!value.trim()) return "Email is required"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return "Please enter a valid email address"
        return undefined

      case "password":
        if (!value) return "Password is required"
        return undefined

      default:
        return undefined
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))

      // Validate field if it has been touched
      if (touched[name]) {
        const error = validateField(name, value)
        setErrors((prev) => ({ ...prev, [name]: error }))
      }
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

    // Mark all fields as touched (except checkbox)
    const fieldsToValidate = ["email", "password"]
    const allTouched = fieldsToValidate.reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)

    // Validate all fields
    const newErrors: FormErrors = {}
    fieldsToValidate.forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData] as string)
      if (error) newErrors[key as keyof FormErrors] = error
    })

    setErrors(newErrors)

    // If no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      try {
        const { data, error } = await signInWithEmail(formData.email, formData.password)

        if (error) {
          setErrors({ email: error.message })
        } else if (data.user) {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Login error:", error)
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
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Sign in to your account</CardDescription>
        </CardHeader>
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
              Sign in with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => handleSocialSignIn("linkedin")}
              disabled={isLoading}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              Sign in with LinkedIn
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
              Sign in with Google
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

          {/* Email Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                name="remember"
                checked={formData.remember}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, remember: checked as boolean }))}
                disabled={isLoading}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              <LogIn className="mr-2 h-4 w-4" />
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-primary underline hover:text-primary/80">
                Create an account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
