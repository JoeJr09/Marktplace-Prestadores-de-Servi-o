import type { HTMLInputTypeAttribute } from 'react'
import type { LucideIcon } from 'lucide-react'

export type StatusTone = 'success' | 'warning' | 'info' | 'neutral'

export interface MainNavItem {
  to: string
  label: string
  icon: LucideIcon
}

export interface DashboardStat {
  label: string
  value: string
  change: string
  tone: StatusTone
}

export interface DashboardHighlight {
  title: string
  description: string
  icon: LucideIcon
}

export interface UpcomingService {
  client: string
  service: string
  date: string
  price: string
  status: string
}

export interface ActivityFeedItem {
  title: string
  description: string
  icon: LucideIcon
  time: string
}

export interface ProfileField {
  label: string
  type: HTMLInputTypeAttribute
  defaultValue: string
}

export interface ProfileSettingsSection {
  title: string
  description: string
  fields: ProfileField[]
}

export interface PreferenceToggle {
  label: string
  description: string
  enabled: boolean
}

export interface PreferencesSettingsSection {
  title: string
  description: string
  toggles: PreferenceToggle[]
}

export type SettingsSections = [ProfileSettingsSection, PreferencesSettingsSection]

export interface CheckoutItem {
  name: string
  description: string
  quantity: number
  price: number
}

export interface PaymentMethod {
  label: string
  icon: LucideIcon
  description: string
}
