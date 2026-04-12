'use client';

import { ContactForm } from '@/components/contact/contact-form';

type StartProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function StartProjectModal({ isOpen, onClose }: StartProjectModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 200,
        display: 'grid',
        placeItems: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 16, width: 'min(560px, 100%)', padding: '1.25rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
          <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: 24 }}>Start a Project</h3>
          <button type="button" className="ctrl-btn" onClick={onClose} aria-label="Close project modal">
            ×
          </button>
        </div>
        <p style={{ color: 'var(--mid)', marginBottom: '1rem', fontSize: 14 }}>
          Share your project details and our team will contact you with a scoped delivery plan.
        </p>
        <ContactForm includeProjectType onSuccess={onClose} />
      </div>
    </div>
  );
}
