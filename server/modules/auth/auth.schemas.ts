import { z } from 'zod'
import { loginRequestSchema } from '../../../shared/contracts/auth'
import { registerUserRequestSchema } from '../../../shared/contracts/user-account'

export const loginBodySchema = loginRequestSchema
export const registerBodySchema = registerUserRequestSchema

export const authorizationHeaderSchema = z.string().trim().regex(/^Bearer\s.+$/, {
  message: 'Cabeçalho Authorization inválido.'
})
