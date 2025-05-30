import { getAuthHeader } from "./auth"

const API_BASE_URL = "http://localhost:8080/api/v1"

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean
}

export async function fetchApi(endpoint: string, options: FetchOptions = {}) {
  const { requiresAuth = true, headers = {}, ...restOptions } = options

  const authHeader = requiresAuth ? getAuthHeader() : {}
  const finalHeaders = {
    "Content-Type": "application/json",
    ...authHeader,
    ...headers,
  } as HeadersInit

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: finalHeaders,
    ...restOptions,
  })

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