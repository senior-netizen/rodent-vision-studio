import Link from 'next/link';
import { ContactForm } from '@/components/contact/contact-form';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Rodent, Inc. — Start Your Project',
  description:
    'Tell us about your web, mobile, IoT, robotics, or enterprise project. Rodent, Inc. responds within one business day.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Rodent, Inc. — Start Your Project',
    description:
      'Tell us about your web, mobile, IoT, robotics, or enterprise project. Rodent, Inc. responds within one business day.',
    type: 'website',
    url: '/contact',
    images: [{ url: '/rodent-logo.png', alt: 'Rodent, Inc. logo' }],
  },
};

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '6rem 1.25rem 4rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.4, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.6rem' }}>
          01 — Start a Project
        </p>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(38px,6vw,68px)', lineHeight: 1.02, letterSpacing: '-1.5px', marginBottom: '1rem' }}>
          Tell us what you&apos;re building.
        </h1>
        <p style={{ color: 'var(--mid)', maxWidth: 640, fontSize: 17, lineHeight: 1.65 }}>
          Share your system requirements, budget, and delivery timeline. We&apos;ll respond within one business day with an
          implementation path and next steps.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'start' }}>
        <section
          style={{
            border: '1px solid var(--border)',
            borderRadius: 18,
            padding: '2rem',
            background: '#fff',
          }}
        >
          <ContactForm fullInquiry source="contact_page" />
        </section>

        <aside style={{ display: 'grid', gap: '1.5rem', position: 'sticky', top: '6rem' }}>
          <div style={{ border: '1px solid var(--border)', borderRadius: 18, padding: '1.4rem' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '0.6rem' }}>
              Response time
            </p>
            <p style={{ fontFamily: 'var(--font-syne)', fontSize: 22, fontWeight: 700, marginBottom: '0.4rem' }}>Within 1 business day</p>
            <p style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.55 }}>
              For urgent enterprise inquiries, reach out via WhatsApp for a same-day reply.
            </p>
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: 18, padding: '1.4rem' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '0.8rem' }}>
              Other ways to reach us
            </p>
            <ul style={{ display: 'grid', gap: '0.7rem', listStyle: 'none', padding: 0, fontSize: 14 }}>
              <li>
                <a href="mailto:anesu@rodent.co.zw" style={{ color: 'inherit', textDecoration: 'none' }}>
                  ✉ anesu@rodent.co.zw
                </a>
              </li>
              <li>
                <a href="https://wa.me/263787008238" target="_blank" rel="noreferrer noopener" style={{ color: 'inherit', textDecoration: 'none' }}>
                  WhatsApp · +263 78 700 8238
                </a>
              </li>
              <li>
                <a href="tel:+253785286530" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Call · +253 785 286 530
                </a>
              </li>
            </ul>
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: 18, padding: '1.4rem', background: 'var(--light)' }}>
            <p style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.6, marginBottom: '0.6rem' }}>
              Looking for case studies or pricing first?
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <Link href="/projects" className="btn-ghost" style={{ border: '1px solid var(--border)', borderRadius: 100, padding: '6px 14px', textDecoration: 'none' }}>
                Our work
              </Link>
              <Link href="/services" className="btn-ghost" style={{ border: '1px solid var(--border)', borderRadius: 100, padding: '6px 14px', textDecoration: 'none' }}>
                Services
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <Link href="/" className="btn-ghost">← Back home</Link>
      </div>
    </main>
  );
}
