"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

interface ContentDetailProps {
  content: {
    id: number
    type: string
    title: string
    excerpt: string
    image: string
    author: string
    date: string
    likes?: number
    comments?: number
    duration?: string
    views?: string
    listens?: string
  }
  onClose: () => void
}

export function ContentDetail({ content, onClose }: ContentDetailProps) {
  const isMobile = useMobile()

  const fullContent = `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
    <h2>Key Insights</h2>
    
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    
    <ul>
      <li>Point one about this topic that's really important</li>
      <li>Another critical insight that readers should know</li>
      <li>A third element that completes the understanding</li>
    </ul>
    
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    
    <h2>Practical Applications</h2>
    
    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
    
    <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
  `
  const comments = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "This is exactly what I needed to read today. The insights about productivity techniques have already helped me reorganize my workflow.",
      date: "2 hours ago",
      likes: 12,
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "Great article! I'd add that taking regular breaks is also essential for maintaining high productivity levels throughout the day.",
      date: "Yesterday",
      likes: 8,
    },
    {
      id: 3,
      author: "Emma Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I've been implementing these strategies for the past week and have seen a noticeable improvement in my focus. Thanks for sharing!",
      date: "2 days ago",
      likes: 15,
    },
  ]

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h2 className="text-lg font-bold truncate">{content.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-4">
            <div className="relative aspect-video w-full mb-4">
              <Image
                src={content.image || "/placeholder.svg"}
                alt={content.title}
                fill
                className="rounded-lg object-cover"
              />
              {content.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="capitalize">
                  {content.type}
                </Badge>
                {content.duration && <span className="text-xs text-muted-foreground">{content.duration}</span>}
              </div>
              <h1 className="text-2xl font-bold mb-2">{content.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-muted"></div>
                <div>
                  <div className="text-sm font-medium">{content.author}</div>
                  <div className="text-xs text-muted-foreground">{content.date}</div>
                </div>
              </div>
            </div>

            <div
              className="prose prose-sm dark:prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: fullContent }}
            />

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Comments</h3>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="rounded-lg border p-4">
                    <div className="flex gap-3">
                      <Image
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.author}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{comment.author}</h4>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="mt-1 text-sm">{comment.content}</p>
                        <div className="mt-2 flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                            Like ({comment.likes})
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-full items-center justify-center">
        <div className="relative w-full max-w-4xl rounded-xl border bg-card shadow-medium animate-scale-in overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/40"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-square">
              <Image
                src={content.image || "/placeholder.svg"}
                alt={content.title}
                fill
                className="rounded-l-lg object-cover"
              />
              {content.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white transition-transform duration-300 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-gradient-to-br from-transparent to-primary-50/30 dark:from-transparent dark:to-primary-900/10">
              <ScrollArea className="h-[600px] pr-4">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="capitalize bg-primary/10 text-primary border-primary/20">
                      {content.type}
                    </Badge>
                    {content.duration && <span className="text-xs text-muted-foreground">{content.duration}</span>}
                  </div>
                  <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-primary bg-clip-text text-transparent">
                    {content.title}
                  </h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-300 to-primary-400"></div>
                    <div>
                      <div className="text-sm font-medium">{content.author}</div>
                      <div className="text-xs text-muted-foreground">{content.date}</div>
                    </div>
                  </div>
                </div>

                <div
                  className="prose prose-sm dark:prose-invert max-w-none mb-8 prose-headings:text-primary prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: fullContent }}
                />

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4 text-primary">Comments</h3>
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="rounded-lg border p-4 transition-all duration-200 hover:shadow-soft hover:border-primary/20"
                      >
                        <div className="flex gap-3">
                          <Image
                            src={comment.avatar || "/placeholder.svg"}
                            alt={comment.author}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{comment.author}</h4>
                              <span className="text-xs text-muted-foreground">{comment.date}</span>
                            </div>
                            <p className="mt-1 text-sm">{comment.content}</p>
                            <div className="mt-2 flex items-center gap-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs rounded-full hover:bg-primary/10 hover:text-primary"
                              >
                                Like ({comment.likes})
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs rounded-full hover:bg-primary/10 hover:text-primary"
                              >
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
