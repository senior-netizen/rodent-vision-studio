import Link from 'next/link';
import { ContactForm } from '@/components/contact/contact-form';

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '6rem 1rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(34px,5vw,56px)', marginBottom: '0.8rem' }}>Start a Project</h1>
      <p style={{ color: 'var(--mid)', maxWidth: 640, marginBottom: '1rem' }}>
        Tell us about your system requirements and delivery timeline. We will respond with an implementation path.
      </p>
      <ContactForm includeProjectType />
      <div style={{ marginTop: '1.2rem' }}>
        <Link href="/" className="btn-ghost">Back Home</Link>
      </div>
    </main>
  );
}
