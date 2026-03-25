import type { Request, Response } from 'express'
import { userResponseSchema, usersResponseSchema } from '../../../shared/contracts/users'
import type { UserService } from './user.service'

export class UserController {
  constructor(private readonly userService: UserService) {}

  async listUsers(request: Request, response: Response): Promise<void> {
    const normalizedQuery = typeof request.query.query === 'string' ? request.query.query : undefined
    const users = await this.userService.listUsers(normalizedQuery)
    response.status(200).json(
      usersResponseSchema.parse({
        data: users,
        meta: { total: users.length }
      })
    )
  }

  async getUserById(request: Request, response: Response): Promise<void> {
    const userIdentifier = Array.isArray(request.params.id) ? request.params.id[0] : request.params.id
    const user = await this.userService.getUserById(userIdentifier)
    response.status(200).json(userResponseSchema.parse({ data: user }))
  }
}
