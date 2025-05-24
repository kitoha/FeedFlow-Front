"use client"

import { useState } from "react"
import Image from "next/image"
import { BookmarkIcon, Heart, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ContentCardProps {
  item: {
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
  onClick: () => void
}

export function ContentCard({ item, onClick }: ContentCardProps) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-medium rounded-xl border border-border/40 hover:border-primary/20">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
        <div className="relative aspect-video md:aspect-square">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            onClick={onClick}
          />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white transition-transform duration-300 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
          {item.type === "podcast" && (
            <div className="absolute bottom-2 right-2">
              <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-white">
                {item.duration}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <CardHeader className="cursor-pointer space-y-3" onClick={onClick}>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize bg-primary/5 text-primary border-primary/20">
                {item.type}
              </Badge>
              {item.duration && <span className="text-xs text-muted-foreground">{item.duration}</span>}
            </div>
            <h3 className="mt-2 text-xl font-bold leading-tight transition-colors duration-200 hover:text-primary">
              {item.title}
            </h3>
          </CardHeader>

          <CardContent className="cursor-pointer" onClick={onClick}>
            <p className="text-muted-foreground">{item.excerpt}</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary-300 to-primary-400"></div>
              <span className="text-sm font-medium">{item.author}</span>
              <span className="text-xs text-muted-foreground">• {item.date}</span>
            </div>
          </CardContent>

          <CardFooter className="mt-auto border-t pt-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 px-2 transition-colors duration-200 hover:text-primary"
                  onClick={() => setLiked(!liked)}
                >
                  <Heart
                    className={`h-4 w-4 transition-all duration-300 ${liked ? "fill-vibrant text-vibrant scale-110" : ""}`}
                  />
                  <span>{liked ? (item.likes || 0) + 1 : item.likes}</span>
                </Button>

                {item.comments !== undefined && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 px-2 transition-colors duration-200 hover:text-primary"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{item.comments}</span>
                  </Button>
                )}

                {item.views && <span className="text-xs text-muted-foreground">{item.views} views</span>}

                {item.listens && <span className="text-xs text-muted-foreground">{item.listens} listens</span>}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full transition-transform hover:scale-110 hover:bg-primary/10 hover:text-primary"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full transition-transform hover:scale-110 hover:bg-primary/10 hover:text-primary"
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  <BookmarkIcon
                    className={`h-4 w-4 transition-all duration-300 ${bookmarked ? "fill-accent text-accent scale-110" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
