import type { Request, Response } from 'express'
import { loginResponseSchema, logoutResponseSchema, meResponseSchema } from '../../../shared/contracts/auth'
import { HttpError } from '../../lib/http-error'
import type { AuthService } from './auth.service'

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(request: Request, response: Response): Promise<void> {
    const session = await this.authService.login(request.body)
    response.status(200).json(loginResponseSchema.parse({ data: session }))
  }

  async me(request: Request, response: Response): Promise<void> {
    if (!request.authSession) {
      throw new HttpError(401, 'UNAUTHENTICATED', 'Sessão não encontrada.')
    }

    response.status(200).json(
      meResponseSchema.parse({
        data: {
          user: request.authSession.user
        }
      })
    )
  }

  async logout(request: Request, response: Response): Promise<void> {
    if (!request.authSession) {
      throw new HttpError(401, 'UNAUTHENTICATED', 'Sessão não encontrada.')
    }

    await this.authService.logout(request.authSession.token)

    response.status(200).json(logoutResponseSchema.parse({ data: { success: true } }))
  }
}
