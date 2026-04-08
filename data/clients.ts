export type FeaturedClient = {
  name: string;
  logoText: string;
  website?: string;
  sector: string;
};

export const featuredClients: FeaturedClient[] = [
  {
    name: 'EnerGrid Holdings',
    logoText: 'EnerGrid',
    website: 'https://example.com/energrid',
    sector: 'Energy Infrastructure',
  },
  {
    name: 'Metro Utility Co',
    logoText: 'Metro Utility',
    website: 'https://example.com/metro-utility',
    sector: 'Utilities',
  },
  {
    name: 'PulsePay Network',
    logoText: 'PulsePay',
    website: 'https://example.com/pulsepay',
    sector: 'Fintech',
  },
  {
    name: 'FieldOps Industrial',
    logoText: 'FieldOps',
    website: 'https://example.com/fieldops',
    sector: 'Industrial Operations',
  },
  {
    name: 'Astra Compliance Group',
    logoText: 'Astra',
    website: 'https://example.com/astra',
    sector: 'Compliance',
  },
  {
    name: 'Northline Logistics',
    logoText: 'Northline',
    website: 'https://example.com/northline',
    sector: 'Logistics',
  },
];
