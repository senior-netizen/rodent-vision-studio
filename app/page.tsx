import { HeroSection } from '@/components/hero/hero-section';
import { FeaturedClientsSection } from '@/components/sections/featured-clients';
import { ImpactMetricsSection } from '@/components/sections/impact-metrics';
import { SelectedSystemsSection } from '@/components/sections/selected-systems';
import { SystemLayerSection } from '@/components/sections/system-layer';
import { ContactSection } from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedClientsSection />
      <ImpactMetricsSection />
      <SelectedSystemsSection />
      <SystemLayerSection />
      <ContactSection />
    </main>
  );
}
