'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI } from '@/lib/api'
import { User } from '@/types'

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login:  (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isDoctor: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null)
  const [token,   setToken]   = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser  = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const res = await authAPI.login({ email, password })
    const { token: t, ...userData } = res.data
    localStorage.setItem('token', t)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(t)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user, token, loading, login, logout,
      isAuthenticated: !!token,
      isDoctor: user?.role === 'doctor',
      isAdmin:  user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
