# Booked & Paid — The Pre-Order Engine

Marketing site for a done-for-you pre-order setup (order page, deposit checkout, pickup slots, reminder texts) for bakers, juice makers and artists. Built as the conversion-focused alternative to a "simple site + sales system" pitch.

## Stack

TanStack Start + React 19 + Tailwind v4, built by Vite with nitro's `cloudflare-module` preset and deployed as a Cloudflare Worker.

```bash
bun install
bun run dev        # local dev
bun run build      # production build to .output/
bun run deploy     # build + wrangler deploy
```

## Where to edit

- `src/lib/site.ts` — brand, contact email/phone, founder, offer price, value stack, guarantee switch, build-slot scarcity. **Empty values are hidden** — never ship placeholder contact details or fake scarcity.
- `src/lib/demos.ts` — the three demo stores (bakery, juice, artist). They are clearly labeled demos; no card is ever charged.
- `src/routes/index.tsx` — home page sections (hero, pain, calculator, how it works, value stack, comparison, demos, downsell, FAQ, final CTA).
- `src/routes/start.tsx` — application form. Opens the visitor's email app addressed to `BRAND.email`; set it before launch.

## Before launch

1. Set `BRAND.email` (and optionally phone and founder) in `src/lib/site.ts`.
2. Confirm the guarantee terms in `GUARANTEE` are ones you'll honor — or set `enabled: false`.
3. Only set `SLOTS.current` if the build-slot limit is real.
4. Add a custom domain to `wrangler.jsonc` and update `SITE_URL`.
