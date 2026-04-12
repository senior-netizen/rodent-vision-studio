import { NextResponse } from 'next/server';

type ContactPayload = {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'you@rodent.co.zw';
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

  if (!resendKey) {
    return NextResponse.json({ error: 'Email service is not configured. Set RESEND_API_KEY.' }, { status: 500 });
  }

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
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
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
