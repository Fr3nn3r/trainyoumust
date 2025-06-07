"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")
  const [envVars, setEnvVars] = useState({
    url: "",
    anonKey: "",
  })

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    setConnectionStatus("loading")

    // Check environment variables
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    setEnvVars({
      url: url || "❌ Missing",
      anonKey: anonKey ? "✅ Present" : "❌ Missing",
    })

    if (!url || !anonKey) {
      setConnectionStatus("error")
      setErrorMessage("Missing environment variables")
      return
    }

    try {
      // Test the connection by trying to get the current session
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setConnectionStatus("error")
        setErrorMessage(`Supabase connection error: ${error.message}`)
      } else {
        setConnectionStatus("success")
      }
    } catch (error) {
      setConnectionStatus("error")
      setErrorMessage(`Connection test failed: ${error}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Supabase Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Environment Variables Status */}
          <div className="space-y-2">
            <h3 className="font-medium">Environment Variables:</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>NEXT_PUBLIC_SUPABASE_URL:</span>
                <span className={envVars.url.includes("❌") ? "text-red-600" : "text-green-600"}>
                  {envVars.url.includes("❌") ? "❌ Missing" : "✅ Present"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
                <span className={envVars.anonKey.includes("❌") ? "text-red-600" : "text-green-600"}>
                  {envVars.anonKey}
                </span>
              </div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="flex items-center justify-center space-x-2 p-4 border rounded-lg">
            {connectionStatus === "loading" && (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <span>Testing connection...</span>
              </>
            )}
            {connectionStatus === "success" && (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-600">Connection successful!</span>
              </>
            )}
            {connectionStatus === "error" && (
              <>
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-600">Connection failed</span>
              </>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errorMessage}</p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2">
            <Button onClick={testConnection} className="w-full" disabled={connectionStatus === "loading"}>
              Test Connection Again
            </Button>

            {connectionStatus === "success" && (
              <div className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/signup">Go to Signup</a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/login">Go to Login</a>
                </Button>
              </div>
            )}
          </div>

          {/* Debug Info */}
          <details className="text-xs text-gray-600">
            <summary className="cursor-pointer">Debug Info</summary>
            <div className="mt-2 p-2 bg-gray-100 rounded text-xs font-mono">
              <div>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30)}...</div>
              <div>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 30)}...</div>
            </div>
          </details>
        </CardContent>
      </Card>
    </div>
  )
}
