import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export const getUserByClerkID = async () => {
  const { userId } = await auth()
  console.log("🚀 ~ getUserByClerkID ~ userId:", userId)

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  return user
}
