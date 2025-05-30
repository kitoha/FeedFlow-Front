export const saveToken = (token: string, tokenType: string) => {
    localStorage.setItem("auth_token", token)
    localStorage.setItem("token_type", tokenType)
  }

  export const getToken = () => {
    return {
      token: localStorage.getItem("auth_token"),
      tokenType: localStorage.getItem("token_type"),
    }
  }

  export const getAuthHeader = () => {
    const { token, tokenType } = getToken()
    if (token && tokenType) {
      return { Authorization: `${tokenType} ${token}` } as const
    }
    return {} as const
  }
  
  export const isAuthenticated = () => {
    const { token } = getToken()
    return !!token
  }

  export const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("token_type")
  }
  
  export const getUserFromToken = () => {
    const { token } = getToken()
    if (!token) return null
  
    try {
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      const payload = JSON.parse(window.atob(base64))
  
      return {
        id: payload.sub,
        name: payload.name || "User",
        email: payload.email || "",
        image: payload.picture || "/placeholder.svg?height=40&width=40",
      }
    } catch (error) {
      console.error("Failed to parse JWT token", error)
      return null
    }
  }
  