import { users as seedUsers } from '../../../shared/mock/users'
import type { User } from '../../../shared/contracts/users'

export interface UserRepository {
  list(query?: string): Promise<User[]>
  findByIdentifier(identifier: string): Promise<User | null>
}

export class InMemoryUserRepository implements UserRepository {
  async list(query?: string): Promise<User[]> {
    if (!query) {
      return seedUsers
    }

    const normalizedQuery = query.toLowerCase()

    return seedUsers.filter((user) =>
      [user.id, user.slug, user.fullName, user.company, user.email, user.city, user.segment]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    )
  }

  async findByIdentifier(identifier: string): Promise<User | null> {
    return seedUsers.find((user) => user.id === identifier || user.slug === identifier) ?? null
  }
}
