import { Clock, Footprints, Users } from 'lucide-react'
import { RiskMap } from '@/components/risk-map'
import { abrigos } from '@/lib/mock-data'

export function MapPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-extrabold">Mapa de riscos</h1>
        <p className="text-base text-ink2">Zonas de risco, abrigos e a sua posição.</p>
      </div>

      <RiskMap titulo="Zonas e abrigos" nivelTitulo={2} />

      <section aria-labelledby="titulo-abrigos" className="rounded-2xl border-2 border-line bg-surface p-4 text-ink sm:p-6">
        <h2 id="titulo-abrigos" className="text-2xl font-extrabold">
          Abrigos próximos
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {abrigos.map((a) => (
            <li
              key={a.id}
              className={
                a.recomendado
                  ? 'flex flex-col gap-2 rounded-xl border-2 border-safe bg-safe-soft p-4'
                  : 'flex flex-col gap-2 rounded-xl border-2 border-line bg-bg p-4'
              }
            >
              {a.recomendado && (
                <span className="w-fit rounded-md bg-safe px-2 py-0.5 text-xs font-extrabold tracking-wider text-white">
                  RECOMENDADO
                </span>
              )}
              <p className="text-lg font-bold leading-snug">{a.nome}</p>
              <p className="flex items-center gap-2 text-base">
                <Footprints className="size-5 shrink-0" aria-hidden="true" />
                {a.distanciaKm.toString().replace('.', ',')} km
              </p>
              <p className="flex items-center gap-2 text-base">
                <Clock className="size-5 shrink-0" aria-hidden="true" />
                {a.tempoMin} min a pé
              </p>
              <p className="flex items-center gap-2 text-base">
                <Users className="size-5 shrink-0" aria-hidden="true" />
                {a.vagas_disponiveis} vagas
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
