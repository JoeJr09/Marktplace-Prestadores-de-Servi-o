import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AlertCircle, Check, ChevronLeft, ChevronDown, LogOut, Search } from 'lucide-react'
import { useAuth } from '../auth/AuthProvider'
import { mainNavItems } from '../data/appData'
import type { AvatarTone } from '../types/user'
import type { StatusTone } from '../types/app'

interface BrandProps {
  subtle?: boolean
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
}

type SurfaceTag = 'section' | 'div' | 'form' | 'article' | 'aside'

interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: SurfaceTag
  children?: ReactNode
  className?: string
}

type BaseFieldProps = {
  label: string
  hint?: string
  className?: string
  inputClassName?: string
}

type InputFieldProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: 'input'
  }

type TextareaFieldProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: 'textarea'
  }

type TextFieldProps = InputFieldProps | TextareaFieldProps

interface SelectFieldProps {
  label: string
  value: string
  hint?: string
}

interface ToggleRowProps {
  label: string
  description: string
  enabled: boolean
}

interface StatusPillProps {
  children: ReactNode
  tone?: StatusTone
}

interface AvatarBadgeProps {
  name: string
  image?: string
  tone?: AvatarTone
  size?: 'md' | 'lg'
}

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

interface BackLinkProps {
  to: string
  children: ReactNode
}

interface AppShellProps {
  title: string
  eyebrow: string
  description: string
  actions?: ReactNode
  sidebarExtra?: ReactNode
  children: ReactNode
}

interface StepperProps {
  steps: string[]
  currentStep: number
}

export function Brand({ subtle = false }: BrandProps) {
  return (
    <div className={`brand ${subtle ? 'brand-subtle' : ''}`}>
      <span className="brand-mark" aria-hidden="true" />
      <div>
        <strong>Acode Aqui</strong>
        <span>Marketplace de serviços</span>
      </div>
    </div>
  )
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={`btn btn-${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

export function Surface({ className = '', as: Tag = 'section', ...props }: SurfaceProps) {
  return <Tag className={`surface ${className}`.trim()} {...props} />
}

export function TextField({ label, hint, className = '', inputClassName = '', ...props }: TextFieldProps) {
  return (
    <label className={`field ${className}`.trim()}>
      <span className="field-label">{label}</span>
      {props.as === 'textarea' ? (
        <textarea className={`field-input ${inputClassName}`.trim()} {...props} />
      ) : (
        <input className={`field-input ${inputClassName}`.trim()} {...props} />
      )}
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  )
}

export function SelectField({ label, value, hint }: SelectFieldProps) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <div className="field-input field-select" role="button" tabIndex={0}>
        <span>{value}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </div>
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  )
}

export function ToggleRow({ label, description, enabled }: ToggleRowProps) {
  return (
    <div className="toggle-row">
      <div>
        <h4>{label}</h4>
        <p>{description}</p>
      </div>
      <button className={`toggle ${enabled ? 'is-enabled' : ''}`} type="button" aria-pressed={enabled}>
        <span />
      </button>
    </div>
  )
}

export function StatusPill({ children, tone = 'neutral' }: StatusPillProps) {
  return <span className={`status-pill tone-${tone}`}>{children}</span>
}

export function AvatarBadge({ name, image, tone = 'steel', size = 'md' }: AvatarBadgeProps) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part: string) => part[0])
    .join('')
    .toUpperCase()

  return image ? (
    <img className={`avatar-badge avatar-${size}`} src={image} alt="" />
  ) : (
    <span className={`avatar-badge avatar-${size} tone-${tone}`} aria-hidden="true">
      {initials}
    </span>
  )
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Surface className="panel state-card" as="section">
      <div className="state-icon">
        <AlertCircle size={18} aria-hidden="true" />
      </div>
      <div className="state-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action ? <div className="state-action">{action}</div> : null}
    </Surface>
  )
}

export function BackLink({ to, children }: BackLinkProps) {
  return (
    <Link to={to} className="back-link">
      <ChevronLeft size={16} aria-hidden="true" />
      <span>{children}</span>
    </Link>
  )
}

export function AppShell({ title, eyebrow, description, actions, sidebarExtra, children }: AppShellProps) {
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <div className="app-shell">
      <aside className="shell-sidebar">
        <div className="sidebar-top">
          <Brand />
          <nav className="sidebar-nav" aria-label="Principal">
            {mainNavItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `sidebar-link ${isActive ? 'is-active' : ''}`}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        {sidebarExtra ? <div className="sidebar-extra">{sidebarExtra}</div> : null}
      </aside>

      <main className="shell-main">
        <header className="shell-topbar">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          <div className="topbar-tools">
            <label className="searchbox" aria-label="Buscar">
              <Search size={16} aria-hidden="true" />
              <input type="search" placeholder="Buscar pedidos, clientes e mensagens" />
            </label>
            {actions}
            {isAuthenticated ? (
              <div className="topbar-session">
                <div className="session-copy">
                  <strong>{user?.fullName}</strong>
                  <span>{user?.email}</span>
                </div>
                <Button type="button" variant="ghost" onClick={() => void logout()}>
                  <LogOut size={16} aria-hidden="true" />
                  Sair
                </Button>
              </div>
            ) : null}
          </div>
        </header>

        <div className="shell-content">{children}</div>
      </main>
    </div>
  )
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <ol className="stepper" aria-label="Etapas do checkout">
      {steps.map((step, index) => {
        const isDone = index < currentStep
        const isCurrent = index === currentStep

        return (
          <li key={step} className={`step ${isDone ? 'is-done' : ''} ${isCurrent ? 'is-current' : ''}`.trim()}>
            <span className="step-marker" aria-hidden="true">
              {isDone ? <Check size={14} /> : index + 1}
            </span>
            <span>{step}</span>
          </li>
        )
      })}
    </ol>
  )
}
