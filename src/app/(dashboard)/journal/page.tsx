import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

import NewEntryCard from '../../../components/NewEntryCard'
import EntryCard from '../../../components/EntryCard'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserByClerkID()
  console.log('user', user)
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  console.log('entries', entries)

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="h-full bg-zinc-400/10 p-10">
      <h2 className="mb-8 text-3xl">Journal Page</h2>

      <div className="grid grid-cols-3 gap-4 p-10">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
