# API Candidate Submission Example

Vite + React + Nitro project that shows how to send a candidate application (including a CV upload) to an external API using `multipart/form-data`.

## What’s inside

- Vite + React 18 with [HeroUI](https://www.heroui.dev/) and TailwindCSS for a minimal UI.
- Two routes: `/` (landing) and `/form` (candidate form).
- Nitro server route at `/api/apply` that proxies the form submission to API endpoint, signs the request with a SHA-256 hash, and forwards the uploaded CV.
- Light/dark theme toggle wired to HeroUI’s provider.
- Basic linting setup via ESLint + Prettier.

## Project layout

- `app/` – React app (pages, components, styles, utilities).
  - `pages/index.tsx` – landing page with quick links.
  - `pages/form.tsx` – candidate form with validation, dry-run toggle, and submission status.
  - `components/` – navbar, icons, theme switch, text primitives.
  - `provider.tsx` – wraps HeroUI with React Router navigation helpers.
- `server/api/apply.ts` – Nitro handler that builds the multipart payload and forwards it to the API.
- `vite.config.ts` – Vite + Nitro + Tailwind + TS path aliases.
- `tailwind.config.js` / `postcss.config.js` – TailwindCSS 4 setup.

## Running locally

Prerequisites: Node 18+ and [pnpm](https://pnpm.io) (or swap in npm/yarn with equivalent commands).

```bash
pnpm install
pnpm dev
# Open http://localhost:3000
```

The dev server serves both the React app and the Nitro API route. Submitting the form will POST to `/api/apply`.

## API flow

1) The form builds a `FormData` payload with fields like `name`, `email`, `role`, `experienceYears`, `experienceLevel` `salary`, `message`, and the CV file (`cv`).  
2) When the “Testing mode” switch is on, an `isDryRun=true` flag is included and the server will add an `x-dry-run` header.  
3) `server/api/apply.ts` generates a timestamped SHA-256 signature (`x-timestamp`, `x-signature`), forwards the file and JSON payload, and responds with the upstream result.

If you want to target a different API, adjust the URL and headers in `server/api/apply.ts`. The handler currently uses an `undici` `ProxyAgent`; replace or remove it if you need a direct connection.

## Building and previewing

```bash
pnpm build      # production build
pnpm preview    # preview the built app locally
```

## Linting

```bash
pnpm lint
```

## Notes

- Set environment variable `API_URL` to send a candidate application to an external API.
