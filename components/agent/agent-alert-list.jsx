import { CircleCheck, MapPin, Plus } from 'lucide-react'
import { AlertBadge } from '@/components/alert-badge'
import { cn } from '@/lib/utils'
import { tempoAtras } from '@/lib/format'

export function AgentAlertList({ alertas, onNovoAlerta, onEncerrar }) {
  const ordenados = [...alertas].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'ativo' ? -1 : 1
    return a.minutosAtras - b.minutosAtras
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Alertas</h1>
          <p className="text-base text-ink2">Alertas emitidos para a população.</p>
        </div>
        <button
          type="button"
          onClick={onNovoAlerta}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-crit px-5 text-base font-extrabold text-white"
        >
          <Plus className="size-5" aria-hidden="true" />
          Emitir novo alerta
        </button>
      </div>

      <ul className="flex flex-col gap-3">
        {ordenados.map((a) => {
          const ativo = a.status === 'ativo'
          return (
            <li
              key={a.id}
              className={cn(
                'flex flex-col gap-3 rounded-2xl border-2 border-line bg-surface p-4 text-ink sm:flex-row sm:items-center sm:justify-between sm:p-5',
                !ativo && 'opacity-80',
              )}
            >
              <div className="flex min-w-0 flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <AlertBadge nivel={a.nivel_severidade} />
                  <span className="text-sm font-bold uppercase tracking-wide text-ink2">{ativo ? 'Ativo' : 'Encerrado'}</span>
                </div>
                <p className="text-xl font-extrabold">{a.tipo}</p>
                <p className="flex items-center gap-1.5 text-base text-ink2">
                  <MapPin className="size-4 shrink-0" aria-hidden="true" />
                  {a.local} · {a.minutosAtras < 1 ? 'agora mesmo' : tempoAtras(a.minutosAtras)}
                </p>
                <p className="text-base">{a.instrucao}</p>
              </div>
              {ativo && (
                <button
                  type="button"
                  onClick={() => onEncerrar(a.id)}
                  className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-line-strong px-4 text-base font-bold hover:bg-brand-soft"
                >
                  <CircleCheck className="size-5" aria-hidden="true" />
                  Encerrar alerta
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
