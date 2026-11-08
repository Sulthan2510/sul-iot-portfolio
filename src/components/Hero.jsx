import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight } from 'lucide-react';
import profileImage from '../images/profile.png';
import { StatusDot } from './ui';

export default function Hero({ t }) {
  const h = t.hero;
  const cvFile = `${process.env.PUBLIC_URL}/files/${t.cv.file}`;

  return (
    <div className="relative overflow-hidden border-b border-line">
      {/* grid + glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-16 sm:px-8 md:pb-28 md:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-[1.35fr_1fr] md:gap-16">
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-signal/25 bg-signal/[0.07] px-3.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              <span className="text-[12.5px] font-medium text-signal">{h.available}</span>
            </div>

            <p className="mt-8 font-mono text-sm text-faint">{h.greeting}</p>
            <h1 className="mt-1.5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-[3.4rem] md:leading-[1.05]">
              {h.name}
            </h1>
            <p className="mt-3 font-mono text-sm uppercase tracking-[0.18em] text-signal sm:text-[0.95rem]">
              {h.role}
            </p>

            <p className="mt-7 max-w-2xl text-lg font-medium leading-snug text-ink sm:text-[1.35rem]">
              {h.headline}
            </p>
            <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{h.summary}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={cvFile}
                download={`Sulthan_MD_CV_${t.locale.toUpperCase()}.pdf`}
                className="inline-flex items-center gap-2 rounded-lg bg-signal px-5 py-3 text-sm font-semibold text-base transition-colors hover:bg-signal/85"
              >
                <Download size={16} />
                {h.primaryCta}
              </a>
              <Link
                to="/nexus"
                className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-signal/40 hover:bg-raised"
              >
                {h.secondaryCta}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xs md:max-w-none">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-signal/15 via-transparent to-data/10 blur-xl" />
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
              <img
                src={profileImage}
                alt="Sulthan MD"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-base via-base/70 to-transparent p-4 pt-12">
                <StatusDot label="Nexus" />
              </div>
            </div>
          </div>
        </div>

        {/* quick facts strip — the things a recruiter checks first */}
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
          {h.quickFacts.map((f) => (
            <div key={f.label} className="bg-surface px-5 py-4">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                {f.label}
              </dt>
              <dd className="mt-1.5 text-sm font-semibold leading-snug text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
