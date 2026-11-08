import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, X } from 'lucide-react';
import Hero from '../components/Hero';
import { Section, SectionHeading, StatusDot } from '../components/ui';
import FlowDiagram from '../components/diagram/FlowDiagram';

export default function About({ t }) {
  const a = t.about;
  const [flow, setFlow] = useState(null); // role whose flow is playing

  return (
    <>
      <Hero t={t} />

      <Section id="career">
        <SectionHeading eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

        {/* Dot-connected timeline: one node per role, joined by a single line. */}
        <ol className="relative">
          {/* the connecting line, inset to pass through the centre of the dots */}
          <span
            aria-hidden
            className="absolute left-[9px] top-3 bottom-3 w-px bg-line md:left-[11px]"
          />

          {a.roles.map((role) => (
            <li key={role.id} className="relative pl-9 pb-5 last:pb-0 md:pl-12">
              {/* ring node */}
              <span
                aria-hidden
                className={`absolute left-0 top-6 flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 bg-base md:left-[2px] ${
                  role.featured ? 'border-signal' : 'border-signal/50'
                }`}
              >
                {role.featured && <span className="h-[7px] w-[7px] rounded-full bg-signal" />}
              </span>

              <div
                className={`rounded-xl border bg-surface transition-colors duration-300 ${
                  role.featured
                    ? 'border-signal/30 hover:border-signal/60'
                    : 'border-line hover:border-signal/40'
                }`}
              >
                <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8 lg:p-7">
                  {/* text */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <h3 className="text-lg font-bold tracking-tight text-ink">
                            {role.title}
                          </h3>
                          {role.featured && <StatusDot label={t.platform.status} />}
                        </div>
                        <p className="mt-1 text-sm font-semibold text-signal">{role.org}</p>
                      </div>
                      <span className="font-mono text-[11px] text-faint">{role.period}</span>
                    </div>

                    <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{role.line}</p>

                    <Link
                      to={role.to}
                      className="group mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-signal"
                    >
                      {role.featured ? a.ctaNexus : a.cta}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>

                  {/* architecture preview — click to watch the data flow */}
                  {role.flow && (
                    <button
                      onClick={() => setFlow(role)}
                      aria-label={`${a.playFlow}: ${role.title}`}
                      className="group relative flex flex-col justify-center rounded-lg border border-line bg-base/60 p-3 transition-colors hover:border-signal/40 hover:bg-raised"
                    >
                      <FlowDiagram stages={role.flow} variant="thumb" />
                      <span className="mt-2 inline-flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-signal">
                        <Play size={10} className="fill-current" />
                        {a.playFlow}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* animated flow modal */}
      {flow && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={flow.title}
          onClick={() => setFlow(null)}
        >
          <div
            className="w-full max-w-6xl overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line p-6">
              <div className="min-w-0">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-signal">
                  {a.flowTitle}
                </p>
                <h3 className="mt-2 text-xl font-bold leading-snug text-ink">{flow.title}</h3>
                <p className="mt-1 text-sm font-semibold text-signal">{flow.org}</p>
              </div>
              <button
                onClick={() => setFlow(null)}
                className="flex-shrink-0 rounded-lg border border-line p-2 text-muted transition-colors hover:text-ink"
                aria-label={t.a11y.close}
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-x-auto p-6 sm:p-8">
              <FlowDiagram stages={flow.flow} variant="full" animated />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-base/50 px-6 py-4">
              <p className="font-mono text-[11px] text-faint">
                {flow.flow[0].label} → {flow.flow[flow.flow.length - 1].label}
              </p>
              <Link
                to={flow.to}
                onClick={() => setFlow(null)}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-signal"
              >
                {flow.featured ? a.ctaNexus : a.cta}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
