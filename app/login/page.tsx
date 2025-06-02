"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { isAuthenticated } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      const isOnboarded = localStorage.getItem("onboarded") === "true"
      router.push(isOnboarded ? "/" : "/onboarding")
    }
  }, [router])

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google"
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">FeedFlow</h1>
          <p className="mt-2 text-muted-foreground">Discover content that matters to you</p>
        </div>
        <Button
          onClick={handleGoogleSignIn}
          className="w-full h-12 rounded-lg"
        >
          <span>Sign in with Google</span>
        </Button>
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Don't have an account? Sign in with Google to create one automatically.
          </p>
        </div>
      </div>
    </div>
  )
}
