import { PrismaClient, UserAccountStatus, UserRole } from '@prisma/client'
import { hashPassword } from '../server/lib/password'

const prisma = new PrismaClient()

async function upsertUser(input: {
  id: string
  email: string
  fullName: string
  phone: string | null
  companyName: string | null
  password: string
  role: UserRole
  status: UserAccountStatus
  isSeeded: boolean
}) {
  const emailNormalized = input.email.trim().toLowerCase()
  const passwordHash = await hashPassword(input.password)

  await prisma.user.create({
    data: {
      id: input.id,
      email: input.email,
      emailNormalized,
      fullName: input.fullName,
      phone: input.phone,
      companyName: input.companyName,
      passwordHash,
      role: input.role,
      status: input.status,
      isSeeded: input.isSeeded
    }
  })
}

async function main() {
  await prisma.authSession.deleteMany({
    where: {
      user: {
        isSeeded: true
      }
    }
  })

  await prisma.user.deleteMany({
    where: {
      isSeeded: true
    }
  })

  await upsertUser({
    id: '11111111-1111-4111-8111-111111111111',
    email: 'username@guest.com',
    fullName: 'Guest Operator',
    phone: '+55 (61) 99999-0001',
    companyName: null,
    password: 'Password123@',
    role: UserRole.guest,
    status: UserAccountStatus.active,
    isSeeded: true
  })

  await upsertUser({
    id: '22222222-2222-4222-8222-222222222222',
    email: 'dev.user@acode.local',
    fullName: 'Dev User',
    phone: '+55 (61) 99999-0002',
    companyName: null,
    password: 'Password123@',
    role: UserRole.customer,
    status: UserAccountStatus.active,
    isSeeded: true
  })

  await upsertUser({
    id: '33333333-3333-4333-8333-333333333333',
    email: 'admin@acode.local',
    fullName: 'Admin Operator',
    phone: '+55 (61) 99999-0003',
    companyName: 'Acode Aqui Admin',
    password: 'Password123@',
    role: UserRole.admin,
    status: UserAccountStatus.active,
    isSeeded: true
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
