'use client';

import { FormEvent, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/analytics/track';

type ContactFormProps = {
  className?: string;
  includeProjectType?: boolean;
  /** When true, render the full lead-qualification fields (company, phone, budget, timeline). */
  fullInquiry?: boolean;
  variant?: 'default' | 'dark';
  source?: string;
  onSuccess?: () => void;
};

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

const projectTypes = ['Web System', 'Mobile Application', 'IoT Platform', 'Robotics & Automation', 'Enterprise Platform'];
const budgetRanges = ['< $5k', '$5k – $20k', '$20k – $50k', '$50k+', 'Not sure yet'];
const timelines = ['ASAP', '1 – 3 months', '3 – 6 months', 'Flexible'];

export function ContactForm({
  className,
  includeProjectType = false,
  fullInquiry = false,
  variant = 'default',
  source,
  onSuccess,
}: ContactFormProps) {
  const [status, setStatus] = useState<SubmissionState>('idle');
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: projectTypes[0],
    budget: budgetRanges[0],
    timeline: timelines[1],
    message: '',
  });

  const showProjectType = includeProjectType || fullInquiry;
  const isDark = variant === 'dark';

  const inputStyle: React.CSSProperties = {
    border: isDark ? '1px solid rgba(255,255,255,0.18)' : '1px solid var(--border)',
    background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
    color: isDark ? '#fff' : 'inherit',
    borderRadius: 10,
    padding: '0.75rem 0.95rem',
    fontFamily: 'inherit',
    fontSize: 14,
    outline: 'none',
    width: '100%',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: isDark ? 'rgba(255,255,255,0.55)' : 'var(--mid)',
    fontWeight: 600,
    marginBottom: 6,
    display: 'block',
  };

  const fieldGroup = (children: React.ReactNode) => (
    <div style={{ display: 'grid', gridTemplateColumns: fullInquiry ? '1fr 1fr' : '1fr', gap: '0.8rem' }}>
      {children}
    </div>
  );

  const disabled = status === 'loading';
  const buttonLabel = useMemo(() => {
    if (status === 'loading') return 'Sending…';
    if (status === 'success') return 'Sent ✓';
    return fullInquiry ? 'Send Inquiry' : 'Send Message';
  }, [status, fullInquiry]);

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
        body: JSON.stringify({ ...formData, source: source ?? (fullInquiry ? 'inquiry_full' : 'contact_simple') }),
      });

      if (!res.ok) {
        const payload = (await res.json()) as { error?: string };
        throw new Error(payload.error ?? 'Unable to send message at this time.');
      }

      trackEvent({
        name: 'contact_form_submitted',
        metadata: { source: source ?? (fullInquiry ? 'inquiry_full' : 'contact_simple') },
      });
      setStatus('success');
      onSuccess?.();
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        projectType: projectTypes[0],
        budget: budgetRanges[0],
        timeline: timelines[1],
        message: '',
      });
    } catch (submissionError) {
      setStatus('error');
      setError(submissionError instanceof Error ? submissionError.message : 'Unexpected error. Please retry.');
    }
  }

  return (
    <form onSubmit={submitContact} className={className} noValidate>
      <div style={{ display: 'grid', gap: '0.9rem' }}>
        {fieldGroup(
          <>
            <div>
              <label style={labelStyle}>Name *</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                type="text"
                required
                maxLength={100}
                disabled={disabled}
                style={inputStyle}
              />
            </div>
            {fullInquiry ? (
              <div>
                <label style={labelStyle}>Company</label>
                <input
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  type="text"
                  maxLength={120}
                  disabled={disabled}
                  style={inputStyle}
                />
              </div>
            ) : null}
          </>,
        )}
        {fieldGroup(
          <>
            <div>
              <label style={labelStyle}>Email *</label>
              <input
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                type="email"
                required
                maxLength={255}
                disabled={disabled}
                style={inputStyle}
              />
            </div>
            {fullInquiry ? (
              <div>
                <label style={labelStyle}>Phone / WhatsApp</label>
                <input
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  type="tel"
                  maxLength={40}
                  disabled={disabled}
                  style={inputStyle}
                />
              </div>
            ) : null}
          </>,
        )}

        {showProjectType ? (
          <div>
            <label style={labelStyle}>Project type</label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData((prev) => ({ ...prev, projectType: e.target.value }))}
              disabled={disabled}
              style={inputStyle}
            >
              {projectTypes.map((type) => (
                <option value={type} key={type} style={{ color: '#111' }}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {fullInquiry ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <div>
              <label style={labelStyle}>Budget</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                disabled={disabled}
                style={inputStyle}
              >
                {budgetRanges.map((b) => (
                  <option key={b} value={b} style={{ color: '#111' }}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Timeline</label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value }))}
                disabled={disabled}
                style={inputStyle}
              >
                {timelines.map((t) => (
                  <option key={t} value={t} style={{ color: '#111' }}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        ) : null}

        <div>
          <label style={labelStyle}>Project description *</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            required
            maxLength={2000}
            disabled={disabled}
            rows={5}
            placeholder="What are you trying to build, and what's the current state?"
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '1.1rem', flexWrap: 'wrap' }}>
        <button type="submit" className="btn-primary" disabled={disabled} style={isDark ? { background: '#fff', color: '#111' } : undefined}>
          {buttonLabel}
        </button>
        <span style={{ fontSize: 12, color: isDark ? 'rgba(255,255,255,0.55)' : 'var(--mid)' }}>
          We respond within 1 business day.
        </span>
        {status === 'error' ? (
          <button type="button" className="btn-ghost" onClick={() => setStatus('idle')} style={isDark ? { color: 'rgba(255,255,255,0.7)' } : undefined}>
            Retry
          </button>
        ) : null}
      </div>
      {error ? <p style={{ marginTop: '0.6rem', color: '#ff8a8a', fontSize: 13 }}>{error}</p> : null}
      {status === 'success' ? (
        <p style={{ marginTop: '0.6rem', color: isDark ? '#7fe2a3' : '#1d7f42', fontSize: 13 }}>
          Thanks — your inquiry was sent. We'll be in touch shortly.
        </p>
      ) : null}
    </form>
  );
}
