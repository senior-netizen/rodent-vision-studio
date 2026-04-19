const architectureImages = [
  'https://images.openai.com/static-rsc-4/HGpgbXadzq08GXteER-bhqGokJdAeQZrK4JEGDzY79nkvhHvO1YXnyj7lTLUELUjzkHdiIjtIr85Zks5acBt10hbkyT3RY14FJGJfZmPaU9swE-GJu6Sw9XcB2eqHhnG4UlDzLYd2Qr0WHGwpKWJGYN8tbZvGbw5QoBjKJmYt8AOzMkkbf6MMFnRYGSDXtZu?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/OM1ot5rrJ8hlRahud1nHR0IDKww1iFRTN3m2WlfaZMdSn7t27GeaKNzEqmgR5tEvF9pufFxpyfUt1Gg73lvoGBFNonslO_s7fiUbH8EOxGqclOytih1RzbIZLPgE0TpHwDsa5Eap6kes_zHGfPpNqtZ2uf6rnToL2TGshKIO3jeBRc4kif_4_cTYD171j9EH?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/UiTQa4ON-L1WDQjxnKRKRFptBecMe6djJ8cMYhgn4U2euFcevaRm8sQC1sg359JYmEcU8TIdIvOVqAxrCxoS9zzqKeZ9e-rYT07Yf0clRRamDOP2PQSzHiil2LIHLu37ubNXkagwv9O0UD7-HQtqHONHH6H8NraOioFVqn_x0f2MZCFu19g_NO6YAzQLPmW_?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/7kr3d3QUyQoJ98IpaQvabMXOtZyI9H4S55px1SXy6sz61Rc_Xcm1vGtY22ppwQhS8Rr7OT2dyLWEqMUJNB7Yyk4HhkQkbAyqdq_yd6KYgunxSWfJMMKc2L4aMh6JL9ABLpI43kDKagmjCT5RBKLB3DxdqlRzqLUlUIC6Wlb7DFIYcXVan1OGgl0vy7PNZqw6?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/POwhwOlAnoe8UYKbP6eYBo2G2lAIThuErNpMvUqVxr-kcHE7hl9664WDI1jCTDOSiwNNJqf4SGeJBAvDWTNCpakcbaNgIpduVPT2MueR6fenrpWmprtcPOx3zMIIk1L8Ppeu5A9Ub3BKa0AqNJRHz7HKpba3e0oGqRJG-RdfMjyyiBvdr8WGR7bWhS6brYo3?purpose=fullsize'
];

const outcomeImages = [
  'https://images.openai.com/static-rsc-4/jXQZETaJQUO-o4AEqT7ZHhYw_VkHauDT5LiRZqqY2Sq9W6j5P74ZU6FsrvTOCB2hd5Xtexn_KP7rV2AFA0GUuIZ0TGlsTPApQ3P5SAATHTjXwxUsJu_uHz4baAMGDF3r6IQXyKJ8K3HT8i15SF4LisjENbiHcjum81OifjgJOOrjMOUu8exvg5jdV-hMh7v5?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/WZnL77xvApfobTalMXTEaYKpqXFz40wFnXbHA9g0vQ9u3aEAu_GwCaj9t4Y932Efn83rzXyQAtd9JEKf7SN2VmZRpqUa2EnAdkXnKfwLtMCPIKpiOFwHhUkDsN5r0mrb14UFfE8dV_KA2dN1sYv_DnxhOtDygkhSqFuD5Ld2-AzECKpjOVDr3HEPkFjaeTsv?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/n3-P7Z5vfSk9sST8uPPcsINYdmjLlipos7__b7RLsTW0-oNokVbnrmyF1RIwDPjaBxmFuhIKWrFdypOyO_OMioq90z6_1J3IbqXT0OEOqjUtL0eYZe5PSh0433iDf0Ryj7dVKyPhj7yazaqrH7Hta8BQcE9aTfjIgn1WPTC3VadPiQBK3AQxoyoaEWWOymea?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/bp1WGqx288U30Cr2-kFUa11NwKqWIbxdSg8DaVZWGYSdJdT53JG6rjcUpgM63UuKEFwFkdXmUoGrdAa851_6IfzOt-fUDFJsA8v-XCtBy841HyKbKFYLV2pSOjE52kRrPbtjIuGH5VwtFQoYbW0NCOh01XOGIzs9--Kcsg7HHPlfKF8sXuE--uvJmtBD9QOp?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/qXtlm363HIClstGLo7NQSlGrwZUfYlaWEps-YXnMYdfxGOrdfL9Eq1YuHhQT-_3SeD7gmtfar6YhojZ2ffpkgjfzBkSUHRAsrQtZ0-kyHkaEU13EwZeQJj0Lq3v2CwABo0UHI5TmmfywVQXziuec2wbLnxDQzCVgl8sP5-crlSudStzVbOPiGYdIIRkgpGZg?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/xEDzZSFSq42li3aSqQNV2sp2Geofe0EN32u09pnMdztSSUiUAS79tcReT1dJSTfsSOiGlYvAORehZ7V0-ougqY_i-1_bmFT8oMvPNVqvcq0hwb-n3GyhtqTTjLSVHxc3cGzfeQnZDSUVlmzhvBzUk8KrybZE9uc8u_TVrR_XfNfKR3g_3D7VqbBqJFU36QiW?purpose=fullsize',
  'https://images.openai.com/static-rsc-4/HLHQkXhHfCpgYHmLTSFre8gPtJz5g-THYZzRjHWGXMHpykB5YP--8ETBoFVe2F9PLbHkU-H2HNHMw2zwJDwFQbSogLkiylv22042VsF0-2Hfm7XKMVRKoI3v0flGB_ZU9ylnZeGkyaI7swnji0Nwg8C2fgrpe-MsNFlHk2rM9RB_SlGPtdbEimo1DMl36-8P?purpose=fullsize'
];

const problemPoints = [
  'Job opportunities distributed across WhatsApp and social media',
  'No central system for aggregation',
  'No structured intake for organizations',
  'No persistent database',
  'No ownership of distribution'
];

const objectivePoints = [
  'Centralize job distribution',
  'Introduce structured submission pipeline',
  'Enable persistent data storage',
  'Deliver mobile-first access',
  'Establish platform ownership'
];

const featurePoints = [
  'Central job listing system',
  'Structured submission pipeline',
  'Admin-controlled publishing',
  'SEO-ready pages',
  'Mobile optimization',
  'Scalable backend'
];

const executionPoints = [
  'System architecture design',
  'UI implementation (Next.js)',
  'Database schema modeling (PostgreSQL)',
  'Supabase integration',
  'Deployment (Vercel)'
];

const outcomePoints = [
  'Centralized job access platform',
  'Elimination of fragmented distribution',
  'Continuous intake of opportunities',
  'Improved accessibility across devices',
  'Foundation for automation and scaling'
];

const strategicValuePoints = [
  'Converts informal networks into infrastructure',
  'Enables data ownership',
  'Supports future APIs and integrations',
  'Positions platform as a system, not a page'
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-neutral-200 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function ImageGrid({ images }: { images: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((src) => (
        <img key={src} src={src} alt="Case study visual" className="h-full w-full rounded-xl border border-neutral-200 object-cover" loading="lazy" />
      ))}
    </div>
  );
}

export default function JobOpportunitiesForEveryoneCaseStudyPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="pb-16 pt-32 sm:pt-36">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Hero</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Job Opportunities For Everyone — Platform Build</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-700">
            Cloud-native job distribution system built for structured intake, persistence, and scalable access.
          </p>
          <p className="mt-4 text-sm font-medium text-neutral-600">Stack: Next.js · Supabase · PostgreSQL</p>
        </div>
      </section>

      <Section title="Problem">
        <ul className="space-y-3">
          {problemPoints.map((item) => (
            <li key={item} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">{item}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-600">State: fragmented, manual, non-scalable</p>
      </Section>

      <Section title="Objective">
        <ul className="grid gap-3 sm:grid-cols-2">
          {objectivePoints.map((item) => (
            <li key={item} className="rounded-xl border border-neutral-200 px-4 py-3">{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="System Architecture">
        <ImageGrid images={architectureImages} />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-600">Frontend — Next.js</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
              <li>Server-side rendering</li>
              <li>SEO-optimized job pages</li>
              <li>Mobile-first UI</li>
            </ul>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-600">Backend — Supabase</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
              <li>PostgreSQL database</li>
              <li>Auto-generated API layer</li>
              <li>Authentication system</li>
              <li>Row-level security</li>
            </ul>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-600">Data Flow</h3>
            <p className="mt-3 text-sm text-neutral-700">Submission form → validation → database → rendered listings</p>
            <p className="mt-3 text-sm text-neutral-700">
              Reality: Supabase provides database + API + auth in one layer (<a className="underline" href="https://www.softmouse.net/mouse-rat-rodent-colony-management-software-database-labs-manager-technician-postdoc-researcher.jsp?utm_source=chatgpt.com" target="_blank" rel="noreferrer">SoftMouse</a>)
            </p>
          </div>
        </div>
      </Section>

      <Section title="Features">
        <ul className="grid gap-3 sm:grid-cols-2">
          {featurePoints.map((item) => (
            <li key={item} className="rounded-xl border border-neutral-200 px-4 py-3">{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Execution">
        <ul className="space-y-3">
          {executionPoints.map((item) => (
            <li key={item} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Outcome">
        <ImageGrid images={outcomeImages} />
        <ul className="mt-8 space-y-3">
          {outcomePoints.map((item) => (
            <li key={item} className="rounded-xl border border-neutral-200 px-4 py-3">{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Strategic Value">
        <ul className="space-y-3">
          {strategicValuePoints.map((item) => (
            <li key={item} className="rounded-xl border border-neutral-200 px-4 py-3">{item}</li>
          ))}
        </ul>
      </Section>

      <section className="border-t border-neutral-200 py-16">
        <div className="mx-auto w-full max-w-5xl px-5 text-center sm:px-8">
          <p className="text-2xl font-semibold tracking-tight sm:text-4xl">Built by Rodent, Inc. — infrastructure for scalable digital systems.</p>
        </div>
      </section>
    </main>
  );
}
