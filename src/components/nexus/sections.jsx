import React from 'react';
import { Cpu, Router, ShieldCheck, Server, Users, Building2, Database, LayoutDashboard, Radio, Wrench, AlertTriangle, ChevronRight } from 'lucide-react';
import { SectionHeading, StatusDot, BulletList, TagRow } from '../ui';
import NexusDiagram from '../diagram/NexusDiagram';

/* The Nexus page's sections. Each renders bare content — ProjectLayout
   supplies the <section id>, the spacing and the page container. */

/* ── Overview ────────────────────────────────────────────────────────── */
export function Overview({ t }) {
  const p = t.platform;
  return (
    <>
      <div className="max-w-3xl">
        {/* the page header already carries the "flagship project" kicker */}
        <StatusDot label={p.status} />
        <p className="mt-5 text-lg font-medium leading-snug text-ink sm:text-xl">{p.tagline}</p>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{p.lead}</p>
        <p className="mt-4 border-l-2 border-signal/40 pl-4 text-[0.95rem] leading-relaxed text-muted">
          {p.note}
        </p>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
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
    </>
  );
}

/* ── Architecture ────────────────────────────────────────────────────── */
export function Architecture({ t }) {
  const d = t.diagram;
  return (
    <>
      <SectionHeading eyebrow={d.eyebrow} title={d.title} lead={d.lead} />
      <NexusDiagram labels={d.labels} />
    </>
  );
}

/* ── Configuration (the four stack layers) ───────────────────────────── */
const LAYER_ICONS = { janitza: Cpu, teltonika: Router, wireguard: ShieldCheck, hetzner: Server };

export function Configuration({ t }) {
  const s = t.stack;
  return (
    <>
      <SectionHeading eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
      <div className="space-y-5">
        {s.layers.map((layer) => {
          const Icon = LAYER_ICONS[layer.id] || Cpu;
          return (
            <article
              key={layer.id}
              className="group rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-signal/30"
            >
              <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:p-8">
                <div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-line bg-raised text-signal transition-colors group-hover:border-signal/40">
                      <Icon size={19} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[11px] text-signal">{layer.index}</span>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                          {layer.kicker}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                        {layer.title}
                      </h3>
                      <p className="mt-1 text-sm leading-snug text-muted">{layer.subtitle}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{layer.body}</p>

                  {layer.measures && (
                    <div className="mt-6">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                        {s.measuresLabel}
                      </p>
                      <div className="mt-3">
                        <TagRow items={layer.measures} tone="data" />
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <TagRow items={layer.tags} />
                  </div>
                </div>

                <div className="rounded-lg border border-line bg-base/60 p-5 sm:p-6">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-signal">
                    {s.configLabel}
                  </p>
                  <BulletList items={layer.config} className="mt-4" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

/* ── Dashboards ──────────────────────────────────────────────────────── */
const BLOCK_ICONS = { timescale: Database, ownui: LayoutDashboard, fleet: Radio };

export function DashboardsSection({ t }) {
  const d = t.dashboards;
  return (
    <>
      <SectionHeading eyebrow={d.eyebrow} title={d.title} lead={d.lead} />

      <div className="grid gap-5 lg:grid-cols-2">
        {d.audiences.map((aud) => {
          const isStaff = aud.id === 'staff';
          const Icon = isStaff ? Users : Building2;
          return (
            <div
              key={aud.id}
              className={`relative overflow-hidden rounded-xl border bg-surface p-6 sm:p-8 ${
                isStaff ? 'border-signal/25' : 'border-data/25'
              }`}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl ${
                  isStaff ? 'bg-signal/10' : 'bg-data/10'
                }`}
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                      isStaff
                        ? 'border-signal/30 bg-signal/10 text-signal'
                        : 'border-data/30 bg-data/10 text-data'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span
                    className={`rounded-md border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] ${
                      isStaff
                        ? 'border-signal/30 bg-signal/10 text-signal'
                        : 'border-data/30 bg-data/10 text-data'
                    }`}
                  >
                    {aud.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  {aud.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{aud.lead}</p>
                <BulletList items={aud.items} tone={isStaff ? 'signal' : 'data'} className="mt-6" />
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="mb-6 mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
        {d.blocksTitle}
      </h3>
      <div className="grid gap-5 lg:grid-cols-3">
        {d.blocks.map((block) => {
          const Icon = BLOCK_ICONS[block.id] || Database;
          return (
            <article
              key={block.id}
              className="flex flex-col rounded-xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-signal/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raised text-signal">
                <Icon size={18} />
              </div>
              <h4 className="mt-5 text-lg font-bold leading-snug tracking-tight text-ink">
                {block.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted">{block.body}</p>
              <BulletList items={block.bullets} className="mt-5" />
              <div className="mt-6 pt-1">
                <TagRow items={block.tags} />
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

/* ── Analytics ───────────────────────────────────────────────────────── */
export function AnalyticsSection({ t }) {
  const a = t.analytics;
  return (
    <>
      <SectionHeading eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

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
                <li aria-hidden className="flex items-center justify-center text-line lg:px-0.5">
                  <ChevronRight size={16} className="rotate-90 lg:rotate-0" />
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {a.cards.map((card) => {
          const Icon = card.id === 'predictive' ? Wrench : AlertTriangle;
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
    </>
  );
}
