import React from 'react';
import { Download, ExternalLink, GraduationCap } from 'lucide-react';
import { Section, SectionHeading, Eyebrow } from '../components/ui';
import { legacy } from '../data/legacy';
import { certifications } from '../data/certifications';

/* One page, three topics: skills, certifications & modules, education.
   Languages ride along under skills — they are a qualification too. */
export default function Qualifications({ t, lang }) {
  const r = t.resume;
  const e = t.engineering;
  const L = legacy[lang];
  const skillGroups = [...t.extraSkillGroups, ...L.skillGroups];
  const cvFile = `${process.env.PUBLIC_URL}/files/${t.cv.file}`;

  return (
    <>
      {/* ── Skills ─────────────────────────────────────────── */}
      <Section id="skills">
        <SectionHeading eyebrow={r.eyebrow} title={r.title}>
          <a
            href={cvFile}
            download={`Sulthan_MD_CV_${t.locale.toUpperCase()}.pdf`}
            className="mt-7 inline-flex items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-4 py-2.5 text-sm font-semibold text-signal transition-colors hover:bg-signal/20"
          >
            <Download size={15} />
            {r.downloadCv}
          </a>
        </SectionHeading>

        <div className="mb-6">
          <Eyebrow>{e.skillsTitle}</Eyebrow>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.category} className="bg-surface p-6 transition-colors hover:bg-raised">
              <h3 className="text-sm font-bold text-signal">{group.category}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{group.skills}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 mt-14">
          <Eyebrow>{r.tabs.languages}</Eyebrow>
        </div>
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {L.spokenLanguages.map((item) => (
            <div key={item.language} className="bg-surface p-6 text-center">
              <p className="text-base font-bold text-ink">{item.language}</p>
              <p className="mt-2 font-mono text-[12px] text-signal">{item.level}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Certifications & modules ───────────────────────── */}
      <Section id="certifications" className="border-t border-line bg-[#080c12]">
        <div className="mb-8">
          <Eyebrow>{r.tabs.certifications}</Eyebrow>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {L.resumeLabels.certifications}
          </h2>
        </div>

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
      </Section>

      {/* ── Education ──────────────────────────────────────── */}
      <Section id="education" className="border-t border-line">
        <div className="mb-8">
          <Eyebrow>{r.tabs.education}</Eyebrow>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {L.resumeLabels.education}
          </h2>
        </div>

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
      </Section>
    </>
  );
}
