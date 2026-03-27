import { randomUUID } from 'node:crypto'
import type { AuthSession, AuthUser, LoginRequest } from '../../../shared/contracts/auth'
import type { RegisterUserRequest, UserProfile } from '../../../shared/contracts/user-account'
import { HttpError } from '../../lib/http-error'
import { hashPassword, verifyPassword } from '../../lib/password'
import type { AuthIdentityRepository, SessionRepository } from './auth.repository'

const MOCK_USERNAME = 'username@guest.com'
const MOCK_PASSWORD = 'Password123@'

const guestUser: AuthUser = {
  id: '11111111-1111-4111-8111-111111111111',
  email: MOCK_USERNAME,
  username: 'guest.local',
  fullName: 'Guest Operator',
  role: 'guest',
  status: 'active'
}

export class AuthService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly authIdentityRepository?: AuthIdentityRepository
  ) {}

  async login(credentials: LoginRequest): Promise<AuthSession> {
    if (!this.authIdentityRepository) {
      if (credentials.username !== MOCK_USERNAME || credentials.password !== MOCK_PASSWORD) {
        throw new HttpError(401, 'INVALID_CREDENTIALS', 'Credenciais inválidas para o ambiente de desenvolvimento.')
      }

      const session: AuthSession = {
        token: `mock-session-${randomUUID()}`,
        user: guestUser
      }

      await this.sessionRepository.save(session)

      return session
    }

    const authIdentity = await this.authIdentityRepository.findByLoginIdentifier(credentials.username)

    if (!authIdentity) {
      throw new HttpError(401, 'INVALID_CREDENTIALS', 'Credenciais inválidas.')
    }

    if (authIdentity.status !== 'active') {
      throw new HttpError(403, 'USER_INACTIVE', 'A conta informada não está ativa para login.')
    }

    const isPasswordValid = await verifyPassword(credentials.password, authIdentity.passwordHash)

    if (!isPasswordValid) {
      throw new HttpError(401, 'INVALID_CREDENTIALS', 'Credenciais inválidas.')
    }

    const loginAt = new Date()
    const session: AuthSession = {
      token: randomUUID(),
      user: {
        id: authIdentity.id,
        email: authIdentity.email,
        username: authIdentity.username ?? null,
        fullName: authIdentity.fullName,
        role: authIdentity.role,
        status: authIdentity.status
      }
    }

    await this.sessionRepository.save(session)
    await this.authIdentityRepository.recordSuccessfulLogin(authIdentity.id, loginAt)

    return session
  }

  async getSession(token: string): Promise<AuthSession | null> {
    return this.sessionRepository.findByToken(token)
  }

  async register(input: RegisterUserRequest): Promise<UserProfile> {
    if (!this.authIdentityRepository) {
      throw new HttpError(503, 'REGISTER_UNAVAILABLE', 'Registro indisponível no modo atual da aplicação.')
    }

    const normalizedEmail = input.email.trim().toLowerCase()
    const normalizedUsername = input.username?.trim().toLowerCase()

    const existingEmail = await this.authIdentityRepository.findByLoginIdentifier(normalizedEmail)

    if (existingEmail) {
      throw new HttpError(409, 'EMAIL_ALREADY_IN_USE', 'Já existe uma conta com este e-mail.')
    }

    if (normalizedUsername) {
      const existingUsername = await this.authIdentityRepository.findByLoginIdentifier(normalizedUsername)

      if (existingUsername) {
        throw new HttpError(409, 'USERNAME_ALREADY_IN_USE', 'Este username já está em uso.')
      }
    }

    const passwordHash = await hashPassword(input.password)

    return this.authIdentityRepository.createUser(input, passwordHash)
  }

  async logout(token: string): Promise<void> {
    await this.sessionRepository.deleteByToken(token)
  }
}
