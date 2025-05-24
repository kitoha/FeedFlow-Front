"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    const publicRoutes = ["/login"]

    const authRoutes = ["/login"]
    
    router.push("/")
  }, [router, pathname])

  return <>{children}</>
}
