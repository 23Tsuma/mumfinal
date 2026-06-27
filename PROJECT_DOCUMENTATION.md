# Mum’s Backpackers Website Build — Full Project Reference

> Purpose: This document is a practical reference for the entire project: what it is, how to run it, the folder structure, routing/component overview, and key configuration files.

---

## 1) What this project is
A React + TypeScript web application built with Vite.

- **UI**: React components in `src/app/components/` and route wrappers in `src/app/App.tsx`.
- **Routing**: `react-router-dom` routes defined in `src/app/App.tsx`.
- **Styling**: Tailwind CSS + custom CSS in `src/styles/`.
- **Data**: property mapping data in `src/app/data/properties.ts`.
- **Assets**: images and media under `src/imports/`.

The application is route-driven for top navigation “tabs” via these main paths:
- `/` (home)
- `/stay`
- `/map`
- `/gallery`
- `/nearby`
- `/about-us`
- `/property/:propertyId` (property detail page)

---

## 2) Tech stack
- **Vite** (dev server + production build)
- **React 18** + **TypeScript**
- **react-router-dom**
- **Tailwind CSS** (with `@tailwindcss/vite`)
- **Leaflet** + **react-leaflet** (used in `src/app/components/DianiMap.tsx`)
- **lucide-react** icons

---

## 3) Scripts (how to run)
From `package.json`:
- `npm run dev`
  - Runs Vite with host `127.0.0.1` and strict port.
- `npm run build`
  - Runs `vite build`.

---

## 4) Vite configuration
File: `vite.config.ts`

Key behaviors:
- React + Tailwind plugins
- Custom `figmaAssetResolver()` allows imports like `figma:asset/<filename>`.
- Alias:
  - `@` → `./src`

---

## 5) TypeScript configuration
File: `tsconfig.json`

---

## 6) Folder structure (relevant)
- `src/app/App.tsx`
  - Defines routes and composes page sections.
- `src/app/components/`
  - Reusable UI components (Navbar, Hero, lists, CTA, etc.)
  - Includes `src/app/components/ui/*` (shadcn-style components)
- `src/app/pages/`
  - `AboutUs.tsx`
  - `PropertyDetails.tsx`
- `src/styles/`
  - `index.css`, `globals.css`, `theme.css`, `tailwind.css`, `aboutUs.css`, etc.
- `src/imports/`
  - Image assets grouped by resort/property

---

## 7) Routing & pages (all routes + composition)
Implemented in: `src/app/App.tsx`

### Route: `/`
Renders `SectionPage` with:
- `Hero`
- `FeaturedOfWeek`
- `FeaturedProperties`
- `DianiMap`
- `Blog`
- `Activities`
- `NearbyAttractions`
- `InstagramFeed`

### Route: `/stay`
Renders `SectionPage` with:
- `Hero`
- `FeaturedOfWeek`
- `FeaturedProperties`

### Route: `/map`
Renders `SectionPage` with:
- `Hero`
- `DianiMap`

### Route: `/gallery`
Renders `SectionPage` with:
- `Hero`
- `InstagramFeed`

### Route: `/nearby`
Renders `SectionPage` with:
- `Hero`
- `NearbyAttractions`

### Route: `/property/:propertyId`
- Page component: `src/app/pages/PropertyDetails.tsx`

### Route: `/about-us`
- Page component: `src/app/pages/AboutUs.tsx`

---

## 8) Top navigation “tabs” (active state)
Component updated: `src/app/components/Navbar.tsx`

### Behavior
Navbar now highlights the active tab based on `location.pathname`.

Active mapping (label → route):
- `Stay` → `/` or `/stay`
- `Nearby` → `/nearby`
- `Map` → `/map`
- `Gallery` → `/gallery`
- `About Us` → `/about-us`

### Implementation details
- Uses `useLocation()` and a memoized `activeNavLabel`.
- Applies active styles to matching nav button.

---

## 9) Property detail images (routes use dynamic propertyId)
File: `src/app/pages/PropertyDetails.tsx`

### Dynamic image selection helpers
- `toPropertyKey(propertyId)` maps `propertyId` to keys:
  - `mums`, `applemango`, `diani-pearl`, `flamboyant`, `coral`, `soulbreeze`, `bahari`, `sasafina`, `safina`

### Image paths referenced in `PropertyDetails.tsx`
Depending on the resolved property key:
- Common JPGs under `src/imports/images/`
  - `/src/imports/images/mums-1.jpg`
  - `/src/imports/images/mums-2.jpg`
  - `/src/imports/images/mums-3.jpg`
  - `/src/imports/images/mums-bed.jpg`
  - `/src/imports/images/applemango-1.jpg`
  - `/src/imports/images/applemango-2.jpg`
  - `/src/imports/images/apple-bed.jpg`
  - `/src/imports/images/flamboyant-1.jpg`
  - `/src/imports/images/flamboyant-2.jpg`
  - `/src/imports/images/flamboyant-3.jpg`
  - `/src/imports/images/flamboyant-4.jpg`
  - `/src/imports/images/flam-bed.jpg`
  - `/src/imports/images/soulbreeze-1.jpg`
  - `/src/imports/images/soulbreeze-2.jpg`
  - `/src/imports/images/soul-bed.jpg`
  - `/src/imports/images/bahari-1.jpg`
  - `/src/imports/images/bahari-bed.jpg`
  - `/src/imports/images/coral-1.jpg`
  - `/src/imports/images/coral-2.jpg`
  - `/src/imports/images/coral-bed.jpg`
  - `/src/imports/images/dianipearl-1.jpg`
  - `/src/imports/images/dianipearl-2.jpg`
  - `/src/imports/images/pearl-bed.jpg`
  - `/src/imports/images/sasafina-2.jpg`
  - `/src/imports/images/safina-bed.jpg`

- Special-case image sets using folders with special names:
  - Diani Pearl uses:
    - `/src/imports/diani pearl/Bathroom.webp`
    - `/src/imports/diani pearl/Bedroom.webp`
    - `/src/imports/diani pearl/dining.webp`
    - `/src/imports/diani pearl/Kitchen.webp`
    - `/src/imports/diani pearl/Living+room.webp`
    - `/src/imports/diani pearl/sitting.webp`
  - Soul Breeze uses:
    - `/src/imports/soul breeze/bedding.webp`
    - `/src/imports/soul breeze/Club+House.webp`
    - `/src/imports/soul breeze/Spa.webp`
  - Flamboyant uses:
    - `/src/imports/flamboyant/aerial.webp`
    - `/src/imports/flamboyant/bedroom.webp`
    - `/src/imports/flamboyant/sitting.webp`
    - `/src/imports/flamboyant/swimming.webp`
    - `/src/imports/flamboyant/veranda.jpg`
    - `/src/imports/flamboyant/Garden-View-Flamboyant-1.jpg`
    - `/src/imports/flamboyant/flambo.jpg`
  - Apple Mango uses:
    - Two-bedroom images:
      - `/src/imports/Apple Mango/two bedroom photos/1.jpeg`
      - `/src/imports/Apple Mango/two bedroom photos/2.jpeg`
      - `/src/imports/Apple Mango/two bedroom photos/3.jpeg`
      - `/src/imports/Apple Mango/two bedroom photos/4.jpeg`
      - `/src/imports/Apple Mango/two bedroom photos/5.jpeg`
    - Six-bedroom images:
      - `/src/imports/Apple Mango/six bedroom photos/2.jpeg`
      - `/src/imports/Apple Mango/six bedroom photos/3.jpeg`
      - `/src/imports/Apple Mango/six bedroom photos/5.jpeg`

---

## 10) WhatsApp / contact links referenced
Navbar and property pages reference a WhatsApp deep link:
- `https://wa.me/254700000000?...`

---

## 11) Files modified in this change
- `src/app/components/Navbar.tsx`
  - Added route-aware active tab styling using `useLocation()`.

