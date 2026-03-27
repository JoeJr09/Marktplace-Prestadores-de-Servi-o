import { useMemo, useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ZodError } from 'zod'
import { ApiError } from '../services/apiClient'
import { register as registerRequest } from '../services/authRepository'
import { registerUserRequestSchema } from '../../shared/contracts/user-account'
import type { RegisterUserRequest } from '../types/user-account'
import { Brand, Button, Surface, TextField } from '../components/ui'

type AccountType = 'cliente' | 'prestador'

interface RegisterFormState {
  fullName: string
  email: string
  username: string
  phone: string
  password: string
  confirmPassword: string
  accountType: AccountType
  companyName: string
  acceptTerms: boolean
}

interface ValidationState {
  fullName?: string
  email?: string
  username?: string
  phone?: string
  password?: string
  confirmPassword?: string
  companyName?: string
  acceptTerms?: string
}

const initialFormState: RegisterFormState = {
  fullName: '',
  email: '',
  username: '',
  phone: '',
  password: '',
  confirmPassword: '',
  accountType: 'cliente',
  companyName: '',
  acceptTerms: false
}

function mapZodIssues(error: ZodError): ValidationState {
  const fieldErrors: ValidationState = {}

  for (const issue of error.issues) {
    const field = issue.path[0]

    if (typeof field === 'string' && !(field in fieldErrors)) {
      fieldErrors[field as keyof ValidationState] = issue.message
    }
  }

  return fieldErrors
}

function normalizePhoneInput(value: string) {
  return value.replace(/[^\d()+\-\s]/g, '').slice(0, 24)
}

export function RegisterPage() {
  const [form, setForm] = useState<RegisterFormState>(initialFormState)
  const [errors, setErrors] = useState<ValidationState>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)

  const passwordChecks = useMemo(
    () => [
      { label: 'Pelo menos 8 caracteres', isValid: form.password.length >= 8 },
      { label: 'Uma letra maiúscula', isValid: /[A-Z]/.test(form.password) },
      { label: 'Um número', isValid: /[0-9]/.test(form.password) },
      { label: 'Um caractere especial', isValid: /[^A-Za-z0-9]/.test(form.password) }
    ],
    [form.password]
  )

  function updateField<K extends keyof RegisterFormState>(field: K, value: RegisterFormState[K]) {
    setForm((current) => ({ ...current, [field]: value }))
    setSuccessMessage(null)
    setServerError(null)
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage(null)
    setServerError(null)

    const payload: RegisterUserRequest = {
      fullName: form.fullName,
      email: form.email,
      username: form.username.trim() ? form.username : undefined,
      phone: form.phone,
      password: form.password,
      role: form.accountType === 'prestador' ? 'provider' : 'customer',
      companyName: form.companyName.trim() ? form.companyName : undefined
    }

    const parsedPayload = registerUserRequestSchema.safeParse(payload)
    const nextErrors: ValidationState = parsedPayload.success ? {} : mapZodIssues(parsedPayload.error)

    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'As senhas precisam coincidir.'
    }

    if (!form.acceptTerms) {
      nextErrors.acceptTerms = 'Você precisa aceitar os termos para continuar.'
    }

    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean) || !parsedPayload.success) {
      setIsSubmitting(false)
      return
    }

    try {
      const createdUser = await registerRequest(parsedPayload.data)
      setSuccessMessage(
        `Conta criada com sucesso para ${createdUser.fullName}. Você já pode usar ${createdUser.email} para entrar na aplicação.`
      )
      setForm(initialFormState)
      setErrors({})
    } catch (error) {
      if (error instanceof ApiError) {
        setServerError(error.message)
      } else {
        setServerError('Não foi possível concluir o cadastro agora.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page register-page">
      <section className="auth-hero register-hero">
        <div className="auth-copy register-copy">
          <Brand subtle />
          <span className="eyebrow">Cadastro</span>
          <h1>Crie sua conta com validação alinhada ao backend e pronta para uso imediato.</h1>
          <p>
            O cadastro agora já conversa com a API local, valida os campos com Zod e prepara o usuário para
            autenticação real no banco PostgreSQL.
          </p>

          <div className="register-highlights">
            <Surface className="highlight-card register-highlight-card">
              <div className="icon-chip">
                <ShieldCheck size={18} aria-hidden="true" />
              </div>
              <h3>Senha forte por padrão</h3>
              <p>Regras compartilhadas entre frontend e backend para reduzir rejeições silenciosas.</p>
            </Surface>

            <Surface className="highlight-card register-highlight-card">
              <div className="icon-chip">
                <Sparkles size={18} aria-hidden="true" />
              </div>
              <h3>Cadastro utilizável</h3>
              <p>Telefone, username opcional e tipo de conta já seguem o domínio atual da aplicação.</p>
            </Surface>

            <Surface className="highlight-card register-highlight-card">
              <div className="icon-chip">
                <CheckCircle2 size={18} aria-hidden="true" />
              </div>
              <h3>Fluxo pronto para QA</h3>
              <p>O retorno da API já permite testar criação de contas e login sem telas cenográficas.</p>
            </Surface>
          </div>
        </div>
      </section>

      <section className="auth-panel register-panel">
        <Surface className="register-card" as="form" onSubmit={handleSubmit}>
          <div className="register-card-header">
            <span className="eyebrow">Criar conta</span>
            <h2>Defina seus dados de acesso</h2>
            <p>Preencha os dados abaixo para criar uma conta local real no ambiente de desenvolvimento.</p>
          </div>

          <div className="register-type-grid" role="radiogroup" aria-label="Tipo de conta">
            <label className={`register-type-card ${form.accountType === 'cliente' ? 'is-selected' : ''}`}>
              <input
                type="radio"
                name="accountType"
                value="cliente"
                checked={form.accountType === 'cliente'}
                onChange={() => updateField('accountType', 'cliente')}
              />
              <div>
                <strong>Cliente</strong>
                <span>Para contratar serviços e acompanhar pedidos.</span>
              </div>
            </label>

            <label className={`register-type-card ${form.accountType === 'prestador' ? 'is-selected' : ''}`}>
              <input
                type="radio"
                name="accountType"
                value="prestador"
                checked={form.accountType === 'prestador'}
                onChange={() => updateField('accountType', 'prestador')}
              />
              <div>
                <strong>Prestador</strong>
                <span>Para divulgar serviços, receber solicitações e operar sua agenda.</span>
              </div>
            </label>
          </div>

          <div className="register-form-grid">
            <TextField
              label="Nome completo"
              type="text"
              autoComplete="name"
              placeholder="Seu nome e sobrenome"
              value={form.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
              hint={errors.fullName}
              required
              aria-invalid={Boolean(errors.fullName)}
              inputClassName={errors.fullName ? 'is-invalid' : ''}
            />

            <TextField
              label="E-mail"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              hint={errors.email}
              required
              aria-invalid={Boolean(errors.email)}
              inputClassName={errors.email ? 'is-invalid' : ''}
            />

            <TextField
              label="Username"
              type="text"
              autoComplete="username"
              placeholder="nome.usuario"
              value={form.username}
              onChange={(event) => updateField('username', event.target.value)}
              hint={errors.username ?? 'Opcional. Você também poderá entrar usando este identificador.'}
              aria-invalid={Boolean(errors.username)}
              inputClassName={errors.username ? 'is-invalid' : ''}
            />

            <TextField
              label="Telefone"
              type="tel"
              autoComplete="tel"
              placeholder="+55 (61) 99999-9999"
              value={form.phone}
              onChange={(event) => updateField('phone', normalizePhoneInput(event.target.value))}
              hint={errors.phone ?? 'Inclua DDD. Exemplo: +55 (61) 99999-9999'}
              required
              aria-invalid={Boolean(errors.phone)}
              inputClassName={errors.phone ? 'is-invalid' : ''}
            />

            {form.accountType === 'prestador' ? (
              <TextField
                label="Nome da empresa ou marca"
                type="text"
                autoComplete="organization"
                placeholder="Nome comercial"
                value={form.companyName}
                onChange={(event) => updateField('companyName', event.target.value)}
                hint={errors.companyName}
                required
                aria-invalid={Boolean(errors.companyName)}
                inputClassName={errors.companyName ? 'is-invalid' : ''}
              />
            ) : null}

            <TextField
              label="Senha"
              type="password"
              autoComplete="new-password"
              placeholder="Crie uma senha"
              value={form.password}
              onChange={(event) => updateField('password', event.target.value)}
              hint={errors.password}
              required
              aria-invalid={Boolean(errors.password)}
              inputClassName={errors.password ? 'is-invalid' : ''}
            />

            <TextField
              label="Confirmar senha"
              type="password"
              autoComplete="new-password"
              placeholder="Repita a senha"
              value={form.confirmPassword}
              onChange={(event) => updateField('confirmPassword', event.target.value)}
              hint={errors.confirmPassword}
              required
              aria-invalid={Boolean(errors.confirmPassword)}
              inputClassName={errors.confirmPassword ? 'is-invalid' : ''}
            />
          </div>

          <Surface className="register-success register-password-checklist" as="div">
            <strong>Requisitos da senha</strong>
            {passwordChecks.map((item) => (
              <p key={item.label}>{item.isValid ? 'OK' : 'Pendente'}: {item.label}</p>
            ))}
          </Surface>

          <label className="checkbox-row register-terms">
            <input
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(event) => updateField('acceptTerms', event.target.checked)}
            />
            <span>Aceito os termos de uso e autorizo a criação da conta no ambiente local de desenvolvimento.</span>
          </label>
          {errors.acceptTerms ? <p className="form-error">{errors.acceptTerms}</p> : null}
          {serverError ? <p className="form-error">{serverError}</p> : null}

          <Button className="full-width" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>

          {successMessage ? (
            <Surface className="register-success" as="div">
              <strong>Cadastro concluído</strong>
              <p>{successMessage}</p>
            </Surface>
          ) : null}

          <div className="register-footer">
            <span>Já tem conta?</span>
            <Link to="/login" className="mini-link">
              Ir para login
            </Link>
          </div>
        </Surface>
      </section>
    </div>
  )
}
