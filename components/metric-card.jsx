import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { severidades } from '@/lib/severity'

export function MetricCard({ rotulo, valor, legenda, Icon, tom, onClick, acao }) {
  const sev = severidades[tom]
  const Raiz = onClick ? 'button' : 'div'

  return (
    <Raiz
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'flex min-h-28 items-center gap-4 rounded-2xl border-2 border-line bg-surface p-4 text-left text-ink',
        onClick && 'transition-colors hover:border-line-strong',
      )}
    >
      <span className={cn('flex size-14 shrink-0 items-center justify-center rounded-xl border-l-4', sev.badge)}>
        <Icon className="size-7" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold uppercase tracking-wide text-ink2">{rotulo}</span>
        <span className="block text-3xl font-extrabold leading-tight">{valor}</span>
        <span className="block text-base font-medium text-ink2">{legenda}</span>
      </span>
      {onClick && (
        <span className="flex shrink-0 items-center text-sm font-bold text-ink2">
          <span className="sr-only">{acao}</span>
          <ChevronRight className="size-6" aria-hidden="true" />
        </span>
      )}
    </Raiz>
  )
}
