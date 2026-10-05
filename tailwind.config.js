/** Tokens map 1:1 to PRD section 5 (values live in src/styles/tokens.css). */
const v = (n) => `var(--${n})`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: { sm: '480px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1600px' },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      tide: { 800: v('tide-800'), 900: v('tide-900'), 950: v('tide-950') },
      seaglass: { 100: v('seaglass-100'), 500: v('seaglass-500') },
      brass: { 500: v('brass-500'), 600: v('brass-600') },
      sand: { 0: v('sand-0'), 50: v('sand-50'), 100: v('sand-100'), 200: v('sand-200') },
      ink: { 500: v('ink-500'), 600: v('ink-600'), 900: v('ink-900') },
      line: { 200: v('line-200'), 300: v('line-300') },
      ok: { 600: v('ok-600'), 100: v('ok-100') },
      warn: { 600: v('warn-600'), 100: v('warn-100') },
      err: { 600: v('err-600'), 100: v('err-100') },
      info: { 600: v('info-600'), 100: v('info-100') },
    },
    fontFamily: {
      serif: ['Newsreader', 'Newsreader Fallback', 'Georgia', 'serif'],
      sans: ['"Hanken Grotesk"', 'Hanken Fallback', 'system-ui', 'sans-serif'],
    },
    borderRadius: { none: '0', sm: '8px', DEFAULT: '10px', lg: '14px', xl: '20px', full: '9999px' },
    boxShadow: { none: 'none', 1: v('shadow-1'), 2: v('shadow-2'), 3: v('shadow-3') },
    extend: {
      maxWidth: { content: '1240px', read: '680px' },
      zIndex: { header: '40', filter: '30', drawer: '60', modal: '70', toast: '80', toolbar: '90' },
      transitionTimingFunction: {
        std: 'cubic-bezier(.2,0,0,1)',
        enter: 'cubic-bezier(.16,1,.3,1)',
        exit: 'cubic-bezier(.4,0,1,1)',
      },
      transitionDuration: { fast: '150ms', med: '280ms', slow: '600ms' },
    },
  },
  plugins: [],
};
