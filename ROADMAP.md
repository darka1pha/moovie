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

---

## 🚀 Upcoming Roadmap

### 🌟 Phase 1: High-Impact "WOW" Features (Immediate Priority)

#### 1. 🎬 Cinema Mode & Official Trailer Player
- **Goal**: Allow users to watch official HD/4K trailers and teasers directly inside Moovie without leaving the site.
- **Scope**:
  - Integrate TMDB `/movie/{id}/videos` and `/tv/{id}/videos` endpoints.
  - Prioritize Official Trailers > Teasers > Featurettes on YouTube.
  - "Watch Trailer" button on the Homepage Hero and Show Details header.
  - Backdrop-blurred modal with auto-play, sound control, and keyboard `Esc` closing.
- **Target Components**:
  - `app/actions/shows/index.ts` (`getMovieVideos`, `getTvVideos`)
  - `components/trailerModal/index.tsx`
  - `components/hero/heroSlide.tsx` & `components/show/showHero.tsx`

#### 2. ⚡ Global Spotlight Search (`⌘K` / `Ctrl+K`)
- **Goal**: Instant discovery with live keyboard-accessible command bar.
- **Scope**:
  - Global hotkey listener (`Ctrl+K` on Windows/Linux, `⌘K` on macOS).
  - Search trigger icon in Navbar and Mobile Menu.
  - Debounced autocomplete querying TMDB `/search/multi`.
  - Rich result rows showing poster thumbnail, title, release year, media badge (`Movie` vs `TV`), and rating.
  - Full keyboard navigation (Arrow Up/Down, Enter to navigate, Esc to dismiss).
- **Target Components**:
  - `components/searchModal/index.tsx`
  - `components/navbar/searchTrigger.tsx`
  - `app/actions/search/index.ts`

#### 3. 📡 "Where to Watch" (Streaming Availability)
- **Goal**: Answer *"Where can I stream this right now?"* for any movie or TV series.
- **Scope**:
  - Integrate TMDB `/movie/{id}/watch/providers` and `/tv/{id}/watch/providers`.
  - Display categorized providers: **Stream** (Subscription e.g. Netflix, Disney+, Prime, Max), **Rent** (Apple TV, Google Play), and **Buy**.
  - Default to user's locale with a country selector dropdown (US, UK, CA, etc.).
  - Provider logo badges with direct deep-links (provided by JustWatch via TMDB).
- **Target Components**:
  - `components/show/watchProviders/index.tsx`
  - `app/actions/shows/index.ts` (`getWatchProviders`)

---

### 🎭 Phase 2: Deeper Database & Discovery

#### 4. 👤 Dedicated Actor & Crew Profiles (`/person/[id]`)
- **Goal**: Enable full filmography browsing when clicking any actor or director.
- **Scope**:
  - Create route `/person/[id]/page.tsx`.
  - Fetch TMDB `/person/{id}` and `/person/{id}/combined_credits`.
  - Display biography, birth date, birthplace, headshot photos, and known-for department.
  - Filmography timeline sorted by release date with filter by Movies vs. TV.
  - Link cast items in `components/show/credits/CastItem.tsx` directly to `/person/[id]`.

#### 5. 🖼️ Media Gallery & Wallpaper Lightbox
- **Goal**: Visual immersion with production stills and theatrical posters.
- **Scope**:
  - Integrate TMDB `/movie/{id}/images` and `/tv/{id}/images`.
  - Tabbed gallery: **Backdrops / Wallpapers** and **Posters**.
  - Interactive full-screen image viewer (lightbox) with next/prev image buttons and download option.

#### 6. 🎲 "Surprise Me" Movie Roulette
- **Goal**: Solve analysis paralysis for indecisive viewers.
- **Scope**:
  - Interactive "Roll the Dice" button on the navigation bar.
  - Modal with optional filters: Mood/Genre, Minimum Rating, and Release Era.
  - Animated rolling reel effect landing on a top-rated recommendation.

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

### ⚙️ Phase 4: Polish, Theme & Native Performance

#### 10. 📱 PWA (Progressive Web App) & Offline Caching
- **Goal**: Native installable app experience on desktop, Android, and iOS.
- **Scope**:
  - Add `public/manifest.json` with app icons, splash screens, and theme color `#121117`.
  - Implement a lightweight service worker (`public/sw.js`) for static asset caching.
  - Install prompt button in mobile menu.

#### 11. 🎨 Theme Accent Customizer
- **Goal**: Give users personalized control over visual aesthetics.
- **Scope**:
  - Accent color picker in user settings / navbar:
    - 🟡 **Fuel Yellow** (Default)
    - 🔵 **Cyberpunk Cyan** (`#00f0ff`)
    - 🔴 **Cinema Crimson / Netflix Red** (`#e50914`)
    - 🟢 **Emerald Matrix** (`#10b981`)
    - 🟣 **Neon Violet** (`#a855f7`)
  - Pure AMOLED Black toggle for OLED screens.
