import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { HttpError } from '../../lib/http-error'
import { authorizationHeaderSchema } from './auth.schemas'
import type { AuthService } from './auth.service'

export type AuthMiddleware = (request: Request, response: Response, next: NextFunction) => Promise<void>

export function createRequireAuth(authService: AuthService): AuthMiddleware {
  return async (request, _response, next) => {
    try {
      const authorizationHeader = authorizationHeaderSchema.parse(request.header('authorization'))
      const token = authorizationHeader.replace(/^Bearer\s/, '')
      const session = await authService.getSession(token)

      if (!session) {
        throw new HttpError(401, 'UNAUTHENTICATED', 'Sessão inválida ou expirada.')
      }

      request.authSession = session
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        next(new HttpError(401, 'UNAUTHENTICATED', 'Cabeçalho de autenticação ausente ou inválido.'))
        return
      }

      next(error)
    }
  }
}
