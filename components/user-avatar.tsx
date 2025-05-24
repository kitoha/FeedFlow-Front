import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  name?: string | null
  email?: string | null
  image?: string | null
}

interface UserAvatarProps {
  user: User
  size?: "sm" | "md" | "lg"
}

export function UserAvatar({ user, size = "md" }: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  }

  return (
    <Avatar
      className={`${sizeClasses[size]} border-2 border-primary/20 transition-all duration-300 hover:border-primary/50`}
    >
      <AvatarImage src={user.image || ""} alt={user.name || "User"} className="object-cover" />
      <AvatarFallback className="bg-primary-100 text-primary-700">
        {user.name ? getInitials(user.name) : "U"}
      </AvatarFallback>
    </Avatar>
  )
}
