import { z } from 'zod'
import { loginRequestSchema } from '../../../shared/contracts/auth'

export const loginBodySchema = loginRequestSchema

export const authorizationHeaderSchema = z.string().trim().regex(/^Bearer\s.+$/, {
  message: 'Cabeçalho Authorization inválido.'
})
