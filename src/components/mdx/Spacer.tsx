/**
 * <Spacer> — §9.4 vertical spacer for MDX body
 *   sm: 32px / md: 64px / lg: 96px / xl: 144px
 */
type Size = 'sm' | 'md' | 'lg' | 'xl'

const sizeClasses: Record<Size, string> = {
  sm: 'h-8',
  md: 'h-16',
  lg: 'h-24',
  xl: 'h-36',
}

export function Spacer({ size = 'md' }: { size?: Size }) {
  return <div aria-hidden="true" className={sizeClasses[size]} />
}
