/**
 * Builds the downloadable CV PDFs (EN + DE) from the same data the site uses,
 * so the CV can never drift from the portfolio.
 *
 *   npm run build:cv
 *
 * Renders HTML through headless Chrome. Output: public/files/sulthan_cv_{en,de}.pdf
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'files');

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
];

function findChrome() {
  const found = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
  if (!found) {
    throw new Error(
      'No Chrome/Chromium found. Install Google Chrome, or add its path to CHROME_CANDIDATES in scripts/build-cv.mjs.'
    );
  }
  return found;
}

/* certifications.js imports PDF assets, which Node cannot resolve.
   Strip the imports and neutralise the asset references, then import it. */
async function loadCertifications() {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'data', 'certifications.js'), 'utf8');
  const stripped = src
    .replace(/^import .*$/gm, '')
    .replace(/\bdigitalCompeteEu\b/g, 'null')
    .replace(/\bdatacampAssociate\b/g, 'null');
  const tmp = path.join(os.tmpdir(), `certs-${Date.now()}.mjs`);
  fs.writeFileSync(tmp, stripped);
  try {
    const mod = await import(pathToFileURL(tmp).href);
    return mod.certifications;
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function renderHtml({ lang, cv, legacyLang, extraSkillGroups, certifications }) {
  const L = legacyLang;

  // Nexus first, then the existing roles newest-first (already in that order).
  const jobs = [
    {
      role: cv.nexus.role,
      company: cv.nexus.company,
      client: cv.nexus.client,
      period: cv.nexus.period,
      bullets: cv.nexus.bullets.map((b) => ({ main: b, subs: [] })),
      featured: true,
    },
    ...L.jobs.map((j) => ({
      role: j.role,
      company: j.company,
      client: j.client,
      period: j.period,
      bullets: j.description,
    })),
  ];

  // IoT / networking / Linux groups lead, same order as the site's Qualifications page
  const skillGroups = [...extraSkillGroups, ...L.skillGroups];

  const jobHtml = jobs
    .map(
      (job) => `
      <article class="job${job.featured ? ' job--featured' : ''}">
        <div class="job__head">
          <div>
            <h3 class="job__role">${esc(job.role)}</h3>
            <p class="job__org">${esc(job.company)}${
              job.client ? ` <span class="job__client">· ${esc(cv.clientLabel)}: ${esc(job.client)}</span>` : ''
            }</p>
          </div>
          <span class="job__period">${esc(job.period)}</span>
        </div>
        <ul class="bullets">
          ${job.bullets
            .map(
              (b) => `<li>${esc(b.main)}${
                b.subs && b.subs.length
                  ? `<ul class="subs">${b.subs.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`
                  : ''
              }</li>`
            )
            .join('')}
        </ul>
      </article>`
    )
    .join('');

  const eduHtml = L.education
    .map(
      (e) => `
      <article class="edu">
        <div class="job__head">
          <div>
            <h3 class="job__role">${esc(e.degree)}</h3>
            <p class="job__org">${esc(e.school)}${e.location ? ` · ${esc(e.location)}` : ''}</p>
          </div>
          <span class="job__period">${esc(e.period)}</span>
        </div>
        ${
          e.details
            ? `<p class="edu__grade">${esc(e.details)}${e.gpa ? ` <strong>${esc(e.gpa)}</strong>` : ''}</p>`
            : ''
        }
      </article>`
    )
    .join('');

  const skillsHtml = skillGroups
    .map(
      (g) => `
      <div class="skill">
        <h4>${esc(g.category)}</h4>
        <p>${esc(g.skills)}</p>
      </div>`
    )
    .join('');

  const certHtml = certifications
    .map(
      (c) =>
        `<li><span class="cert__name">${esc(c.name[lang])}</span><span class="cert__meta">${esc(
          c.issuer
        )} · ${esc(c.date)}</span></li>`
    )
    .join('');

  const langHtml = L.spokenLanguages
    .map((l) => `<li><strong>${esc(l.language)}</strong> <span>${esc(l.level)}</span></li>`)
    .join('');

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${esc(cv.documentTitle)}</title>
<style>
  @page { size: A4; margin: 14mm 14mm 13mm; }

  *, *::before, *::after { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 9.1pt;
    line-height: 1.45;
    color: #1b2430;
  }
  h1, h2, h3, h4 { margin: 0; font-weight: 700; }
  p { margin: 0; }
  ul { margin: 0; padding: 0; list-style: none; }

  /* ── header ─────────────────────────────── */
  .header { border-bottom: 2.2pt solid #0f9b6c; padding-bottom: 7pt; margin-bottom: 11pt; }
  .header__name { font-size: 22pt; letter-spacing: -0.4pt; line-height: 1.1; }
  .header__title {
    margin-top: 2.5pt; font-size: 10.2pt; font-weight: 600; color: #0f9b6c;
    letter-spacing: 0.15pt;
  }
  .header__contact {
    margin-top: 6pt; display: flex; flex-wrap: wrap; gap: 4pt 11pt;
    font-size: 8.5pt; color: #4a5768;
  }
  .header__contact span::before { content: "•"; margin-right: 11pt; color: #b9c3cf; }
  .header__contact span:first-child::before { content: none; margin: 0; }

  /* ── sections ───────────────────────────── */
  .section { margin-top: 11pt; }
  .section__title {
    font-size: 8.6pt; text-transform: uppercase; letter-spacing: 1.3pt;
    color: #0f9b6c; padding-bottom: 2.5pt; margin-bottom: 7pt;
    border-bottom: 0.6pt solid #d8dfe7;
  }
  .profile { text-align: justify; color: #35414f; }

  /* ── jobs ───────────────────────────────── */
  .job, .edu { margin-bottom: 9pt; page-break-inside: avoid; }
  .job:last-child, .edu:last-child { margin-bottom: 0; }
  .job--featured {
    border-left: 2pt solid #0f9b6c; padding-left: 7pt; margin-left: -9pt;
  }
  .job__head {
    display: flex; justify-content: space-between; align-items: baseline;
    gap: 10pt; margin-bottom: 3pt;
  }
  .job__role { font-size: 10.2pt; }
  .job__org { font-size: 9pt; font-weight: 600; color: #0f9b6c; }
  .job__client { font-weight: 400; color: #5b6878; }
  .job__period {
    font-size: 8.3pt; color: #5b6878; white-space: nowrap; font-variant-numeric: tabular-nums;
  }
  .bullets li {
    position: relative; padding-left: 9pt; margin-top: 2.6pt;
    text-align: justify; color: #35414f;
  }
  .bullets li::before {
    content: ""; position: absolute; left: 0; top: 4.6pt;
    width: 2.6pt; height: 2.6pt; background: #0f9b6c; border-radius: 0.5pt;
  }
  .subs { margin-top: 1.5pt; }
  .subs li {
    position: relative; padding-left: 8pt; margin-top: 1.4pt;
    color: #5b6878; font-size: 8.5pt;
  }
  .subs li::before {
    content: ""; position: absolute; left: 0; top: 4pt;
    width: 2.6pt; height: 0.9pt; background: #9aa6b4; border-radius: 0;
  }

  .edu__grade { font-size: 8.8pt; color: #35414f; }

  /* ── skills ─────────────────────────────── */
  .skills { column-count: 2; column-gap: 13pt; }
  .skill { break-inside: avoid; margin-bottom: 5.5pt; }
  .skill h4 { font-size: 8.7pt; color: #1b2430; }
  .skill p { font-size: 8.4pt; color: #4a5768; }

  /* ── certifications ─────────────────────── */
  .certs { column-count: 2; column-gap: 13pt; }
  .certs li { break-inside: avoid; margin-bottom: 3pt; font-size: 8.4pt; }
  .cert__name { display: block; font-weight: 600; color: #1b2430; }
  .cert__meta { color: #5b6878; }

  /* ── languages ──────────────────────────── */
  .langs { display: flex; flex-wrap: wrap; gap: 5pt 20pt; font-size: 8.8pt; }
  .langs span { color: #4a5768; }
</style>
</head>
<body>
  <header class="header">
    <h1 class="header__name">Sulthan MD</h1>
    <p class="header__title">${esc(cv.headline)}</p>
    <div class="header__contact">
      <span>sulthan2510@gmail.com</span>
      <span>linkedin.com/in/sulthan2510</span>
      <span>github.com/sulthan2510</span>
      <span>${esc(cv.locationLabel)}</span>
    </div>
  </header>

  <section class="section">
    <h2 class="section__title">${esc(cv.profileTitle)}</h2>
    <p class="profile">${esc(cv.profile)}</p>
  </section>

  <section class="section">
    <h2 class="section__title">${esc(cv.experienceTitle)}</h2>
    ${jobHtml}
  </section>

  <section class="section">
    <h2 class="section__title">${esc(cv.educationTitle)}</h2>
    ${eduHtml}
  </section>

  <section class="section">
    <h2 class="section__title">${esc(cv.skillsTitle)}</h2>
    <div class="skills">${skillsHtml}</div>
  </section>

  <section class="section">
    <h2 class="section__title">${esc(cv.certificationsTitle)}</h2>
    <ul class="certs">${certHtml}</ul>
  </section>

  <section class="section">
    <h2 class="section__title">${esc(cv.languagesTitle)}</h2>
    <ul class="langs">${langHtml}</ul>
  </section>
</body>
</html>`;
}

async function main() {
  const chrome = findChrome();
  const { content } = await import(pathToFileURL(path.join(ROOT, 'src/data/content.js')).href);
  const { legacy } = await import(pathToFileURL(path.join(ROOT, 'src/data/legacy.js')).href);
  const certifications = await loadCertifications();

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const lang of ['en', 'de']) {
    const cv = content[lang].cv;
    const html = renderHtml({
      lang,
      cv,
      legacyLang: legacy[lang],
      extraSkillGroups: content[lang].extraSkillGroups,
      certifications,
    });

    // `--html <dir>` also drops the source HTML there, for previewing in a browser
    const htmlFlag = process.argv.indexOf('--html');
    if (htmlFlag !== -1 && process.argv[htmlFlag + 1]) {
      fs.writeFileSync(path.join(process.argv[htmlFlag + 1], `cv-${lang}.html`), html, 'utf8');
    }

    const tmpHtml = path.join(os.tmpdir(), `cv-${lang}-${Date.now()}.html`);
    fs.writeFileSync(tmpHtml, html, 'utf8');

    const outPdf = path.join(OUT_DIR, cv.file);
    execFileSync(
      chrome,
      [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--no-pdf-header-footer',
        '--run-all-compositor-stages-before-draw',
        '--virtual-time-budget=4000',
        `--print-to-pdf=${outPdf}`,
        pathToFileURL(tmpHtml).href,
      ],
      { stdio: 'pipe' }
    );
    fs.rmSync(tmpHtml, { force: true });

    const { size } = fs.statSync(outPdf);
    console.log(`  ${cv.file}  ${(size / 1024).toFixed(0)} kB`);
  }
  console.log('CV PDFs written to public/files/');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
