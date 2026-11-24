'use client'

import { PawPrint } from 'lucide-react'
import { SelectField, TextField } from '@/components/agent/fields'
import { Segmented, Switch } from '@/components/form-controls'
import { especiesPet, portesPet } from '@/lib/mock-data'

export function PetToggleFields({ id = 'pets', value, onChange, label = 'Estou com meu(s) pet(s)', hint }) {
  const set = (campo, v) => onChange({ ...value, [campo]: v })

  return (
    <div className="flex flex-col gap-3 rounded-xl border-2 border-line bg-bg p-3">
      <Switch id={`${id}-toggle`} label={label} hint={hint} checked={value.ativo} onChange={(v) => set('ativo', v)} />

      {value.ativo && (
        <div className="flex flex-col gap-3 border-t-2 border-line pt-3">
          <p className="flex items-center gap-2 text-sm font-bold text-ink2">
            <PawPrint className="size-4" aria-hidden="true" />
            Assim a equipe leva transporte e abrigo adequados.
          </p>
          <div className="grid grid-cols-[6.5rem_1fr] gap-3">
            <TextField
              id={`${id}-qtd`}
              label="Quantidade"
              inputMode="numeric"
              value={value.quantidade}
              onChange={(e) => set('quantidade', e.target.value.replace(/\D/g, '').slice(0, 2))}
            />
            <SelectField
              id={`${id}-especie`}
              label="Espécie"
              options={especiesPet}
              value={value.especie}
              onChange={(e) => set('especie', e.target.value)}
            />
          </div>
          <Segmented legend="Porte" name={`${id}-porte`} value={value.porte} onChange={(v) => set('porte', v)} options={portesPet} />
        </div>
      )}
    </div>
  )
}

export function resumoPets(pets) {
  if (!pets?.ativo) return null
  const especie = especiesPet.find((e) => e.value === pets.especie)?.label ?? ''
  const porte = portesPet.find((p) => p.id === pets.porte)?.label.toLowerCase() ?? ''
  return `${pets.quantidade || 1} pet(s): ${especie}, porte ${porte}`
}
