import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';

export const PAGES = [
  { key: 'about', path: '/' },
  { key: 'nexus', path: '/nexus' },
  { key: 'dataEngineering', path: '/data-engineering' },
  { key: 'qualifications', path: '/qualifications' },
  { key: 'contact', path: '/contact' },
];

export default function Nav({ t, lang, setLang }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  // CV is served from public/files/ (not bundled); pick the active language's file
  const cvFile = `${process.env.PUBLIC_URL}/files/${t.cv.file}`;
  const cvName = `Sulthan_MD_CV_${t.locale.toUpperCase()}.pdf`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  const linkClass = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition-colors ${
      isActive ? 'text-ink' : 'text-faint hover:text-muted'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-line bg-base/90 backdrop-blur-md'
          : 'border-transparent bg-base/60 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-mono text-base font-semibold tracking-tight text-ink">
            Sulthan MD
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-faint transition-colors group-hover:text-signal sm:inline">
            / Nexus
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {PAGES.map((page) => (
            <NavLink key={page.key} to={page.path} end={page.path === '/'} className={linkClass}>
              {({ isActive }) => (
                <>
                  {t.nav[page.key]}
                  {isActive && <span className="absolute -bottom-0.5 left-0 h-px w-full bg-signal" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={cvFile}
            download={cvName}
            className="hidden items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-3.5 py-2 text-sm font-semibold text-signal transition-colors hover:bg-signal/20 sm:inline-flex"
          >
            <Download size={15} />
            {t.nav.cv}
          </a>

          <div
            className="flex items-center overflow-hidden rounded-lg border border-line"
            role="group"
            aria-label={t.a11y.language}
          >
            {['de', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2.5 py-1.5 font-mono text-[11px] font-semibold uppercase transition-colors ${
                  lang === l ? 'bg-signal text-base' : 'text-faint hover:bg-raised hover:text-ink'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            className="rounded-lg border border-line p-2 text-muted lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? t.a11y.close : t.a11y.menu}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-surface lg:hidden">
          <nav className="mx-auto w-full max-w-6xl px-5 py-2 sm:px-8">
            {PAGES.map((page) => (
              <NavLink
                key={page.key}
                to={page.path}
                end={page.path === '/'}
                className={({ isActive }) =>
                  `block border-b border-line/60 py-3 text-sm font-medium last:border-0 ${
                    isActive ? 'text-signal' : 'text-muted'
                  }`
                }
              >
                {t.nav[page.key]}
              </NavLink>
            ))}
            <a
              href={cvFile}
              download={cvName}
              className="mb-3 mt-3 flex items-center justify-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-4 py-2.5 text-sm font-semibold text-signal"
            >
              <Download size={15} />
              {t.nav.cv}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
