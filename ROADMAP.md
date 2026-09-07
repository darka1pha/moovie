# 🎬 Moovie Platform Roadmap & Feature Backlog

This document outlines the strategic roadmap, planned architectural enhancements, and feature backlog for **Moovie**.

---

## 🏆 Completed Milestones

- [x] **Production-Grade Refactoring**: React 19 RSC/Client boundary segregation, Server-only secrets isolation, zero synchronous `setState` effects, React Compiler compliance.
- [x] **Accessibility & WCAG 2.1 AA**: Full keyboard navigability, semantic ARIA roles, high-contrast focus rings (`focus-visible:outline-fuelYellow`).
- [x] **Homepage Redesign**: Hero showcase + 6 multi-category discovery carousels (Trending Now, Most Popular Movies, Top Rated Movies, Upcoming Releases, Popular TV Series, Highest Rated TV Shows).
- [x] **Dedicated Explore Pages**: `/movies` and `/tv` routes with 0ms optimistic multi-criteria filter bars (Genre, Year, Sort By, Min Rating, Reset Filters) and pagination.
- [x] **Redesigned Details Page**:
  - **Top Cast Carousel**: Glassmorphic cards with responsive photos, "Lead" badges, character pills, and custom carousel controls.
  - **Audience Reviews**: Community score calculation (average rating), quick filter tabs (All vs. Highest Rated), TMDB/Gravatar avatars, and expandable excerpts.
  - **Similar Titles Carousel**: Smooth native scroll carousel with "Explore All" route links.
- [x] **Next.js 16 Optimization**: Strict image quality configuration `[75, 80]` in `next.config.ts`.
- [x] **Cinema Mode & Official Trailer Player**: Direct HD/4K YouTube trailer playback with backdrop-blur, ambient cinema lighting, multi-video playlist switcher, keyboard `Esc` closing, and integration into Homepage Hero and Show Details header & poster.

---

## 🚀 Upcoming Roadmap

### 🌟 Phase 1: High-Impact "WOW" Features (Immediate Priority)

#### 1. 🎬 Cinema Mode & Official Trailer Player ✅ (Completed)
- **Goal**: Allow users to watch official HD/4K trailers and teasers directly inside Moovie without leaving the site.
- **Scope**:
  - [x] Integrate TMDB `/movie/{id}/videos` and `/tv/{id}/videos` endpoints.
  - [x] Prioritize Official Trailers > Teasers > Featurettes on YouTube.
  - [x] "Watch Trailer" button on the Homepage Hero and Show Details header & poster hover.
  - [x] Backdrop-blurred modal with auto-play, ambient lighting glow, and keyboard `Esc` closing.
- **Target Components**:
  - `app/actions/shows/index.ts` (`getMovieVideos`, `getTvVideos`, `getShowVideos`)
  - `components/trailerModal/index.tsx` & `components/trailerModal/watchTrailerButton.tsx`
  - `components/hero/heroSlide.tsx` & `components/show/showHero.tsx`

#### 2. ⚡ Global Spotlight Search (`⌘K` / `Ctrl+K`) ✅ (Completed)
- **Goal**: Instant discovery with live keyboard-accessible command bar.
- **Scope**:
  - [x] Global hotkey listener (`Ctrl+K` on Windows/Linux, `⌘K` on macOS).
  - [x] Search trigger button in Navbar with OS-adaptive keyboard badge (`Ctrl K` / `⌘K`).
  - [x] Debounced autocomplete (260ms) querying TMDB `/search/multi`.
  - [x] Instant trending & popular suggestions when query is empty.
  - [x] Rich result rows showing poster thumbnail, title, release year, media badge (`Movie` vs `TV Series`), star rating, and overview.
  - [x] Full keyboard navigation (Arrow Up/Down, Enter to navigate, Tab to filter, Esc to dismiss).
- **Target Components**:
  - `components/searchModal/index.tsx` & `components/searchModal/searchContext.tsx`
  - `components/navbar/searchTrigger.tsx`
  - `app/actions/search/index.ts`

#### 3. 📡 "Where to Watch" (Streaming Availability) ✅ (Completed)
- **Goal**: Answer *"Where can I stream this right now?"* for any movie or TV series.
- **Scope**:
  - [x] Integrate TMDB `/movie/{id}/watch/providers` and `/tv/{id}/watch/providers`.
  - [x] Display categorized providers: **Stream** (Subscription e.g. Netflix, Disney+, Prime, Max), **Free / Ads**, **Rent** (Apple TV, Google Play), and **Buy**.
  - [x] Dynamic country selector dropdown with flags supporting 100+ countries, defaulting to US / available region.
  - [x] High-res provider logo badges with direct deep-links powered by JustWatch.
  - [x] JustWatch attribution badge conforming to TMDB API guidelines.
- **Target Components**:
  - `components/show/watchProviders.tsx`
  - `app/actions/shows/index.ts` (`getMovieWatchProviders`, `getTvWatchProviders`, `getShowWatchProviders`)
  - `components/show/details.tsx` & `components/show/showHero.tsx`
  - `app/movie/[id]/page.tsx` & `app/tv/[id]/page.tsx`

---

### 🎭 Phase 2: Deeper Database & Discovery ✅ (Completed)

#### 4. 👤 Dedicated Actor & Crew Profiles (`/person/[id]`) ✅ (Completed)
- **Goal**: Enable full filmography browsing when clicking any actor or director.
- **Scope**:
  - [x] Create route `/person/[id]/page.tsx`.
  - [x] Fetch TMDB `/person/{id}` and `/person/{id}/combined_credits`.
  - [x] Display biography with expand/collapse, birth date, computed age, birthplace, headshot photo, and IMDb link.
  - [x] Filmography timeline & grid sorted by release date with filter tabs (All / Movies / TV / Crew).
  - [x] Link cast items in `components/show/credits/CastItem.tsx` directly to `/person/[id]`.
- **Target Components**:
  - `app/person/[id]/page.tsx` & `components/person/personView.tsx`
  - `app/actions/person/index.ts`
  - `components/show/credits/CastItem.tsx`

#### 5. 🖼️ Media Gallery & Wallpaper Lightbox ✅ (Completed)
- **Goal**: Visual immersion with production stills and theatrical posters.
- **Scope**:
  - [x] Integrate TMDB `/movie/{id}/images` and `/tv/{id}/images`.
  - [x] Tabbed gallery: **Backdrops / Wallpapers** and **Posters** with resolution badges.
  - [x] Interactive full-screen image viewer (lightbox) with arrow navigation, full-res download/open, and keyboard shortcuts (`←`/`→`/`ESC`).
- **Target Components**:
  - `components/show/mediaGallery/index.tsx`
  - `app/actions/shows/index.ts` (`getMovieImages`, `getTvImages`, `getShowImages`)
  - `app/movie/[id]/page.tsx` & `app/tv/[id]/page.tsx`

#### 6. 🎲 "Surprise Me" Movie Roulette ✅ (Completed)
- **Goal**: Solve analysis paralysis for indecisive viewers.
- **Scope**:
  - [x] Interactive "Surprise Me" dice button on the navigation bar.
  - [x] Modal with optional filters: Mood/Genre, Minimum Rating, Release Era, and Media Type.
  - [x] Animated slot-machine rolling reel effect landing on a top-rated surprise recommendation.
  - [x] Winning card with "Watch Details" and "Re-Roll" actions.
- **Target Components**:
  - `components/roulette/rouletteTrigger.tsx` & `components/roulette/rouletteModal.tsx`
  - `app/actions/roulette/index.ts`
  - `components/navbar/index.tsx`

---

### 👥 Phase 3: Personalization & Community

#### 7. 📋 Watchlists & "Mark as Watched"
- **Goal**: Expand user engagement beyond simple favorites into a complete tracking tool.
- **Scope**:
  - Supabase database tables: `user_watchlist` and `user_history`.
  - Quick action buttons on cards and detail heroes:
    - `+ Watchlist` ("Want to Watch")
    - `✓ Watched` ("Already Seen")
  - Filterable library tabs on the user Profile and dedicated `/watchlist` page.

#### 8. ⭐ Personal Star Rating & User Reviews
- **Goal**: Enable Moovie users to contribute their own ratings and reviews.
- **Scope**:
  - Interactive 10-star rating selector on Show Details.
  - Review editor with markdown support saved to Supabase `user_reviews`.
  - Display registered user reviews alongside TMDB community reviews with verified user badges.

#### 9. 📤 Social Sharing Cards
- **Goal**: Make sharing titles effortless across social platforms.
- **Scope**:
  - Dynamic OpenGraph image generation with movie backdrop, title, and rating (`/movie/[id]/opengraph-image`).
  - Share modal with 1-click copy link and direct share to WhatsApp, Telegram, and X (Twitter).

---

### ⚙️ Phase 4: Polish, Theme & Native Performance ✅ (Completed)

#### 10. 📱 PWA (Progressive Web App) & Offline Caching ✅ (Completed)
- **Goal**: Native installable app experience on desktop, Android, and iOS.
- **Scope**:
  - [x] Add `public/manifest.json` with high-res icons (192px, 512px, maskable, SVG), shortcuts, and theme color `#121117`.
  - [x] Implement lightweight service worker (`public/sw.js`) with cache-first static assets, stale-while-revalidate for TMDB images, and offline fallback (`public/offline.html`).
  - [x] Native install prompt banner with smooth animations and iOS "Add to Home Screen" instructions modal (`components/pwa/installPrompt.tsx`).
  - [x] PWA registrar component mounted in root layout (`components/pwa/pwaRegistrar.tsx`).
  - [x] Native PWA installation card inside user settings (`components/profile/themeSettingsCard.tsx`).
- **Target Components**:
  - `public/manifest.json`, `public/sw.js`, `public/offline.html`
  - `components/pwa/pwaRegistrar.tsx`, `components/pwa/installPrompt.tsx`
  - `app/layout.tsx`

#### 11. 🎨 Theme Accent Customizer ✅ (Completed)
- **Goal**: Give users personalized control over visual aesthetics with real-time feedback.
- **Scope**:
  - [x] 5 curated cinema accent color presets:
    - 🟡 **Fuel Yellow** (Default: `#efae28`)
    - 🔵 **Cyberpunk Cyan** (`#00f0ff`)
    - 🔴 **Cinema Crimson / Netflix Red** (`#e50914`)
    - 🟢 **Emerald Matrix** (`#10b981`)
    - 🟣 **Neon Violet** (`#a855f7`)
  - [x] Pure AMOLED Black toggle (`#000000`) for OLED panels and infinite contrast.
  - [x] CSS variables architecture in `app/globals.css` dynamically mapped to Tailwind CSS v4 `@theme`.
  - [x] Zero-flash inline script in `app/layout.tsx` `<head>` for instant loading from `localStorage`.
  - [x] Interactive Theme Customizer modal with live interface preview card (`components/theme/themeCustomizerModal.tsx`).
  - [x] Theme palette trigger in main navbar (`components/navbar/themeTrigger.tsx`).
  - [x] Full "Appearance & Theme" settings card on Profile page (`components/profile/themeSettingsCard.tsx`).
- **Target Components**:
  - `app/globals.css`
  - `components/theme/themeContext.tsx`, `components/theme/themeCustomizerModal.tsx`
  - `components/navbar/themeTrigger.tsx`
  - `components/profile/themeSettingsCard.tsx`
  - `app/layout.tsx`
