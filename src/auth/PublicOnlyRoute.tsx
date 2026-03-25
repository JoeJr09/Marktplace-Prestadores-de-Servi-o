import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

interface PublicOnlyRouteProps {
  children: ReactNode
}

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { status } = useAuth()

  if (status === 'loading') {
    return null
  }

  if (status === 'authenticated') {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
