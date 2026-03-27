import { createApp } from '../server/app'
import { prisma } from '../server/lib/prisma'

interface JsonResponse {
  status: number
  body: unknown
}

function assertCondition(condition: unknown, message: string) {
  if (!condition) {
    throw new Error(message)
  }
}

async function readJson(response: Response): Promise<JsonResponse> {
  const body = (await response.json()) as unknown
  return {
    status: response.status,
    body
  }
}

async function main() {
  const app = createApp()
  const server = await new Promise<import('node:http').Server>((resolve) => {
    const listeningServer = app.listen(0, () => resolve(listeningServer))
  })

  const address = server.address()
  const port = typeof address === 'object' && address ? address.port : 0
  const baseUrl = `http://127.0.0.1:${port}`
  const uniqueSuffix = Date.now().toString(36)
  const validRegistration = {
    fullName: 'QA Register User',
    email: `qa.register.${uniqueSuffix}@acode.local`,
    username: `qa.register.${uniqueSuffix}`,
    phone: '+55 (61) 98888-7766',
    password: 'Password123@',
    role: 'customer'
  }

  try {
    const guestLogin = await readJson(
      await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'username@guest.com', password: 'Password123@' })
      })
    )
    assertCondition(guestLogin.status === 200, 'Guest login should return 200.')
    const guestToken = (guestLogin.body as { data?: { token?: string } }).data?.token
    assertCondition(guestToken, 'Guest login should return a token.')

    const guestMe = await readJson(
      await fetch(`${baseUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${guestToken}` }
      })
    )
    assertCondition(guestMe.status === 200, '/auth/me should return 200 for guest token.')

    const invalidGuestPayload = await readJson(
      await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'username@guest.com', password: 'wrong' })
      })
    )
    assertCondition(invalidGuestPayload.status === 400, 'Schema-invalid login payload should return 400.')

    const invalidGuestLogin = await readJson(
      await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'username@guest.com', password: 'Wrongpass123@' })
      })
    )
    assertCondition(invalidGuestLogin.status === 401, 'Wrong but schema-valid guest password should return 401.')

    const invalidEmailRegister = await readJson(
      await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...validRegistration, email: 'nao-e-email' })
      })
    )
    assertCondition(invalidEmailRegister.status === 400, 'Invalid email register should return 400.')

    const weakPasswordRegister = await readJson(
      await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...validRegistration, email: `weak.${uniqueSuffix}@acode.local`, password: 'password' })
      })
    )
    assertCondition(weakPasswordRegister.status === 400, 'Weak password register should return 400.')

    const invalidPhoneRegister = await readJson(
      await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...validRegistration, email: `phone.${uniqueSuffix}@acode.local`, phone: 'abc' })
      })
    )
    assertCondition(invalidPhoneRegister.status === 400, 'Invalid phone register should return 400.')

    const providerWithoutCompany = await readJson(
      await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validRegistration,
          email: `provider.${uniqueSuffix}@acode.local`,
          username: `provider.${uniqueSuffix}`,
          role: 'provider'
        })
      })
    )
    assertCondition(providerWithoutCompany.status === 400, 'Provider without company should return 400.')

    const validRegister = await readJson(
      await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validRegistration)
      })
    )
    assertCondition(validRegister.status === 201, 'Valid register should return 201.')

    const duplicateRegister = await readJson(
      await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validRegistration)
      })
    )
    assertCondition(duplicateRegister.status === 409, 'Duplicate register should return 409.')

    const newUserLogin = await readJson(
      await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: validRegistration.email, password: validRegistration.password })
      })
    )
    assertCondition(newUserLogin.status === 200, 'Newly registered user should be able to login.')

    console.log('QA smoke passed: guest login, invalid payloads, registration and login are working.')
  } finally {
    await prisma.authSession.deleteMany({
      where: {
        user: {
          email: validRegistration.email
        }
      }
    })

    await prisma.user.deleteMany({
      where: {
        email: validRegistration.email
      }
    })

    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error)
          return
        }
        resolve()
      })
    })

    await prisma.$disconnect()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
