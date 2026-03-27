import { useState, type FormEvent } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { ApiError } from '../services/apiClient'
import { useAuth } from '../auth/AuthProvider'
import { Brand, Button, Surface, TextField } from '../components/ui'
import { dashboardHighlights } from '../data/appData'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('username@guest.com')
  const [password, setPassword] = useState('Password123@')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await login({ username, password })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Não foi possível autenticar no momento.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-hero">
        <div className="auth-copy">
          <Brand subtle />
          <span className="eyebrow">Base compartilhada</span>
          <h1>Gerencie serviços, pagamentos e operação em uma única experiência.</h1>
          <p>
            Layout consistente, componentes reutilizáveis e um fluxo claro para acompanhar toda a jornada
            operacional.
          </p>

          <div className="highlight-grid">
            {dashboardHighlights.map(({ title, description, icon: Icon }) => (
              <Surface key={title} className="highlight-card">
                <div className="icon-chip">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </Surface>
            ))}
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <Surface className="login-card" as="form" onSubmit={handleSubmit}>
          <div className="login-card-header">
            <span className="eyebrow">Login</span>
            <h2>Acesse sua conta</h2>
            <p>Entre para acompanhar pedidos, ajustar preferências e concluir pagamentos via API local.</p>
          </div>

          <TextField
            label="E-mail ou username"
            type="text"
            placeholder="username@guest.com"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Surface className="dev-credential-card" as="div">
            <strong>Credenciais de desenvolvimento</strong>
            <span>username@guest.com</span>
            <span>Password123@</span>
          </Surface>

          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

          <div className="login-meta">
            <label className="checkbox-row">
              <input type="checkbox" defaultChecked />
              <span>Manter conectado neste dispositivo</span>
            </label>
            <span className="login-inline-note">Autenticação validada pela API local com banco PostgreSQL.</span>
          </div>

          <Button className="full-width" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar no painel'}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>

          <div className="login-shortcuts">
            <span>Não tem acesso ainda?</span>
            <Link to="/register" className="mini-link">
              Criar conta
            </Link>
          </div>

          <div className="security-note">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>Payloads e respostas validados com Zod e protegidos por rotas autenticadas no frontend.</span>
          </div>
        </Surface>
      </section>
    </div>
  )
}
