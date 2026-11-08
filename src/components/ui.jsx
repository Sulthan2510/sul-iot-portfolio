import React, { useEffect } from 'react';

/* Shared primitives for the Nexus portfolio.
   Visual system: near-black base, thin lines, emerald "signal" accent,
   mono type for anything technical. */

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-signal/60" />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, lead, children }) {
  return (
    <header className="mb-12 max-w-3xl md:mb-16">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-ink sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {lead && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
      {children}
    </header>
  );
}

export function Card({ children, className = '', hover = true }) {
  return (
    <div
      className={`rounded-xl border border-line bg-surface p-6 transition-colors duration-300 ${
        hover ? 'hover:border-signal/40' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Tag({ children, tone = 'default' }) {
  const tones = {
    default: 'border-line bg-raised text-muted',
    signal: 'border-signal/30 bg-signal/10 text-signal',
    data: 'border-data/30 bg-data/10 text-data',
  };
  return (
    <span
      className={`inline-block rounded-md border px-2.5 py-1 font-mono text-[11px] leading-none ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function TagRow({ items, tone = 'default' }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Tag key={item} tone={tone}>
          {item}
        </Tag>
      ))}
    </div>
  );
}

/* A bullet with a small square marker — reads more "technical spec" than a dot. */
export function Bullet({ children, tone = 'signal' }) {
  const colour = tone === 'data' ? 'bg-data' : 'bg-signal';
  return (
    <li className="flex gap-3 leading-relaxed">
      <span className={`mt-[0.55rem] h-1.5 w-1.5 flex-shrink-0 rounded-[2px] ${colour}`} />
      <span className="text-muted">{children}</span>
    </li>
  );
}

export function BulletList({ items, tone = 'signal', className = '' }) {
  return (
    <ul className={`space-y-3 text-sm sm:text-[0.95rem] ${className}`}>
      {items.map((item, i) => (
        <Bullet key={i} tone={tone}>
          {item}
        </Bullet>
      ))}
    </ul>
  );
}

export function StatusDot({ label }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">{label}</span>
    </span>
  );
}

export function Modal({ open, onClose, children, labelledBy }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onClick={onClose}
    >
      <div
        className="my-auto w-full max-w-3xl overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
