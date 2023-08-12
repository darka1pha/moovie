interface Props {
	name: string
	id: number
}

const FilterOption = ({ name, id }: Props) => {
	return (
		<button className={`bg-fuelYellow text-white px-4 py-1 text-sm rounded-3xl mx-2`}>
			{name}
		</button>
	)
}

export default FilterOption
