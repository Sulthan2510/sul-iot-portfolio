import React from 'react';
import { Cpu, Router, ShieldCheck, Server } from 'lucide-react';
import { Section, SectionHeading, BulletList, TagRow } from './ui';

const ICONS = {
  janitza: Cpu,
  teltonika: Router,
  wireguard: ShieldCheck,
  hetzner: Server,
};

export default function StackLayers({ t }) {
  const s = t.stack;

  return (
    <Section id="stack" className="border-t border-line bg-[#080c12]">
      <SectionHeading eyebrow={s.eyebrow} title={s.title} lead={s.lead} />

      <div className="space-y-5">
        {s.layers.map((layer) => {
          const Icon = ICONS[layer.id] || Cpu;
          return (
            <article
              key={layer.id}
              className="group rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-signal/30"
            >
              <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:p-8">
                {/* left: identity + prose */}
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

                {/* right: the configuration list — the substance */}
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
    </Section>
  );
}
