"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { UserAvatar } from "@/components/user-avatar"
import { isAuthenticated, getUserFromToken } from "@/lib/auth"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [contentPreferences, setContentPreferences] = useState<string[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }

    const userInfo = getUserFromToken()
    setUser(
      userInfo || {
        name: "User",
        email: "",
        image: "/placeholder.svg?height=80&width=80",
      },
    )
  }, [router])

  const topics = [
    "Technology",
    "Health & Wellness",
    "Business",
    "Science",
    "Arts & Culture",
    "Travel",
    "Food",
    "Sports",
    "Entertainment",
    "Politics",
    "Education",
    "Personal Finance",
  ]

  const contentTypes = [
    "Articles",
    "Videos",
    "Podcasts",
    "Infographics",
    "Case Studies",
    "Tutorials",
    "News",
    "Reviews",
  ]

  const handleTopicToggle = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic))
    } else {
      setSelectedTopics([...selectedTopics, topic])
    }
  }

  const handleContentToggle = (type: string) => {
    if (contentPreferences.includes(type)) {
      setContentPreferences(contentPreferences.filter((t) => t !== type))
    } else {
      setContentPreferences([...contentPreferences, type])
    }
  }

  const nextStep = () => {
    if (step === 1) {
      setStep(2)
      setProgress(66)
    } else if (step === 2) {
      setStep(3)
      setProgress(100)
    } else {
      localStorage.setItem("onboarded", "true")

      localStorage.setItem("user_topics", JSON.stringify(selectedTopics))
      localStorage.setItem("user_content_preferences", JSON.stringify(contentPreferences))

      router.push("/")
    }
  }

  const prevStep = () => {
    if (step === 2) {
      setStep(1)
      setProgress(33)
    } else if (step === 3) {
      setStep(2)
      setProgress(66)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background to-primary-50/30 dark:from-background dark:to-primary-900/10 p-4">
      <div className="w-full max-w-2xl">
        <Card className="border border-border/40 shadow-medium rounded-xl overflow-hidden">
          <CardHeader className="text-center pb-2 border-b">
            <div className="flex items-center justify-center mb-4">
              <UserAvatar user={user} size="lg" />
            </div>
            <CardTitle className="text-2xl">Welcome to FeedFlow, {user.name.split(" ")[0]}!</CardTitle>
            <CardDescription>Let's personalize your experience in a few quick steps</CardDescription>
          </CardHeader>

          <div className="px-6 pt-6">
            <Progress value={progress} className="h-2 bg-muted" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span className={step >= 1 ? "text-primary font-medium" : ""}>Interests</span>
              <span className={step >= 2 ? "text-primary font-medium" : ""}>Content Types</span>
              <span className={step >= 3 ? "text-primary font-medium" : ""}>All Set</span>
            </div>
          </div>

          <CardContent className="pt-6 pb-8 min-h-[400px]">
            {step === 1 && (
              <div className="space-y-4 animate-slide-up">
                <h3 className="text-lg font-medium text-primary">What topics interest you?</h3>
                <p className="text-sm text-muted-foreground">
                  Select at least 3 topics to help us personalize your feed
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                  {topics.map((topic) => (
                    <Button
                      key={topic}
                      variant={selectedTopics.includes(topic) ? "default" : "outline"}
                      className={`justify-start rounded-lg transition-all duration-200 ${
                        selectedTopics.includes(topic) ? "" : "border-primary/30 text-primary hover:bg-primary/5"
                      }`}
                      onClick={() => handleTopicToggle(topic)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-slide-up">
                <h3 className="text-lg font-medium text-primary">What type of content do you prefer?</h3>
                <p className="text-sm text-muted-foreground">Select the content formats you enjoy most</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                  {contentTypes.map((type) => (
                    <Button
                      key={type}
                      variant={contentPreferences.includes(type) ? "default" : "outline"}
                      className={`justify-start rounded-lg transition-all duration-200 ${
                        contentPreferences.includes(type) ? "" : "border-primary/30 text-primary hover:bg-primary/5"
                      }`}
                      onClick={() => handleContentToggle(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center animate-slide-up">
                <div className="py-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-medium text-primary">You're all set!</h3>
                  <p className="text-muted-foreground mt-2">
                    We've personalized your feed based on your preferences.
                    <br />
                    You can always update these in your account settings.
                  </p>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Your selected topics:</h4>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {selectedTopics.map((topic) => (
                      <span key={topic} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <h4 className="font-medium mb-2 mt-4">Your content preferences:</h4>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {contentPreferences.map((type) => (
                      <span key={type} className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between border-t bg-muted/30 px-6 py-4">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={prevStep}
                className="rounded-lg border-primary/30 text-primary hover:bg-primary/5"
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}

            <Button onClick={nextStep} disabled={step === 1 && selectedTopics.length < 3} className="rounded-lg">
              {step === 3 ? "Go to my feed" : "Continue"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
