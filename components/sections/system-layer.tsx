import { SystemMapCanvas } from '@/components/system-map/system-map-canvas';

export function SystemLayerSection() {
  return (
    <section className="section-shell border-b border-secondary/20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="system-grid mb-10">
          <h2 className="col-span-12 text-[clamp(2.5rem,4vw,4rem)] uppercase leading-none lg:col-span-7">System Layer</h2>
          <p className="col-span-12 max-w-xl text-sm text-secondary lg:col-span-5 lg:pt-4">
            Interactive infrastructure topology linking edge telemetry, API surfaces, payment rails, and command dashboards.
          </p>
        </div>
        <div className="h-[60vh] min-h-[520px] border border-secondary/25">
          <SystemMapCanvas mode="interactive" />
        </div>
      </div>
    </section>
  );
}
