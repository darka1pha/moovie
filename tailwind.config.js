/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				fuelYellow: '#efae28',
				battleGrey: '#848485',
				balasticSea: '#2a292d',
			},
		},
		fontFamily: {
			popins: ['Poppins', 'sans-serif'],
		},
	},
	plugins: [require("daisyui")],
}
