import Navbar from "@/components/navbar";
import MobileMenu from "@/components/mobileMenu";
import { SearchProvider } from "@/components/searchModal/searchContext";
import SearchModal from "@/components/searchModal";
import { ThemeProvider } from "@/components/theme/themeContext";
import ThemeCustomizerModal from "@/components/theme/themeCustomizerModal";
import PwaRegistrar from "@/components/pwa/pwaRegistrar";
import InstallPrompt from "@/components/pwa/installPrompt";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

const popins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-popins",
});

export const viewport: Viewport = {
	themeColor: "#121117",
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

export const metadata: Metadata = {
	metadataBase: new URL("https://moovie.darkalpha.ir"),
	title: { default: "Moovie", template: "%s | Moovie" },
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "Moovie",
	},
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/icons/favicon.svg", type: "image/svg+xml" },
			{ url: "/icons/icon-192x192.png", type: "image/png", sizes: "192x192" },
		],
		apple: "/icons/apple-touch-icon.png",
		shortcut: "/favicon.ico",
	},
	keywords:
		"فیلم, سریال, فیلم‌های جدید, سینما, تریلر, اطلاعات فیلم, تماشای آنلاین, فیلم‌های اکشن, کمدی, درام, هیجان‌انگیز, خانوادگی, انیمیشن, برنده جایزه, هالیوود, بالیوود, باکس آفیس, فیلم‌های محبوب, اکران جدید, نقد و بررسی فیلم, نتفلیکس, پرایم ویدیو, دیزنی+, اچ‌بی‌او, فیلم‌های کلاسیک, فیلم‌های ترسناک, علمی تخیلی, عاشقانه, مستند, تاریخی, جشنواره فیلم, فیلم‌های پرفروش, زیرنویس فارسی, دوبله,movies, TV shows, latest movies, popular movies, movie reviews, streaming, cinema, trailers, series, shows, online streaming, Moovie, film ratings, box office, new releases, action movies, comedy, drama, thriller, family movies, animated films, award-winning movies, Hollywood, Bollywood, blockbuster, Netflix, Prime Video, Disney+, HBO, classic films, horror movies, sci-fi, romance, documentary, historical movies, film festivals, top-rated movies, binge-watching, celebrity news, movie trailers, upcoming movies, subtitles, dubbed movies, streaming platforms",
	description: "Track all movie and series details and reviews.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html className={`bg-[#0d0c11] ${popins.variable}`} lang="en" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var a=localStorage.getItem('moovie-theme-accent')||'yellow';var o=localStorage.getItem('moovie-theme-amoled')==='true';document.documentElement.setAttribute('data-theme-accent',a);document.documentElement.setAttribute('data-amoled',o?'true':'false');}catch(e){}})();`,
					}}
				/>
			</head>
			<body cz-shortcut-listen="true" className={`${popins.className} min-h-screen bg-[#0d0c11] text-white antialiased selection:bg-fuelYellow selection:text-black`}>
				<ThemeProvider>
					<SearchProvider>
						<Navbar />
						<main id="main-content">
							{children}
						</main>
						<MobileMenu />
						<SearchModal />
						<ThemeCustomizerModal />
						<InstallPrompt />
						<PwaRegistrar />
					</SearchProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}