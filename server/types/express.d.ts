import type { AuthSession } from '../../shared/contracts/auth'

declare global {
  namespace Express {
    interface Request {
      authSession?: AuthSession
    }
  }
}

export {}
