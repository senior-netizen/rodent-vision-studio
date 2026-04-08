import type { Metadata } from 'next';
import './globals.css';
import { SmoothScrollProvider } from '@/components/sections/smooth-scroll-provider';
import { Navigation } from '@/components/navigation/navigation';
import { CustomCursor } from '@/components/cursor/custom-cursor';

export const metadata: Metadata = {
  title: 'Rodent Vision Studio | Infrastructure Systems',
  description: 'Cinematic systems portfolio built for real-world deployment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="noise">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navigation />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
