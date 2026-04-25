/**
 * Class-name merge utility — clsx for conditional joining,
 * twMerge (configured for our theme) for conflict resolution between
 * Tailwind utilities of the same kind. Used by every component per §11.4.
 *
 * Critical: tailwind-merge's default config doesn't know about our custom
 * `bone` / `ink` / `signal` color tokens or our custom `mono-*` / `body-*` /
 * `display-*` font-size tokens. Without registration, twMerge would
 * collapse `text-mono-xs` and `text-bone-base` (both `text-*` utilities)
 * into the last one, silently dropping our font-size class.
 *
 * `extendTailwindMerge.theme` registers them as theme keys that the
 * default class-group definitions then consume — so:
 *   • text-{bone,ink,signal}-* is recognized as text-color
 *   • text-{mono-*,body-*,h1..h4,display-*} is recognized as font-size
 *   • bg-* and border-* with our color tokens are recognized correctly
 */
import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      colors: ['bone', 'ink', 'signal'],
    },
    classGroups: {
      'font-size': [
        {
          text: [
            'mono-xs',
            'mono-sm',
            'mono-md',
            'body',
            'body-sm',
            'body-lg',
            'h1',
            'h2',
            'h3',
            'h4',
            'display-lg',
            'display-xl',
            'display-2xl',
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
