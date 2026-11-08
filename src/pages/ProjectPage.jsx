import React, { useMemo } from 'react';
import ProjectLayout from '../components/ProjectLayout';
import { Eyebrow, TagRow } from '../components/ui';
import { PROJECT_DIAGRAMS } from '../components/diagram/ProjectDiagrams';
import { legacy } from '../data/legacy';

import hochschule from '../images/clients/hochschule.jpeg';
import lt from '../images/clients/L&T.jpeg';
import navistar from '../images/clients/navistar.jpeg';
import tampnet from '../images/clients/tampnet.jpeg';

const LOGOS = { 1: hochschule, 2: navistar, 3: lt, 4: tampnet };

/* One page per client project, sharing the Nexus page's section rail.
   `projectId` maps to legacy.projects[].id. */
export default function ProjectPage({ t, lang, projectId, navKey }) {
  const e = t.engineering;
  const L = legacy[lang];
  const project = L.projects.find((p) => p.id === projectId);
  const labels = t.projectDiagrams[projectId];
  const Diagram = PROJECT_DIAGRAMS[projectId];

  const sections = useMemo(() => {
    if (!project) return [];
    return [
      {
        id: 'overview',
        label: t.sections.overview,
        element: (
          <>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-line">
                <img src={LOGOS[projectId]} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-signal">{project.company}</p>
                <p className="font-mono text-[11px] text-faint">{project.period}</p>
              </div>
            </div>
            <p className="mt-7 max-w-3xl text-base leading-relaxed text-muted">
              {project.description}
            </p>
          </>
        ),
      },
      {
        id: 'architecture',
        label: t.sections.architecture,
        element: (
          <>
            <div className="mb-6">
              <Eyebrow>{t.projectDiagrams.title}</Eyebrow>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {t.sections.architecture}
              </h2>
            </div>
            {Diagram && <Diagram L={labels} />}
          </>
        ),
      },
      {
        id: 'results',
        label: t.sections.results,
        element: (
          <>
            <div className="mb-6">
              <Eyebrow>{t.sections.results}</Eyebrow>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {e.achievementsLabel}
              </h2>
            </div>
            <ul className="max-w-3xl space-y-3.5">
              {project.achievements.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3.5 rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-muted"
                >
                  <span className="mt-[0.45rem] h-1.5 w-1.5 flex-shrink-0 rounded-[2px] bg-signal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        ),
      },
      {
        id: 'stack',
        label: t.sections.stack,
        element: (
          <>
            <div className="mb-6">
              <Eyebrow>{t.sections.stack}</Eyebrow>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {e.techLabel}
              </h2>
            </div>
            <TagRow items={project.tech} />
          </>
        ),
      },
    ];
  }, [project, projectId, labels, Diagram, t, e]);

  if (!project) return null;

  return (
    <ProjectLayout
      t={t}
      kicker={t.projectNav[navKey]?.note}
      title={project.title}
      sections={sections}
    />
  );
}
