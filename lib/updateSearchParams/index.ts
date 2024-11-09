import type { ReadonlyURLSearchParams } from "next/navigation";

interface SearchParam {
	key: string;
	value: string;
}

const updateSearchParams = ({
	params,
	searchParams,
	pathname,
}: {
	params: SearchParam[];
	searchParams: ReadonlyURLSearchParams;
	pathname: string;
}) => {
	const urlParams = new URLSearchParams(searchParams);
	params.forEach(({ key, value }) => {
		if (value) {
			urlParams.set(key, value);
		} else {
			urlParams.delete(key);
		}
	});

	return `${pathname}?${urlParams.toString()}`;
};

export default updateSearchParams;
