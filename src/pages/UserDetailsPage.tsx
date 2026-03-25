import { useEffect, useState } from 'react'
import { Clock3, Mail, MapPin, Phone, ReceiptText } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { AppShell, AvatarBadge, BackLink, Button, EmptyState, StatusPill, Surface } from '../components/ui'
import { ApiError } from '../services/apiClient'
import { fetchUserBySlug } from '../services/userRepository'
import type { StatusTone } from '../types/app'
import type { User, UserStatus } from '../types/user'

const statusMap: Record<UserStatus, { label: string; tone: StatusTone }> = {
  active: { label: 'Ativo', tone: 'success' },
  pending: { label: 'Em analise', tone: 'warning' },
  inactive: { label: 'Inativo', tone: 'neutral' }
}

export function UserDetailsPage() {
  const { logout, token } = useAuth()
  const { userId = '' } = useParams<{ userId: string }>()
  const [user, setUser] = useState<User | null>(null)
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

    fetchUserBySlug(userId, token)
      .then((result) => {
        if (!isMounted) {
          return
        }

        setUser(result)
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

        setErrorMessage(error instanceof Error ? error.message : 'Não foi possível carregar o detalhe do usuário.')
        setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [userId, token, logout])

  if (isLoading) {
    return (
      <AppShell eyebrow="Usuarios" title="Carregando perfil" description="Buscando dados mockados do usuario selecionado.">
        <Surface className="panel state-card" as="section">
          <div className="state-icon skeleton-avatar" aria-hidden="true" />
          <div className="state-copy">
            <span className="skeleton-line wide" aria-hidden="true" />
            <span className="skeleton-line" aria-hidden="true" />
          </div>
        </Surface>
      </AppShell>
    )
  }

  if (!user) {
    return (
      <AppShell eyebrow="Usuarios" title="Usuario nao encontrado" description="O mock solicitado nao existe ou foi removido da colecao local.">
        <EmptyState
          title={errorMessage ? 'Falha ao carregar o usuário' : 'Nao foi possivel localizar este usuario'}
          description={
            errorMessage ??
            'Use a listagem para abrir um perfil valido. Esse fallback prepara a navegacao para futuros cenarios reais de erro 404.'
          }
          action={
            <Link to="/users" className="btn btn-primary">
              Voltar para a listagem
            </Link>
          }
        />
      </AppShell>
    )
  }

  const status = statusMap[user.status]

  return (
    <AppShell
      eyebrow="Usuarios"
      title="Detalhes do usuario"
      description="Visao completa do perfil mockado, com leitura clara de status, contato, contexto operacional e atividade recente."
      actions={<Button variant="secondary">Exportar resumo</Button>}
      sidebarExtra={
        <Surface className="sidebar-card" as="div">
          <p>Plano atual</p>
          <strong>{user.plan}</strong>
          <span>{user.openOrders} demandas abertas e acompanhamento no fluxo principal.</span>
        </Surface>
      }
    >
      <BackLink to="/users">Voltar para usuarios</BackLink>

      <section className="user-details-layout">
        <Surface className="panel user-hero" as="section">
          <div className="user-hero-main">
            <AvatarBadge name={user.fullName} tone={user.avatarTone} size="lg" />
            <div className="user-hero-copy">
              <div className="user-row-heading">
                <h2>{user.fullName}</h2>
                <StatusPill tone={status.tone}>{status.label}</StatusPill>
              </div>
              <p>
                {user.role} · {user.company}
              </p>
              <div className="user-tags">
                {user.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="user-contact-grid">
            <article className="detail-card">
              <Mail size={16} aria-hidden="true" />
              <div>
                <span>E-mail</span>
                <strong>{user.email}</strong>
              </div>
            </article>
            <article className="detail-card">
              <Phone size={16} aria-hidden="true" />
              <div>
                <span>Telefone</span>
                <strong>{user.phone}</strong>
              </div>
            </article>
            <article className="detail-card">
              <MapPin size={16} aria-hidden="true" />
              <div>
                <span>Localizacao</span>
                <strong>{user.city}</strong>
              </div>
            </article>
            <article className="detail-card">
              <Clock3 size={16} aria-hidden="true" />
              <div>
                <span>Ultimo acesso</span>
                <strong>{user.lastAccess}</strong>
              </div>
            </article>
          </div>
        </Surface>

        <div className="user-details-grid">
          <Surface className="panel" as="section">
            <div className="panel-header">
              <div>
                <span className="section-kicker">Perfil</span>
                <h2>Contexto operacional</h2>
                <p>{user.bio}</p>
              </div>
            </div>

            <div className="user-facts-grid">
              <div className="metric-card">
                <span>ID interno</span>
                <strong>{user.id}</strong>
              </div>
              <div className="metric-card">
                <span>Segmento</span>
                <strong>{user.segment}</strong>
              </div>
              <div className="metric-card">
                <span>Entrou em</span>
                <strong>{user.joinedAt}</strong>
              </div>
              <div className="metric-card">
                <span>Receita total</span>
                <strong>{user.lifetimeValue}</strong>
              </div>
            </div>

            <Surface className="inner-panel" as="div">
              <span className="section-kicker">Observacao</span>
              <p>{user.note}</p>
              <strong>{user.address}</strong>
            </Surface>
          </Surface>

          <Surface className="panel" as="section">
            <div className="panel-header">
              <div>
                <span className="section-kicker">Atividade</span>
                <h2>Historico recente</h2>
                <p>Leitura mockada para demonstrar linha do tempo, contexto e preparacao para integracao futura.</p>
              </div>
            </div>

            <div className="activity-list">
              {user.recentActivity.map((item) => (
                <article key={`${item.label}-${item.time}`} className="activity-row detail-activity-row">
                  <div className="icon-chip soft">
                    <ReceiptText size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3>{item.label}</h3>
                    <p>{item.detail}</p>
                  </div>
                  <span>{item.time}</span>
                </article>
              ))}
            </div>
          </Surface>
        </div>
      </section>
    </AppShell>
  )
}
