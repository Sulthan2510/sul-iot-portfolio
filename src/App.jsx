import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';

import { ThemeProvider } from './theme';
import { content } from './data/content';
import Nav from './components/Nav';
import About from './pages/About';
import NexusPage from './pages/NexusPage';
import ProjectPage from './pages/ProjectPage';
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

/* Land at the top on navigation; leave #anchor links alone. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
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

  const project = (id, navKey) => (
    <ProjectPage t={t} lang={lang} projectId={id} navKey={navKey} />
  );

  return (
    <div className="min-h-screen bg-base font-sans text-ink antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-onSignal"
      >
        {t.a11y.menu}
      </a>

      <ScrollToTop />
      <Nav t={t} lang={lang} setLang={setLang} />

      <main id="main">
        <Routes>
          <Route path="/" element={<About t={t} lang={lang} />} />

          {/* IoT */}
          <Route path="/iot/nexus" element={<NexusPage t={t} />} />
          <Route path="/iot/hochschule" element={project(1, 'hochschule')} />
          <Route path="/iot/sensors" element={project(4, 'sensors')} />

          {/* Data engineering */}
          <Route path="/data-engineering/navistar" element={project(2, 'navistar')} />
          <Route path="/data-engineering/lt" element={project(3, 'lt')} />

          <Route path="/qualifications" element={<Qualifications t={t} lang={lang} />} />
          <Route path="/contact" element={<Contact t={t} />} />

          {/* old single-page routes */}
          <Route path="/nexus" element={<Navigate to="/iot/nexus" replace />} />
          <Route path="/data-engineering" element={<Navigate to="/data-engineering/navistar" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-line bg-sunken">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8">
          <p className="font-mono text-[12px] text-faint">
            © {new Date().getFullYear()} Sulthan MD. {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </ThemeProvider>
  );
}
