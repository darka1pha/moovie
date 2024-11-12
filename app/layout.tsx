import { Navbar } from '@/components';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const popins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-popins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.moovie-nine.vercel.app'),
  title: { default: 'Moovie', template: '%s | Moovie' },
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className='bg-[#0d0c11]'
      lang='en'
    >
      <body className={`${popins.className} noSelect min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
