/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-primary':  '#0A0A0A',
        'bg-surface':  '#111111',
        'bg-elevated': '#1A1A1A',
        'accent-primary': '#2D6DF6',
        'accent-orange':  '#EF5F17',
        'accent-white':   '#F5F5F5',
        'text-muted':  '#6B6B6B',
        'border-subtle': '#222222',
        'success':     '#22C55E',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: { content: '1120px' },
    },
  },
  plugins: [],
}
