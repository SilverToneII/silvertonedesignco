'use client'

/**
 * useHasMounted — gate client-only renders behind hydration.
 *
 * Returns false during SSR and the first render pass; true after
 * useEffect fires post-hydration. Used to avoid hydration mismatch
 * when a component would render different markup before vs. after
 * the browser is ready (e.g. portal targets, navigator-dependent UI).
 */
import { useEffect, useState } from 'react'

export function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}
