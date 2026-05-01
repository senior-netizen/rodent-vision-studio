import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getServerEnv } from '@/lib/env';

const contactPayloadSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email('A valid email is required').max(255),
  phone: z.string().trim().max(40).optional(),
  projectType: z.string().trim().max(60).optional(),
  budget: z.string().trim().max(40).optional(),
  timeline: z.string().trim().max(40).optional(),
  source: z.string().trim().max(60).optional(),
  message: z.string().trim().min(1, 'Message is required').max(2000),
});

export async function POST(request: Request) {
  const json = await request.json();
  const parsedPayload = contactPayloadSchema.safeParse(json);

  if (!parsedPayload.success) {
    return NextResponse.json(
      {
        error: 'Invalid payload',
        details: parsedPayload.error.flatten(),
      },
      { status: 400 },
    );
  }

  const env = getServerEnv();

  if (!env.features.contactForm) {
    return NextResponse.json({ error: 'Contact form is disabled.' }, { status: 503 });
  }

  if (!env.resendApiKey) {
    return NextResponse.json({ error: 'Email service is not configured. Set RESEND_API_KEY.' }, { status: 500 });
  }

  const body = parsedPayload.data;
  const emailBody = [
    `Name: ${body.name}`,
    body.company ? `Company: ${body.company}` : null,
    `Email: ${body.email}`,
    body.phone ? `Phone: ${body.phone}` : null,
    `Project Type: ${body.projectType ?? 'General Inquiry'}`,
    body.budget ? `Budget: ${body.budget}` : null,
    body.timeline ? `Timeline: ${body.timeline}` : null,
    body.source ? `Source: ${body.source}` : null,
    '',
    body.message,
  ]
    .filter(Boolean)
    .join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.contactFromEmail,
      to: [env.contactToEmail],
      subject: 'New Inquiry',
      text: emailBody,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ error: `Email delivery failed: ${errorText}` }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
