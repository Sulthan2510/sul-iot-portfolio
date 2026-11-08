import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, Check, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Section, SectionHeading } from './ui';

const EMAILJS = {
  service: 'service_m7ut4x8',
  template: 'template_tieb72p',
  publicKey: 'TwUziX5RQKIWo_Adq',
};

const EMAIL = 'sulthan2510@gmail.com';

export default function Contact({ t }) {
  const c = t.contact;
  const [state, setState] = useState('idle'); // idle | sending | sent | error

  const channels = [
    { icon: Mail, label: c.emailLabel, value: EMAIL, href: `mailto:${EMAIL}` },
    {
      icon: Linkedin,
      label: c.linkedinLabel,
      value: 'linkedin.com/in/sulthan2510',
      href: 'https://linkedin.com/in/sulthan2510',
    },
    {
      icon: Github,
      label: c.githubLabel,
      value: 'github.com/sulthan2510',
      href: 'https://github.com/sulthan2510',
    },
    { icon: MapPin, label: c.locationLabel, value: c.locationValue, href: null },
  ];

  const onSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    setState('sending');
    emailjs
      .send(
        EMAILJS.service,
        EMAILJS.template,
        {
          from_name: form.from_name.value,
          from_email: form.from_email.value,
          company: form.company.value || 'N/A',
          message: form.message.value || 'No message',
        },
        EMAILJS.publicKey
      )
      .then(() => {
        setState('sent');
        form.reset();
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setState('error');
      });
  };

  const field =
    'w-full rounded-lg border border-line bg-base px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal/40';
  const label = 'mb-2 block text-[13px] font-semibold text-ink';
  const hint = 'ml-1.5 font-mono text-[10.5px] font-normal uppercase tracking-[0.12em] text-faint';

  return (
    <Section id="contact" className="border-t border-line">
      <SectionHeading eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-14">
        <div className="space-y-px overflow-hidden rounded-xl border border-line bg-line">
          {channels.map(({ icon: Icon, label: l, value, href }) => {
            const inner = (
              <>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-line bg-raised text-signal">
                  <Icon size={17} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                    {l}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-ink">{value}</p>
                </div>
              </>
            );
            return href ? (
              <a
                key={l}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 bg-surface p-5 transition-colors hover:bg-raised"
              >
                {inner}
              </a>
            ) : (
              <div key={l} className="flex items-center gap-4 bg-surface p-5">
                {inner}
              </div>
            );
          })}
        </div>

        <form onSubmit={onSubmit} className="rounded-xl border border-line bg-surface p-6 sm:p-8">
          <h3 className="mb-6 text-lg font-bold tracking-tight text-ink">{c.formTitle}</h3>

          <div className="space-y-5">
            <div>
              <label className={label} htmlFor="from_name">
                {c.name}
                <span className={hint}>{c.required}</span>
              </label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                required
                placeholder={c.namePlaceholder}
                className={field}
              />
            </div>
            <div>
              <label className={label} htmlFor="from_email">
                {c.email}
                <span className={hint}>{c.required}</span>
              </label>
              <input
                id="from_email"
                name="from_email"
                type="email"
                required
                placeholder={c.emailPlaceholder}
                className={field}
              />
            </div>
            <div>
              <label className={label} htmlFor="company">
                {c.company}
                <span className={hint}>{c.optional}</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder={c.companyPlaceholder}
                className={field}
              />
            </div>
            <div>
              <label className={label} htmlFor="message">
                {c.message}
                <span className={hint}>{c.optional}</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={c.messagePlaceholder}
                className={`${field} resize-none`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={state === 'sending'}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-signal px-5 py-3 text-sm font-semibold text-base transition-colors hover:bg-signal/85 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state === 'sending' ? (
              c.sending
            ) : (
              <>
                <Send size={15} />
                {c.send}
              </>
            )}
          </button>

          {state === 'sent' && (
            <p
              role="status"
              className="mt-4 flex items-start gap-2.5 rounded-lg border border-signal/25 bg-signal/10 p-3.5 text-[13px] leading-relaxed text-signal"
            >
              <Check size={15} className="mt-0.5 flex-shrink-0" />
              {c.success}
            </p>
          )}
          {state === 'error' && (
            <p
              role="alert"
              className="mt-4 flex items-start gap-2.5 rounded-lg border border-warn/30 bg-warn/10 p-3.5 text-[13px] leading-relaxed text-warn"
            >
              <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
              {c.error}
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
