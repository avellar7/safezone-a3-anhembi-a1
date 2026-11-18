'use client'

import { useMemo, useState } from 'react'
import { CalendarX, MapPin } from 'lucide-react'
import { AlertBadge } from '@/components/alert-badge'
import { PillGroup } from '@/components/form-controls'
import { periodosHistorico, tiposEvento } from '@/lib/agent-data'

const filtrosTipo = [{ id: 'todos', label: 'Todos os tipos' }, ...tiposEvento]

function formatarData(diasAtras) {
  const data = new Date()
  data.setDate(data.getDate() - diasAtras)
  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function HistoryList({ eventos }) {
  const [tipo, setTipo] = useState('todos')
  const [periodo, setPeriodo] = useState(90)

  const filtrados = useMemo(
    () =>
      eventos
        .filter((e) => (tipo === 'todos' || e.tipo === tipo) && e.diasAtras <= periodo)
        .sort((a, b) => a.diasAtras - b.diasAtras),
    [eventos, tipo, periodo],
  )

  const rotuloTipo = (id) => tiposEvento.find((t) => t.id === id)?.label ?? id

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-extrabold">Histórico</h1>
        <p className="text-base text-ink2">Eventos climáticos e alertas já emitidos, do mais recente ao mais antigo.</p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border-2 border-line bg-surface p-4">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-ink2">Tipo de evento</p>
          <PillGroup legend="Filtrar por tipo de evento" value={tipo} onChange={setTipo} options={filtrosTipo} />
        </div>
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-ink2">Período</p>
          <PillGroup legend="Filtrar por período" value={periodo} onChange={setPeriodo} options={periodosHistorico} />
        </div>
      </div>

      {filtrados.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-line-strong bg-surface px-6 py-14 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand">
            <CalendarX className="size-8" aria-hidden="true" />
          </span>
          <p className="text-xl font-extrabold">
            {eventos.length === 0 ? 'Nenhum evento registrado ainda' : 'Nenhum evento para esses filtros'}
          </p>
          <p className="max-w-sm text-base text-ink2">
            {eventos.length === 0
              ? 'Quando alertas forem emitidos ou eventos climáticos forem registrados, eles aparecerão aqui.'
              : 'Tente ampliar o período ou escolher outro tipo de evento.'}
          </p>
        </div>
      ) : (
        <ol className="flex flex-col gap-3">
          {filtrados.map((e) => (
            <li
              key={e.id}
              className="flex flex-col gap-3 rounded-2xl border-2 border-line bg-surface p-4 text-ink sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-sm font-bold uppercase tracking-wide text-ink2">
                  {formatarData(e.diasAtras)} · {rotuloTipo(e.tipo)}
                </p>
                <p className="text-xl font-extrabold">{e.titulo}</p>
                <p className="flex items-center gap-1.5 text-base text-ink2">
                  <MapPin className="size-4 shrink-0" aria-hidden="true" />
                  {e.area}
                </p>
              </div>
              <AlertBadge nivel={e.nivel} />
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
