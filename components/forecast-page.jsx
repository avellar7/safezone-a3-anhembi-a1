import { CloudRain, Sparkles } from 'lucide-react'
import { AlertBadge } from '@/components/alert-badge'
import { previsaoCinco } from '@/lib/mock-data'

export function ForecastPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-extrabold">Previsão IA</h1>
        <p className="flex items-center gap-2 text-base text-ink2">
          <Sparkles className="size-4" aria-hidden="true" />
          Risco estimado para os próximos 5 dias na sua região
        </p>
      </div>

      <ol className="flex flex-col gap-3">
        {previsaoCinco.map((d) => (
          <li
            key={d.dia}
            className="flex flex-col gap-3 rounded-2xl border-2 border-line bg-surface p-4 text-ink sm:flex-row sm:items-center sm:justify-between sm:p-5"
          >
            <div className="flex flex-col gap-1">
              <p className="text-xl font-extrabold">{d.dia}</p>
              <p className="text-base text-ink2">{d.resumo}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-1.5 text-lg font-bold">
                <CloudRain className="size-6 text-info" aria-hidden="true" />
                {d.chuvaMm} mm
              </p>
              <AlertBadge nivel={d.risco} rotulo={d.rotulo} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
