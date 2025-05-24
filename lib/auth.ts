// 토큰 저장
export const saveToken = (token: string, tokenType: string) => {
    localStorage.setItem("auth_token", token)
    localStorage.setItem("token_type", tokenType)
  }
  
  // 토큰 가져오기
  export const getToken = () => {
    return {
      token: localStorage.getItem("auth_token"),
      tokenType: localStorage.getItem("token_type"),
    }
  }
  
  // 인증 헤더 생성
  export const getAuthHeader = () => {
    const { token, tokenType } = getToken()
    if (token && tokenType) {
      return { Authorization: `${tokenType} ${token}` }
    }
    return {}
  }
  
  // 로그인 상태 확인
  export const isAuthenticated = () => {
    const { token } = getToken()
    return !!token
  }
  
  // 로그아웃
  export const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("token_type")
  }
  
  // JWT 토큰에서 사용자 정보 추출 (간단한 구현)
  export const getUserFromToken = () => {
    const { token } = getToken()
    if (!token) return null
  
    try {
      // JWT는 header.payload.signature 형태로 구성됨
      const base64Url = token.split(".")[1]
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      const payload = JSON.parse(window.atob(base64))
  
      return {
        id: payload.sub,
        // 실제 구현에서는 토큰에 포함된 사용자 정보에 따라 조정
        name: payload.name || "User",
        email: payload.email || "",
        image: payload.picture || "/placeholder.svg?height=40&width=40",
      }
    } catch (error) {
      console.error("Failed to parse JWT token", error)
      return null
    }
  }
  