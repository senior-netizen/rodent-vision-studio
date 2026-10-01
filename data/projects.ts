export type DeploymentStatus = 'live' | 'staging' | 'failed';

export type LinkHealthCheck = {
  checkedAt: string;
  ok: boolean;
  statusCode?: number;
};

export type LinkHealth = {
  lastCheckedAt?: string;
  lastSuccessfulCheckAt?: string;
  recentChecks?: LinkHealthCheck[];
};

export type ProjectDeployment = {
  version: string;
  url: string;
  createdAt: string;
  status: DeploymentStatus;
};

export type PreviewStatus = 'pending' | 'ready' | 'failed';

export type PreviewState = {
  status: PreviewStatus;
  lastError?: string;
  attemptCount: number;
  requestedAt?: string;
  generatedAt?: string;
  failedAt?: string;
  updatedAt: string;
};

export interface ProjectConfig {
  id: string;
  slug: string;
  name: string;
  category: string;
  color: string;
  role: string;
  projectType: string;
  url: string;
  links: {
    live?: string;
    repo?: string;
  };
  problem: string;
  context: string;
  requirements: string[];
  capabilities: { title: string; description: string }[];
  challenges: { title: string; description: string }[];
  relatedServices: { name: string; href: string }[];
  solution?: string;
  result?: string;
  metrics?: { label: string; value: string }[];
  tagline?: string;
  architecture: string[];
  preview: string;
  stack: string[];
  dataFlow: string[];
  decisions: string[];
  decisionDetails: { title: string; description: string }[];
  visuals: {
    screenshot: string;
    diagram?: string;
    preview: string;
  };
  previewGeneratedAt?: string;
  previewAsset?: {
    hash: string;
    version: string;
    aliasUrl: string;
  };
  status?: DeploymentStatus;
  deployments?: ProjectDeployment[];
  linkHealth?: LinkHealth;
  stale?: boolean;
  outcome: string;
  summary: {
    scope: string;
    timeline?: string;
    primaryKpi: string;
  };
}

export const projectConfigs = [
  {
    id: 'jofe-platform',
    color: '#1D4ED8',
    slug: 'job-opportunities-for-everyone-platform',
    name: 'Job Opportunities For Everyone',
    category: 'Employment Platform',
    role: 'Product Design + Full-Stack Engineering',
    projectType: 'Public Platform',
    url: 'https://jobopportunities.co.zw',
    links: {
      live: 'https://jobopportunities.co.zw',
    },
    problem: 'Job opportunities shared across separate channels can be difficult for applicants to find and for publishers to keep organised.',
    context: 'This public platform addresses a practical publishing problem: opportunities distributed through disconnected channels are difficult to browse consistently and difficult for publishers to maintain as structured information.',
    requirements: ['Structured job records', 'Consistent submission and publishing flow', 'Individual opportunity pages', 'Mobile-accessible browsing', 'Persistent database storage', 'A deployment suitable for public access'],
    capabilities: [
      { title: 'Structured Publishing', description: 'Opportunities enter the platform as consistent records rather than arbitrary posts.' },
      { title: 'Listing Browse', description: 'Visitors can review opportunities from one public catalogue.' },
      { title: 'Individual Pages', description: 'Each published opportunity has a dedicated page with its structured details.' },
      { title: 'Submission Workflow', description: 'Publisher input is validated before it reaches the data layer.' },
      { title: 'Responsive Interface', description: 'Core discovery paths are usable across mobile and desktop layouts.' },
      { title: 'Server Rendering', description: 'Public job pages are rendered through the application for accessible distribution.' },
    ],
    challenges: [
      { title: 'Consistent public information', description: 'A defined record shape keeps independently submitted opportunities readable and reusable.' },
      { title: 'Public and publishing paths', description: 'Browsing and submission are treated as different workflows with different controls.' },
    ],
    relatedServices: [{ name: 'Web Systems', href: '/services/web' }],
    solution: 'Rodent built a web platform where opportunities can be submitted as structured records and published as individual job pages.',
    result: 'The delivered platform gives job seekers one place to browse listings and gives publishers a consistent way to add them.',
    tagline: 'One place to publish and browse structured job listings.',
    architecture: ['Next.js App Router (SSR)', 'Supabase Auth + PostgREST API', 'PostgreSQL data layer', 'Vercel deployment edge network'],
    preview: '/visuals/jofe-preview.jpg',
    stack: ['Next.js (App Router)', 'Supabase', 'PostgreSQL', 'TailwindCSS', 'Vercel'],
    dataFlow: ['Submission Form → Validation', 'Validation → Supabase API', 'Supabase API → PostgreSQL', 'PostgreSQL → SSR Job Pages'],
    decisions: ['Prioritized mobile-first interaction patterns for accessibility.', 'Structured listings and submissions to support data ownership and scale.'],
    decisionDetails: [
      { title: 'Structured Listings', description: 'Opportunities are stored as records so they can be validated, displayed consistently and reused across the platform.' },
      { title: 'Mobile-First Browsing', description: 'The primary discovery path is designed for the smaller screens commonly used to open shared opportunity links.' },
      { title: 'Server-Rendered Pages', description: 'Public listing pages are delivered by the application rather than relying on a client-only interface.' },
    ],
    visuals: { screenshot: '/visuals/jofe-preview.jpg', preview: '/visuals/jofe-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.0.0', url: 'https://jobopportunities.co.zw', createdAt: '2026-04-20T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Established a centralized job platform with a scalable intake and publishing foundation.',
    summary: {
      scope: 'Job listing submission, publishing, and browsing.',
      primaryKpi: 'Structured listings in one public platform.',
    },
  },
  {
    id: 'feel-home',
    color: '#0F766E',
    slug: 'feel-at-home',
    category: 'Property Platform',
    role: 'Platform Engineering',
    projectType: 'Public Preview',
    links: {
      live: 'https://feelathome.vercel.app',
    },
    problem: 'People looking for a home and people publishing properties needed a shared place to manage listings.',
    context: 'Feel At Home is a property-platform preview that brings the publisher and property-seeker journeys into one product surface without implying transaction or agency services.',
    requirements: ['Structured property listings', 'Searchable catalogue', 'Individual property detail', 'Authenticated publishing tools', 'Responsive discovery', 'Persistent data layer'],
    capabilities: [
      { title: 'Listing Publication', description: 'Authenticated publisher workflows separate content management from public discovery.' },
      { title: 'Property Catalogue', description: 'Structured records can be presented consistently in a browsable collection.' },
      { title: 'Search', description: 'Users can narrow the catalogue and move from results to a property detail.' },
      { title: 'Property Detail', description: 'Each listing has space for its own structured information and presentation.' },
      { title: 'Access Control', description: 'Write operations sit behind sign-in-protected publisher paths.' },
      { title: 'Responsive Use', description: 'Discovery and publishing interfaces adapt across supported screen sizes.' },
    ],
    challenges: [
      { title: 'Two distinct user journeys', description: 'Public discovery remains simple while listing management is protected behind authenticated flows.' },
      { title: 'Responsive catalogue browsing', description: 'Index-first lookup reduces the work required to move from a broad catalogue to one property.' },
    ],
    relatedServices: [{ name: 'Web Systems', href: '/services/web' }, { name: 'Mobile Applications', href: '/services/mobile' }],
    solution: 'Rodent built a property website with searchable listings and sign-in-protected publishing tools.',
    result: 'The preview brings property discovery and managed listing publication into one interface.',
    tagline: 'Property discovery and managed publishing in one preview.',
    architecture: ['Next.js application layer', 'Typed API contracts', 'PostgreSQL persistence', 'Vercel deployment'],
    name: 'Feel At Home',
    url: 'https://feelathome.vercel.app',
    preview: '/visuals/feel-at-home-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'React Query', 'PostgreSQL', 'Tailwind CSS'],
    dataFlow: ['User Query → Search Index', 'Search Index → Property Catalog', 'Catalog → Listing Detail', 'Listing Events → Agent Dashboard'],
    decisions: ['Kept property lookup paths index-first for responsive browsing.', 'Separated listing write access behind authenticated publisher flows.'],
    decisionDetails: [
      { title: 'Index-First Discovery', description: 'Search begins with a catalogue optimised for scanning before the user opens a detailed record.' },
      { title: 'Protected Publishing', description: 'Listing write access is separated from public browsing through authenticated publisher workflows.' },
      { title: 'Structured Property Records', description: 'A consistent data shape supports catalogue, search and detail views without duplicating content.' },
    ],
    visuals: { screenshot: '/visuals/feel-at-home-preview.jpg', preview: '/visuals/feel-at-home-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'staging',
    deployments: [
      { version: '0.9.0', url: 'https://feelathome.vercel.app', createdAt: '2026-04-20T00:00:00.000Z', status: 'staging' },
    ],
    outcome: 'Delivered a single platform for discovering homes and publishing managed listings.',
    summary: {
      scope: 'End-to-end property search and listing platform.',
      primaryKpi: 'Search and publishing in one interface.',
    },
  },
  {
    id: 'shedsense-grid',
    color: '#7C3AED',
    slug: 'shedsense-grid',
    category: 'Telemetry Platform',
    role: 'Distributed Systems Engineering',
    projectType: 'Rodent Product Demonstration',
    links: {
      live: 'https://backend-nl4r.onrender.com',
    },
    problem: 'Teams monitoring equipment in the field needed a clear way to turn incoming meter readings into information they could act on.',
    context: 'ShedSense demonstrates the software path between distributed field equipment and an operator: readings enter through a telemetry boundary, pass through processing and rules, and become status, alerts and a reviewable incident history.',
    requirements: ['Telemetry ingestion', 'MQTT message transport', 'Ordered event processing', 'Rule evaluation', 'Operator alerts', 'Operational dashboard', 'Historical incident review', 'Separation between device and interface layers'],
    capabilities: [
      { title: 'Edge Ingestion', description: 'Field readings enter through a dedicated device-facing boundary.' },
      { title: 'MQTT Telemetry', description: 'Messages move from equipment into the processing flow through an IoT-oriented protocol.' },
      { title: 'Rule Evaluation', description: 'Defined conditions convert readings into operational events.' },
      { title: 'Alert Routing', description: 'Relevant events are surfaced for operator attention.' },
      { title: 'Operational Dashboard', description: 'Operators can view equipment state and event context away from the device layer.' },
      { title: 'Incident History', description: 'Time-ordered events support review and reconstruction of what occurred.' },
    ],
    challenges: [
      { title: 'Device and operator separation', description: 'Telemetry intake is isolated from the interface so either layer can evolve without becoming the other’s transport.' },
      { title: 'Ordered event history', description: 'Readings and derived events retain sequence so operators can reconstruct an incident rather than see only the latest state.' },
      { title: 'Connectivity variation', description: 'The architecture acknowledges that field messages and user interfaces do not always share a continuous connection.' },
    ],
    relatedServices: [{ name: 'IoT Systems', href: '/services/iot' }, { name: 'Web Systems', href: '/services/web' }, { name: 'Robotics & Automation', href: '/services/robotics' }],
    solution: 'Rodent built a telemetry flow that receives readings through MQTT, checks them against rules, and sends alerts and status updates to an operations dashboard.',
    result: 'The system demonstrates field readings appearing as alerts and a time-ordered incident record for operators to review.',
    tagline: 'Field telemetry routed into alerts and an operations dashboard.',
    architecture: ['Edge ingestion', 'Stream processing', 'Rule evaluation engine', 'Operational dashboard'],
    name: 'ShedSense',
    url: 'https://backend-nl4r.onrender.com',
    preview: '/visuals/shedsense-preview.jpg',
    stack: ['Next.js 14', 'TypeScript', 'Three.js', 'Framer Motion', 'PostgreSQL'],
    dataFlow: ['Edge Meter → MQTT Broker', 'Broker → Stream Processor', 'Processor → Rule Engine', 'Rule Engine → Dashboard'],
    decisions: ['Kept incoming readings separate from the operator interface.', 'Recorded events in order so an operator can review what happened.'],
    decisionDetails: [
      { title: 'Decoupled Ingestion', description: 'Device messages enter a processing layer instead of being coupled directly to the operator dashboard.' },
      { title: 'Rule-Based Events', description: 'Explicit rules translate telemetry into operator-relevant status and alerts.' },
      { title: 'Reviewable Timeline', description: 'Ordered events preserve enough context to inspect what happened after an alert.' },
    ],
    visuals: {
      screenshot: '/visuals/shedsense-ui.jpg',
      diagram: '/visuals/shedsense-architecture.jpg',
      preview: '/visuals/shedsense-preview.jpg',
    },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    outcome: 'Connected field telemetry, rule evaluation, alerts, and an operator-facing incident view.',
    summary: {
      scope: 'Telemetry intake, rule checks, alerts, and an operator dashboard.',
      primaryKpi: 'Alert routing and incident visibility.',
    },
  },
  {
    id: 'ar-experience',
    color: '#DB2777',
    slug: 'ar-by-rodent',
    category: 'AR Experience',
    role: 'Interactive Product Engineering',
    projectType: 'Rodent Demonstration',
    links: {
      live: 'https://arbyrodent.vercel.app',
    },
    problem: 'The project needed a web-based way to introduce and demonstrate an augmented-reality concept.',
    context: 'AR by Rodent is an interactive web presentation and laboratory demonstration. It explores how motion, WebGL and responsive interaction can communicate an immersive product concept without claiming a native AR hardware deployment.',
    requirements: ['Interactive web presentation', 'WebGL visual surface', 'Input-responsive motion', 'Mobile and desktop layouts', 'Accessible calls to action', 'Performance-conscious asset delivery'],
    capabilities: [
      { title: 'WebGL Rendering', description: 'A browser-rendered visual layer creates depth beyond a static landing page.' },
      { title: 'Motion Orchestration', description: 'Sequenced transitions respond to page state and user interaction.' },
      { title: 'Responsive Interaction', description: 'The experience adapts its composition for mobile and desktop use.' },
      { title: 'Experience Shell', description: 'Navigation and content remain understandable around the immersive surface.' },
      { title: 'Accessible Actions', description: 'Important links remain explicit elements rather than being hidden inside the visual effect.' },
      { title: 'Visual Presentation', description: 'Media, typography and interaction work as one product narrative.' },
    ],
    challenges: [
      { title: 'Motion without losing usability', description: 'Animation is sequenced around the content rather than replacing navigation or calls to action.' },
      { title: 'Different device capabilities', description: 'Responsive composition and controlled effects support a wider range of screens and input methods.' },
    ],
    relatedServices: [{ name: 'Web Systems', href: '/services/web' }],
    solution: 'Rodent built an interactive product site using a Next.js interface, WebGL visuals, and motion that responds to user input.',
    result: 'The public site lets visitors explore the visual concept and follow its calls to action on mobile or desktop.',
    tagline: 'An interactive web presentation for an augmented-reality concept.',
    architecture: ['Next.js UI shell', 'WebGL render surface', 'Motion orchestration', 'CTA analytics hooks'],
    name: 'AR by Rodent',
    url: 'https://arbyrodent.vercel.app',
    preview: '/visuals/ar-by-rodent-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'Framer Motion', 'WebGL', 'CSS Effects'],
    dataFlow: ['User Session → Experience Shell', 'Interaction Events → Animation Layer', 'Media Assets → Render Pipeline', 'CTA Actions → Source Destination'],
    decisions: ['Optimized animation sequencing to keep motion smooth across device classes.', 'Structured interactive elements to preserve accessibility while remaining immersive.'],
    decisionDetails: [
      { title: 'Layered Rendering', description: 'The WebGL surface is treated as one layer within a conventional, navigable application shell.' },
      { title: 'Controlled Motion', description: 'Animation sequences are coordinated to avoid competing effects and unnecessary work.' },
      { title: 'Semantic Interaction', description: 'Calls to action remain recognisable controls even when the surrounding presentation is experimental.' },
    ],
    visuals: { screenshot: '/visuals/ar-by-rodent-preview.jpg', preview: '/visuals/ar-by-rodent-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.1.0', url: 'https://arbyrodent.vercel.app/', createdAt: '2026-04-20T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Delivered a public interactive product surface that combines an application shell, browser-rendered visuals and explicit calls to action.',
    summary: {
      scope: 'Interactive AR showcase and product landing experience.',
      primaryKpi: 'Interactive presentation on mobile and desktop.',
    },
  },
  {
    id: 'precise-locations-lib',
    color: '#D97706',
    slug: 'precise-locations',
    category: 'Developer Tooling',
    role: 'Library Architecture + Release Engineering',
    projectType: 'Open Source',
    links: {
      live: 'https://github.com/anesu398/precise-locations',
      repo: 'https://github.com/anesu398/precise-locations',
    },
    problem: 'Applications working with coordinates needed reusable validation and distance calculations instead of implementing them repeatedly.',
    context: 'Precise Locations packages coordinate operations behind a small typed interface. The public repository and release history make the implementation inspectable and demonstrate reusable API and release engineering.',
    requirements: ['Coordinate input validation', 'Distance calculation', 'Typed public functions', 'Reusable package interface', 'Versioned distribution', 'Automated release checks', 'Public source repository'],
    capabilities: [
      { title: 'Coordinate Validation', description: 'Reject invalid inputs at the library boundary before calculation.' },
      { title: 'Distance Calculation', description: 'Expose reusable location-distance operations to consuming applications.' },
      { title: 'Typed API', description: 'Make inputs and results explicit for TypeScript consumers.' },
      { title: 'Package Distribution', description: 'Bundle functionality for reuse instead of copying implementation between products.' },
      { title: 'Versioning', description: 'Communicate release changes through semantic versions.' },
      { title: 'Release Automation', description: 'Use repository automation to verify and publish package changes.' },
    ],
    challenges: [
      { title: 'A dependable public boundary', description: 'Small typed functions make invalid input and downstream use easier to reason about.' },
      { title: 'Reuse across applications', description: 'Packaging and versioning separate the utility from any one product codebase.' },
    ],
    relatedServices: [{ name: 'Web Systems', href: '/services/web' }],
    solution: 'Rodent built a typed Node.js library that checks coordinate input, calculates distance, and packages those functions for reuse.',
    result: 'The source and release history are publicly available for developers to inspect and use.',
    tagline: 'Reusable coordinate validation and distance calculations.',
    architecture: ['Typed Node.js library core', 'Validation boundary', 'Automated release pipeline', 'GitHub/npm distribution'],
    name: 'Precise Locations',
    url: 'https://github.com/anesu398/precise-locations',
    preview: '/visuals/precise-locations-preview.jpg',
    stack: ['Node.js', 'TypeScript', 'npm', 'GitHub Actions', 'Semantic Versioning'],
    dataFlow: ['Input Coordinates → Validation', 'Validated Data → Distance Engine', 'Distance Results → Consumer APIs', 'Package Releases → npm/GitHub'],
    decisions: ['Kept the public functions small and typed.', 'Automated checks and package publishing through GitHub Actions.'],
    decisionDetails: [
      { title: 'Small Public API', description: 'Focused functions reduce integration overhead and keep location behaviour predictable.' },
      { title: 'Validate at the Boundary', description: 'Coordinates are checked before calculation so consumers receive explicit failures instead of misleading output.' },
      { title: 'Automated Releases', description: 'GitHub Actions and semantic versioning provide a repeatable package-release path.' },
    ],
    visuals: { screenshot: '/visuals/precise-locations-preview.jpg', preview: '/visuals/precise-locations-preview.jpg' },
    previewGeneratedAt: '2026-04-20T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.0.0', url: 'https://github.com/anesu398/precise-locations', createdAt: '2026-04-20T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Provided a reusable geospatial toolkit for coordinate-driven applications.',
    summary: {
      scope: 'Open source Node.js package for precise location operations.',
      primaryKpi: 'Reusable location functions in a public package.',
    },
  },
  {
    id: 'express-energy',
    color: '#DC2626',
    slug: 'express-energy',
    name: 'Express Energy Service Station',
    category: 'Fuel Retail Platform',
    role: 'Brand + Web Engineering',
    projectType: 'Client Project',
    url: 'https://expressenergy.co.zw',
    links: { live: 'https://expressenergy.co.zw' },
    problem: 'Express Energy needed a clear web presence where drivers could find station information and current published prices.',
    context: 'For a service station, the highest-value web questions are practical: what information is current, where is the station and how does a driver get there? The project organises those answers inside the Express Energy brand.',
    requirements: ['Mobile-first public website', 'Published fuel prices', 'Station information', 'Directions path', 'Editable content', 'Clear brand presentation', 'Responsive information hierarchy'],
    capabilities: [
      { title: 'Fuel-Price Publishing', description: 'Current published prices have a dedicated, visible module.' },
      { title: 'Station Information', description: 'Operational details are grouped for quick customer reference.' },
      { title: 'Directions', description: 'A direct route helps visitors move from information to a station visit.' },
      { title: 'Managed Content', description: 'CMS-backed information can be updated without rebuilding page structure.' },
      { title: 'Responsive Design', description: 'Priority customer information remains clear on a phone.' },
      { title: 'Brand System', description: 'Layout, type and colour create a consistent public business presence.' },
    ],
    challenges: [
      { title: 'Fast access on mobile', description: 'Price, station and direction information is prioritised for drivers arriving on smaller screens.' },
      { title: 'Current public information', description: 'Editable content separates routine business updates from the application layout.' },
    ],
    relatedServices: [{ name: 'Web Systems', href: '/services/web' }],
    solution: 'Rodent built a mobile-friendly marketing site with a fuel-price section, station information, and a route to directions.',
    result: 'The public website gives drivers one place to check the information the station publishes online.',
    tagline: 'Published fuel prices and station information in one website.',
    architecture: ['Next.js marketing site', 'Daily price module', 'Station locator', 'CMS-backed content'],
    preview: '/visuals/express-energy-preview.jpg',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    dataFlow: ['Price update → CMS', 'CMS → Today\'s Prices module', 'User location → Station finder', 'CTA → Directions'],
    decisions: ['Mobile-first hero with strong brand identity.', 'Surfaced 24hr availability and Feruka sourcing as primary trust signals.'],
    decisionDetails: [
      { title: 'Information Before Decoration', description: 'Price, station and direction paths remain prominent within the branded presentation.' },
      { title: 'Mobile-First Hierarchy', description: 'The layout prioritises information a driver is likely to need quickly on a phone.' },
      { title: 'Managed Updates', description: 'CMS-backed content supports routine updates without requiring layout changes.' },
    ],
    visuals: {
      screenshot: '/visuals/express-energy-preview.jpg',
      preview: '/visuals/express-energy-preview.jpg',
    },
    previewGeneratedAt: '2026-05-03T00:00:00.000Z',
    status: 'live',
    deployments: [
      { version: '1.0.0', url: 'https://expressenergy.co.zw', createdAt: '2026-05-03T00:00:00.000Z', status: 'live' },
    ],
    outcome: 'Launched a branded fuel-retail web presence with a published price module, station information and a directions path.',
    summary: {
      scope: 'Marketing site, pricing module, and station finder for a 24hr fuel retailer.',
      primaryKpi: 'Prices and station details visible in one place.',
    },
  },
] satisfies ProjectConfig[];

export type Project = (typeof projectConfigs)[number];

export const projectById = Object.fromEntries(
  projectConfigs
    .filter((project) => project.id)
    .map((project) => [project.id, project]),
) as Record<string, ProjectConfig>;

export const projectIdBySlug = Object.fromEntries(
  projectConfigs
    .filter((project) => Boolean(project.slug))
    .map((project) => [project.slug, project.id]),
) as Record<string, ProjectConfig['id']>;

export const projects: Project[] = [
  projectConfigs.find((project) => project.id === 'shedsense-grid')!,
  ...projectConfigs.filter((project) => project.id !== 'shedsense-grid'),
];
