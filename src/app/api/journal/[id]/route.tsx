import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const PATCH = async (request: Request, { params }) => {
  const { updates } = await request.json()

  const user = await getUserByClerkID()
  const updateEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content: updates,
    },
  })

  return NextResponse.json({ data: updateEntry })
}
