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
4. Contact — phone links, office location and hours.

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

This React site **must deploy its compiled `dist/` files**, not raw `src/` code or `index.html` from the repository root.

1. Open [Repository settings → Pages](https://github.com/yohannesmulugeta/orbiths/settings/pages).
2. Under **Build and deployment**, set **Source** to **GitHub Actions**. Do not leave it on `Deploy from a branch`.
3. Merge the React pull request to `main`.
4. The workflow `.github/workflows/pages.yml` automatically installs dependencies, runs source checks, builds with `GITHUB_PAGES=true` and deploys `dist/`.
5. Confirm the successful **Build and deploy OrbitHS (React)** workflow on the [Actions tab](https://github.com/yohannesmulugeta/orbiths/actions).
6. Open `https://yohannesmulugeta.github.io/orbiths/`.

`vite.config.ts` sets base to `/orbiths/` for Pages. Navigation uses hash routing (`#/solutions`, `#/about`) to avoid GitHub Pages 404s on hard refresh. A production domain migration can later use URL-based routing/SSG if required for SEO.

**The GitHub Pages URL is a staging/review website**. Do not point `orbiths.com` to this site before the company approves the content and imagery.

## Image policy

- High-resolution radiology and microscope imagery uses selected **free Unsplash photos**: [medical scanner](https://unsplash.com/fr/photos/une-grande-machine-blanche-QTP8UKW_PgI) and [medical microscope](https://unsplash.com/photos/a-microscope-being-used-to-examine-a-substance-YDLlT9DNOI4).
- Category photos include media from the existing `orbiths.com/wp-content/uploads/` site.
- The live website currently loads some images from these external hosts. **Prior to replacing old WordPress hosting, obtain approval, optimize the originals and migrate them to `public/images` or an approved CDN.** This also avoids broken remote media if the old server is retired.
- Illustrative equipment photography **must not be presented as installed systems, actual inventory or company projects** unless OrbitHS confirms that claim.
- The orbital brand mark is a **provisional design**, not the company's official logo.

## Production checklist

- [ ] Confirm the company's approved logo, team, solution descriptions, addresses, phone numbers and business proof.
- [ ] Approve visuals, photo licensing and the distinction between stock/reference imagery and company project photos.
- [ ] Localize and optimize images (WebP/AVIF, responsive sizes, lazy loading).
- [ ] Add a secured contact workflow when an approved delivery address/provider is confirmed.
- [ ] Review accessibility, keyboard navigation, mobile and desktop design in the actual deployed site.
- [ ] If/when moving to the main domain, plan old URL redirects, canonical URLs, SEO, analytics and a rollback path.

**Orbit Health Solutions PLC.** All company facts require approval before a final public domain cutover.
