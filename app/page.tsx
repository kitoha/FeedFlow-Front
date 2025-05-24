"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ContentCard } from "@/components/content-card"
import { NotificationCenter } from "@/components/notification-center"
import { UserPreferences } from "@/components/user-preferences"
import { ContentDetail } from "@/components/content-detail"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { UserAvatar } from "@/components/user-avatar"
import { isAuthenticated, getUserFromToken, logout } from "@/lib/auth"

export default function ActivityFeed() {
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [selectedContent, setSelectedContent] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()
  const isMobile = useMobile()

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push("/login")
        return
      }

      const isOnboarded = localStorage.getItem("onboarded") === "true"
      if (!isOnboarded) {
        router.push("/onboarding")
        return
      }

      const userInfo = getUserFromToken()
      setUser(
        userInfo || {
          name: "User",
          email: "",
          image: "/placeholder.svg?height=40&width=40",
        },
      )

      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const feedItems = [
    {
      id: 1,
      type: "article",
      title: "The Future of Remote Work",
      excerpt: "How companies are adapting to the new normal of distributed teams and virtual collaboration.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Alex Johnson",
      date: "2 hours ago",
      likes: 128,
      comments: 32,
    },
    {
      id: 2,
      type: "video",
      title: "10-Minute Productivity Boost",
      excerpt: "Learn how to maximize your efficiency with these simple techniques that anyone can implement.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Productivity Channel",
      date: "Yesterday",
      duration: "10:24",
      views: "24K",
      likes: 1024,
    },
    {
      id: 3,
      type: "article",
      title: "Healthy Meal Prep Ideas",
      excerpt: "Simple and nutritious meal preparation ideas that will save you time and keep you healthy.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Nutrition Hub",
      date: "2 days ago",
      likes: 256,
      comments: 48,
    },
    {
      id: 4,
      type: "podcast",
      title: "The Science of Sleep",
      excerpt: "Experts discuss the latest research on sleep patterns and how to improve your rest quality.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Health Matters Podcast",
      date: "3 days ago",
      duration: "42:10",
      listens: "15K",
    },
    {
      id: 5,
      type: "article",
      title: "Financial Planning Basics",
      excerpt: "Essential tips for managing your finances and planning for the future regardless of your income level.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Finance Insights",
      date: "4 days ago",
      likes: 512,
      comments: 96,
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "New comment on your post",
      message: "Sarah commented: 'Great insights, thanks for sharing!'",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Content recommendation",
      message: "Based on your interests: '5 Ways to Improve Your Focus'",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Weekly summary",
      message: "Your content digest is ready to view",
      time: "Yesterday",
      read: true,
    },
  ]

  const showNewNotification = () => {
    toast({
      title: "New notification",
      description: "Alex just shared a new article you might like",
      duration: 5000,
    })
  }

  const handleCardClick = (id: number) => {
    setSelectedContent(id)
  }

  const closeContentDetail = () => {
    setSelectedContent(null)
  }

  const handleSignOut = () => {
    logout()
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-soft">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-700 bg-clip-text text-transparent">
              FeedFlow
            </h1>
          </div>

          <div className="hidden md:flex md:w-1/3 lg:w-1/4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-full bg-muted pl-8 md:w-[200px] lg:w-[300px] transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full transition-all duration-200 hover:bg-primary/10"
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowPreferences(false)
              }}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-vibrant animate-pulse-subtle"></span>
            </Button>

            <Button
              variant="outline"
              className="rounded-full transition-all duration-200"
              onClick={() => {
                setShowPreferences(!showPreferences)
                setShowNotifications(false)
              }}
            >
              Preferences
            </Button>

            <ThemeToggle />

            <UserMenu user={user} onSignOut={handleSignOut} />
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobile && showMobileMenu && (
        <div className="fixed inset-0 z-30 bg-background pt-16">
          <div className="container flex flex-col gap-4 p-4">
            <div className="flex items-center gap-3 p-2 border-b pb-4 mb-2">
              <UserAvatar user={user} />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full rounded-full bg-muted pl-8" />
            </div>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                setShowNotifications(true)
                setShowMobileMenu(false)
              }}
            >
              Notifications
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                setShowPreferences(true)
                setShowMobileMenu(false)
              }}
            >
              Preferences
            </Button>

            <Button variant="outline" className="w-full justify-start" onClick={() => setShowMobileMenu(false)}>
              Close Menu
            </Button>

            <Button variant="destructive" className="w-full justify-start mt-4" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_300px]">
          {/* Feed */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary bg-clip-text text-transparent">
                Your Feed
              </h2>
              <div className="flex gap-2">
                <Button onClick={() => router.push("/new-post")} variant="highlight" className="rounded-full">
                  New Post
                </Button>
                <Button onClick={showNewNotification} variant="accent" className="rounded-full">
                  Simulate Notification
                </Button>
              </div>
            </div>

            <div className="space-y-8 animate-slide-up">
              {feedItems.map((item) => (
                <ContentCard key={item.id} item={item} onClick={() => handleCardClick(item.id)} />
              ))}
            </div>

            <div className="flex justify-center py-8">
              <Button variant="outline" className="rounded-full border-primary/30 text-primary hover:bg-primary/5">
                Load More
              </Button>
            </div>
          </div>

          {/* Sidebar - only visible on desktop */}
          <div className="hidden md:block">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-xl border bg-card p-6 shadow-soft animate-scale-in">
                <h3 className="mb-4 text-lg font-medium text-primary">Topics You Follow</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm" className="rounded-full">
                    Technology
                  </Button>
                  <Button variant="secondary" size="sm" className="rounded-full">
                    Health
                  </Button>
                  <Button variant="secondary" size="sm" className="rounded-full">
                    Finance
                  </Button>
                  <Button variant="secondary" size="sm" className="rounded-full">
                    Productivity
                  </Button>
                  <Button variant="secondary" size="sm" className="rounded-full">
                    Science
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-primary/30 text-primary hover:bg-primary/5"
                  >
                    + Add Topic
                  </Button>
                </div>
              </div>

              <div
                className="rounded-xl border bg-card p-6 shadow-soft animate-scale-in"
                style={{ animationDelay: "0.1s" }}
              >
                <h3 className="mb-4 text-lg font-medium text-primary">Suggested For You</h3>
                <div className="space-y-4">
                  <div className="flex gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-primary/5 cursor-pointer">
                    <div className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-primary-200 to-primary-300"></div>
                    <div>
                      <p className="font-medium">Machine Learning Basics</p>
                      <p className="text-sm text-muted-foreground">15 min read</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-primary/5 cursor-pointer">
                    <div className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-accent-light to-accent"></div>
                    <div>
                      <p className="font-medium">Home Office Setup Guide</p>
                      <p className="text-sm text-muted-foreground">8 min read</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-primary/5 cursor-pointer">
                    <div className="h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br from-highlight to-vibrant"></div>
                    <div>
                      <p className="font-medium">Mindfulness Techniques</p>
                      <p className="text-sm text-muted-foreground">12 min read</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Notification center */}
      {showNotifications && (
        <NotificationCenter notifications={notifications} onClose={() => setShowNotifications(false)} />
      )}

      {/* User preferences panel */}
      {showPreferences && <UserPreferences onClose={() => setShowPreferences(false)} />}

      {/* Content detail view */}
      {selectedContent !== null && (
        <ContentDetail content={feedItems.find((item) => item.id === selectedContent)!} onClose={closeContentDetail} />
      )}
    </div>
  )
}
