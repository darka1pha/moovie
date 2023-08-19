import { Navbar } from '@/components'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const popins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
	metadataBase: new URL('https://www.moovie-nine.vercel.app'),
	title: { default: 'Moovie', template: '%s | Moovie' },
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={`${popins.className}`}>
				<Navbar />
				{children}
			</body>
		</html>
	)
}
