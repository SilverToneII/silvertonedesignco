/**
 * <FullImage> — MDX body image (§9.4 + §10.3 + §A7.4).
 * Defaults to full-container width regardless of intrinsic image dimensions.
 */
import Image from 'next/image'

interface FullImageProps {
  src: string
  alt: string
  caption?: string
  /** Intrinsic dimensions for next/image. Overrideable per call. */
  width?: number
  height?: number
}

export function FullImage({
  src,
  alt,
  caption,
  width = 2400,
  height = 1600,
}: FullImageProps) {
  return (
    <figure className="my-12 lg:my-16">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 1024px) 100vw, 1024px"
        className="h-auto w-full"
      />
      {caption && (
        <figcaption className="mt-4 font-mono text-mono-sm uppercase text-bone-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
