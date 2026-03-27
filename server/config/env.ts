import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

const ENV_FILE_CANDIDATES = ['.env']

function loadEnvFile(filePath: string) {
  if (!existsSync(filePath)) {
    return
  }

  const rawFile = readFileSync(filePath, 'utf8')
  const lines = rawFile.split(/\r?\n/)

  for (const line of lines) {
    const trimmedLine = line.trim()

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue
    }

    const separatorIndex = trimmedLine.indexOf('=')

    if (separatorIndex <= 0) {
      continue
    }

    const key = trimmedLine.slice(0, separatorIndex).trim()
    const value = trimmedLine.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '')

    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

for (const relativePath of ENV_FILE_CANDIDATES) {
  loadEnvFile(path.resolve(process.cwd(), relativePath))
}

const serverEnvSchema = z.object({
  API_PORT: z.coerce.number().int().positive().default(3001),
  FRONTEND_URL: z.string().trim().url().default('http://localhost:5173'),
  DATABASE_HOST: z.string().trim().min(1),
  DATABASE_PORT: z.coerce.number().int().positive().default(5432),
  DATABASE_NAME: z.string().trim().min(1),
  DATABASE_USER: z.string().trim().min(1),
  DATABASE_PASSWORD: z.string().trim().min(1),
  DATABASE_SCHEMA: z.string().trim().min(1).default('acode_aqui'),
  DATABASE_URL: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(32),
  USER_DATA_SOURCE: z.enum(['mock', 'database', 'hybrid']).default('mock')
})

export const serverEnv = serverEnvSchema.parse(process.env)

export type ServerEnv = typeof serverEnv
