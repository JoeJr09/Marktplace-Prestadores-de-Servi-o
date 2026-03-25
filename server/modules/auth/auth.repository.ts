import type { AuthSession } from '../../../shared/contracts/auth'

export interface SessionRepository {
  save(session: AuthSession): Promise<void>
  findByToken(token: string): Promise<AuthSession | null>
  deleteByToken(token: string): Promise<void>
}

export class InMemorySessionRepository implements SessionRepository {
  private readonly sessions = new Map<string, AuthSession>()

  async save(session: AuthSession): Promise<void> {
    this.sessions.set(session.token, session)
  }

  async findByToken(token: string): Promise<AuthSession | null> {
    return this.sessions.get(token) ?? null
  }

  async deleteByToken(token: string): Promise<void> {
    this.sessions.delete(token)
  }
}
