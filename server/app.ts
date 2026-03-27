import cors from 'cors'
import express, { type NextFunction, type Request, type Response } from 'express'
import { ZodError } from 'zod'
import { apiErrorSchema } from '../shared/contracts/api'
import { serverConfig } from './config'
import { HttpError } from './lib/http-error'
import { AuthController } from './modules/auth/auth.controller'
import { createRequireAuth } from './modules/auth/auth.middleware'
import {
  InMemorySessionRepository,
  PrismaAuthIdentityRepository,
  PrismaSessionRepository
} from './modules/auth/auth.repository'
import { createAuthRoutes } from './modules/auth/auth.routes'
import { AuthService } from './modules/auth/auth.service'
import { UserController } from './modules/users/user.controller'
import { InMemoryUserRepository } from './modules/users/user.repository'
import { createUserRoutes } from './modules/users/user.routes'
import { UserService } from './modules/users/user.service'

export function createApp() {
  const app = express()
  const isDatabaseBackedAuth = serverConfig.userDataSource === 'database' || serverConfig.userDataSource === 'hybrid'
  const sessionRepository = isDatabaseBackedAuth ? new PrismaSessionRepository() : new InMemorySessionRepository()
  const authIdentityRepository = isDatabaseBackedAuth ? new PrismaAuthIdentityRepository() : undefined
  const authService = new AuthService(sessionRepository, authIdentityRepository)
  const authController = new AuthController(authService)
  const requireAuth = createRequireAuth(authService)
  const userRepository = new InMemoryUserRepository()
  const userService = new UserService(userRepository)
  const userController = new UserController(userService)

  app.use(cors())
  app.use(express.json())

  app.get('/api/health', (_request, response) => {
    response.status(200).json({ status: 'ok' })
  })

  app.use('/api/auth', createAuthRoutes(authController, requireAuth))
  app.use('/api/users', createUserRoutes(userController, requireAuth))

  app.use((_request, _response, next) => {
    next(new HttpError(404, 'NOT_FOUND', 'Rota não encontrada.'))
  })

  app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof ZodError) {
      response.status(400).json(
        apiErrorSchema.parse({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Falha de validação na requisição.',
            details: error.flatten()
          }
        })
      )
      return
    }

    if (error instanceof HttpError) {
      response.status(error.statusCode).json(
        apiErrorSchema.parse({
          error: {
            code: error.code,
            message: error.message,
            details: error.details
          }
        })
      )
      return
    }

    response.status(500).json(
      apiErrorSchema.parse({
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erro interno inesperado.'
        }
      })
    )
  })

  return app
}
