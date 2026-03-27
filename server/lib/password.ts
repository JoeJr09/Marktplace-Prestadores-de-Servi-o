import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCallback)
const KEY_LENGTH = 64
const PASSWORD_SCHEME = 'scrypt'

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer
  return `${PASSWORD_SCHEME}$${salt}$${derivedKey.toString('hex')}`
}

export async function verifyPassword(password: string, storedPasswordHash: string): Promise<boolean> {
  const [scheme, salt, expectedHash] = storedPasswordHash.includes('$')
    ? storedPasswordHash.split('$')
    : [PASSWORD_SCHEME, ...storedPasswordHash.split(':')]

  if (scheme !== PASSWORD_SCHEME || !salt || !expectedHash) {
    return false
  }

  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer
  const expectedBuffer = Buffer.from(expectedHash, 'hex')

  if (expectedBuffer.length !== derivedKey.length) {
    return false
  }

  return timingSafeEqual(derivedKey, expectedBuffer)
}
