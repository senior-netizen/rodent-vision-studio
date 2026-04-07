import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#050505',
        primary: '#FFFFFF',
        secondary: '#9CA3AF',
        accent: '#00F0FF'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      gridTemplateColumns: {
        system: 'repeat(12, minmax(0, 1fr))'
      }
    }
  },
  plugins: []
};

export default config;
