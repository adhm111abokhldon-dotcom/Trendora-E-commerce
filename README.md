# Trendora — Frontend

React storefront for the Trendora e-commerce demo (this repository's `Trendora-backend` provides the API).

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4, shadcn/ui components, framer-motion, Swiper
- TanStack Query (server state), React Router v7, react-hook-form + zod
- Axios client (`src/lib/api.js`) configured via `VITE_API_URL`
- Built-in EN/AR localization with RTL support (`src/i18n`, no external i18n library)

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and set the API base URL:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. Start the backend (see `../Trendora-backend`) — it serves the API on port `5000`.

## Scripts

| Command              | Purpose         |
| -------------------- | --------------- |
| `npm run dev`        | Dev server      |
| `npm run build`      | Production build|
| `npm run lint`       | ESLint          |
| `npx tsc --noEmit`   | Type-check      |

## API contract

Backend responses use the envelope `{ status, data: {...} }`; the functions in `src/api/*`
unwrap it so components only ever see the payload.

## Localization

- Dictionaries live in `src/i18n/en.ts` and `src/i18n/ar.ts` (typed by `TranslationKey`).
- `useI18n().t(key, vars)` resolves keys with `{token}` interpolation.
- The chosen language is persisted in `localStorage` (`lang`) and applied to
  `<html lang dir>`, so Tailwind logical properties (`ms-*`, `me-*`, `start-*`,
  `end-*`, `rtl:*`) drive the RTL layout.
