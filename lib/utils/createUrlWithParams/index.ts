interface UrlParams {
	base: string;
	[key: string]: string | number | undefined | null;
}

const createUrlWithParams = (params: UrlParams): string => {
	const { base, ...filters } = params;
	const query = Object.keys(filters)
		.map((key) =>
			filters[key] ? `${key}=${encodeURIComponent(filters[key]!)}` : ""
		)
		.filter((param) => param)
		.join("&");

	return query ? `${base}?${query}` : base;
};

export default createUrlWithParams;
