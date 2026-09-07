import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPersonDetails, getPersonCombinedCredits } from "@/app/actions/person";
import PersonView from "@/components/person/personView";
import { POSTER_URL } from "@/lib/tmdb/image";

interface Props {
	params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
	try {
		const { id } = await params;
		const person = await getPersonDetails({ id });

		const title = `${person.name} - Filmography & Biography`;
		const description =
			person.biography?.slice(0, 160) ||
			`Explore ${person.name}'s filmography, career highlights, and biography on Moovie.`;
		const imageUrl = person.profile_path
			? `${POSTER_URL({ quality: "w500" })}${person.profile_path}`
			: undefined;

		return {
			title,
			description,
			openGraph: {
				title,
				description,
				images: imageUrl ? [{ url: imageUrl }] : [],
			},
			twitter: {
				card: "summary_large_image",
				title,
				description,
				images: imageUrl ? [{ url: imageUrl }] : [],
			},
		};
	} catch {
		return {
			title: "Person Profile | Moovie",
			description: "Actor and crew profile details on Moovie.",
		};
	}
};

const PersonPage = async ({ params }: Props) => {
	const { id } = await params;

	let person = null;
	let credits = null;

	try {
		[person, credits] = await Promise.all([
			getPersonDetails({ id }),
			getPersonCombinedCredits({ id }),
		]);
	} catch {
		notFound();
	}

	if (!person) {
		notFound();
	}

	return <PersonView person={person} credits={credits} />;
};

export default PersonPage;
