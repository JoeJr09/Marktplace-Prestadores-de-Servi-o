import { createHash } from 'node:crypto'
import type { AuthSession } from '../../../shared/contracts/auth'
import type { RegisterUserRequest, UserProfile } from '../../../shared/contracts/user-account'
import { prisma } from '../../lib/prisma'

export type AuthIdentityRecord = AuthSession['user'] & {
  passwordHash: string
}

export interface AuthIdentityRepository {
  findByLoginIdentifier(identifier: string): Promise<AuthIdentityRecord | null>
  recordSuccessfulLogin(userId: string, loginAt: Date): Promise<void>
  createUser(input: RegisterUserRequest, passwordHash: string): Promise<UserProfile>
}

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

function hashSessionToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

function toAuthIdentityRecord(user: {
  id: string
  email: string
  username: string | null
  fullName: string
  role: AuthIdentityRecord['role']
  status: AuthIdentityRecord['status']
  passwordHash: string
}): AuthIdentityRecord {
  return {
    id: user.id,
    email: user.email,
    username: user.username ?? null,
    fullName: user.fullName,
    role: user.role,
    status: user.status,
    passwordHash: user.passwordHash
  }
}

function toUserProfile(user: {
  id: string
  email: string
  username: string | null
  fullName: string
  phone: string | null
  companyName: string | null
  role: AuthIdentityRecord['role']
  status: AuthIdentityRecord['status']
  createdAt: Date
  updatedAt: Date
  lastLoginAt: Date | null
}): UserProfile {
  return {
    id: user.id,
    email: user.email,
    username: user.username ?? null,
    fullName: user.fullName,
    phone: user.phone ?? null,
    companyName: user.companyName ?? null,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    lastLoginAt: user.lastLoginAt?.toISOString() ?? null
  }
}

function toAuthSession(
  token: string,
  user: {
    id: string
    email: string
    username: string | null
    fullName: string
    role: AuthIdentityRecord['role']
    status: AuthIdentityRecord['status']
  }
): AuthSession {
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username ?? null,
      fullName: user.fullName,
      role: user.role,
      status: user.status
    }
  }
}

export class PrismaAuthIdentityRepository implements AuthIdentityRepository {
  async findByLoginIdentifier(identifier: string): Promise<AuthIdentityRecord | null> {
    const normalizedIdentifier = identifier.trim().toLowerCase()

    const user = await prisma.user.findFirst({
      where: {
        deletedAt: null,
        OR: [{ emailNormalized: normalizedIdentifier }, { usernameNormalized: normalizedIdentifier }]
      }
    })

    if (!user) {
      return null
    }

    return toAuthIdentityRecord(user)
  }

  async recordSuccessfulLogin(userId: string, loginAt: Date): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: loginAt }
    })
  }

  async createUser(input: RegisterUserRequest, passwordHash: string): Promise<UserProfile> {
    const createdUser = await prisma.user.create({
      data: {
        email: input.email.trim(),
        emailNormalized: input.email.trim().toLowerCase(),
        username: input.username?.trim() || null,
        usernameNormalized: input.username?.trim().toLowerCase() || null,
        fullName: input.fullName.trim(),
        phone: input.phone.trim(),
        companyName: input.companyName?.trim() || null,
        passwordHash,
        role: input.role,
        status: 'active'
      }
    })

    return toUserProfile(createdUser)
  }
}

const SESSION_TTL_IN_DAYS = 7

export class PrismaSessionRepository implements SessionRepository {
  async save(session: AuthSession): Promise<void> {
    const expiresAt = new Date(Date.now() + SESSION_TTL_IN_DAYS * 24 * 60 * 60 * 1000)

    await prisma.authSession.create({
      data: {
        userId: session.user.id,
        tokenHash: hashSessionToken(session.token),
        expiresAt
      }
    })
  }

  async findByToken(token: string): Promise<AuthSession | null> {
    const storedSession = await prisma.authSession.findFirst({
      where: {
        tokenHash: hashSessionToken(token),
        revokedAt: null,
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        user: true
      }
    })

    if (!storedSession || storedSession.user.deletedAt || storedSession.user.status !== 'active') {
      return null
    }

    await prisma.authSession.update({
      where: { id: storedSession.id },
      data: { lastSeenAt: new Date() }
    })

    return toAuthSession(token, storedSession.user)
  }

  async deleteByToken(token: string): Promise<void> {
    await prisma.authSession.updateMany({
      where: {
        tokenHash: hashSessionToken(token)
      },
      data: {
        revokedAt: new Date()
      }
    })
  }
}
