import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'
import { fetchAuthenticatedUser, login as loginRequest, logout as logoutRequest } from '../services/authRepository'
import { ApiError } from '../services/apiClient'
import type { AuthUser, LoginCredentials } from '../types/auth'

const AUTH_STORAGE_KEY = 'acode_aqui_dev_token'

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

interface AuthContextValue {
  status: AuthStatus
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const storedToken = window.localStorage.getItem(AUTH_STORAGE_KEY)

    if (!storedToken) {
      setStatus('unauthenticated')
      return
    }

    void fetchAuthenticatedUser(storedToken)
      .then((authenticatedUser) => {
        setToken(storedToken)
        setUser(authenticatedUser)
        setStatus('authenticated')
      })
      .catch((error) => {
        if (error instanceof ApiError && error.statusCode !== 401 && error.statusCode !== 403) {
          setStatus('unauthenticated')
          return
        }

        window.localStorage.removeItem(AUTH_STORAGE_KEY)
        setToken(null)
        setUser(null)
        setStatus('unauthenticated')
      })
  }, [])

  async function login(credentials: LoginCredentials) {
    setStatus('loading')
    const session = await loginRequest(credentials)

    window.localStorage.setItem(AUTH_STORAGE_KEY, session.token)
    setToken(session.token)
    setUser(session.user)
    setStatus('authenticated')
  }

  async function logout() {
    if (token) {
      try {
        await logoutRequest(token)
      } catch {
        // O fallback local garante encerramento da sessão mesmo se a API estiver indisponível.
      }
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    setToken(null)
    setUser(null)
    setStatus('unauthenticated')
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      token,
      user,
      isAuthenticated: status === 'authenticated',
      login,
      logout
    }),
    [status, token, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
