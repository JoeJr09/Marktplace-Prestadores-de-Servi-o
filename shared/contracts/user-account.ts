import { z } from 'zod'

export const userRoleSchema = z.enum(['guest', 'customer', 'provider', 'admin'])
export const userAccountStatusSchema = z.enum(['pending', 'active', 'inactive', 'suspended'])
export const registerableUserRoleSchema = z.enum(['customer', 'provider'])

export const userIdSchema = z.string().uuid()
export const emailSchema = z.string().trim().max(320, 'O e-mail deve ter no máximo 320 caracteres.').email()
export const fullNameSchema = z.string().trim().min(3).max(255, 'O nome completo deve ter no máximo 255 caracteres.')
export const passwordSchema = z
  .string()
  .min(8, 'A senha precisa ter no mínimo 8 caracteres.')
  .max(72, 'A senha deve ter no máximo 72 caracteres.')
  .regex(/[A-Z]/, 'A senha precisa conter pelo menos uma letra maiúscula.')
  .regex(/[0-9]/, 'A senha precisa conter pelo menos um número.')
  .regex(/[^A-Za-z0-9]/, 'A senha precisa conter pelo menos um caractere especial.')
export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+55\s\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Use o formato +55 (11) 99999-9999.')
export const companyNameSchema = z.string().trim().min(2).max(120)

export const sharedUserIdentitySchema = z.object({
  id: userIdSchema,
  email: emailSchema,
  fullName: fullNameSchema,
  role: userRoleSchema,
  status: userAccountStatusSchema
})

export const userProfileSchema = sharedUserIdentitySchema.extend({
  phone: phoneSchema.nullable().optional(),
  companyName: companyNameSchema.nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastLoginAt: z.string().datetime().nullable().optional()
})

export const registerUserRequestSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: registerableUserRoleSchema.default('customer'),
  phone: phoneSchema,
  companyName: companyNameSchema.optional()
}).superRefine((payload, context) => {
  if (payload.role === 'provider' && !payload.companyName?.trim()) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['companyName'],
      message: 'Informe o nome da empresa ou marca profissional.'
    })
  }
})

export const updateUserProfileRequestSchema = z
  .object({
    fullName: fullNameSchema.optional(),
    phone: phoneSchema.nullable().optional(),
    companyName: companyNameSchema.nullable().optional(),
    status: userAccountStatusSchema.optional()
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: 'Envie ao menos um campo para atualização.'
  })

export const userListItemSchema = sharedUserIdentitySchema.extend({
  createdAt: z.string().datetime(),
  lastLoginAt: z.string().datetime().nullable().optional()
})

export const userListResponseSchema = z.object({
  data: z.array(userListItemSchema),
  meta: z.object({
    total: z.number().int().nonnegative()
  })
})

export const userListQuerySchema = z.object({
  query: z.string().trim().min(1).optional(),
  role: userRoleSchema.optional(),
  status: userAccountStatusSchema.optional()
})

export const userProfileResponseSchema = z.object({
  data: userProfileSchema
})

export const registerUserResponseSchema = z.object({
  data: userProfileSchema
})

export const updateUserProfileResponseSchema = z.object({
  data: userProfileSchema
})

export type UserRole = z.infer<typeof userRoleSchema>
export type UserAccountStatus = z.infer<typeof userAccountStatusSchema>
export type RegisterableUserRole = z.infer<typeof registerableUserRoleSchema>
export type SharedUserIdentity = z.infer<typeof sharedUserIdentitySchema>
export type UserProfile = z.infer<typeof userProfileSchema>
export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>
export type UpdateUserProfileRequest = z.infer<typeof updateUserProfileRequestSchema>
export type UserListItem = z.infer<typeof userListItemSchema>
export type UserListQuery = z.infer<typeof userListQuerySchema>
export type UserListResponse = z.infer<typeof userListResponseSchema>
export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>
export type RegisterUserResponse = z.infer<typeof registerUserResponseSchema>
export type UpdateUserProfileResponse = z.infer<typeof updateUserProfileResponseSchema>
