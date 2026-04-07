import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        foreground: '#FFFFFF',
        muted: '#9CA3AF',
        accent: '#00F0FF'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      fontSize: {
        'display': ['clamp(5rem, 9vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'h2': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.03em' }]
      },
      maxWidth: {
        grid: '1440px'
      }
    }
  },
  plugins: []
};

export default config;
