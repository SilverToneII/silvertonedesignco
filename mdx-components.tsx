/**
 * Next 14 App Router MDX customization (root-level convention).
 *
 * Exposes our custom components (FullImage, TwoColumn, PullQuote, StatCard,
 * Spacer) inside MDX files AND styles default markdown elements (h2/h3/p/
 * ul/ol/blockquote/a) per the brand type scale so case study bodies feel
 * native rather than markdown-default.
 *
 * Per §A4.2: case study voice is concrete + specific. The styled markdown
 * elements here keep that voice scannable.
 */
import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import { Column, FullImage, PullQuote, Spacer, StatCard, TwoColumn } from '@/components/mdx'
import { DisplayHeading } from '@/components/primitives/DisplayHeading'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    // Custom block components used in MDX
    FullImage,
    TwoColumn,
    Column,
    PullQuote,
    StatCard,
    Spacer,

    // Default markdown element styles
    h2: ({ children, ...rest }: ComponentPropsWithoutRef<'h2'>) => (
      <DisplayHeading
        as="h2"
        size="h2"
        balance
        className="mt-16 first:mt-0"
        {...rest}
      >
        {children}
      </DisplayHeading>
    ),
    h3: ({ children, ...rest }: ComponentPropsWithoutRef<'h3'>) => (
      <DisplayHeading
        as="h3"
        size="h3"
        className="mt-12"
        {...rest}
      >
        {children}
      </DisplayHeading>
    ),
    p: ({ children, ...rest }: ComponentPropsWithoutRef<'p'>) => (
      <p
        className="mt-6 max-w-prose font-body text-body-lg text-bone-muted"
        {...rest}
      >
        {children}
      </p>
    ),
    ul: ({ children, ...rest }: ComponentPropsWithoutRef<'ul'>) => (
      <ul
        className="mt-6 max-w-prose list-disc space-y-2 pl-6 font-body text-body-lg text-bone-muted marker:text-bone-faint"
        {...rest}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...rest }: ComponentPropsWithoutRef<'ol'>) => (
      <ol
        className="mt-6 max-w-prose list-decimal space-y-2 pl-6 font-body text-body-lg text-bone-muted marker:text-bone-faint"
        {...rest}
      >
        {children}
      </ol>
    ),
    a: ({ children, ...rest }: ComponentPropsWithoutRef<'a'>) => (
      <a className="link-underline text-bone-base" {...rest}>
        {children}
      </a>
    ),
    strong: ({ children, ...rest }: ComponentPropsWithoutRef<'strong'>) => (
      <strong className="font-medium text-bone-base" {...rest}>
        {children}
      </strong>
    ),
    code: ({ children, ...rest }: ComponentPropsWithoutRef<'code'>) => (
      <code
        className="rounded-none bg-ink-raised px-1.5 py-0.5 font-mono text-mono-md text-bone-base"
        {...rest}
      >
        {children}
      </code>
    ),
  }
}
