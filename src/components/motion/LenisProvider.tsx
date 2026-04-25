'use client'

/**
 * <LenisProvider> — §13.2 + §A2.4.1 (tuning) + §A5.1 (integration order)
 *
 * Lenis smooth-scroll, driven by the GSAP ticker so ScrollTrigger and
 * Lenis stay in lockstep. The §A5.1 order is non-negotiable:
 *   1. lenis.on('scroll', ScrollTrigger.update)
 *   2. gsap.ticker.add(time => lenis.raf(time * 1000))
 *   3. gsap.ticker.lagSmoothing(0)
 *
 * Reduced-motion (§13.4): if the user prefers reduced motion, Lenis is
 * never instantiated — native scroll takes over. The full
 * usePrefersReducedMotion hook ships in Step 5; here we use a one-off
 * matchMedia check so Step 4 doesn't depend on Step 5.
 *
 * useScrollTo() exposes the smooth-scroll-to function (1.2s default
 * duration per §12.10 back-to-top); falls back to native smooth
 * scroll-behavior when Lenis isn't running.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<RefObject<Lenis | null> | null>(null)

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      // §A2.4.1 — slower feels more premium than 1.2 default
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // §A2.4.1 — slightly dampened from the 1.0 default
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
      infinite: false,
      // Native scroll on touch devices feels better than smooth
      smoothTouch: false,
    } as ConstructorParameters<typeof Lenis>[0])

    lenisRef.current = lenis

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    // §A5.1 — exact integration order. Don't reorder.
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // §13.3 — ScrollTrigger global config
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    })

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
}

/**
 * Smooth scroll-to with the canonical 1.2s duration (§12.10).
 * Falls back to native smooth scroll if Lenis isn't running
 * (reduced-motion users, SSR, mid-mount).
 */
export function useScrollTo() {
  const ref = useContext(LenisContext)

  return useCallback(
    (target: number | string | HTMLElement, durationSec = 1.2) => {
      const lenis = ref?.current
      if (lenis) {
        lenis.scrollTo(target, { duration: durationSec })
        return
      }
      if (typeof window === 'undefined') return

      let top = 0
      if (typeof target === 'number') {
        top = target
      } else if (typeof target === 'string') {
        const el = document.querySelector(target)
        if (el instanceof HTMLElement) top = el.offsetTop
      } else {
        top = target.offsetTop
      }
      window.scrollTo({ top, behavior: 'smooth' })
    },
    [ref]
  )
}
