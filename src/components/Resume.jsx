import React, { useState } from 'react';
import { Download, ExternalLink, GraduationCap } from 'lucide-react';
import { Section, SectionHeading } from './ui';
import { legacy } from '../data/legacy';
import { certifications } from '../data/certifications';

const cvFile = `${process.env.PUBLIC_URL}/files/sulthan_cv.pdf`;
const TABS = ['experience', 'education', 'certifications', 'languages'];

export default function Resume({ t, lang }) {
  const r = t.resume;
  const L = legacy[lang];
  const [tab, setTab] = useState('experience');

  return (
    <Section id="resume" className="border-t border-line bg-[#080c12]">
      <SectionHeading eyebrow={r.eyebrow} title={r.title}>
        <a
          href={cvFile}
          download
          className="mt-7 inline-flex items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-4 py-2.5 text-sm font-semibold text-signal transition-colors hover:bg-signal/20"
        >
          <Download size={15} />
          {r.downloadCv}
        </a>
      </SectionHeading>

      {/* tab bar */}
      <div className="mb-10 flex flex-wrap gap-1 border-b border-line">
        {TABS.map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              tab === key
                ? 'border-signal text-signal'
                : 'border-transparent text-faint hover:text-muted'
            }`}
          >
            {r.tabs[key]}
          </button>
        ))}
      </div>

      {/* experience — timeline */}
      {tab === 'experience' && (
        <div className="relative space-y-5 before:absolute before:bottom-4 before:left-[7px] before:top-4 before:w-px before:bg-line md:before:left-[9px]">
          {L.jobs.map((job, i) => (
            <article key={i} className="relative pl-8 md:pl-10">
              <span className="absolute left-0 top-7 h-[15px] w-[15px] rounded-full border-2 border-signal bg-base md:left-0.5" />
              <div className="rounded-xl border border-line bg-surface p-6 transition-colors hover:border-signal/30">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
                  <h3 className="text-lg font-bold tracking-tight text-ink">{job.role}</h3>
                  <span className="font-mono text-[11px] text-faint">{job.period}</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-signal">{job.company}</p>
                {job.client && (
                  <p className="mt-0.5 text-[13px] text-muted">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                      {r.clientLabel}
                    </span>{' '}
                    {job.client}
                  </p>
                )}
                <ul className="mt-5 space-y-3">
                  {job.description.map((item, j) => (
                    <li key={j}>
                      <div className="flex gap-3 text-[13.5px] leading-relaxed text-muted">
                        <span className="mt-[0.5rem] h-1.5 w-1.5 flex-shrink-0 rounded-[2px] bg-signal" />
                        <span>{item.main}</span>
                      </div>
                      {item.subs && item.subs.length > 0 && (
                        <ul className="ml-6 mt-2.5 space-y-2">
                          {item.subs.map((sub, k) => (
                            <li
                              key={k}
                              className="flex gap-3 text-[13px] leading-relaxed text-faint"
                            >
                              <span className="mt-[0.5rem] h-1 w-1 flex-shrink-0 rounded-full bg-data" />
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* education */}
      {tab === 'education' && (
        <div className="grid gap-5 md:grid-cols-2">
          {L.education.map((edu, i) => (
            <article
              key={i}
              className="rounded-xl border border-line bg-surface p-6 transition-colors hover:border-signal/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-raised text-signal">
                <GraduationCap size={18} />
              </div>
              <h3 className="mt-5 text-base font-bold leading-snug text-ink">{edu.degree}</h3>
              <p className="mt-1.5 text-sm font-semibold text-signal">{edu.school}</p>
              {edu.location && <p className="text-[13px] text-muted">{edu.location}</p>}
              <p className="mt-2 font-mono text-[11px] text-faint">{edu.period}</p>
              <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                <span className="text-[13px] text-muted">{edu.details}</span>
                {edu.gpa && (
                  <span className="rounded-md border border-signal/30 bg-signal/10 px-2.5 py-1 font-mono text-[12px] font-semibold text-signal">
                    {edu.gpa}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* certifications */}
      {tab === 'certifications' && (
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="flex flex-col justify-between gap-3 bg-surface p-5 transition-colors hover:bg-raised"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-bold leading-snug text-ink">{cert.name[lang]}</h3>
                  <span className="font-mono text-[11px] text-faint">{cert.date}</span>
                </div>
                <p className="mt-1 text-[13px] font-semibold text-signal">{cert.issuer}</p>
              </div>
              {cert.link ? (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1.5 text-[12.5px] font-medium text-data transition-colors hover:text-data/80"
                >
                  {r.viewCertificate}
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="font-mono text-[11px] text-faint">{r.credentialOnRequest}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* languages */}
      {tab === 'languages' && (
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {L.spokenLanguages.map((item) => (
            <div key={item.language} className="bg-surface p-6 text-center">
              <p className="text-base font-bold text-ink">{item.language}</p>
              <p className="mt-2 font-mono text-[12px] text-signal">{item.level}</p>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
