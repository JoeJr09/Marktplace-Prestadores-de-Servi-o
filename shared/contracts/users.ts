import { z } from 'zod'

export const avatarToneSchema = z.enum(['graphite', 'steel', 'iron'])
export const userStatusSchema = z.enum(['active', 'pending', 'inactive'])

export const userActivitySchema = z.object({
  label: z.string(),
  detail: z.string(),
  time: z.string()
})

export const userSchema = z.object({
  id: z.string(),
  slug: z.string(),
  fullName: z.string(),
  role: z.string(),
  company: z.string(),
  status: userStatusSchema,
  email: z.email(),
  phone: z.string(),
  city: z.string(),
  segment: z.string(),
  avatarTone: avatarToneSchema,
  joinedAt: z.string(),
  lastAccess: z.string(),
  plan: z.string(),
  openOrders: z.number().int().nonnegative(),
  lifetimeValue: z.string(),
  responseExpectation: z.string(),
  note: z.string(),
  tags: z.array(z.string()),
  bio: z.string(),
  address: z.string(),
  recentActivity: z.array(userActivitySchema)
})

export const userListQuerySchema = z.object({
  query: z.string().trim().min(1).optional()
})

export const userRouteParamsSchema = z.object({
  id: z.string().trim().min(1)
})

export const usersResponseSchema = z.object({
  data: z.array(userSchema),
  meta: z.object({
    total: z.number().int().nonnegative()
  })
})

export const userResponseSchema = z.object({
  data: userSchema
})

export type AvatarTone = z.infer<typeof avatarToneSchema>
export type UserStatus = z.infer<typeof userStatusSchema>
export type UserActivity = z.infer<typeof userActivitySchema>
export type User = z.infer<typeof userSchema>
export type UserListQuery = z.infer<typeof userListQuerySchema>
export type UserRouteParams = z.infer<typeof userRouteParamsSchema>
export type UsersResponse = z.infer<typeof usersResponseSchema>
export type UserResponse = z.infer<typeof userResponseSchema>
