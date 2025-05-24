"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMobile } from "@/hooks/use-mobile"

interface Notification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
}

interface NotificationCenterProps {
  notifications: Notification[]
  onClose: () => void
}

export function NotificationCenter({ notifications, onClose }: NotificationCenterProps) {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <h2 className="text-lg font-bold">Notifications</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-4">
            {notifications.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center text-center">
                <p className="text-muted-foreground">No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className="fixed right-4 top-16 z-50 w-80 animate-in fade-in slide-in-from-top-5 duration-300">
      <div className="rounded-xl border bg-card shadow-medium overflow-hidden">
        <div className="flex items-center justify-between border-b p-4 bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent">
          <h2 className="font-semibold text-primary">Notifications</h2>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="p-4">
            {notifications.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center text-center">
                <p className="text-muted-foreground">No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-2 bg-gradient-to-r from-transparent to-primary-50/50 dark:from-transparent dark:to-primary-900/10">
          <Button variant="ghost" className="w-full rounded-lg text-primary hover:bg-primary/10" size="sm">
            Mark all as read
          </Button>
        </div>
      </div>
    </div>
  )
}

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <div
      className={`rounded-lg p-3 transition-all duration-200 hover:shadow-soft ${notification.read ? "bg-card" : "bg-primary/5"}`}
    >
      <div className="flex justify-between gap-2">
        <h3 className="font-medium">{notification.title}</h3>
        {!notification.read && <div className="h-2 w-2 rounded-full bg-primary animate-pulse-subtle"></div>}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{notification.time}</span>
        {!notification.read && (
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs rounded-full text-primary hover:bg-primary/10">
            Mark as read
          </Button>
        )}
      </div>
    </div>
  )
}
