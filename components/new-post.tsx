"use client"

import { useState, useRef, type DragEvent, type ChangeEvent } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UserAvatar } from "@/components/user-avatar"

interface UploadedImage {
  file: File
  preview: string
  id: string
}

export function NewPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [postType, setPostType] = useState("article")
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock user data (in a real app, this would come from the authentication provider)
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    image: "/placeholder.svg?height=40&width=40",
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    if (uploadedImages.length + imageFiles.length > 3) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      return
    }

    const newImages: UploadedImage[] = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    }))

    setUploadedImages((prev) => [...prev, ...newImages])
  }

  const removeImage = (id: string) => {
    setUploadedImages((prev) => {
      const updated = prev.filter((img) => img.id !== id)
      // Clean up object URLs to prevent memory leaks
      const removed = prev.find((img) => img.id === id)
      if (removed) {
        URL.revokeObjectURL(removed.preview)
      }
      return updated
    })
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim() || uploadedImages.length === 0) {
      alert("Please fill in all required fields and upload at least one image.")
      return
    }

    setIsPublishing(true)

    try {
      // Upload images to storage
      const uploadPromises = uploadedImages.map(async (image) => {
        const formData = new FormData()
        formData.append("file", image.file)

        const response = await axios.post("/api/v1/storage/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        return response.data.url
      })

      const imageUrls = await Promise.all(uploadPromises)

      // Create post with image URLs and post data
      await axios.post("/api/v1/posts", {
        title,
        content,
        type: postType,
        imageUrls,
        author: user.name,
        date: new Date().toISOString(),
      })

      // Reset form
      setTitle("")
      setContent("")
      setPostType("article")
      setUploadedImages([])

      // Clean up object URLs
      uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview))

      alert("Post published successfully!")
    } catch (error) {
      console.error("Error publishing post:", error)
      alert("Failed to publish post. Please try again.")
    } finally {
      setIsPublishing(false)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const isFormValid = title.trim() && content.trim() && uploadedImages.length > 0

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary bg-clip-text text-transparent">
            Create New Post
          </h1>
          <p className="text-muted-foreground">Share your thoughts and ideas with the community</p>
        </div>

        {showAlert && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg animate-pulse">
            <span className="block sm:inline">You can upload up to 3 images</span>
          </div>
        )}

        <div className="bg-card rounded-xl shadow-soft overflow-hidden border border-border/40">
          <div className="bg-muted/30 px-6 py-4 border-b flex items-center gap-3">
            <UserAvatar user={user} />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">Posting as yourself</p>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="post-type">Post Type</Label>
                <RadioGroup
                  value={postType}
                  onValueChange={setPostType}
                  className="flex flex-wrap gap-4"
                  id="post-type"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="article" id="article" />
                    <Label htmlFor="article" className="cursor-pointer">
                      Article
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video" className="cursor-pointer">
                      Video
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="podcast" id="podcast" />
                    <Label htmlFor="podcast" className="cursor-pointer">
                      Podcast
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[150px] focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label>Images</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    className={`
                      relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
                      ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-gray-300 hover:border-primary/40 hover:bg-muted/50"
                      }
                      ${uploadedImages.length >= 3 ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={uploadedImages.length < 3 ? openFileDialog : undefined}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={uploadedImages.length >= 3}
                    />

                    <div className="space-y-2">
                      <svg
                        className="mx-auto h-12 w-12 text-muted-foreground"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-muted-foreground">
                        <p className="text-sm font-medium">
                          {uploadedImages.length >= 3 ? "Maximum images reached" : "Drag and drop images here"}
                        </p>
                        {uploadedImages.length < 3 && (
                          <p className="text-xs mt-1">or click to browse ({uploadedImages.length}/3)</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    {uploadedImages.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="relative group">
                            <img
                              src={image.preview || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-24 object-cover rounded-lg border border-border"
                            />
                            <button
                              onClick={() => removeImage(image.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                            >
                              ×
                            </button>
                          </div>
                        ))}
            
                        {Array.from({ length: 3 - uploadedImages.length }).map((_, index) => (
                          <div
                            key={`empty-${index}`}
                            className="w-full h-24 border-2 border-dashed border-muted rounded-lg flex items-center justify-center"
                          >
                            <span className="text-muted-foreground text-xs">Empty</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                        <p className="text-muted-foreground text-sm">No images uploaded yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                onClick={handlePublish}
                disabled={!isFormValid || isPublishing}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${
                    isFormValid && !isPublishing
                      ? "bg-gradient-to-r from-primary to-primary-600 hover:shadow-md hover:translate-y-[-1px]"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }
                `}
              >
                {isPublishing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Publishing...</span>
                  </div>
                ) : (
                  "Publish Post"
                )}
              </Button>
            </div>
          </div>
        </div>

        {title && content && uploadedImages.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Post Preview</h2>
            <div className="bg-card rounded-xl shadow-soft overflow-hidden border border-border/40">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
                <div className="relative aspect-video md:aspect-square">
                  <img
                    src={uploadedImages[0].preview || "/placeholder.svg"}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  {postType === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary capitalize">
                      {postType}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground line-clamp-3">{content}</p>

                  <div className="mt-4 flex items-center gap-2">
                    <UserAvatar user={user} size="sm" />
                    <div>
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">Just now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
