import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/hero/hero-section';
import { SelectedSystems } from '@/components/sections/selected-systems';
import { LenisProvider } from '@/components/sections/lenis-provider';

const SystemMapCanvas = dynamic(
  () => import('@/components/system-map/system-map-canvas').then((mod) => mod.SystemMapCanvas),
  { ssr: false }
);

export default function PortfolioPage() {
  return (
    <main>
      <LenisProvider />
      <HeroSection />
      <SystemMapCanvas />
      <SelectedSystems />
      <section className="px-6 py-[120px] lg:px-10">
        <div className="mx-auto max-w-grid border-t border-white/15 pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Contact</p>
          <p className="mt-5 max-w-xl text-lg text-muted">For infrastructure builds, incident-prone migrations, or system modernization engagements: build@rodent.systems</p>
        </div>
      </section>
    </main>
  );
}
