import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

const envCandidates = ['.env']
const prismaBinary = process.platform === 'win32' ? 'prisma.cmd' : 'prisma'
const prismaPath = path.resolve(process.cwd(), 'node_modules', '.bin', prismaBinary)

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return
  }

  const rawFile = readFileSync(filePath, 'utf8')

  for (const line of rawFile.split(/\r?\n/)) {
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

for (const relativePath of envCandidates) {
  loadEnvFile(path.resolve(process.cwd(), relativePath))
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL não encontrada no arquivo .env da raiz.')
  process.exit(1)
}

const child = spawn(prismaPath, [...process.argv.slice(2), '--schema', 'prisma/schema.prisma'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: process.env
})

child.on('exit', (code) => {
  process.exit(code ?? 1)
})

child.on('error', (error) => {
  console.error(error)
  process.exit(1)
})
