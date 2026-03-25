import { userListQuerySchema, userResponseSchema, usersResponseSchema } from '../../shared/contracts/users'
import { apiRequest } from './apiClient'
import type { FetchUsersParams, User } from '../types/user'

interface UserRequestOptions extends FetchUsersParams {
  token: string
}

export async function fetchUsers({ query, token }: UserRequestOptions): Promise<User[]> {
  const params = userListQuerySchema.parse({
    query: query?.trim() ? query : undefined
  })

  const searchParams = new URLSearchParams()

  if (params.query) {
    searchParams.set('query', params.query)
  }

  const response = await apiRequest(`/api/users${searchParams.size ? `?${searchParams.toString()}` : ''}`, {
    method: 'GET',
    token,
    schema: usersResponseSchema
  })

  return response.data
}

export async function fetchUserBySlug(identifier: string, token: string): Promise<User | null> {
  try {
    const response = await apiRequest(`/api/users/${encodeURIComponent(identifier)}`, {
      method: 'GET',
      token,
      schema: userResponseSchema
    })

    return response.data
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'USER_NOT_FOUND') {
      return null
    }

    throw error
  }
}
