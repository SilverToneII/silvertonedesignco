'use client'

/**
 * usePrefersReducedMotion — §13.4 verbatim
 *
 * Returns the live value of the prefers-reduced-motion: reduce media
 * query. SSR returns false (motion OK by default); on mount we sync
 * with the actual browser pref and subscribe to changes so users who
 * toggle their OS setting get an immediate update without reload.
 */
import { useEffect, useState } from 'react'

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}
