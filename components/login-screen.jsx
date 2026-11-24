'use client'

import { useState } from 'react'
import { Contrast, Eye, EyeOff, LogIn } from 'lucide-react'
import { SafeZoneLogo } from '@/components/safezone-logo'
import { Segmented } from '@/components/form-controls'
import { FloatingField } from '@/components/signup/floating-field'
import { emailValido } from '@/lib/masks'
import { usePrefs } from '@/lib/prefs-context'
import { cn } from '@/lib/utils'

const perfis = [
  { id: 'morador', label: 'Sou morador' },
  { id: 'agente', label: 'Sou agente' },
]

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

export function LoginScreen({ onLogin, onCriarConta }) {
  const { prefs, atualizar, t } = usePrefs()
  const [perfil, setPerfil] = useState('morador')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrar, setMostrar] = useState(false)
  const [tentou, setTentou] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const erroEmail = !emailValido(email) ? 'Digite um e-mail válido. Exemplo: nome@email.com' : undefined
  const erroSenha = senha.length < 1 ? 'Digite sua senha.' : undefined

  const entrar = (e) => {
    e.preventDefault()
    if (erroEmail || erroSenha) {
      setTentou(true)
      return
    }
    setEnviando(true)
    setTimeout(() => onLogin({ email, perfil }), 600)
  }

  const entrarComGoogle = () => {
    setEnviando(true)
    setTimeout(() => onLogin({ email: 'ryan.silva@email.com', perfil }), 600)
  }

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
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <header className="bg-nav text-nav-fg shadow-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2.5 px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <SafeZoneLogo />
            <span className="text-xl font-extrabold tracking-tight">SafeZone</span>
          </div>
          <button
            type="button"
            onClick={() => atualizar({ altoContraste: !prefs.altoContraste })}
            aria-pressed={prefs.altoContraste}
            aria-label={t('contrast.toggle')}
            title={t('contrast.toggle')}
            className={cn(
              'flex size-11 items-center justify-center rounded-full border-2 transition-colors',
              prefs.altoContraste ? 'border-nav-fg bg-nav-fg text-nav' : 'border-white/50 text-nav-fg hover:bg-white/15',
            )}
          >
            <Contrast className="size-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold">Entrar</h1>
            <p className="mt-2 text-base text-ink2">Acesse o painel de alertas e acompanhe os riscos na sua região.</p>
          </div>

          <form
            onSubmit={entrar}
            noValidate
            className="flex flex-col gap-4 rounded-2xl border-2 border-line bg-surface p-4 sm:p-6"
          >
            <Segmented legend="Entrar como" name="perfil" value={perfil} onChange={setPerfil} options={perfis} />

            <button
              type="button"
              onClick={entrarComGoogle}
              disabled={enviando}
              className="flex min-h-12 items-center justify-center gap-3 rounded-xl border-2 border-line-strong bg-surface px-4 text-base font-bold text-ink hover:bg-brand-soft disabled:opacity-60"
            >
              <GoogleLogo />
              Continuar com Google
            </button>

            <div className="flex items-center gap-3 text-sm font-semibold text-ink2" aria-hidden="true">
              <span className="h-px flex-1 bg-line-strong" />
              ou entre com e-mail
              <span className="h-px flex-1 bg-line-strong" />
            </div>

            <FloatingField
              id="login-email"
              label="E-mail"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={tentou ? erroEmail : undefined}
            />
            <FloatingField
              id="login-senha"
              label="Senha"
              type={mostrar ? 'text' : 'password'}
              autoComplete="current-password"
              rightSlot={toggle}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              error={tentou ? erroSenha : undefined}
            />

            <button
              type="submit"
              disabled={enviando}
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-lg font-extrabold text-brand-fg disabled:opacity-60"
            >
              <LogIn className="size-5" aria-hidden="true" />
              {enviando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-5 text-center text-base text-ink2">
            Ainda não tem conta?{' '}
            <button type="button" onClick={onCriarConta} className="font-bold text-ink underline underline-offset-4">
              Criar conta
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}
