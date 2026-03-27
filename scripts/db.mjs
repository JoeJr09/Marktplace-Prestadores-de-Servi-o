import path from 'node:path'
import { spawn } from 'node:child_process'

const commandName = process.argv[2]
const prismaScript = path.resolve(process.cwd(), 'scripts', 'prisma.mjs')
const nodeBinary = process.execPath
const prismaArgsByCommand = {
  schema: ['migrate', 'deploy'],
  seed: ['db', 'seed'],
  reset: ['migrate', 'reset', '--force']
}

if (!commandName || !(commandName in prismaArgsByCommand)) {
  console.error('Uso: node scripts/db.mjs <schema|seed|reset>')
  process.exit(1)
}

const child = spawn(nodeBinary, [prismaScript, ...prismaArgsByCommand[commandName]], {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: process.env
})

const exitCode = await new Promise((resolve) => {
  child.on('exit', (code) => resolve(code ?? 1))
  child.on('error', () => resolve(1))
})

process.exit(exitCode)
