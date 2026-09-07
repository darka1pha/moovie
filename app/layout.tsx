import Navbar from "@/components/navbar";
import MobileMenu from "@/components/mobileMenu";
import { SearchProvider } from "@/components/searchModal/searchContext";
import SearchModal from "@/components/searchModal";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const popins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-popins",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://moovie.darkalpha.ir"),
	title: { default: "Moovie", template: "%s | Moovie" },
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
		<html className={`bg-[#0d0c11] ${popins.variable}`} lang="en">
			<body cz-shortcut-listen="true" className={`${popins.className} min-h-screen bg-[#0d0c11] text-white antialiased selection:bg-fuelYellow selection:text-black`}>
				<SearchProvider>
					<Navbar />
					<main id="main-content">
						{children}
					</main>
					<MobileMenu />
					<SearchModal />
				</SearchProvider>
			</body>
		</html>
	);
}