'use client'

/**
 * useMediaQuery — generic media query hook.
 *
 * Returns the live value of an arbitrary CSS media query. Used by
 * components that need viewport-conditional behavior (e.g. <HoverImage>
 * checks `(hover: hover) and (pointer: fine)` per §5.3).
 *
 * Initial value is `false` for SSR consistency. On mount we read the
 * actual matchMedia value and subscribe to changes.
 */
import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(query)
    setMatches(mq.matches)

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}
