import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { spawn, type ChildProcess } from 'node:child_process'

const ENV_FILE_CANDIDATES = ['.env.local', '.env'] as const

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

for (const relativePath of ENV_FILE_CANDIDATES) {
  loadEnvFile(path.resolve(process.cwd(), relativePath))
}

const isWindows = process.platform === 'win32'
const npmCommand = isWindows ? 'npm.cmd' : 'npm'

const processes: ChildProcess[] = [
  spawn(npmCommand, ['run', 'dev:server'], { stdio: 'inherit' }),
  spawn(npmCommand, ['run', 'dev:client'], { stdio: 'inherit' })
]

let isShuttingDown = false

function shutdown(exitCode = 0): void {
  if (isShuttingDown) {
    return
  }

  isShuttingDown = true

  for (const child of processes) {
    if (!child.killed) {
      child.kill(isWindows ? undefined : 'SIGTERM')
    }
  }

  process.exit(exitCode)
}

for (const child of processes) {
  child.on('exit', (code) => {
    shutdown(code ?? 0)
  })
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))
