import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pallet Ross — A place to display your masterpiece',
  description: 'Artists can display their masterpieces, and buyers can discover and purchase works that resonate with them.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
