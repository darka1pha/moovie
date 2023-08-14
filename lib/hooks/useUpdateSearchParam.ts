import { useRouter } from 'next/navigation'

export const useUpdateSearchParam = (scroll = false) => {
	const router = useRouter()

	const deleteSearchParam = ({ param }: { param: string }) => {
		const newSearchParams = new URLSearchParams(window.location.search)

		newSearchParams.delete(param.toLocaleLowerCase())

		const newPathname = `${
			window.location.pathname
		}?${newSearchParams.toString()}`

		router.push(newPathname, { scroll })
	}

	const setSearchParams = (params: { key: string; value: string }[]) => {
		const currentParams = new URLSearchParams(window.location.search)

		params.forEach(({ key }) => {
			currentParams.delete(key)
		})

		params.forEach(({ key, value }) => {
			currentParams.set(key, value)
		})

		const newSearchParams = currentParams.toString()

		const newPathname = `${window.location.pathname}?${newSearchParams}`

		router.push(newPathname, { scroll })
	}

	const getUpdatedPath = ({
		param,
		value,
	}: {
		param: string
		value: string
	}) => {
		const currentParams = new URLSearchParams(window.location.search)
		currentParams.delete(param)
		currentParams.set(param, value)

		const newSearchParams = currentParams.toString()

		const newPathname = `${window.location.pathname}?${newSearchParams}`

		return newPathname
	}

	return { setSearchParams, deleteSearchParam, getUpdatedPath }
}
