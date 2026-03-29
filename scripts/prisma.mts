import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { spawn, type ChildProcess } from 'node:child_process'

const ENV_CANDIDATES = ['.env.local', '.env'] as const
const prismaBinary = process.platform === 'win32' ? 'prisma.cmd' : 'prisma'
const prismaPath = path.resolve(process.cwd(), 'node_modules', '.bin', prismaBinary)

function loadEnvFile(filePath: string): void {
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

for (const relativePath of ENV_CANDIDATES) {
  loadEnvFile(path.resolve(process.cwd(), relativePath))
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL não encontrada no arquivo .env da raiz.')
  process.exit(1)
}

const isWindows = process.platform === 'win32'

function safeSpawn(command: string, args: string[], opts: Record<string, unknown> = {}) {
  try {
  const spawnOpts = { cwd: process.cwd(), stdio: 'inherit', env: process.env, shell: isWindows ? true : false, ...opts }
  // cast options to any to satisfy overload typing in TS; ensure runtime behavior is correct
  const child = spawn(command, args, spawnOpts as any) as ChildProcess

    child.on('error', (err) => {
      console.error(`Failed to run ${command} ${args.join(' ')}:`, err)
      process.exit(1)
    })

    child.on('exit', (code) => process.exit(code ?? 1))

    return child
  } catch (err) {
    console.error(`Synchronous error while spawning ${command}:`, err)
    process.exit(1)
  }
}

// Use the resolved prismaPath; on Windows shell:true helps run .cmd wrappers reliably
safeSpawn(prismaPath, [...process.argv.slice(2), '--schema', 'prisma/schema.prisma'])
