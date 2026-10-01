import type { Project } from './projects';

export type ServiceSlug = 'web' | 'mobile' | 'iot' | 'robotics' | 'sap-bank-reconciliation';
export type ServiceFaq = { q: string; a: string };
export type ServiceItem = { title: string; description: string };

export type Service = {
  slug: ServiceSlug;
  name: string;
  eyebrow: string;
  heroTitle: string;
  summary: string;
  capability: string;
  introduction: string;
  deliverables: ServiceItem[];
  flow: string[];
  process: { title: string; description: string }[];
  outcomes: ServiceItem[];
  audiences: string[];
  integrations: string;
  technologies: string[];
  faqs: ServiceFaq[];
  metaTitle: string;
  metaDescription: string;
  relatedProjects: Project['id'][];
  cta: string;
  category?: string;
  tags?: string[];
};

const delivery = {
  discovery: { title: 'Discovery', description: 'Understand the operation, users, constraints and definition of success.' },
  requirements: { title: 'Requirements', description: 'Turn workflows, data and controls into a testable delivery scope.' },
  architecture: { title: 'Architecture', description: 'Define system boundaries, data models, interfaces and deployment choices.' },
  engineering: { title: 'Engineering', description: 'Build in reviewable increments, keeping the working system visible.' },
  integration: { title: 'Integration', description: 'Connect the system to approved services, devices and existing software.' },
  testing: { title: 'Testing', description: 'Verify core workflows, edge cases, security boundaries and operational behaviour.' },
  deployment: { title: 'Deployment', description: 'Prepare environments, releases, documentation and operational handover.' },
};

export const services: Service[] = [
  {
    slug: 'sap-bank-reconciliation', name: 'SAP Bank Reconciliation Automation', eyebrow: 'SAP & Enterprise Automation',
    heroTitle: 'SAP Automated Bank Reconciliation', category: 'SAP & Enterprise Automation',
    summary: 'Structured bank-statement integration, matching, posting and exception workflows designed for SAP finance operations.',
    capability: 'Automate reconciliation across multiple banks, accounts and currencies directly within your SAP environment.',
    introduction: 'Rodent Lab designs controlled finance workflows around each organisation’s SAP landscape, banking capabilities and approval model. SAP remains the system of record; automation handles eligible transactions and retains exceptions for review.',
    tags: ['Multi-Currency', 'Multi-Bank', 'ISO 20022', 'SAP EBS', 'Automated Matching', 'Exception Management'],
    deliverables: [
      { title: 'Statement Integration', description: 'Interfaces for supported structured electronic bank statements.' },
      { title: 'Matching Rules', description: 'Configured criteria for identifying corresponding SAP transactions.' },
      { title: 'Posting & Clearing', description: 'Controlled handling of eligible transactions within the SAP workflow.' },
      { title: 'Exception Management', description: 'A defined route for transactions that require finance-team judgement.' },
    ],
    flow: ['Bank', 'Electronic Statement', 'Validation', 'SAP Matching Rules', 'Posting & Clearing', 'Exception Review', 'Reconciled'],
    process: [delivery.discovery, delivery.requirements, delivery.architecture, delivery.integration, delivery.testing, delivery.deployment],
    outcomes: [
      { title: 'Less repetitive work', description: 'Direct attention to exceptions instead of transaction-by-transaction comparison.' },
      { title: 'Consistent controls', description: 'Apply defined matching, approval and audit requirements across the workflow.' },
      { title: 'Better visibility', description: 'Make reconciliation status and unresolved items easier to review.' },
    ],
    audiences: ['Finance teams operating SAP', 'Multi-bank organisations', 'Multi-currency operations', 'Enterprises modernising reconciliation controls'],
    integrations: 'Available formats and connection methods depend on the organisation’s SAP landscape and each bank’s supported capabilities. Options can include ISO 20022 CAMT messages, SWIFT MT940, secure APIs, SFTP and controlled file exchange.',
    technologies: ['SAP EBS', 'ISO 20022', 'CAMT.053', 'SWIFT MT940', 'SFTP', 'APIs'], faqs: [],
    metaTitle: 'SAP Bank Reconciliation Automation | Rodent Lab',
    metaDescription: 'SAP bank reconciliation automation for multi-bank and multi-currency environments, including electronic statements, matching and exception management.',
    relatedProjects: [], cta: 'Discuss your SAP environment, banking relationships and current reconciliation process.',
  },
  {
    slug: 'web', name: 'Web Systems', eyebrow: 'Software Engineering', heroTitle: 'Web Systems Built Around Your Operations',
    summary: 'Custom platforms, operational dashboards and APIs built around the way your organisation works.',
    capability: 'Design and engineer secure web platforms, business systems, portals and backend services around real operational requirements.',
    introduction: 'A useful business system does more than present screens. It represents the organisation’s records, permissions, decisions and integrations clearly enough to replace fragmented processes with one controlled workflow.',
    deliverables: [
      { title: 'Custom Business Platforms', description: 'Applications shaped around organisation-specific workflows and records.' },
      { title: 'Operational Dashboards', description: 'Interfaces for monitoring transactions, customers, equipment, teams or processes.' },
      { title: 'SaaS Platforms', description: 'Multi-user products designed for recurring operational use.' },
      { title: 'Customer & Partner Portals', description: 'Secure self-service surfaces for customers, suppliers, agents or partners.' },
      { title: 'APIs & Backend Systems', description: 'Typed services, business rules and integration boundaries.' },
      { title: 'Internal Tools', description: 'Controlled workflows that replace spreadsheets and repeated manual handling.' },
      { title: 'CMS Platforms', description: 'Managed publishing for public or internal information without code changes.' },
      { title: 'Access & Reporting', description: 'Role-aware access, operational views, exports and traceable activity.' },
    ],
    flow: ['Business Process', 'Requirements & Data Model', 'Application Layer', 'APIs & Integrations', 'Database', 'Operational Interface', 'Reporting & Automation'],
    process: [delivery.discovery, delivery.requirements, delivery.architecture, { title: 'Interface Design', description: 'Prototype the important workflows and information hierarchy.' }, delivery.engineering, delivery.integration, delivery.testing, delivery.deployment],
    outcomes: [
      { title: 'Centralised operations', description: 'Bring records and workflows into a system with clear ownership.' },
      { title: 'Less duplicate entry', description: 'Connect approved systems and reuse structured information.' },
      { title: 'Operational visibility', description: 'Give teams appropriate dashboards, reports and status information.' },
      { title: 'Controlled access', description: 'Separate public, customer, partner and administrative workflows.' },
    ],
    audiences: ['Service businesses', 'Property and retail operations', 'NGOs and public-interest platforms', 'Startups building technically substantial products', 'Larger organisations replacing fragmented workflows'],
    integrations: 'Depending on the system, integration can include payment gateways, ERP or banking interfaces, email and SMS services, identity providers, cloud storage and documented third-party APIs. Specific providers are selected during architecture, not assumed in advance.',
    technologies: ['Next.js', 'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Vercel'],
    faqs: [{ q: 'Can you work with an existing system?', a: 'Yes. Discovery identifies which data, workflows and interfaces should be retained, integrated or replaced.' }, { q: 'Is every platform built on the same stack?', a: 'No. Technology choices follow the operating constraints, integration surface and maintainability requirements.' }],
    metaTitle: 'Web Systems | Rodent Lab', metaDescription: 'Custom web platforms, operational dashboards, portals, APIs and internal tools engineered around business workflows.',
    relatedProjects: ['jofe-platform', 'feel-home', 'ar-experience', 'precise-locations-lib', 'express-energy'], cta: 'Tell us what your organisation needs to manage, publish or automate.',
  },
  {
    slug: 'mobile', name: 'Mobile Applications', eyebrow: 'Mobile Product Engineering', heroTitle: 'Mobile Systems for Work That Happens Anywhere',
    summary: 'API-connected mobile applications designed for customers, employees and field workflows.',
    capability: 'Build practical mobile applications that keep important workflows clear across devices and variable connectivity.',
    introduction: 'Rodent treats mobile as an operational surface, not a reduced website. Data capture, authentication, permissions, device behaviour and release constraints are considered alongside the interface.',
    deliverables: [
      { title: 'Cross-Platform Applications', description: 'Shared mobile products for supported Android and iOS requirements.' },
      { title: 'Field Workflows', description: 'Structured collection and review of information away from a desk.' },
      { title: 'Customer Applications', description: 'Bookings, account workflows and service interactions connected to backend systems.' },
      { title: 'Employee Tools', description: 'Role-specific tasks, approvals and operational information.' },
      { title: 'Offline-Aware Workflows', description: 'Explicit behaviour for interrupted connectivity and later synchronisation.' },
      { title: 'Notifications', description: 'Event-driven updates where they improve a defined workflow.' },
      { title: 'Secure Mobile Access', description: 'Authentication, permissions and appropriate handling of data on the device.' },
      { title: 'API & Device Integration', description: 'Connections to business services and supported device capabilities.' },
    ],
    flow: ['Mobile User', 'Application', 'Authentication', 'API', 'Business Logic', 'Database / Existing Systems', 'Notifications / Reports'],
    process: [delivery.discovery, { title: 'Workflow & UX', description: 'Design for the user’s context, device and shortest useful task path.' }, delivery.architecture, delivery.engineering, { title: 'Device Testing', description: 'Check layouts, permissions, connectivity states and supported devices.' }, { title: 'Release Preparation', description: 'Prepare signed builds, store material and a controlled rollout plan.' }, delivery.deployment],
    outcomes: [
      { title: 'Faster field information', description: 'Capture and make operational information available closer to where work happens.' },
      { title: 'Consistent workflows', description: 'Replace ad hoc messages and forms with guided, validated steps.' },
      { title: 'Useful customer access', description: 'Put the right account or service actions into a focused mobile experience.' },
      { title: 'Connected operations', description: 'Link mobile activity to the organisation’s approved backend systems.' },
    ],
    audiences: ['Field and service teams', 'Booking-led businesses', 'Customer-service operations', 'Organisations with distributed employees', 'Product teams requiring a mobile channel'],
    integrations: 'Mobile systems can connect to authenticated APIs, notifications and supported device features. Offline storage, background work and permission use are designed only where the operating workflow requires them.',
    technologies: ['Flutter', 'React Native', 'TypeScript', 'Node.js', 'SQLite', 'Supabase'],
    faqs: [{ q: 'How do you handle unreliable connectivity?', a: 'We identify which tasks must continue offline, what can be queued and how conflicts should be resolved before implementation.' }, { q: 'Do you support both Android and iOS?', a: 'Cross-platform delivery can support both, subject to project requirements, device capabilities and release validation.' }],
    metaTitle: 'Mobile Application Development | Rodent Lab', metaDescription: 'Operational mobile applications for field teams, customers and employees, with API integration and offline-aware workflows.',
    relatedProjects: ['feel-home'], cta: 'Have a customer, employee or field workflow that belongs on mobile?',
  },
  {
    slug: 'iot', name: 'IoT Systems', eyebrow: 'Connected Systems Engineering', heroTitle: 'From Physical Equipment to Operational Action',
    summary: 'Sensors, telemetry pipelines, monitoring and alerts that make field equipment visible to operators.',
    capability: 'Connect equipment, edge devices and software so teams can observe events, retain history and act on defined conditions.',
    introduction: 'IoT architecture depends on the equipment, site, network and consequence of failure. Rodent designs the path from a physical signal to an operator decision, including what should happen when connectivity or downstream services are unavailable.',
    deliverables: [
      { title: 'Sensor Integration', description: 'Capture relevant readings and equipment state through supported interfaces.' },
      { title: 'Edge Devices', description: 'Local collection, validation or control close to the equipment.' },
      { title: 'Telemetry Transport', description: 'MQTT or another appropriate protocol for reliable device communication.' },
      { title: 'Ingestion & Processing', description: 'Receive, normalise and route device events into software services.' },
      { title: 'Rules & Alerts', description: 'Evaluate defined conditions and notify the appropriate operational workflow.' },
      { title: 'Monitoring Dashboards', description: 'Current equipment state, incidents and operational context.' },
      { title: 'Historical Data', description: 'Time-ordered readings and events for review and investigation.' },
      { title: 'Fleet Considerations', description: 'Device identity, configuration and maintainable communication boundaries.' },
    ],
    flow: ['Sensors / Equipment', 'Edge Device', 'Connectivity', 'MQTT / Secure Transport', 'Ingestion Layer', 'Rules / Processing', 'Database', 'Dashboard + Alerts'],
    process: [delivery.discovery, { title: 'Site & Signal Survey', description: 'Map equipment, readings, connectivity, power and failure conditions.' }, { title: 'Prototype', description: 'Validate sensors, edge hardware and communication before scale decisions.' }, delivery.architecture, { title: 'Hardware Validation', description: 'Test the chosen device and integration under representative conditions.' }, delivery.engineering, delivery.testing, delivery.deployment],
    outcomes: [
      { title: 'Equipment visibility', description: 'Turn physical state into information operators can inspect.' },
      { title: 'Earlier awareness', description: 'Route defined events and thresholds into an alert workflow.' },
      { title: 'Operational history', description: 'Retain readings and incidents for investigation and improvement.' },
      { title: 'Connected decisions', description: 'Share validated device data with dashboards and approved business systems.' },
    ],
    audiences: ['Industrial and energy operations', 'Distributed equipment operators', 'Facilities and infrastructure teams', 'Engineering teams validating a connected product'],
    integrations: 'ESP32-class edge hardware, MQTT and API-connected backends are relevant where project conditions support them. Protocol, storage and connectivity choices remain project-specific.',
    technologies: ['ESP32', 'MQTT', 'Node.js', 'TypeScript', 'PostgreSQL', 'WebSockets'],
    faqs: [{ q: 'Does every project use MQTT?', a: 'No. Protocol selection depends on device support, connectivity, message patterns and operating constraints.' }, { q: 'Can you start with a prototype?', a: 'Yes. A bounded prototype is often the safest way to validate sensing, communication and operator value.' }],
    metaTitle: 'IoT Systems & Connected Monitoring | Rodent Lab', metaDescription: 'Sensor integration, edge devices, telemetry, monitoring dashboards and alert workflows for connected operations.',
    relatedProjects: ['shedsense-grid'], cta: 'Need visibility into equipment, sensors or field operations?',
  },
  {
    slug: 'robotics', name: 'Robotics & Automation', eyebrow: 'Physical Systems Engineering', heroTitle: 'Automation Where Software Meets the Physical World',
    summary: 'Prototypes and integrated automation concepts combining software, electronics, sensing and control.',
    capability: 'Explore, prototype and engineer sensor-driven automation and machine-to-software workflows with explicit safety boundaries.',
    introduction: 'Rodent’s laboratory capability sits at the intersection of software, electronics and industrial thinking. Engagements can begin as feasibility work or a controlled proof of concept before any commercial deployment commitment.',
    deliverables: [
      { title: 'Process Automation', description: 'Translate a repeatable physical or digital process into controlled states.' },
      { title: 'Robotics Prototypes', description: 'Bounded prototypes used to validate movement, sensing and interaction.' },
      { title: 'Sensor-Driven Control', description: 'Use validated inputs to inform defined actuator or workflow responses.' },
      { title: 'Embedded Software', description: 'Software at the device or edge where the use case requires it.' },
      { title: 'Machine Integration', description: 'Interfaces between equipment state and an operator or business system.' },
      { title: 'Monitoring & Supervision', description: 'Operator visibility, commands and event history around automated behaviour.' },
      { title: 'Vision Concepts', description: 'Feasibility and prototype work for visual detection or inspection where appropriate.' },
      { title: 'Intelligent Infrastructure', description: 'Connected control concepts for facilities and physical environments.' },
    ],
    flow: ['Physical Process', 'Sensors', 'Edge / Controller', 'Control Logic', 'Actuators', 'Operator Supervision', 'Event History'],
    process: [delivery.discovery, { title: 'Feasibility', description: 'Separate assumptions from what can be safely and practically validated.' }, { title: 'Prototype', description: 'Build a bounded proof of concept for the critical mechanism.' }, { title: 'Control Design', description: 'Define states, interlocks, manual override and supervision boundaries.' }, { title: 'Integration', description: 'Connect validated electronics, controllers and software interfaces.' }, { title: 'Validation', description: 'Test expected operation and failure handling in a controlled environment.' }, delivery.deployment],
    outcomes: [
      { title: 'Validate before scaling', description: 'Test a technical automation concept before committing to a larger programme.' },
      { title: 'Connect machines and software', description: 'Make equipment state available to appropriate digital workflows.' },
      { title: 'Reduce repetitive handling', description: 'Automate suitable, well-defined steps while retaining operator control.' },
      { title: 'Improve traceability', description: 'Record relevant commands, events and outcomes for operational review.' },
    ],
    audiences: ['Industrial teams exploring automation', 'Product teams developing physical technology', 'Facilities and infrastructure operators', 'Research and laboratory initiatives'],
    integrations: 'Controller, sensor, actuator and vision choices are made through feasibility and validation. Commercial delivery, prototypes and laboratory research are scoped and labelled separately.',
    technologies: ['ESP32', 'Python', 'Node.js', 'Edge computing', 'Sensor interfaces', 'Computer vision prototypes'],
    faqs: [{ q: 'Do you claim turnkey industrial robotics deployment?', a: 'No. Scope is explicit about whether work is feasibility, laboratory research, a prototype, integration engineering or a production delivery.' }, { q: 'How is safety approached?', a: 'Risk, interlocks, operating boundaries and human supervision are considered during control design, before deployment decisions.' }],
    metaTitle: 'Robotics & Automation Engineering | Rodent Lab', metaDescription: 'Robotics prototypes, sensor-driven automation, embedded software and machine-to-software integration for physical operations.',
    relatedProjects: ['shedsense-grid'], cta: 'Have a physical process or automation concept you need to validate?',
  },
];

export const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service])) as Record<ServiceSlug, Service>;
