import type { User } from '../../../shared/contracts/users'
import { HttpError } from '../../lib/http-error'
import type { UserRepository } from './user.repository'

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async listUsers(query?: string): Promise<User[]> {
    return this.userRepository.list(query)
  }

  async getUserById(identifier: string): Promise<User> {
    const user = await this.userRepository.findByIdentifier(identifier)

    if (!user) {
      throw new HttpError(404, 'USER_NOT_FOUND', 'Usuário não encontrado.')
    }

    return user
  }
}
