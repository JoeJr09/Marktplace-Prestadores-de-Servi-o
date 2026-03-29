import { useState, type FormEvent } from 'react'
import { ArrowRight, Lock } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ApiError } from '../services/apiClient'
import { useAuth } from '../auth/AuthProvider'
import { Brand, Button, Surface, TextField } from '../components/ui'

type LoginPersona = 'cliente' | 'prestador'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [searchParams] = useSearchParams()
  const initialPersona = (searchParams.get('persona') as LoginPersona) ?? 'cliente'
  const [email, setEmail] = useState('username@guest.com')
  const [password, setPassword] = useState('Password123@')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [persona, setPersona] = useState<LoginPersona>(
    initialPersona === 'prestador' || initialPersona === 'cliente' ? initialPersona : 'cliente'
  )

  async function handleSubmit(event: FormEvent<HTMLElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await login({ email, password })
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
    <div className="auth-page login-page">
      <section className="auth-hero">
        <div className="auth-copy">
          <Brand subtle />
          <span className="eyebrow">Acesso</span>
          <h1>Encontre a expertise estrutural que você precisa.</h1>
          <p>
            Acesse uma rede curada de profissionais verificados para projetos urbanos, manutenção e serviços
            técnicos especializados.
          </p>
        </div>
      </section>

      <section className="auth-panel login-panel" aria-label="Formulário de login">
        <Surface className="login-card" as="form" onSubmit={handleSubmit}>
          <div className="login-card-header">
            <span className="eyebrow">Login</span>
            <h2>Bem-vindo de volta</h2>
            <p>Escolha como deseja entrar e gerencie suas solicitações de serviço.</p>
          </div>

          <div className="register-type-grid model-login-type-grid" role="radiogroup" aria-label="Tipo de acesso">
                <label className={`register-type-card ${persona === 'cliente' ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="loginPersona"
                    value="cliente"
                    checked={persona === 'cliente'}
                    onChange={() => setPersona('cliente')}
                  />
                  <div>
                    <strong>Cliente</strong>
                    <span>Para acompanhar pedidos e contratar serviços.</span>
                  </div>
                </label>

                <label className={`register-type-card ${persona === 'prestador' ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="loginPersona"
                    value="prestador"
                    checked={persona === 'prestador'}
                    onChange={() => setPersona('prestador')}
                  />
                  <div>
                    <strong>Profissional</strong>
                    <span>Para responder solicitações e operar sua agenda.</span>
                  </div>
                </label>
          </div>

          <TextField
            label="Endereço de e-mail"
            type="email"
            placeholder="seuemail@empresa.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <div className="model-login-password-row">
            <TextField
              label="Senha"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="model-forgot-btn" type="button">
              Esqueceu?
            </button>
          </div>

          <label className="model-checkbox-row">
            <input type="checkbox" defaultChecked />
            <span>Manter-me conectado neste dispositivo</span>
          </label>

          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

          <Button className="full-width" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar na Acode Aqui'}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>

          <div className="model-divider" aria-hidden="true">
            <span />
            <small>ou conecte com</small>
            <span />
          </div>

          <div className="model-social-row" role="group" aria-label="Social login options">
            <button type="button" className="model-social-btn">
              Google
            </button>
            <button type="button" className="model-social-btn">
              Apple
            </button>
          </div>

          <p className="model-login-footnote">
            Ainda não tem uma conta?{' '}
            <Link to="/register" className="mini-link">
              Criar conta como cliente ou prestador
            </Link>
          </p>

          <p className="model-login-secure-note">
            <Lock size={15} aria-hidden="true" />
            <span>Use: username@guest.com / Password123@ para acessar o ambiente de testes.</span>
          </p>
        </Surface>
      </section>
    </div>
  )
}
