"use server";

import { PersonDetails, PersonCombinedCredits } from "@/types";
import { fetchData } from "@/lib/services/fetchData";
import { PERSON_DETAILS, PERSON_COMBINED_CREDITS } from "../urls";

export const getPersonDetails = async ({ id }: { id: string }): Promise<PersonDetails> => {
	const res = await fetchData<PersonDetails>(PERSON_DETAILS(id));
	return res;
};

export const getPersonCombinedCredits = async ({
	id,
}: {
	id: string;
}): Promise<PersonCombinedCredits> => {
	const res = await fetchData<PersonCombinedCredits>(PERSON_COMBINED_CREDITS(id));
	return res;
};
