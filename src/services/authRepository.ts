import {
  loginRequestSchema,
  loginResponseSchema,
  logoutResponseSchema,
  meResponseSchema
} from '../../shared/contracts/auth'
import { registerUserRequestSchema, registerUserResponseSchema } from '../../shared/contracts/user-account'
import { apiRequest } from './apiClient'
import type { AuthSession, AuthUser, LoginCredentials } from '../types/auth'
import type { RegisterUserRequest, UserProfile } from '../types/user-account'

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

export async function register(input: RegisterUserRequest): Promise<UserProfile> {
  const payload = registerUserRequestSchema.parse(input)
  const response = await apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    schema: registerUserResponseSchema
  })

  return response.data
}

export async function logout(token: string): Promise<void> {
  await apiRequest('/api/auth/logout', {
    method: 'POST',
    token,
    schema: logoutResponseSchema
  })
}
