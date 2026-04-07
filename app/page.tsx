import { HeroSection } from '@/components/hero/hero-section';
import { SystemLayerSection } from '@/components/sections/system-layer';
import { SelectedSystemsSection } from '@/components/sections/selected-systems';
import { ContactSection } from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SystemLayerSection />
      <SelectedSystemsSection />
      <ContactSection />
    </main>
  );
}
