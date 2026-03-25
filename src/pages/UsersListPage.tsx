import { useEffect, useState } from 'react'
import { ArrowRight, Filter, Search, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { AppShell, AvatarBadge, Button, EmptyState, StatusPill, Surface } from '../components/ui'
import { ApiError } from '../services/apiClient'
import { fetchUsers } from '../services/userRepository'
import type { StatusTone } from '../types/app'
import type { User, UserStatus } from '../types/user'

const statusMap: Record<UserStatus, { label: string; tone: StatusTone }> = {
  active: { label: 'Ativo', tone: 'success' },
  pending: { label: 'Em analise', tone: 'warning' },
  inactive: { label: 'Inativo', tone: 'neutral' }
}

export function UsersListPage() {
  const { logout, token } = useAuth()
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    if (!token) {
      setIsLoading(false)
      setErrorMessage('Sessão ausente. Faça login novamente.')
      return () => {
        isMounted = false
      }
    }

    setIsLoading(true)
    setErrorMessage(null)

    fetchUsers({ query, token })
      .then((result) => {
        if (!isMounted) {
          return
        }

        setUsers(result)
        setIsLoading(false)
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return
        }

        if (error instanceof ApiError && error.statusCode === 401) {
          void logout()
          return
        }

        setErrorMessage(error instanceof Error ? error.message : 'Não foi possível carregar os usuários.')
        setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [query, token, logout])

  const activeUsers = users.filter((user) => user.status === 'active').length

  return (
    <AppShell
      eyebrow="Usuarios"
      title="Base de usuarios navegavel"
      description="Mock operacional para acompanhar clientes e parceiros em uma linguagem visual urbana, sóbria e pronta para evoluir para API real."
      actions={
        <>
          <Button variant="secondary">
            <Filter size={16} aria-hidden="true" />
            Filtrar
          </Button>
          <Button>
            <Users size={16} aria-hidden="true" />
            Novo usuario
          </Button>
        </>
      }
      sidebarExtra={
        <Surface className="sidebar-card" as="div">
          <p>Usuarios monitorados</p>
          <strong>{String(users.length || 4).padStart(2, '0')}</strong>
          <span>{activeUsers || 2} perfis ativos com interacao recente no fluxo mockado.</span>
        </Surface>
      }
    >
      <section className="users-overview">
        <Surface className="stat-card" as="article">
          <span>Perfis ativos</span>
          <strong>{activeUsers}</strong>
          <StatusPill tone="success">Base aquecida</StatusPill>
        </Surface>
        <Surface className="stat-card" as="article">
          <span>Em onboarding</span>
          <strong>{users.filter((user) => user.status === 'pending').length}</strong>
          <StatusPill tone="warning">Revisao aberta</StatusPill>
        </Surface>
        <Surface className="stat-card" as="article">
          <span>Sem pedidos ativos</span>
          <strong>{users.filter((user) => user.openOrders === 0).length}</strong>
          <StatusPill tone="neutral">Reengajar</StatusPill>
        </Surface>
      </section>

      <Surface className="panel users-panel" as="section">
        <div className="panel-header users-panel-header">
          <div>
            <span className="section-kicker">Listagem</span>
            <h2>Usuarios da operacao</h2>
            <p>Navegue entre perfis, consulte status e avance para o detalhe sem depender de backend real.</p>
          </div>

          <label className="searchbox users-searchbox" aria-label="Buscar usuarios">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              placeholder="Buscar por nome, empresa, ID ou cidade"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        {isLoading ? (
          <div className="user-list" aria-live="polite">
            {Array.from({ length: 4 }).map((_, index) => (
              <article key={index} className="user-row is-skeleton">
                <div className="user-row-main">
                  <span className="skeleton-avatar" aria-hidden="true" />
                  <div className="user-row-copy">
                    <span className="skeleton-line wide" aria-hidden="true" />
                    <span className="skeleton-line" aria-hidden="true" />
                  </div>
                </div>
                <span className="skeleton-line short" aria-hidden="true" />
              </article>
            ))}
          </div>
        ) : errorMessage ? (
          <EmptyState
            title="Falha ao carregar usuários"
            description={errorMessage}
            action={
              <Button variant="secondary" onClick={() => setQuery((currentQuery) => currentQuery.trim())}>
                Tentar novamente
              </Button>
            }
          />
        ) : users.length === 0 ? (
          <EmptyState
            title="Nenhum usuario encontrado"
            description="Ajuste o termo de busca para testar o estado vazio. A camada de dados segue pronta para futura troca por API."
            action={
              <Button variant="secondary" onClick={() => setQuery('')}>
                Limpar busca
              </Button>
            }
          />
        ) : (
          <div className="user-list">
            {users.map((user) => {
              const status = statusMap[user.status]

              return (
                <Link key={user.slug} to={`/users/${user.slug}`} className="user-row-link">
                  <article className="user-row">
                    <div className="user-row-main">
                      <AvatarBadge name={user.fullName} tone={user.avatarTone} />
                      <div className="user-row-copy">
                        <div className="user-row-heading">
                          <h3>{user.fullName}</h3>
                          <StatusPill tone={status.tone}>{status.label}</StatusPill>
                        </div>
                        <p>
                          {user.role} · {user.company}
                        </p>
                        <div className="user-row-meta">
                          <span>{user.id}</span>
                          <span>{user.email}</span>
                          <span>{user.city}</span>
                        </div>
                      </div>
                    </div>

                    <div className="user-row-side">
                      <strong>{user.openOrders} pedidos</strong>
                      <span>{user.lifetimeValue}</span>
                      <span>{user.responseExpectation}</span>
                    </div>

                    <span className="user-row-cta">
                      Ver detalhe
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </Surface>
    </AppShell>
  )
}
