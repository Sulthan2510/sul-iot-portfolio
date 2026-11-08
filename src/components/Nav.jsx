import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Download, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme';

/* Two project groups (IoT, Data Engineering) open as dropdowns;
   the rest are plain links. Paths live here so App and Nav cannot drift. */
export const NAV = [
  { key: 'about', path: '/' },
  {
    key: 'iot',
    children: [
      { key: 'nexus', path: '/iot/nexus' },
      { key: 'hochschule', path: '/iot/hochschule' },
      { key: 'sensors', path: '/iot/sensors' },
    ],
  },
  {
    key: 'dataEngineering',
    children: [
      { key: 'navistar', path: '/data-engineering/navistar' },
      { key: 'lt', path: '/data-engineering/lt' },
    ],
  },
  { key: 'qualifications', path: '/qualifications' },
  { key: 'contact', path: '/contact' },
];

export default function Nav({ t, lang, setLang }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null); // open dropdown key
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef(null);
  const { theme, toggle } = useTheme();

  const cvFile = `${process.env.PUBLIC_URL}/files/${t.cv.file}`;
  const cvName = `Sulthan_MD_CV_${t.locale.toUpperCase()}.pdf`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close everything on navigation
  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  // click-away and Escape close the dropdown
  useEffect(() => {
    if (!menu) return undefined;
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenu(null);
    };
    const onKey = (e) => e.key === 'Escape' && setMenu(null);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  const groupActive = (item) => item.children?.some((c) => pathname.startsWith(c.path));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-line bg-base/90 backdrop-blur-md'
          : 'border-transparent bg-base/60 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-mono text-base font-semibold tracking-tight text-ink">
            Sulthan MD
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-faint transition-colors group-hover:text-signal sm:inline">
            / Nexus
          </span>
        </Link>

        <nav ref={navRef} className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.key} className="relative">
                <button
                  onClick={() => setMenu(menu === item.key ? null : item.key)}
                  aria-expanded={menu === item.key}
                  aria-haspopup="true"
                  className={`relative flex items-center gap-1.5 py-1 text-sm font-medium transition-colors ${
                    groupActive(item) || menu === item.key
                      ? 'text-ink'
                      : 'text-faint hover:text-muted'
                  }`}
                >
                  {t.nav[item.key]}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      menu === item.key ? 'rotate-180' : ''
                    }`}
                  />
                  {groupActive(item) && (
                    <span className="absolute -bottom-0.5 left-0 h-px w-[calc(100%-18px)] bg-signal" />
                  )}
                </button>

                {menu === item.key && (
                  <div className="absolute left-1/2 top-[calc(100%+14px)] w-72 -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/50">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.key}
                        to={child.path}
                        className={({ isActive }) =>
                          `block border-b border-line/60 px-4 py-3 last:border-0 transition-colors ${
                            isActive ? 'bg-signal/[0.08]' : 'hover:bg-raised'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`block text-[13.5px] font-semibold ${
                                isActive ? 'text-signal' : 'text-ink'
                              }`}
                            >
                              {t.projectNav[child.key].label}
                            </span>
                            <span className="mt-0.5 block text-[11.5px] leading-snug text-faint">
                              {t.projectNav[child.key].note}
                            </span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.key}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium transition-colors ${
                    isActive ? 'text-ink' : 'text-faint hover:text-muted'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {t.nav[item.key]}
                    {isActive && <span className="absolute -bottom-0.5 left-0 h-px w-full bg-signal" />}
                  </>
                )}
              </NavLink>
            )
          )}
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

          <button
            onClick={toggle}
            aria-label={t.a11y.theme}
            title={t.a11y.theme}
            className="rounded-lg border border-line p-2 text-muted transition-colors hover:border-signal/40 hover:text-signal"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

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
                  lang === l ? 'bg-signal text-onSignal' : 'text-faint hover:bg-raised hover:text-ink'
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

      {/* mobile */}
      {open && (
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-line bg-surface lg:hidden">
          <nav className="mx-auto w-full max-w-7xl px-5 py-3 sm:px-8">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.key} className="border-b border-line/60 py-3">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
                    {t.nav[item.key]}
                  </p>
                  <div className="mt-2 space-y-0.5">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.key}
                        to={child.path}
                        className={({ isActive }) =>
                          `block rounded-lg px-3 py-2 text-sm font-medium ${
                            isActive ? 'bg-signal/10 text-signal' : 'text-muted'
                          }`
                        }
                      >
                        {t.projectNav[child.key].label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.key}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `block border-b border-line/60 py-3.5 text-sm font-medium ${
                      isActive ? 'text-signal' : 'text-muted'
                    }`
                  }
                >
                  {t.nav[item.key]}
                </NavLink>
              )
            )}
            <a
              href={cvFile}
              download={cvName}
              className="mb-3 mt-4 flex items-center justify-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-4 py-2.5 text-sm font-semibold text-signal"
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
