'use client'

import { useState } from 'react'
import { Check, Megaphone } from 'lucide-react'
import { AlertBadge } from '@/components/alert-badge'
import { Modal } from '@/components/agent/modal'
import { SelectField, TextAreaField } from '@/components/agent/fields'
import { Segmented } from '@/components/form-controls'
import { cn } from '@/lib/utils'
import { niveisSeveridade, tiposEvento, zonasRisco } from '@/lib/agent-data'

export function NewAlertModal({ inicial, onEmitir, onFechar }) {
  const [area, setArea] = useState(inicial?.area ?? zonasRisco[0])
  const [tipo, setTipo] = useState(inicial?.tipo ?? 'alagamento')
  const [severidade, setSeveridade] = useState(inicial?.severidade ?? 'alto')
  const [instrucao, setInstrucao] = useState(inicial?.instrucao ?? '')
  const [tentou, setTentou] = useState(false)

  const erroInstrucao = instrucao.trim().length < 10 ? 'Escreva uma instrução com pelo menos 10 caracteres.' : undefined

  const enviar = (e) => {
    e.preventDefault()
    if (erroInstrucao) {
      setTentou(true)
      return
    }
    onEmitir({ area, tipo, severidade, instrucao: instrucao.trim() })
  }

  return (
    <Modal
      titulo="Emitir novo alerta"
      descricao="O alerta será enviado para os moradores da área selecionada."
      onFechar={onFechar}
    >
      <form onSubmit={enviar} noValidate className="flex flex-col gap-5">
        <SelectField
          id="alerta-area"
          label="Área de risco"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          options={zonasRisco.map((z) => ({ value: z, label: z }))}
        />

        <Segmented legend="Tipo de evento" name="tipo-evento" value={tipo} onChange={setTipo} options={tiposEvento} />

        <fieldset>
          <legend className="mb-2 text-base font-semibold text-ink">Nível de severidade</legend>
          <div role="radiogroup" aria-label="Nível de severidade" className="grid grid-cols-2 gap-2">
            {niveisSeveridade.map((nivel) => {
              const ativo = nivel === severidade
              return (
                <button
                  key={nivel}
                  type="button"
                  role="radio"
                  aria-checked={ativo}
                  onClick={() => setSeveridade(nivel)}
                  className={cn(
                    'flex min-h-14 items-center justify-between gap-2 rounded-xl border-2 px-3 transition-colors',
                    ativo ? 'border-brand bg-brand-soft' : 'border-line-strong bg-surface hover:bg-brand-soft',
                  )}
                >
                  <AlertBadge nivel={nivel} />
                  {ativo && <Check className="size-5 shrink-0 text-ink" aria-hidden="true" />}
                </button>
              )
            })}
          </div>
        </fieldset>

        <TextAreaField
          id="alerta-instrucao"
          label="Instrução para os moradores"
          placeholder="Ex.: Deixe a área imediatamente e siga para o abrigo mais próximo."
          value={instrucao}
          onChange={(e) => setInstrucao(e.target.value)}
          error={tentou ? erroInstrucao : undefined}
        />

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onFechar}
            className="min-h-12 rounded-xl border-2 border-line-strong px-5 text-base font-bold text-ink hover:bg-brand-soft"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-crit px-5 text-base font-extrabold text-white"
          >
            <Megaphone className="size-5" aria-hidden="true" />
            Emitir alerta
          </button>
        </div>
      </form>
    </Modal>
  )
}
