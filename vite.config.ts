import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function readEnvValue(key: string) {
  for (const relativePath of ['.env.local', '.env']) {
    const absolutePath = path.resolve(process.cwd(), relativePath)

    if (!existsSync(absolutePath)) {
      continue
    }

    const fileContents = readFileSync(absolutePath, 'utf-8')

    for (const rawLine of fileContents.split(/\r?\n/)) {
      const line = rawLine.trim()

      if (!line || line.startsWith('#')) {
        continue
      }

      const separatorIndex = line.indexOf('=')

      if (separatorIndex <= 0) {
        continue
      }

      const currentKey = line.slice(0, separatorIndex).trim()
      const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '')

      if (currentKey === key) {
        return value
      }
    }
  }

  return undefined
}

const apiPort = Number(readEnvValue('API_PORT') ?? process.env.API_PORT ?? 3001)

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${apiPort}`,
        changeOrigin: true
      }
    }
  }
})
