import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getServerEnv } from '@/lib/env';

const contactPayloadSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('A valid email is required'),
  projectType: z.string().trim().optional(),
  message: z.string().trim().min(1, 'Message is required'),
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
    `Email: ${body.email}`,
    `Project Type: ${body.projectType ?? 'General Inquiry'}`,
    '',
    body.message,
  ].join('\n');

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
