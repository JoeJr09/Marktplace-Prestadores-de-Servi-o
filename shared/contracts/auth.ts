import { z } from 'zod'

export const authUserSchema = z.object({
  id: z.string(),
  email: z.email(),
  fullName: z.string(),
  role: z.string()
})

export const loginRequestSchema = z.object({
  username: z.email(),
  password: z.string().min(1)
})

export const authSessionSchema = z.object({
  token: z.string().min(1),
  user: authUserSchema
})

export const loginResponseSchema = z.object({
  data: authSessionSchema
})

export const meResponseSchema = z.object({
  data: z.object({
    user: authUserSchema
  })
})

export const logoutResponseSchema = z.object({
  data: z.object({
    success: z.literal(true)
  })
})

export type AuthUser = z.infer<typeof authUserSchema>
export type LoginRequest = z.infer<typeof loginRequestSchema>
export type AuthSession = z.infer<typeof authSessionSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
export type MeResponse = z.infer<typeof meResponseSchema>
export type LogoutResponse = z.infer<typeof logoutResponseSchema>
