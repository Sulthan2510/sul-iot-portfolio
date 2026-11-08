import React from 'react';
import { Users, Building2, Database, LayoutDashboard, Radio } from 'lucide-react';
import { Section, SectionHeading, BulletList, TagRow } from './ui';

const BLOCK_ICONS = {
  timescale: Database,
  ownui: LayoutDashboard,
  fleet: Radio,
};

export default function Dashboards({ t }) {
  const d = t.dashboards;

  return (
    <Section id="dashboards" className="border-t border-line">
      <SectionHeading eyebrow={d.eyebrow} title={d.title} lead={d.lead} />

      {/* staff vs customer */}
      <div className="grid gap-5 lg:grid-cols-2">
        {d.audiences.map((aud) => {
          const isStaff = aud.id === 'staff';
          const Icon = isStaff ? Users : Building2;
          const accent = isStaff ? 'signal' : 'data';
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
                <BulletList items={aud.items} tone={accent} className="mt-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* how it is built */}
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
    </Section>
  );
}
