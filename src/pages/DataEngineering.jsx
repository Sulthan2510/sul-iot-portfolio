import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Section, SectionHeading, Eyebrow, TagRow } from '../components/ui';
import { PROJECT_DIAGRAMS } from '../components/diagram/ProjectDiagrams';
import { legacy } from '../data/legacy';

import hochschule from '../images/clients/hochschule.jpeg';
import lt from '../images/clients/L&T.jpeg';
import navistar from '../images/clients/navistar.jpeg';
import tampnet from '../images/clients/tampnet.jpeg';

const LOGOS = { 1: hochschule, 2: navistar, 3: lt, 4: tampnet };
// stable anchors so /data-engineering#navistar lands on the right project
const ANCHORS = { 1: 'hochschule', 2: 'navistar', 3: 'lt', 4: 'tampnet' };

export default function DataEngineering({ t, lang }) {
  const e = t.engineering;
  const D = t.projectDiagrams;
  const L = legacy[lang];
  const { hash } = useLocation();

  // honour #anchor on arrival (router does not scroll to hashes on its own)
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) {
      requestAnimationFrame(() =>
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      );
    }
  }, [hash]);

  return (
    <>
      <Section id="data-engineering">
        <SectionHeading eyebrow={e.eyebrow} title={e.title} lead={e.lead} />

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
      </Section>

      {L.projects.map((project, idx) => {
        const Diagram = PROJECT_DIAGRAMS[project.id];
        const labels = D[project.id];
        const anchor = ANCHORS[project.id];
        const shaded = idx % 2 === 1;

        return (
          <Section
            key={project.id}
            id={anchor}
            className={`border-t border-line ${shaded ? 'bg-[#080c12]' : ''}`}
          >
            {/* header + prose beside the achievements */}
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-line">
                    <img src={LOGOS[project.id]} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-signal">{project.company}</p>
                    <p className="font-mono text-[11px] text-faint">{project.period}</p>
                  </div>
                </div>

                <h2 className="mt-6 text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
                  {project.title}
                </h2>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="mt-8">
                  <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                    {e.techLabel}
                  </p>
                  <TagRow items={project.tech} />
                </div>
              </div>

              <div className="rounded-xl border border-line bg-base/60 p-6">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-signal">
                  {e.achievementsLabel}
                </p>
                <ul className="mt-4 space-y-3">
                  {project.achievements.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[0.55rem] h-1.5 w-1.5 flex-shrink-0 rounded-[2px] bg-signal" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* architecture — full width so the diagram is readable */}
            <div className="mt-12">
              <div className="mb-5">
                <Eyebrow>{D.title}</Eyebrow>
              </div>
              {Diagram && <Diagram L={labels} />}
            </div>
          </Section>
        );
      })}
    </>
  );
}
