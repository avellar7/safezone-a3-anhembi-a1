'use client'

import { useId, useState } from 'react'
import { ChevronDown, Waves } from 'lucide-react'
import { AlertBadge } from '@/components/alert-badge'
import { cn } from '@/lib/utils'

const niveis = {
  fraco: 'medio',
  moderado: 'alto',
  forte: 'critico',
}

export function ElNinoContextCard({ fenomeno }) {
  const [aberto, setAberto] = useState(false)
  const painelId = useId()

  return (
    <section
      aria-labelledby="fenomeno-titulo"
      className="flex flex-col gap-3 rounded-2xl border-2 border-line bg-surface p-4 text-ink sm:flex-row sm:items-start sm:gap-4 sm:p-5"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-info-soft text-info-ink">
        <Waves className="size-6" aria-hidden="true" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="text-xs font-extrabold uppercase tracking-wider text-ink2">Fenômeno climático ativo</p>
        <div className="flex flex-wrap items-center gap-2">
          <h2 id="fenomeno-titulo" className="text-xl font-extrabold leading-tight">
            {fenomeno.nome}
          </h2>
          <AlertBadge nivel={niveis[fenomeno.intensidade]} rotulo={fenomeno.intensidadeLabel.toUpperCase()} />
        </div>
        <p className="text-base leading-relaxed text-ink2">{fenomeno.descricao}</p>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls={painelId}
          className="flex min-h-11 items-center gap-1.5 self-start text-left text-base font-bold text-ink underline underline-offset-4"
        >
          Entender o que isso significa pra minha região
          <ChevronDown className={cn('size-5 shrink-0 transition-transform', aberto && 'rotate-180')} aria-hidden="true" />
        </button>

        <div id={painelId} hidden={!aberto} className="rounded-xl border-l-4 border-info bg-bg p-3 text-base leading-relaxed">
          {fenomeno.impactoLocal}
        </div>
      </div>
    </section>
  )
}
