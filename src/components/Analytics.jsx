import React from 'react';
import { Wrench, AlertTriangle, ChevronRight } from 'lucide-react';
import { Section, SectionHeading, BulletList } from './ui';

export default function Analytics({ t }) {
  const a = t.analytics;

  return (
    <Section id="analytics" className="border-t border-line bg-[#080c12]">
      <SectionHeading eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

      {/* pipeline rail */}
      <div className="mb-14">
        <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
          {a.pipelineLabel}
        </p>
        <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
          {a.pipeline.map((stage, i) => (
            <React.Fragment key={stage.step}>
              <li className="flex-1 rounded-lg border border-line bg-surface px-4 py-3.5">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[10.5px] text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-semibold text-ink">{stage.step}</span>
                </div>
                <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-faint">
                  {stage.note}
                </p>
              </li>
              {i < a.pipeline.length - 1 && (
                <li
                  aria-hidden
                  className="flex items-center justify-center text-line lg:px-0.5"
                >
                  <ChevronRight size={16} className="rotate-90 lg:rotate-0" />
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </div>

      {/* the two analytics products */}
      <div className="grid gap-5 lg:grid-cols-2">
        {a.cards.map((card) => {
          const isPredictive = card.id === 'predictive';
          const Icon = isPredictive ? Wrench : AlertTriangle;
          return (
            <article
              key={card.id}
              className="flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-signal/30 sm:p-8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-raised text-signal">
                <Icon size={19} />
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {card.title}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{card.body}</p>
              <BulletList items={card.bullets} className="mt-6" />
              <p className="mt-7 rounded-lg border border-signal/20 bg-signal/[0.06] p-4 text-sm leading-relaxed text-signal">
                {card.outcome}
              </p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
