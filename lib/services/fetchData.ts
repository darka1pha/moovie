"use server";
import { BASE_URL } from "../../app/actions/urls";

interface FetchOptions extends RequestInit {
	method?: "GET" | "POST" | "PUT" | "DELETE";
}

export async function fetchData<T>(
	url: string,
	options: FetchOptions = {}
): Promise<T> {
	const { headers = {}, ...rest } = options;
	const requestUrl = BASE_URL + url;
	const defaultHeaders = {
		"Content-Type": "application/json",
		...headers,
	};

	try {
		const response = await fetch(requestUrl, {
			...rest,
			headers: defaultHeaders,
		});

		if (!response.ok) {
			const body = await response.text().catch(() => "");
			throw new Error(
				`Request failed with status: ${response.status}${body ? ` — ${body}` : ""}`
			);
		}

		return (await response.json()) as T;
	} catch (error) {
		console.error(`Error fetching ${requestUrl}:`, error);
		throw error;
	}
}