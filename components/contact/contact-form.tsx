'use client';

import { FormEvent, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics/track';

type ContactFormProps = {
  className?: string;
  includeProjectType?: boolean;
  onSuccess?: () => void;
};

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

const projectTypes = ['Web System', 'Mobile Application', 'IoT Platform', 'Robotics & Automation'];

export function ContactForm({ className, includeProjectType = false, onSuccess }: ContactFormProps) {
  const [status, setStatus] = useState<SubmissionState>('idle');
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: projectTypes[0],
    message: '',
  });

  const disabled = status === 'loading';
  const buttonLabel = useMemo(() => {
    if (status === 'loading') return 'Sending...';
    if (status === 'success') return 'Sent';
    return 'Send Message';
  }, [status]);

  async function submitContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setError('Please complete all required fields.');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const payload = (await res.json()) as { error?: string };
        throw new Error(payload.error ?? 'Unable to send message at this time.');
      }

      trackEvent({ name: 'contact_form_submitted', metadata: { source: includeProjectType ? 'project_modal' : 'contact_page' } });
      setStatus('success');
      onSuccess?.();
      setFormData({ name: '', email: '', projectType: projectTypes[0], message: '' });
    } catch (submissionError) {
      setStatus('error');
      setError(submissionError instanceof Error ? submissionError.message : 'Unexpected error. Please retry.');
    }
  }

  return (
    <form onSubmit={submitContact} className={className}>
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        <input
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          type="text"
          placeholder="Name"
          required
          disabled={disabled}
          style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '0.7rem 0.9rem' }}
        />
        <input
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          type="email"
          placeholder="Email"
          required
          disabled={disabled}
          style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '0.7rem 0.9rem' }}
        />
        {includeProjectType ? (
          <select
            value={formData.projectType}
            onChange={(e) => setFormData((prev) => ({ ...prev, projectType: e.target.value }))}
            disabled={disabled}
            style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '0.7rem 0.9rem', background: '#fff' }}
          >
            {projectTypes.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        ) : null}
        <textarea
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          placeholder="Message"
          required
          disabled={disabled}
          rows={5}
          style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '0.7rem 0.9rem', resize: 'vertical' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.8rem' }}>
        <button type="submit" className="btn-primary" disabled={disabled}>
          {buttonLabel}
        </button>
        {status === 'error' ? (
          <button type="button" className="btn-ghost" onClick={() => setStatus('idle')}>
            Retry
          </button>
        ) : null}
      </div>
      {error ? <p style={{ marginTop: '0.6rem', color: '#a82222', fontSize: 13 }}>{error}</p> : null}
      {status === 'success' ? <p style={{ marginTop: '0.6rem', color: '#1d7f42', fontSize: 13 }}>Thanks, your inquiry was sent.</p> : null}
    </form>
  );
}
