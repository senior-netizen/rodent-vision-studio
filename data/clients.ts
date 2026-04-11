export type FeaturedClient = {
  name: string;
  logoText: string;
  website?: string;
  sector: string;
};

export const featuredClients: FeaturedClient[] = [
  {
    name: 'City Councils',
    logoText: 'City Councils',
    sector: 'Local Government',
  },
  {
    name: 'Nemchem',
    logoText: 'Nemchem',
    sector: 'Chemical Manufacturing',
  },
  {
    name: 'Mashonaland Tobacco Company',
    logoText: 'Mashonaland Tobacco',
    sector: 'Agriculture & Tobacco',
  },
  {
    name: 'Chiredzi Town Council',
    logoText: 'Chiredzi Town Council',
    sector: 'Local Government',
  },
];
