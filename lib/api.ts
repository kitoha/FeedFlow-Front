import { getAuthHeader, saveToken, logout } from "./auth"

export const API_BASE_URL = "http://localhost:8080/api/v1"

export const API_ENDPOINTS = {
  AUTH: {
    TOKEN: "/auth/token",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
} as const

export interface ApiError extends Error {
  status?: number
  code?: string
}

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean
}

async function refreshAccessToken() {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include", // refreshToken 쿠키 자동 전송
  })
  if (!res.ok) {
    throw new Error("refreshToken expired")
  }
  const data = await res.json()
  if (data.accessToken) {
    saveToken(data.accessToken, "Bearer")
    return data.accessToken
  }
  throw new Error("No accessToken returned")
}

export async function fetchApi(endpoint: string, options: FetchOptions = {}, _retry = false) {
  const { requiresAuth = true, headers = {}, ...restOptions } = options

  const authHeader = requiresAuth ? getAuthHeader() : {}
  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...(authHeader as Record<string, string>),
    ...(headers as Record<string, string>),
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: finalHeaders,
    ...restOptions,
  })

  if (requiresAuth && response.status === 401 && !_retry) {
    try {
      await refreshAccessToken()
      const newAuthHeader = getAuthHeader()
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...(newAuthHeader as Record<string, string>),
          ...(headers as Record<string, string>),
        },
        ...restOptions,
      })
    } catch (e) {
      logout()
      window.location.href = "/login"
      throw new Error("로그인 세션이 만료되었습니다. 다시 로그인해주세요.")
    }
  }

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.statusText}`)
  }

  return response.json()
}

export const get = (endpoint: string, options: FetchOptions = {}) => {
  return fetchApi(endpoint, { ...options, method: "GET" })
}

export const post = (endpoint: string, data: any, options: FetchOptions = {}) => {
  return fetchApi(endpoint, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const put = (endpoint: string, data: any, options: FetchOptions = {}) => {
  return fetchApi(endpoint, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export const del = (endpoint: string, options: FetchOptions = {}) => {
  return fetchApi(endpoint, { ...options, method: "DELETE" })
}
