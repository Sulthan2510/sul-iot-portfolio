import React, { useEffect, useRef, useState } from 'react';

/**
 * Project page shell with a section rail that stays on screen.
 *
 * Desktop: a sticky column on the left; click a short label to jump to that
 * section, and the rail highlights whichever section you are in.
 * Mobile: the same labels as a sticky horizontal pill bar under the header,
 * which auto-scrolls to keep the active pill visible.
 *
 * `sections` = [{ id, label, element }]
 */
export default function ProjectLayout({ t, title, kicker, sections }) {
  const [active, setActive] = useState(sections[0]?.id);
  const pillsRef = useRef(null);

  /* Highlight the last section whose top has passed a line near the top of
     the viewport. Deterministic — unlike comparing intersection ratios, a
     tall section cannot out-vote the one you have actually scrolled into. */
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.28;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sections]);

  // Keep the active mobile pill in view.
  useEffect(() => {
    const bar = pillsRef.current;
    if (!bar) return;
    const pill = bar.querySelector(`[data-pill="${active}"]`);
    if (pill) {
      const offset = pill.offsetLeft - bar.clientWidth / 2 + pill.clientWidth / 2;
      bar.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
    }
  }, [active]);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
      {/* mobile rail */}
      <div className="sticky top-[57px] z-40 -mx-5 border-b border-line bg-base/95 backdrop-blur-md sm:-mx-8 lg:hidden">
        <div
          ref={pillsRef}
          className="flex gap-2 overflow-x-auto px-5 py-2.5 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((s) => (
            <button
              key={s.id}
              data-pill={s.id}
              onClick={() => go(s.id)}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                active === s.id
                  ? 'border-signal/50 bg-signal/15 text-signal'
                  : 'border-line bg-surface text-faint'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[200px_minmax(0,1fr)]">
        {/* desktop rail — sticky, always on screen */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 py-16" aria-label={t.sections.onThisPage}>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
              {t.sections.onThisPage}
            </p>
            <ul className="space-y-0.5 border-l border-line">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => go(s.id)}
                    aria-current={active === s.id ? 'true' : undefined}
                    className={`-ml-px block w-full border-l-2 py-1.5 pl-4 text-left text-[13px] leading-snug transition-colors ${
                      active === s.id
                        ? 'border-signal font-semibold text-signal'
                        : 'border-transparent text-faint hover:border-line hover:text-muted'
                    }`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* content */}
        <div className="min-w-0">
          <header className="pt-12 md:pt-16">
            {kicker && (
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-signal/60" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                  {kicker}
                </span>
              </div>
            )}
            <h1 className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-4xl md:text-[2.9rem]">
              {title}
            </h1>
          </header>

          {sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className={`scroll-mt-28 py-12 md:py-16 ${
                i < sections.length - 1 ? 'border-b border-line' : 'pb-24'
              }`}
            >
              {s.element}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
