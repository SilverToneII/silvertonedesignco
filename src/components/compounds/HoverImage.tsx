'use client'

/**
 * <HoverImage> — §12.6 + §A5.5
 *
 * Cursor-following preview image. Mounted only when the device has a
 * fine, hovering pointer. Imperative handle for show/hide/move so the
 * row receives the events and forwards them via ref.
 *
 * Performance (§A5.5)
 *   • GSAP quickTo (not raw transforms in mousemove) — avoids per-frame
 *     layout work
 *   • will-change: transform only while visible — preserves battery
 *     when idle
 *   • Source images preloaded on idle so first hover doesn't blank-flash
 *   • <img> not next/image — instant src swap, no layout shift
 */
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { gsap } from 'gsap'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export interface HoverImageHandle {
  show: (src: string, alt: string) => void
  hide: () => void
  move: (x: number, y: number) => void
}

interface HoverImageProps {
  /** Preload these on idle so first hover is instant. */
  preloadSrcs?: string[]
}

export const HoverImage = forwardRef<HoverImageHandle, HoverImageProps>(
  function HoverImage({ preloadSrcs = [] }, ref) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const xToRef = useRef<gsap.QuickToFunc | null>(null)
    const yToRef = useRef<gsap.QuickToFunc | null>(null)
    const [src, setSrc] = useState<string>('')
    const [alt, setAlt] = useState<string>('')
    const [visible, setVisible] = useState(false)

    // Only mount on hover-capable, fine-pointer devices (§5.3).
    const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')

    // Init quickTo functions once the container is mounted.
    useEffect(() => {
      if (!canHover || !containerRef.current) return
      xToRef.current = gsap.quickTo(containerRef.current, 'x', {
        duration: 0.4,
        ease: 'power3.out',
      })
      yToRef.current = gsap.quickTo(containerRef.current, 'y', {
        duration: 0.4,
        ease: 'power3.out',
      })
    }, [canHover])

    // Preload images on idle (§A5.5)
    useEffect(() => {
      if (!canHover || preloadSrcs.length === 0) return
      const cb = () => {
        for (const s of preloadSrcs) {
          const img = new window.Image()
          img.src = s
        }
      }
      const w = window as typeof window & {
        requestIdleCallback?: (cb: () => void) => number
        cancelIdleCallback?: (id: number) => void
      }
      if (typeof w.requestIdleCallback === 'function') {
        const id = w.requestIdleCallback(cb)
        return () => w.cancelIdleCallback?.(id)
      }
      const t = window.setTimeout(cb, 200)
      return () => window.clearTimeout(t)
    }, [preloadSrcs, canHover])

    useImperativeHandle(
      ref,
      () => ({
        show(newSrc, newAlt) {
          setSrc(newSrc)
          setAlt(newAlt)
          setVisible(true)
        },
        hide() {
          setVisible(false)
        },
        move(x, y) {
          xToRef.current?.(x)
          yToRef.current?.(y)
        },
      }),
      []
    )

    if (!canHover) return null

    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        data-hover-image
        className="pointer-events-none fixed left-0 top-0 z-hover-img w-[280px] lg:w-[320px]"
        style={{
          transform: 'translate3d(-9999px, -9999px, 0)',
          // §A5.5: will-change only when visible to avoid GPU layer
          // staying hot when nothing is on screen
          willChange: visible ? 'transform' : 'auto',
        }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="block h-auto w-full"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 200ms ease',
            }}
          />
        ) : null}
      </div>
    )
  }
)
