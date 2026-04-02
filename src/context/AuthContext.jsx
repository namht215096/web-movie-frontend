import { createContext, useContext, useState, useEffect } from 'react'
import { loginApi, registerApi } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // chờ khôi phục session

  // Khôi phục user từ localStorage khi app khởi động
  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  // Đăng nhập: gọi API rồi lưu vào state + localStorage
  const login = async (email, password) => {
    const userData = await loginApi({ email, password })
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return userData
  }

  // Đăng ký: gọi API tạo tài khoản rồi tự động đăng nhập
  const register = async (name, email, password) => {
    const userData = await registerApi({ name, email, password })
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return userData
  }

  // Đăng xuất
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
