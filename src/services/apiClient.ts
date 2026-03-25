import type { ZodType } from 'zod'
import { apiErrorSchema } from '../../shared/contracts/api'

interface ApiRequestOptions<TResponse> extends RequestInit {
  schema: ZodType<TResponse>
  token?: string | null
}

export class ApiError extends Error {
  statusCode: number
  code: string
  details?: unknown

  constructor(statusCode: number, code: string, message: string, details?: unknown) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.details = details
  }
}

async function readJson(response: Response): Promise<unknown> {
  const rawBody = await response.text()
  return rawBody ? (JSON.parse(rawBody) as unknown) : null
}

export async function apiRequest<TResponse>(
  path: string,
  { schema, token, headers, ...init }: ApiRequestOptions<TResponse>
): Promise<TResponse> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    }
  })

  const payload = await readJson(response)

  if (!response.ok) {
    const parsedError = apiErrorSchema.safeParse(payload)

    if (parsedError.success) {
      throw new ApiError(
        response.status,
        parsedError.data.error.code,
        parsedError.data.error.message,
        parsedError.data.error.details
      )
    }

    throw new ApiError(response.status, 'UNEXPECTED_API_ERROR', 'Falha inesperada ao comunicar com a API.')
  }

  return schema.parse(payload)
}
