import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

import { content } from './data/content';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Platform from './components/Platform';
import StackLayers from './components/StackLayers';
import Dashboards from './components/Dashboards';
import Analytics from './components/Analytics';
import Engineering from './components/Engineering';
import Resume from './components/Resume';
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

export default function App() {
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
        href="#platform"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-base"
      >
        {t.nav.platform}
      </a>

      <Nav t={t} lang={lang} setLang={setLang} />

      <main>
        <Hero t={t} />
        <Platform t={t} />
        <StackLayers t={t} />
        <Dashboards t={t} />
        <Analytics t={t} />
        <Engineering t={t} lang={lang} />
        <Resume t={t} lang={lang} />
        <Contact t={t} />
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
