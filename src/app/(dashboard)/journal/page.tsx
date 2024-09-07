import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

import { analyze } from "@/utils/ai";
import Link from "next/link";
import EntryCard from "../../../components/EntryCard";
import NewEntryCard from "../../../components/NewEntryCard";

const getEntries = async () => {
	const user = await getUserByClerkID();
	const entries = await prisma.journalEntry.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	await analyze(
		"create me a vue component that has a button and a text input field. When the button is clicked, the text input field should be cleared.",
	);

	return entries;
};

const JournalPage = async () => {
	const entries = await getEntries();
	console.log("🚀 ~ JournalPage ~ entries:", entries);

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
	);
};

export default JournalPage;
