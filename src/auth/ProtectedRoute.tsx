import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { Surface } from '../components/ui'
import { useAuth } from './AuthProvider'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status } = useAuth()

  if (status === 'loading') {
    return (
      <div className="route-loader">
        <Surface className="panel state-card" as="section">
          <div className="state-copy">
            <h2>Validando sessão</h2>
            <p>Conferindo autenticação antes de liberar o painel.</p>
          </div>
        </Surface>
      </div>
    )
  }

  if (status !== 'authenticated') {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
