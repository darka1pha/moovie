const getUpdatedPath = ({ param, value }: { param: string; value: string }) => {
	const currentParams = new URLSearchParams(window.location.search)
	currentParams.delete(param)
	currentParams.append(param, value)

	const newSearchParams = currentParams.toString()
	const newPathname = `/?${newSearchParams}`

	return newPathname
}

export default getUpdatedPath