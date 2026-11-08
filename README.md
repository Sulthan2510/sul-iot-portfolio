# Portfolio — Sulthan MD

Personal portfolio of **Sulthan MD**, IoT and Data — Forward Deployment Engineer.

The site leads with **Nexus**, an IoT energy monitoring platform I designed, built and
operate — from the Janitza power analyser in a building's distribution board, over an
industrial cellular router and a WireGuard tunnel, to TimescaleDB and the dashboards on a
hardened Hetzner server. Six years of Azure data engineering sit behind it.

Everything is bilingual (**English / German**) and available in **light and dark**.

> **Deployment target:** `https://sulthan2510-iot-de-portfolio.vercel.app` — not connected yet.

---

## Running it

```bash
npm install
npm start          # http://localhost:3000
```

```bash
npm run build      # production bundle into build/
```

Node 20+ recommended (developed on Node 24).

---

## Regenerating the CVs

The downloadable CVs are **generated from the same data the site renders**, so they cannot
drift out of sync with the portfolio.

```bash
npm run build:cv
```

This renders an A4 HTML CV through **headless Chrome** and writes
`public/files/sulthan_cv_en.pdf` and `sulthan_cv_de.pdf`. To preview the HTML that becomes
the PDF:

```bash
node scripts/build-cv.mjs --html ./tmp
```

Requires Google Chrome, Chromium or Edge installed — the script probes the usual paths.
To change CV wording, edit the data (below) and re-run; never hand-edit the PDFs.

---

## Project layout

```
src/
  data/
    content.js          all site + CV copy, `en` and `de` branches
    legacy.js           career history: jobs, education, skills, client projects
    certifications.js   certificate list
  components/
    Nav.jsx             top nav; the IoT / Data Engineering dropdowns are defined here
    ProjectLayout.jsx   project page shell with the sticky section rail
    Hero.jsx  Contact.jsx  ui.jsx
    nexus/sections.jsx  the five Nexus sections
    diagram/
      primitives.jsx    shared SVG building blocks (Node, Zone, Band, Arrow, …)
      NexusDiagram.jsx  the Nexus data path
      ProjectDiagrams.jsx  one architecture diagram per client project
      FlowDiagram.jsx   animated source-to-target flow
  pages/                About, NexusPage, ProjectPage, Qualifications
  theme.jsx             light/dark provider + palette hook
  index.css             the colour tokens
scripts/build-cv.mjs    CV generator
```

### Pages

| Route | Content |
| --- | --- |
| `/` | About — bio and a timeline of five roles, each with an animated architecture preview |
| `/iot/nexus` | Nexus: overview, architecture, configuration, dashboards, analytics |
| `/iot/hochschule` | IoT & Data Engineering Pipeline — Hochschule Offenburg |
| `/iot/sensors` | IoT Sensors & Cloud Integration — Tampnet |
| `/data-engineering/navistar` | Enterprise Data Pipeline — Navistar International |
| `/data-engineering/lt` | Enterprise Vehicle Analytics Platform — L&T ECC |
| `/qualifications` | Skills, certifications & modules, education |
| `/contact` | Contact details and form |

Each project page carries a sticky section rail so you can jump straight to a section
instead of scrolling.

---

## Conventions

A few things worth knowing before editing.

**Bilingual by construction.** Every user-visible string lives in `src/data/content.js`
under both `en` and `de`, with matching array shapes. Adding a string to one language only
will break the other. German is the default.

**Colour lives in exactly one place.** `src/index.css` defines `--c-*` variables for both
themes as space-separated RGB channels. The Tailwind config in `public/index.html` maps
tokens onto them as `rgb(var(--c-x) / <alpha-value>)`, which is what keeps opacity
modifiers like `bg-signal/10` working. Never hardcode a hex in a component. SVG diagrams
read the same variables back at runtime via `usePalette()`.

Note that `text-base` is a Tailwind *font-size* utility — for text on a signal-coloured
background use `text-onSignal`.

**Tailwind comes from the CDN**, via a `<script>` tag in `public/index.html`, not from the
build. The `tailwindcss` dev dependency is not wired into PostCSS. That keeps the setup
simple, at the cost of a runtime dependency on the CDN.

**Architecture diagrams are hand-drawn SVG**, not images, so they stay sharp, searchable
and theme-aware.

---

## Deployment

Built for **Vercel** as a static SPA. `vercel.json` holds a catch-all rewrite to
`index.html`; without it, deep links like `/iot/nexus` would 404 on refresh.

Build command `npm run build`, output directory `build`.

---

## Stack

React 19 · React Router 7 · Create React App (react-scripts 5) · Tailwind CSS (CDN) ·
lucide-react · EmailJS · headless Chrome for PDF generation

---

## Contact

[sulthan2510@gmail.com](mailto:sulthan2510@gmail.com) ·
[LinkedIn](https://linkedin.com/in/sulthan2510) ·
[GitHub](https://github.com/sulthan2510)
