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

function safeSpawn(command: string, args: string[], opts: Record<string, unknown> = {}): ChildProcess | null {
  try {
    // Use shell on Windows to ensure .cmd/.bat resolution and more reliable behavior
  const spawnOpts = { stdio: 'inherit', shell: isWindows ? true : false, ...opts }
  // cast options to any to satisfy TS overloads and ensure runtime behavior
  const child = spawn(command, args, spawnOpts as any) as ChildProcess

    child.on('error', (err) => {
      // Log the error and exit the parent process so the developer sees details
      // (this helps surface EINVAL/ENOENT problems during startup)
      // eslint-disable-next-line no-console
      console.error(`Failed to spawn ${command} ${args.join(' ')}:`, err)
      shutdown(1)
    })

    return child
  } catch (err) {
    // Catch synchronous throws (e.g. invalid args) and log them for diagnosis
    // eslint-disable-next-line no-console
    console.error(`Error while trying to spawn ${command} ${args.join(' ')} synchronously:`, err)
    shutdown(1)
    return null
  }
}

const processes: ChildProcess[] = [
  safeSpawn(npmCommand, ['run', 'dev:server'])!,
  safeSpawn(npmCommand, ['run', 'dev:client'])!
].filter(Boolean) as ChildProcess[]

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
