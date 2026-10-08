# Orbit Health Solutions — Website Redesign

An original, responsive multi-page website for **Orbit Health Solutions PLC**, developed as an initial review build. The visual direction takes inspiration from the clarity, editorial typography, fluid ambient imagery and generous whitespace of Integrated Biosciences, without copying its layouts or assets.

## Included in v1

- `index.html` — immersive homepage, company introduction, eight solution categories, delivery approach, mobile clinics feature and contact calls to action.
- `solutions.html` — all eight medical equipment / infrastructure categories.
- `about.html` — company positioning and six published service areas.
- `contact.html` — office address, telephone links and working hours.
- `styles.css` — responsive design system, mobile layouts, accessible focus states and reduced-motion support.
- `main.js` — accessible mobile navigation and progressive scroll animations.
- `assets/orbit-mark.svg` — **provisional** conceptual mark; replace with the company's approved logo before launch.

## Publish on GitHub Pages

This is a static website with no build step. The publishing source is the `main` branch at `/(root)`.

1. Open **https://github.com/yohannesmulugeta/orbiths/settings/pages** while logged in as a repository admin.
2. In **Build and deployment**, choose **Source: Deploy from a branch**.
3. Choose **Branch: main** and **Folder: /(root)**, then click **Save**.
4. After GitHub finishes building, the site will be available at **https://yohannesmulugeta.github.io/orbiths/**.

Updates committed to `main` will automatically redeploy. The GitHub Pages URL is independent of the existing `orbiths.com` domain and does not modify its DNS.

## Run locally

No dependencies or build tools are required. From the repository root:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/`. Alternatively use VS Code Live Server.

## Content and production readiness

Company offerings, office information and numbers are based on the current public content of [orbiths.com](https://orbiths.com/). Verify all contact information, partner approvals, services and use of imagery with OrbitHS before launch. Avoid inventing equipment specifications, regulatory accreditations, client testimonials or case study results.

**Outstanding blockers for production:**

1. **Image migration:** some service photography is temporarily referenced from `orbiths.com/wp-content/uploads`. These assets **must be copied to repository/CDN storage before redirecting the domain**, otherwise they can break when WordPress is replaced. Optimize and license-check all imagery.
2. **Official brand assets:** replace the provisional mark with the approved logo, fonts/color specifications if they differ.
3. **Enquiry workflow:** the site uses working office telephone links now. Add and test a server-side contact form only after OrbitHS confirms an inbox and delivery provider. Do not claim submissions work without backend confirmation.
4. **Review:** verify copy, page content, contact details, and old URL redirect mapping with company stakeholders.
5. **Deployment:** the redesign has been merged to `main`. Enable GitHub Pages under Settings → Pages → Deploy from a branch → `main` / `(root)` to make the preview public. Keep existing production DNS untouched until a separately approved cutover.
6. **Search:** when final pages/URLs are approved, create a sitemap, robots file, canonical URLs, social share image and appropriate schema; verify analytics and Search Console.

## Design and development principles

- Semantic, readable HTML and keyboard-operable navigation.
- Responsive layout for desktop, tablet and mobile.
- CSS-led atmosphere, low-JS interactions and respect for `prefers-reduced-motion`.
- No invented operational metrics or success claims.
- Editorial content guides visitors from expertise → approach → conversation.

© Orbit Health Solutions PLC. This is a design/development draft.