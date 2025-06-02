"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { saveToken } from "@/lib/auth"
import { API_BASE_URL, API_ENDPOINTS, ApiError } from "@/lib/api"

interface TokenResponse {
  accessToken: string
  tokenType?: string
}

export default function LoginSuccessPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.TOKEN}`, {
          method: "POST",
          credentials: "include",
        })

        if (!res.ok) {
          const error = new Error("세션 만료 또는 인증 실패") as ApiError
          error.status = res.status
          throw error
        }

        const data = await res.json() as TokenResponse
        if (!data.accessToken) {
          throw new Error("토큰이 없습니다")
        }

        saveToken(data.accessToken, data.tokenType || "Bearer")
        const isFirstLogin = localStorage.getItem("onboarded") !== "true"
        router.push(isFirstLogin ? "/onboarding" : "/")
      } catch (err) {
        const error = err as ApiError
        setError(error.message || "로그인 세션이 만료되었습니다. 다시 시도해주세요.")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    }

    fetchToken()
  }, [router])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-lg font-bold text-destructive">{error}</div>
        <div className="mt-4 text-sm text-muted-foreground">로그인 페이지로 이동합니다...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-lg font-bold">로그인 중입니다...</div>
      <div className="mt-4 text-sm text-muted-foreground">잠시만 기다려주세요</div>
    </div>
  )
}
