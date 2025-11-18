import { User as PrismaUser } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string
    }
  }
  
  interface User extends PrismaUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    name: string
  }
}
