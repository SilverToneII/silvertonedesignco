import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

/**
 * Silvertone Design Co. — Tailwind config
 *
 * Authority: Addendum A §A2 supersedes main spec §4 wherever values conflict.
 * - Colors: A2.1 (warm-shifted palette)
 * - Typography: A2.2 (bumped display sizes + clamp formulas baked in)
 * - Spacing: A2.3 (tightened section padding + eyebrow→heading gap)
 * - Motion: A2.4 (Lenis 1.4s, reveal yOffset 32 / duration 1000)
 *
 * Do not approximate, round, or substitute "close enough" Tailwind defaults.
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
    './src/content/**/*.{md,mdx}',
  ],
  theme: {
    // Replace borderRadius entirely — spec §4.6: only `none` and `pill`.
    // Other rounded utilities (rounded, rounded-md, rounded-lg, etc.) MUST NOT compile.
    borderRadius: {
      none: '0',
      pill: '9999px',
    },
    extend: {
      colors: {
        // §A2.1 — warm-shifted palette
        ink: {
          base: '#0A0A0A',
          raised: '#111111',
          border: '#1F1F1F',
          bright: '#2A2A2A',
        },
        bone: {
          base: '#F4F1EC',
          muted: '#A8A39C',
          // §A2.1 stated #6B665F at 4.51:1 — actual contrast on ink.base
          // is 3.47:1 (Axe-verified during Step 16 CI run). Bumped to
          // #8B847A (5.27:1) so eyebrows, metadata, and other 11px text
          // pass WCAG AA. Honors spec INTENT (AA-compliant) over the
          // literal hex. Documented in docs/DEVIATIONS.md.
          faint: '#8B847A',
          ghost: '#3D3A35',
        },
        signal: {
          error: '#FF4646',
          success: '#5DFFB3',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        sans: ['var(--font-body)'], // alias so default sans = body
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        // Mono — fixed sizes (§4.3.3)
        'mono-xs': ['10px', { lineHeight: '1.4', letterSpacing: '0.18em', fontWeight: '500' }],
        'mono-sm': ['11px', { lineHeight: '1.4', letterSpacing: '0.14em' }],
        'mono-md': ['13px', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        // Body — fixed sizes (§4.3.3)
        'body-sm': ['13px', { lineHeight: '1.5', letterSpacing: '0.005em' }],
        body: ['15px', { lineHeight: '1.6' }],
        'body-lg': ['18px', { lineHeight: '1.55', letterSpacing: '-0.005em' }],
        // Display — clamp formulas per §A2.2.2 (auto-responsive)
        h4: ['22px', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '500' }],
        h3: ['32px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '500' }],
        h2: [
          'clamp(32px, 8vw, 64px)',
          { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '500' },
        ],
        h1: [
          'clamp(40px, 10vw, 96px)',
          { lineHeight: '0.94', letterSpacing: '-0.035em', fontWeight: '500' },
        ],
        'display-lg': [
          'clamp(48px, 14vw, 140px)',
          { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '500' },
        ],
        'display-xl': [
          'clamp(56px, 16vw, 180px)',
          { lineHeight: '0.9', letterSpacing: '-0.045em', fontWeight: '500' },
        ],
        'display-2xl': [
          'clamp(72px, 20vw, 220px)',
          { lineHeight: '0.88', letterSpacing: '-0.05em', fontWeight: '500' },
        ],
      },
      spacing: {
        // §4.4 canonical scale (extends Tailwind defaults; values match where they overlap).
        '0.5': '2px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
        '36': '144px',
        '40': '160px',
        '48': '192px',
        '56': '224px',
        '64': '256px',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        hair: '0.5px',
        '1': '1px',
        '2': '2px',
      },
      screens: {
        // §5.1
        xs: '375px',
        // sm/md/lg/xl/2xl come from Tailwind defaults: 640/768/1024/1280/1536.
        // Spec §5.1 lists 2xl at 1440px — override here.
        '2xl': '1440px',
        '3xl': '1920px',
      },
      zIndex: {
        // §4.7
        base: '0',
        raised: '10',
        'hover-img': '40',
        header: '50',
        menu: '60',
        modal: '70',
        toast: '80',
      },
      transitionTimingFunction: {
        // §4.8
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        // §4.8
        instant: '0ms',
        fast: '200ms',
        base: '400ms',
        slow: '800ms',
        slower: '1200ms',
      },
      maxWidth: {
        // Container max from §4.4.1
        container: '1440px',
      },
    },
  },
  plugins: [typography],
}

export default config
