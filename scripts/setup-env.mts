import { copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'

const sourcePath = path.resolve(process.cwd(), '.env.example')
const targetPath = path.resolve(process.cwd(), '.env')

if (!existsSync(sourcePath)) {
  console.error('Arquivo .env.example não encontrado na raiz do projeto.')
  process.exit(1)
}

if (existsSync(targetPath)) {
  console.log('Arquivo .env já existe. Nenhuma cópia foi criada.')
  process.exit(0)
}

copyFileSync(sourcePath, targetPath)
console.log('Arquivo .env criado a partir de .env.example.')
