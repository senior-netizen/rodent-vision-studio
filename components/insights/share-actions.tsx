'use client';
import { useState } from 'react';

export function ShareActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const share = (network: 'linkedin' | 'x') => { const url = encodeURIComponent(window.location.href); const text = encodeURIComponent(title); window.open(network === 'linkedin' ? `https://www.linkedin.com/sharing/share-offsite/?url=${url}` : `https://x.com/intent/post?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer'); };
  return <div className="share-actions" aria-label="Share article"><span>Share</span><button type="button" onClick={() => share('linkedin')}>LinkedIn</button><button type="button" onClick={() => share('x')}>X</button><button type="button" onClick={async () => { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1800); }}>{copied ? 'Copied' : 'Copy link'}</button></div>;
}
