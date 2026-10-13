/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand
        orange: {
          DEFAULT: 'var(--color-orange)',
          tint: 'var(--color-orange-tint)',
          accessible: 'var(--color-orange-accessible)',
        },
        charcoal: 'var(--color-charcoal)',
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        sand: 'var(--color-sand)',
        teal: {
          DEFAULT: 'var(--color-teal)',
          tint: 'var(--color-teal-tint)',
        },
        muted: 'var(--color-muted)',
        border: {
          DEFAULT: 'var(--color-border)',
        },
        // Status
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        button: '10px',
        full: '9999px',
      },
      spacing: {
        // 8px grid — Tailwind already has 1=4px, 2=8px, etc.
        // We alias for clarity in docs but use standard Tailwind units.
      },
      boxShadow: {
        soft: '0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.03)',
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'slide-in-right': 'slideInRight 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
