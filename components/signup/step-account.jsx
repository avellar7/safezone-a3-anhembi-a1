'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FloatingField } from '@/components/signup/floating-field'
import { forcaSenha, maskCpf, maskTelefone } from '@/lib/masks'

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.100A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.300 14.300a7.200 7.200 0 0 1 0-4.600V6.600H1.300a12 12 0 0 0 0 10.800l4-3.100z" />
      <path fill="#EA4335" d="M12 4.800c1.700 0 3.300.6 4.500 1.800l3.400-3.400A12 12 0 0 0 1.300 6.600l4 3.100c.9-2.800 3.600-4.900 6.700-4.900z" />
    </svg>
  )
}

const coresForca = ['bg-crit', 'bg-high', 'bg-mid', 'bg-safe']

export function StepAccount({ form }) {
  const [mostrar, setMostrar] = useState(false)
  const forca = forcaSenha(form.dados.senha)

  const toggle = (
    <button
      type="button"
      onClick={() => setMostrar((v) => !v)}
      aria-label={mostrar ? 'Ocultar senha' : 'Mostrar senha'}
      aria-pressed={mostrar}
      className="flex size-11 items-center justify-center rounded-lg text-ink2 hover:bg-brand-soft"
    >
      {mostrar ? <EyeOff className="size-5" aria-hidden="true" /> : <Eye className="size-5" aria-hidden="true" />}
    </button>
  )

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-extrabold">Crie sua conta</h2>
        <p className="mt-1 text-base text-ink2">Usamos seus dados só para te proteger e te avisar.</p>
      </div>

      <button
        type="button"
        onClick={form.preencherGoogle}
        className="flex min-h-12 items-center justify-center gap-3 rounded-xl border-2 border-line-strong bg-surface px-4 text-base font-bold text-ink hover:bg-brand-soft"
      >
        <GoogleLogo />
        Continuar com Google
      </button>

      <div className="flex items-center gap-3 text-sm font-semibold text-ink2" aria-hidden="true">
        <span className="h-px flex-1 bg-line-strong" />
        ou preencha manualmente
        <span className="h-px flex-1 bg-line-strong" />
      </div>

      <FloatingField id="nome" label="Nome completo" autoComplete="name" {...form.props('nome')} />
      <FloatingField id="cpf" label="CPF" inputMode="numeric" autoComplete="off" {...form.props('cpf', maskCpf)} />
      <FloatingField id="telefone" label="Telefone" type="tel" inputMode="tel" autoComplete="tel" {...form.props('telefone', maskTelefone)} />
      <FloatingField id="email" label="E-mail" type="email" autoComplete="email" {...form.props('email')} />

      <div>
        <FloatingField
          id="senha"
          label="Senha"
          type={mostrar ? 'text' : 'password'}
          autoComplete="new-password"
          rightSlot={toggle}
          hint="Mínimo de 8 caracteres."
          {...form.props('senha')}
        />
        {form.dados.senha && (
          <div role="status" className="mt-2 flex items-center gap-3">
            <div className="flex flex-1 gap-1" aria-hidden="true">
              {[1, 2, 3, 4].map((n) => (
                <span
                  key={n}
                  className={cn('h-2 flex-1 rounded-full', n <= forca.nivel ? coresForca[forca.nivel - 1] : 'bg-line')}
                />
              ))}
            </div>
            <span className="text-sm font-bold">Força da senha: {forca.rotulo}</span>
          </div>
        )}
      </div>

      <FloatingField
        id="confirma"
        label="Confirmar senha"
        type={mostrar ? 'text' : 'password'}
        autoComplete="new-password"
        {...form.props('confirma')}
      />
    </div>
  )
}
