import React from 'react';
import { Section, Eyebrow, StatusDot } from './ui';
import ArchitectureDiagram from './ArchitectureDiagram';

export default function Platform({ t }) {
  const p = t.platform;
  const d = t.diagram;

  return (
    <Section id="platform">
      <div className="mb-12 max-w-3xl md:mb-16">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <StatusDot label={p.status} />
        </div>

        <h2 className="mt-6 flex items-baseline gap-4 text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
          {p.title}
          <span className="h-px flex-1 bg-gradient-to-r from-signal/50 to-transparent" />
        </h2>

        <p className="mt-5 text-lg font-medium leading-snug text-ink sm:text-xl">{p.tagline}</p>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{p.lead}</p>
        <p className="mt-4 border-l-2 border-signal/40 pl-4 text-[0.95rem] leading-relaxed text-muted">
          {p.note}
        </p>
      </div>

      {/* four pillars */}
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {p.pillars.map((pillar, i) => (
          <div key={pillar.id} className="group bg-surface p-6 transition-colors hover:bg-raised">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                {pillar.label}
              </span>
              <span className="font-mono text-[10.5px] text-line transition-colors group-hover:text-signal/60">
                0{i + 1}
              </span>
            </div>
            <p className="mt-3 text-base font-semibold leading-snug text-ink">{pillar.value}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{pillar.note}</p>
          </div>
        ))}
      </div>

      {/* architecture */}
      <div className="mt-20">
        <div className="mb-8 max-w-3xl">
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{d.title}</h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{d.lead}</p>
        </div>
        <ArchitectureDiagram labels={d.labels} />
      </div>
    </Section>
  );
}
