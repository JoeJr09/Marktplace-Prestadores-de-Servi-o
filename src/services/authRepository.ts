import {
  loginRequestSchema,
  loginResponseSchema,
  logoutResponseSchema,
  meResponseSchema
} from '../../shared/contracts/auth'
import { apiRequest } from './apiClient'
import type { AuthSession, AuthUser, LoginCredentials } from '../types/auth'

export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  const payload = loginRequestSchema.parse(credentials)
  const response = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    schema: loginResponseSchema
  })

  return response.data
}

export async function fetchAuthenticatedUser(token: string): Promise<AuthUser> {
  const response = await apiRequest('/api/auth/me', {
    method: 'GET',
    token,
    schema: meResponseSchema
  })

  return response.data.user
}

export async function logout(token: string): Promise<void> {
  await apiRequest('/api/auth/logout', {
    method: 'POST',
    token,
    schema: logoutResponseSchema
  })
}
