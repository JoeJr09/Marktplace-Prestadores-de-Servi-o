import { Router } from 'express'
import { asyncHandler } from '../../lib/async-handler'
import type { AuthController } from './auth.controller'
import type { AuthMiddleware } from './auth.middleware'
import { loginBodySchema, registerBodySchema } from './auth.schemas'

export function createAuthRoutes(authController: AuthController, requireAuth: AuthMiddleware) {
  const router = Router()

  router.post(
    '/login',
    asyncHandler(async (request, response) => {
      request.body = loginBodySchema.parse(request.body)
      await authController.login(request, response)
    })
  )

  router.post(
    '/register',
    asyncHandler(async (request, response) => {
      request.body = registerBodySchema.parse(request.body)
      await authController.register(request, response)
    })
  )

  router.post('/logout', requireAuth, asyncHandler(authController.logout.bind(authController)))
  router.get('/me', requireAuth, asyncHandler(authController.me.bind(authController)))

  return router
}
