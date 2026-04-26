/**
 * <StatCard> — §12.8
 *
 * Used in:
 *   • MDX body via the StatCard component (§9.4)
 *   • Outcomes section on /work/[slug] (§10.3)
 */
import { Divider } from '@/components/primitives/Divider'

interface StatCardProps {
  value: string
  label: string
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="border border-ink-border p-6">
      <p className="font-display text-display-lg leading-none text-bone-base">
        {value}
      </p>
      <Divider className="my-6" />
      <p className="font-body text-body-sm text-bone-muted">{label}</p>
    </div>
  )
}
