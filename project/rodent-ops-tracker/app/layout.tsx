import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Rodent Ops Tracker',
  description: 'Track project revenue and operational expenses.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
