import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import { Section, SectionHeading, StatusDot } from '../components/ui';
import { legacy } from '../data/legacy';

export default function About({ t, lang }) {
  const a = t.about;
  const L = legacy[lang];

  return (
    <>
      <Hero t={t} />

      {/* career — one line per role, each linking to the project */}
      <Section id="career">
        <SectionHeading eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

        <div className="space-y-4">
          {a.roles.map((role) => (
            <Link
              key={role.id}
              to={role.to}
              className={`group block rounded-xl border bg-surface p-6 transition-colors duration-300 sm:p-7 ${
                role.featured
                  ? 'border-signal/30 hover:border-signal/60'
                  : 'border-line hover:border-signal/40'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-lg font-bold tracking-tight text-ink">{role.title}</h3>
                    {role.featured && <StatusDot label={t.platform.status} />}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-signal">{role.org}</p>
                </div>
                <span className="font-mono text-[11px] text-faint">{role.period}</span>
              </div>

              <p className="mt-4 max-w-3xl text-[0.95rem] leading-relaxed text-muted">{role.line}</p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-signal">
                {role.featured ? a.ctaNexus : a.cta}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* full experience, for the reader who wants the detail */}
      <Section id="experience" className="border-t border-line bg-[#080c12]">
        <SectionHeading
          eyebrow={t.resume.eyebrow}
          title={a.experienceTitle}
          lead={a.experienceLead}
        />

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
                      {t.resume.clientLabel}
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
                            <li key={k} className="flex gap-3 text-[13px] leading-relaxed text-faint">
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
      </Section>
    </>
  );
}
