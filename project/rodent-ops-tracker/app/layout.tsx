import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Infrastructure Systems Builder',
  description: 'Cinematic infrastructure portfolio demonstrating operational system capability.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
