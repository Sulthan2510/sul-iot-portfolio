import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';

import { content } from './data/content';
import Nav from './components/Nav';
import About from './pages/About';
import Nexus from './pages/Nexus';
import DataEngineering from './pages/DataEngineering';
import Qualifications from './pages/Qualifications';
import Contact from './components/Contact';

const STORAGE_KEY = 'nexus-portfolio-lang';

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'de' || saved === 'en') return saved;
  } catch {
    /* private mode / blocked storage — fall through to the default */
  }
  return 'de';
}

/* Land at the top on navigation, but leave #anchor links alone —
   DataEngineering scrolls to those itself. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname, hash]);
  return null;
}

function Shell() {
  const [lang, setLang] = useState(initialLang);
  const t = content[lang];

  useEffect(() => {
    emailjs.init('TwUziX5RQKIWo_Adq');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* non-fatal */
    }
  }, [lang]);

  return (
    <div className="min-h-screen bg-base font-sans text-ink antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-base"
      >
        {t.a11y.menu}
      </a>

      <ScrollToTop />
      <Nav t={t} lang={lang} setLang={setLang} />

      <main id="main">
        <Routes>
          <Route path="/" element={<About t={t} lang={lang} />} />
          <Route path="/nexus" element={<Nexus t={t} />} />
          <Route path="/data-engineering" element={<DataEngineering t={t} lang={lang} />} />
          <Route path="/qualifications" element={<Qualifications t={t} lang={lang} />} />
          <Route path="/contact" element={<Contact t={t} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-line bg-[#080c12]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[12px] text-faint">
            © {new Date().getFullYear()} Sulthan MD. {t.footer.rights}
          </p>
          <p className="max-w-md text-[12px] leading-relaxed text-faint md:text-right">
            {t.footer.builtWith}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
