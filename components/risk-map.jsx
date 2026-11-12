'use client'

import { useState } from 'react'
import { CircleCheck, Home, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AlertBadge } from '@/components/alert-badge'
import { PillGroup } from '@/components/form-controls'
import { severidades } from '@/lib/severity'
import { abrigos, areasRisco, filtrosStatusMapa, filtrosTipoMapa, posicaoUsuario } from '@/lib/mock-data'

const MAP_W = 800
const MAP_H = 500
const pct = (valor, total) => `${(valor / total) * 100}%`

function MapBackground() {
  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      className="absolute inset-0 size-full"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <rect width={MAP_W} height={MAP_H} style={{ fill: 'var(--sz-map-bg)' }} />
      <g style={{ fill: 'var(--sz-map-block)' }}>
        {Array.from({ length: 9 }).map((_, col) =>
          Array.from({ length: 6 }).map((_, row) => (
            <rect key={`${col}-${row}`} x={30 + col * 88} y={24 + row * 74} width={64} height={52} rx={6} />
          )),
        )}
      </g>
      <path
        d="M0 440 C 150 410, 260 470, 400 440 S 650 400, 800 430 L800 500 L0 500 Z"
        style={{ fill: 'var(--sz-map-water)' }}
      />
      <g style={{ stroke: 'var(--sz-map-road)' }} strokeLinecap="round" fill="none">
        <path d="M0 300 L800 270" strokeWidth="12" />
        <path d="M455 0 L470 500" strokeWidth="12" />
        <path d="M0 60 L340 500" strokeWidth="8" />
        <path d="M800 60 L560 500" strokeWidth="8" />
        <path d="M0 175 L800 150" strokeWidth="6" />
        <path d="M250 0 L270 500" strokeWidth="6" />
        <path d="M660 0 L690 500" strokeWidth="6" />
      </g>
    </svg>
  )
}

export function RiskMap({ titulo = 'Mapa de riscos', nivelTitulo = 2 }) {
  const [tipo, setTipo] = useState('todos')
  const [status, setStatus] = useState('todos')

  const zonas = areasRisco.filter(
    (z) => tipo !== 'abrigos' && (tipo === 'todos' || z.tipo === tipo) && (status === 'todos' || z.status === status),
  )
  const mostrarAbrigos = tipo === 'todos' || tipo === 'abrigos'
  const Titulo = `h${nivelTitulo}`

  return (
    <section aria-labelledby="titulo-mapa" className="rounded-2xl border-2 border-line bg-surface p-4 text-ink sm:p-6">
      <Titulo id="titulo-mapa" className="text-2xl font-extrabold">
        {titulo}
      </Titulo>

      <div className="mt-4 flex flex-col gap-3">
        <div>
          <p className="mb-1.5 text-sm font-bold text-ink2">Tipo de risco</p>
          <PillGroup legend="Filtrar por tipo" value={tipo} onChange={setTipo} options={filtrosTipoMapa} />
        </div>
        <div>
          <p className="mb-1.5 text-sm font-bold text-ink2">Status</p>
          <PillGroup legend="Filtrar por status" value={status} onChange={setStatus} options={filtrosStatusMapa} />
        </div>
      </div>

      <div
        role="img"
        aria-label={`Mapa com ${zonas.length} zona(s) de risco. A lista abaixo descreve cada zona.`}
        className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-line sm:aspect-[8/5]"
      >
        <MapBackground />

        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="absolute inset-0 size-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {zonas.map((z) => {
            const resolvido = z.status === 'resolvido'
            const cor = resolvido ? 'var(--sz-ink2)' : severidades[z.nivel].cor
            return (
              <polygon
                key={z.id}
                points={z.pontos}
                style={{ fill: cor, fillOpacity: resolvido ? 0.1 : 0.25, stroke: cor }}
                strokeWidth="3"
                strokeDasharray={resolvido ? '4 8' : '10 6'}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </svg>

        {zonas.map((z) => {
          const sev = severidades[z.nivel]
          const resolvido = z.status === 'resolvido'
          const Icone = resolvido ? CircleCheck : sev.Icon
          return (
            <div
              key={z.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border-2 border-line-strong bg-surface px-2 py-1 text-[11px] font-extrabold text-ink shadow-md sm:gap-1.5 sm:px-3 sm:text-sm"
              style={{ left: pct(z.rotulo.x, MAP_W), top: pct(z.rotulo.y, MAP_H) }}
            >
              <Icone className={cn('size-4 shrink-0', resolvido ? 'text-ink2' : sev.texto)} aria-hidden="true" />
              <span className="whitespace-nowrap">{z.nome}</span>
            </div>
          )
        })}

        {mostrarAbrigos &&
          abrigos.map((a) => (
            <div
              key={a.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5"
              style={{ left: pct(a.posicao.x, MAP_W), top: pct(a.posicao.y, MAP_H) }}
            >
              <span
                className={cn(
                  'flex size-9 items-center justify-center rounded-full bg-safe text-white ring-2 ring-white sm:size-11',
                  a.recomendado && 'ring-4 ring-safe-soft',
                )}
              >
                <Home className="size-5" aria-hidden="true" />
              </span>
              <span className="rounded bg-safe-soft px-1.5 text-[10px] font-extrabold text-safe-ink sm:text-xs">
                {a.recomendado ? 'ABRIGO · RECOMENDADO' : 'ABRIGO'}
              </span>
            </div>
          ))}

        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5"
          style={{ left: pct(posicaoUsuario.x, MAP_W), top: pct(posicaoUsuario.y, MAP_H) }}
        >
          <span className="size-5 rounded-full border-4 border-white bg-info shadow-md" />
          <span className="rounded bg-info-soft px-1.5 text-[10px] font-extrabold text-info-ink sm:text-xs">VOCÊ</span>
        </div>
      </div>

      <h3 className="mt-5 text-lg font-extrabold">Zonas exibidas ({zonas.length})</h3>
      {zonas.length === 0 ? (
        <p className="mt-2 rounded-xl bg-bg p-4 text-base font-semibold text-ink2">
          Nenhuma zona de risco com esses filtros.
        </p>
      ) : (
        <ul className="mt-2 flex flex-col gap-2">
          {zonas.map((z) => {
            const resolvido = z.status === 'resolvido'
            return (
              <li
                key={z.id}
                className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-xl border-2 border-line bg-bg p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <AlertBadge nivel={z.nivel} />
                  <span className="text-base font-bold">{z.nome}</span>
                  <span className="text-sm capitalize text-ink2">{z.tipo}</span>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 text-sm font-bold',
                    resolvido ? 'text-ink2' : 'text-crit-ink',
                  )}
                >
                  {resolvido ? (
                    <CircleCheck className="size-4" aria-hidden="true" />
                  ) : (
                    <Radio className="size-4" aria-hidden="true" />
                  )}
                  {resolvido ? 'Resolvido' : 'Ativo'}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
