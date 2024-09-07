import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createUser = async () => {
	const user = await currentUser();
	console.log("🚀 ~ createUser ~ user:", user);

	const match = await prisma.user.findUnique({
		where: {
			clerkId: user.id as string,
		},
	});
	console.log("🚀 ~ createUser ~ match:", match);
	if (!match) {
		await prisma.user.create({
			data: {
				clerkId: user.id,
				email: user?.emailAddresses[0].emailAddress,
			},
		});
	}
	redirect("/journal");
};
const NewUser = async () => {
	await createUser();
	return (
		<div>
			<h1>...loading</h1>
		</div>
	);
};

export default NewUser;
