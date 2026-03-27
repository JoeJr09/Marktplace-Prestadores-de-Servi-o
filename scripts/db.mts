import path from 'node:path'
import { spawn } from 'node:child_process'

const prismaScriptPath = path.resolve(process.cwd(), 'scripts', 'prisma.mts')
const nodeBinary = process.execPath
const prismaArgsByCommand = {
  schema: ['migrate', 'deploy'],
  seed: ['db', 'seed'],
  reset: ['migrate', 'reset', '--force']
} as const

type DatabaseCommand = keyof typeof prismaArgsByCommand

function isDatabaseCommand(commandName: string): commandName is DatabaseCommand {
  return commandName in prismaArgsByCommand
}

const commandName = process.argv[2]

if (!commandName || !isDatabaseCommand(commandName)) {
  console.error('Uso: tsx scripts/db.mts <schema|seed|reset>')
  process.exit(1)
}

const child = spawn(nodeBinary, ['--import', 'tsx', prismaScriptPath, ...prismaArgsByCommand[commandName]], {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: process.env
})

const exitCode = await new Promise<number>((resolve) => {
  child.on('exit', (code) => resolve(code ?? 1))
  child.on('error', () => resolve(1))
})

process.exit(exitCode)
