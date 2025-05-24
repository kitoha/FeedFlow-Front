"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { saveToken, isAuthenticated } from "@/lib/auth"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get("token")
    const tokenType = searchParams.get("tokenType") || "Bearer"

    if (token) {
      saveToken(token, tokenType)

      const isFirstLogin = localStorage.getItem("onboarded") !== "true"

      if (isFirstLogin) {
        router.push("/onboarding")
      } else {
        router.push("/")
      }
    }
  }, [searchParams, router])

  useEffect(() => {
    if (isAuthenticated()) {
      const isOnboarded = localStorage.getItem("onboarded") === "true"
      router.push(isOnboarded ? "/" : "/onboarding")
    }
  }, [router])

  const handleGoogleSignIn = () => {
    setIsLoading(true)

    window.location.href = "http://localhost:8080/oauth2/authorization/google"
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background to-primary-50/30 dark:from-background dark:to-primary-900/10 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary bg-clip-text text-transparent">
            FeedFlow
          </h1>
          <p className="mt-2 text-muted-foreground">Discover content that matters to you</p>
        </div>

        <Card className="w-full border border-border/40 shadow-medium rounded-xl overflow-hidden">
          <CardHeader className="text-center pb-2">
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Sign in to access your personalized feed</CardDescription>
          </CardHeader>

          <CardContent className="pt-6 pb-8 flex flex-col items-center">
            <div className="w-full max-w-xs">
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full h-12 rounded-lg bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="relative w-5 h-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">{isLoading ? "Signing in..." : "Sign in with Google"}</span>
                </div>
              </Button>

              {isLoading && (
                <div className="mt-4 flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t bg-muted/30 px-6 py-4">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? Sign in with Google to create one automatically.
          </p>
        </div>
      </div>
    </div>
  )
}
