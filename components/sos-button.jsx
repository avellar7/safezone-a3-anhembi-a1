'use client'

import { useEffect, useRef, useState } from 'react'
import { CircleAlert, CircleCheck, MapPin, Siren, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePrefs } from '@/lib/prefs-context'
import { chamadoInicial } from '@/lib/mock-data'

function SOSDialog({ onClose, onSubmit, onVerChamado }) {
  const { t } = usePrefs()
  const [descricao, setDescricao] = useState('')
  const [confirmou, setConfirmou] = useState(false)
  const [tentou, setTentou] = useState(false)
  const [protocolo, setProtocolo] = useState(null)
  const campo = useRef(null)

  useEffect(() => {
    campo.current?.focus()
    const aoTeclar = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  }, [onClose])

  const erroDescricao = tentou && !descricao.trim() ? t('sos.errorDesc') : null
  const erroConfirma = tentou && !confirmou ? t('sos.errorConfirm') : null

  function enviar(e) {
    e.preventDefault()
    setTentou(true)
    if (!descricao.trim() || !confirmou) return
    setProtocolo(onSubmit({ descricao: descricao.trim(), localizacao: chamadoInicial.localizacao }))
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/70 sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sos-titulo"
        className="max-h-full w-full max-w-md overflow-y-auto rounded-t-3xl border-2 border-line bg-surface p-5 text-ink shadow-2xl sm:rounded-3xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="sos-titulo" className="flex items-center gap-2 text-2xl font-extrabold">
            <Siren className="size-7 text-crit" aria-hidden="true" />
            {protocolo ? t('sos.sentTitle') : t('sos.title')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('sos.close')}
            className="flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-brand-soft"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        {protocolo ? (
          <div className="mt-4 flex flex-col gap-4">
            <p className="flex items-start gap-3 rounded-xl border-l-4 border-safe bg-safe-soft p-4 text-lg font-semibold text-safe-ink">
              <CircleCheck className="mt-0.5 size-6 shrink-0" aria-hidden="true" />
              {t('sos.sentDesc', { protocolo })}
            </p>
            <button
              type="button"
              onClick={() => {
                onClose()
                onVerChamado()
              }}
              className="min-h-14 rounded-xl bg-brand px-6 text-lg font-bold text-brand-fg"
            >
              {t('sos.viewClaim')}
            </button>
          </div>
        ) : (
          <form onSubmit={enviar} noValidate className="mt-3 flex flex-col gap-5">
            <p className="text-base text-ink2">{t('sos.desc')}</p>

            <div>
              <label htmlFor="sos-descricao" className="mb-1.5 block text-base font-bold">
                {t('sos.fieldLabel')}
              </label>
              <textarea
                ref={campo}
                id="sos-descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                maxLength={140}
                rows={3}
                placeholder={t('sos.placeholder')}
                aria-invalid={Boolean(erroDescricao)}
                aria-describedby={erroDescricao ? 'sos-erro-desc' : undefined}
                className={cn(
                  'w-full resize-none rounded-xl border-2 bg-surface p-3 text-lg text-ink placeholder:text-ink2',
                  erroDescricao ? 'border-crit' : 'border-line-strong',
                )}
              />
              {erroDescricao && (
                <p id="sos-erro-desc" role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-crit-ink">
                  <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
                  {erroDescricao}
                </p>
              )}
            </div>

            <div>
              <p className="mb-1.5 text-base font-bold">{t('sos.locationLabel')}</p>
              <p className="flex items-center gap-3 rounded-xl border-2 border-line bg-bg p-3 text-base font-semibold">
                <MapPin className="size-6 shrink-0 text-info" aria-hidden="true" />
                {chamadoInicial.localizacao}
              </p>
              <label
                htmlFor="sos-confirma"
                className={cn(
                  'mt-2 flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 text-base font-semibold',
                  confirmou ? 'border-brand bg-brand-soft' : 'border-line-strong',
                  erroConfirma && 'border-crit',
                )}
              >
                <input
                  id="sos-confirma"
                  type="checkbox"
                  checked={confirmou}
                  onChange={(e) => setConfirmou(e.target.checked)}
                  className="size-6 shrink-0 accent-[var(--sz-brand)]"
                />
                {t('sos.confirm')}
              </label>
              {erroConfirma && (
                <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-crit-ink">
                  <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
                  {erroConfirma}
                </p>
              )}
            </div>

            <button type="submit" className="min-h-14 rounded-xl bg-[#DC2626] px-6 text-xl font-extrabold text-white">
              {t('sos.send')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export function SOSButton({ onSubmit, onVerChamado }) {
  const { t } = usePrefs()
  const [aberto, setAberto] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        aria-label={t('sos.aria')}
        data-sos
        className="sos-pulse fixed bottom-4 right-4 z-[110] flex size-20 flex-col items-center justify-center rounded-full border-4 border-white bg-[#DC2626] text-white shadow-xl sm:bottom-6 sm:right-6"
      >
        <Siren className="size-7" aria-hidden="true" />
        <span className="text-sm font-extrabold leading-none">{t('sos.label')}</span>
      </button>
      {aberto && <SOSDialog onClose={() => setAberto(false)} onSubmit={onSubmit} onVerChamado={onVerChamado} />}
    </>
  )
}
