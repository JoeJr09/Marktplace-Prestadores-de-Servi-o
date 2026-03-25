import { randomUUID } from 'node:crypto'
import type { AuthSession, AuthUser, LoginRequest } from '../../../shared/contracts/auth'
import { HttpError } from '../../lib/http-error'
import type { SessionRepository } from './auth.repository'

const MOCK_USERNAME = 'username@guest.com'
const MOCK_PASSWORD = 'password123@'

const guestUser: AuthUser = {
  id: 'guest-user',
  email: MOCK_USERNAME,
  fullName: 'Guest Operator',
  role: 'guest'
}

export class AuthService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async login(credentials: LoginRequest): Promise<AuthSession> {
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

  async getSession(token: string): Promise<AuthSession | null> {
    return this.sessionRepository.findByToken(token)
  }

  async logout(token: string): Promise<void> {
    await this.sessionRepository.deleteByToken(token)
  }
}
