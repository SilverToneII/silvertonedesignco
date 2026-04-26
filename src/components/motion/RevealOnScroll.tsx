'use client'

/**
 * <RevealOnScroll> — §12.13 + §A2.4.2 overrides
 *
 * Wraps children with a fade-up reveal animation that fires when the
 * element scrolls into view. Defaults updated per §A2.4.2:
 *   yOffset:  32  (was 24 in main spec)
 *   duration: 1000 (was 800)
 *   ease:     expo.out (unchanged)
 *
 * SSR-safe initial state
 *   The wrapper renders with `data-reveal-self` (single-target) or
 *   `data-reveal-children` (stagger>0). Globals.css hides those
 *   selectors at opacity:0 + translateY(yOffset) BEFORE GSAP attaches
 *   — so above-fold content never flashes visible-then-hidden during
 *   hydration.
 *
 *   The hidden state is gated behind .js on <html> so users with JS
 *   disabled never see permanently-hidden content.
 *
 * Reduced-motion (§13.4)
 *   • CSS media query unsets opacity/transform so content is visible
 *   • The useEffect bails out before adding the GSAP tween
 *
 * Reveal trigger (§12.13)
 *   ScrollTrigger fires when the wrapper top hits 80% of viewport
 *   height. toggleActions: 'play none none none' — fires once forward,
 *   never reverses. (Re-animating on scroll-back-up is jarring.)
 *
 * GSAP integration
 *   ScrollTrigger plugin is registered globally by LenisProvider (§A5.1).
 *   Lenis drives ScrollTrigger.update so reveals fire at the correct
 *   scroll position even with smooth scroll active.
 */
import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/cn'

interface RevealOnScrollProps {
  /** Stagger this many ms between direct children (>0 enables child-staggered reveal). */
  stagger?: number
  /** Custom delay (ms) before the tween starts. */
  delay?: number
  /** Y offset (px) for the initial state. §A2.4.2 default 32. */
  yOffset?: number
  /** Tween duration (ms). §A2.4.2 default 1000. */
  duration?: number
  /** Disable when prefers-reduced-motion: reduce. */
  respectReducedMotion?: boolean
  /** Where to trigger relative to the viewport. ScrollTrigger format. */
  start?: string
  className?: string
  children: ReactNode
}

export function RevealOnScroll({
  stagger = 0,
  delay = 0,
  yOffset = 32,
  duration = 1000,
  respectReducedMotion = true,
  start = 'top 80%',
  className,
  children,
}: RevealOnScrollProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    if (
      respectReducedMotion &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      // CSS @media has already neutralized the hidden state; nothing to do.
      return
    }

    const targets =
      stagger > 0 ? Array.from(wrapper.children) : (wrapper as Element)

    // gsap.context scopes selectors and lets us revert in cleanup.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: yOffset },
        {
          opacity: 1,
          y: 0,
          duration: duration / 1000,
          ease: 'expo.out',
          delay: delay / 1000,
          stagger: stagger / 1000,
          // Once the tween is attached we no longer need the CSS hidden
          // state — clear data attrs so a re-render doesn't reset us.
          onStart: () => {
            wrapper.removeAttribute('data-reveal-self')
            wrapper.removeAttribute('data-reveal-children')
          },
          scrollTrigger: {
            trigger: wrapper,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    }, wrapperRef)

    return () => {
      // Kill any ScrollTriggers tied to this wrapper (gsap.context.revert
      // doesn't always catch them in StrictMode double-mount).
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === wrapper)
        .forEach((st) => st.kill())
      ctx.revert()
    }
  }, [stagger, delay, yOffset, duration, respectReducedMotion, start])

  return (
    <div
      ref={wrapperRef}
      data-reveal-self={stagger === 0 ? '' : undefined}
      data-reveal-children={stagger > 0 ? '' : undefined}
      style={{ '--reveal-y': `${yOffset}px` } as React.CSSProperties}
      className={cn(className)}
    >
      {children}
    </div>
  )
}
