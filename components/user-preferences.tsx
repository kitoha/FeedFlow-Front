"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMobile } from "@/hooks/use-mobile"

interface UserPreferencesProps {
  onClose: () => void
}

export function UserPreferences({ onClose }: UserPreferencesProps) {
  const isMobile = useMobile()
  const [contentDensity, setContentDensity] = useState(50)

  const topics = [
    { id: 1, name: "Technology", selected: true },
    { id: 2, name: "Health & Wellness", selected: true },
    { id: 3, name: "Business", selected: true },
    { id: 4, name: "Science", selected: false },
    { id: 5, name: "Arts & Culture", selected: false },
    { id: 6, name: "Travel", selected: true },
    { id: 7, name: "Food", selected: false },
    { id: 8, name: "Sports", selected: false },
    { id: 9, name: "Entertainment", selected: true },
    { id: 10, name: "Politics", selected: false },
    { id: 11, name: "Education", selected: true },
    { id: 12, name: "Personal Finance", selected: true },
  ]

  const [selectedTopics, setSelectedTopics] = useState(topics)

  const toggleTopic = (id: number) => {
    setSelectedTopics(
      selectedTopics.map((topic) => (topic.id === id ? { ...topic, selected: !topic.selected } : topic)),
    )
  }

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h2 className="text-lg font-bold">Preferences</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-4">
            <Tabs defaultValue="content">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="mt-4 space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Topics</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedTopics.map((topic) => (
                      <Button
                        key={topic.id}
                        variant={topic.selected ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => toggleTopic(topic.id)}
                      >
                        {topic.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium">Content Density</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Compact</span>
                      <span>Comfortable</span>
                    </div>
                    <Slider
                      value={[contentDensity]}
                      onValueChange={(value) => setContentDensity(value[0])}
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium">Content Filters</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="filter-explicit">Filter explicit content</Label>
                      <Switch id="filter-explicit" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="filter-politics">Show political content</Label>
                      <Switch id="filter-politics" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="filter-sensitive">Show sensitive topics</Label>
                      <Switch id="filter-sensitive" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notifications" className="mt-4 space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-comments">Comments on your posts</Label>
                      <Switch id="notify-comments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-mentions">Mentions</Label>
                      <Switch id="notify-mentions" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-follows">New followers</Label>
                      <Switch id="notify-follows" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-recommendations">Content recommendations</Label>
                      <Switch id="notify-recommendations" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-newsletter">Weekly newsletter</Label>
                      <Switch id="notify-newsletter" defaultChecked />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="appearance" className="mt-4 space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Display Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoplay-videos">Autoplay videos</Label>
                      <Switch id="autoplay-videos" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="reduce-animations">Reduce animations</Label>
                      <Switch id="reduce-animations" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="high-contrast">High contrast mode</Label>
                      <Switch id="high-contrast" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 animate-in slide-in-from-right duration-300 md:w-96">
      <div className="flex h-full flex-col border-l bg-background shadow-xl">
        <div className="flex h-16 items-center justify-between border-b px-4 bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent">
          <h2 className="text-lg font-bold text-primary">Preferences</h2>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-6">
            <Tabs defaultValue="content">
              <TabsList className="grid w-full grid-cols-3 rounded-full p-1 bg-muted">
                <TabsTrigger
                  value="content"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Appearance
                </TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="mt-6 space-y-8 animate-slide-up">
                <div>
                  <h3 className="mb-4 text-lg font-medium text-primary">Topics</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedTopics.map((topic) => (
                      <Button
                        key={topic.id}
                        variant={topic.selected ? "default" : "outline"}
                        className={`justify-start rounded-lg transition-all duration-200 ${topic.selected ? "" : "border-primary/30 text-primary hover:bg-primary/5"}`}
                        onClick={() => toggleTopic(topic.id)}
                      >
                        {topic.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium text-primary">Content Density</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Compact</span>
                      <span>Comfortable</span>
                    </div>
                    <Slider
                      value={[contentDensity]}
                      onValueChange={(value) => setContentDensity(value[0])}
                      max={100}
                      step={1}
                      className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-accent"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium text-primary">Content Filters</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200">
                      <Label htmlFor="filter-explicit">Filter explicit content</Label>
                      <Switch id="filter-explicit" defaultChecked className="data-[state=checked]:bg-primary" />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200">
                      <Label htmlFor="filter-politics">Show political content</Label>
                      <Switch id="filter-politics" className="data-[state=checked]:bg-primary" />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200">
                      <Label htmlFor="filter-sensitive">Show sensitive topics</Label>
                      <Switch id="filter-sensitive" className="data-[state=checked]:bg-primary" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notifications" className="mt-6 space-y-8">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-comments">Comments on your posts</Label>
                      <Switch id="notify-comments" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-mentions">Mentions</Label>
                      <Switch id="notify-mentions" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-follows">New followers</Label>
                      <Switch id="notify-follows" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-recommendations">Content recommendations</Label>
                      <Switch id="notify-recommendations" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-newsletter">Weekly newsletter</Label>
                      <Switch id="notify-newsletter" defaultChecked />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="appearance" className="mt-6 space-y-8">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Display Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoplay-videos">Autoplay videos</Label>
                      <Switch id="autoplay-videos" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="reduce-animations">Reduce animations</Label>
                      <Switch id="reduce-animations" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="high-contrast">High contrast mode</Label>
                      <Switch id="high-contrast" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
        <div className="border-t p-4 bg-gradient-to-r from-transparent to-primary-50/50 dark:from-transparent dark:to-primary-900/10">
          <Button className="w-full rounded-lg bg-gradient-to-r from-primary to-primary-600">Save Preferences</Button>
        </div>
      </div>
    </div>
  )
}
