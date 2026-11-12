import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: {
          DEFAULT: 'var(--surface)',
          elevated: 'var(--surface-elevated)',
        },
        text: {
          DEFAULT: 'var(--text)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          foreground: 'var(--primary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        success: {
          DEFAULT: 'var(--success)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
        },
        info: {
          DEFAULT: 'var(--info)',
        },
      },
      borderRadius: {
        input: '6px',
        card: '8px',
        btn: '10px',
        modal: '12px',
      },
      fontFamily: {
        sans: ['var(--font-satoshi)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        micro: ['11px', { lineHeight: '1.4', letterSpacing: '0.04em' }],
        small: ['13px', { lineHeight: '1.5' }],
        base: ['15px', { lineHeight: '1.6' }],
        h3: ['18px', { lineHeight: '1.3', letterSpacing: '-0.015em' }],
        h2: ['24px', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        h1: ['32px', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        hero: ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0, 0, 0, 0.06)',
        'subtle-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-sheet': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      transitionDuration: {
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      maxWidth: {
        prose: '720px',
        container: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;

