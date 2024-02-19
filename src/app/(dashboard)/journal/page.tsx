import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

import NewEntryCard from '../../../components/NewEntryCard'
import EntryCard from '../../../components/EntryCard'

const getEntries = async () => {
  const user = await getUserByClerkID()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

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
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  )
}

export default JournalPage
