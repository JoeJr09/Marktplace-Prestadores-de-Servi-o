import { Router } from 'express'
import { asyncHandler } from '../../lib/async-handler'
import type { AuthMiddleware } from '../auth/auth.middleware'
import type { UserController } from './user.controller'
import { listUsersQuerySchema, userParamsSchema } from './user.schemas'

export function createUserRoutes(userController: UserController, requireAuth: AuthMiddleware) {
  const router = Router()

  router.use(requireAuth)

  router.get(
    '/',
    asyncHandler(async (request, response) => {
      listUsersQuerySchema.parse(request.query)
      await userController.listUsers(request, response)
    })
  )

  router.get(
    '/:id',
    asyncHandler(async (request, response) => {
      userParamsSchema.parse(request.params)
      await userController.getUserById(request, response)
    })
  )

  return router
}
