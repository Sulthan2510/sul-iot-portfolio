import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { Section, SectionHeading, TagRow, Modal } from './ui';
import { legacy } from '../data/legacy';

import hochschule from '../images/clients/hochschule.jpeg';
import lt from '../images/clients/L&T.jpeg';
import navistar from '../images/clients/navistar.jpeg';
import tampnet from '../images/clients/tampnet.jpeg';
import hochschuleArch from '../images/architecture/hochschuleproject.png';
import ltArch from '../images/architecture/ltproject.png';
import navistarArch from '../images/architecture/navistarproject.png';
import tampnetArch from '../images/architecture/tampnetproject.png';

const MEDIA = {
  1: { image: hochschule, architecture: hochschuleArch },
  2: { image: navistar, architecture: navistarArch },
  3: { image: lt, architecture: ltArch },
  4: { image: tampnet, architecture: tampnetArch },
};

export default function Engineering({ t, lang }) {
  const e = t.engineering;
  const L = legacy[lang];
  const [detail, setDetail] = useState(null);
  const [arch, setArch] = useState(null);

  const projects = L.projects.map((p) => ({ ...p, ...MEDIA[p.id] }));

  return (
    <Section id="engineering" className="border-t border-line">
      <SectionHeading eyebrow={e.eyebrow} title={e.title} lead={e.lead} />

      {/* stats */}
      <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
        {L.stats.map((s) => (
          <div key={s.label} className="bg-surface px-4 py-6 text-center sm:px-6">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block text-3xl font-extrabold tracking-tight text-signal sm:text-4xl">
                {s.value}
              </span>
              <span className="mt-2 block text-[12.5px] leading-snug text-muted">{s.label}</span>
            </dd>
          </div>
        ))}
      </dl>

      {/* skills */}
      <h3 className="mb-6 mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
        {e.skillsTitle}
      </h3>
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
        {L.skillGroups.map((group) => (
          <div key={group.category} className="bg-surface p-6 transition-colors hover:bg-raised">
            <h4 className="text-sm font-bold text-signal">{group.category}</h4>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{group.skills}</p>
          </div>
        ))}
      </div>

      {/* client projects */}
      <h3 className="mb-6 mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
        {e.projectsTitle}
      </h3>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.id}
            className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-signal/30"
          >
            <div className="relative h-36 overflow-hidden border-b border-line">
              <img
                src={p.image}
                alt=""
                className="h-full w-full object-cover opacity-60 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h4 className="text-base font-bold leading-snug text-ink">{p.title}</h4>
              <p className="mt-1.5 text-[13px] font-semibold text-signal">{p.company}</p>
              <p className="font-mono text-[11px] text-faint">{p.period}</p>
              <p className="mt-3 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-muted">
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => setDetail(p)}
                  className="rounded-lg border border-signal/30 bg-signal/10 px-3.5 py-2 text-[13px] font-semibold text-signal transition-colors hover:bg-signal/20"
                >
                  {e.viewDetails}
                </button>
                <button
                  onClick={() => setArch(p)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-[13px] font-semibold text-muted transition-colors hover:border-data/40 hover:text-data"
                >
                  <Maximize2 size={13} />
                  {e.viewArchitecture}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* project detail modal */}
      <Modal open={!!detail} onClose={() => setDetail(null)} labelledBy="project-detail-title">
        {detail && (
          <div className="flex max-h-[88vh] flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-line p-6">
              <div className="min-w-0">
                <h3 id="project-detail-title" className="text-xl font-bold leading-snug text-ink">
                  {detail.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-signal">{detail.company}</p>
                <p className="font-mono text-[11px] text-faint">{detail.period}</p>
              </div>
              <button
                onClick={() => setDetail(null)}
                className="flex-shrink-0 rounded-lg border border-line p-2 text-muted transition-colors hover:text-ink"
                aria-label={e.close}
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 space-y-7 overflow-y-auto p-6">
              <p className="text-[0.95rem] leading-relaxed text-muted">{detail.description}</p>
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-signal">
                  {e.achievementsLabel}
                </p>
                <ul className="mt-4 space-y-3">
                  {detail.achievements.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[0.55rem] h-1.5 w-1.5 flex-shrink-0 rounded-[2px] bg-signal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-signal">
                  {e.techLabel}
                </p>
                <TagRow items={detail.tech} />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* architecture modal */}
      <Modal open={!!arch} onClose={() => setArch(null)} labelledBy="project-arch-title">
        {arch && (
          <div className="flex max-h-[88vh] flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-line p-5">
              <h3 id="project-arch-title" className="text-base font-bold leading-snug text-ink">
                {arch.title} — {e.architectureLabel}
              </h3>
              <button
                onClick={() => setArch(null)}
                className="flex-shrink-0 rounded-lg border border-line p-2 text-muted transition-colors hover:text-ink"
                aria-label={e.close}
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-auto bg-base p-4">
              <img
                src={arch.architecture}
                alt={`${arch.title} ${e.architectureLabel}`}
                className="w-full rounded-lg border border-line"
              />
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
