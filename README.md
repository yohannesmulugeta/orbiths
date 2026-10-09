# Orbit Health Solutions PLC — React Website

A cinematic, image-led redesign of the OrbitHS website, inspired by the visual quality and storytelling approach of [Integrated Biosciences](https://integratedbiosciences.com/), while using **original layouts and original code** appropriate to OrbitHS.

## Tech stack

- **React 18 + TypeScript** — component architecture and typed company content.
- **Vite 6** — production bundling.
- **Tailwind CSS 3 + custom CSS** — responsive design and bespoke editorial layouts.
- **GSAP ScrollTrigger** — reveal animations with respect for reduced-motion preferences.
- **Lucide React** — lightweight vector icons.
- **React Router (hash routing)** — GitHub Pages-safe routes, including direct refreshes.

## Pages

1. Home — full-bleed, photographic medical hero; company introduction; editorial photo collage; eight equipment categories; delivery timeline; mobile clinics story; inquiry CTA.
2. Solutions — detailed overview of all eight equipment/infrastructure areas from the existing company site.
3. Company — company introduction and its six published service areas.
4. Contact — phone links, office location, hours and a local enquiry download.
5. Services — all six published services.
6. Partners — all 30 original partner logos, including recovered links.
7. Team — four management profiles and two original portraits.
8. Gallery — all 130 unique original photographs, with filters and accessible viewing.

See `CONTENT-MIGRATION.md` for the original-site audit and source details.

## Run locally

```bash
npm install
npm run dev
```

To check or compile:

```bash
npm test
npm run build
npm run preview
```

Node.js 22 is recommended.

## Publishing to GitHub Pages

The source HTML template is `app/index.html`; React code remains in `src/` and original optimized images are in `public/images/`. Vite builds to `dist/`.

The repository root also contains the compiled site for the existing GitHub Pages `main` / root configuration. This lets the redesign publish without changing Pages settings. Never replace the root `index.html` with unbuilt JSX.

```bash
npm ci
npm test
GITHUB_PAGES=true npm run build
npm run stage:pages
```

Commit the changed source **and staged compiled files**, then merge to main. If Pages is later switched to GitHub Actions, the included workflow publishes `dist/` directly. Local development uses `npm run dev`.

The review site is https://yohannesmulugeta.github.io/orbiths/ . Hash routing keeps navigation and refreshes reliable. The current WordPress domain is unaffected.

## Images and next improvements

All in-page images are local WebP files. Larger photos have 640px variants; the hero is prioritized and other images load lazily. See `IMPROVEMENT-PLAN.md` for sources, completed refinements and the next design/content priorities. Illustrative medical photography must not be labeled as Orbit installations or actual inventory. Some product references still need higher-resolution originals. The supplied official Orbit logo is used in the header and footer. The brand palette is blue `#0397D6`, lime `#C1D72E` and white, with darker blue tones for accessible text and buttons.

## Production checklist

- [ ] Confirm the company's approved logo, team, solution descriptions, addresses, phone numbers and business proof.
- [ ] Approve visuals, photo licensing and the distinction between stock/reference imagery and company project photos.
- [x] Localize and optimize images (WebP, responsive sizes, lazy loading).
- [ ] Add a secured contact workflow when an approved delivery address/provider is confirmed.
- [ ] Review accessibility, keyboard navigation, mobile and desktop design in the actual deployed site.
- [ ] If/when moving to the main domain, plan old URL redirects, canonical URLs, SEO, analytics and a rollback path.

**Orbit Health Solutions PLC.** All company facts require approval before a final public domain cutover.
