'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StepProfile } from '@/components/signup/step-profile'
import { StepAccount } from '@/components/signup/step-account'
import { StepLocation } from '@/components/signup/step-location'
import { StepReview } from '@/components/signup/step-review'
import { cnpjValido, cpfValido, emailValido, maskCep, maskCpf, maskTelefone, onlyDigits, telefoneValido } from '@/lib/masks'

const dadosIniciais = {
  perfil: '',
  nome: '',
  cpf: '',
  telefone: '',
  email: '',
  senha: '',
  confirma: '',
  logradouro: '',
  bairro: '',
  cep: '',
  usouGps: false,
  orgao: '',
  cnpj: '',
  telInst: '',
  aceite: false,
}

function validar(passo, d) {
  const e = {}
  if (passo === 1 && !d.perfil) e.perfil = 'Escolha um perfil para continuar.'
  if (passo === 2) {
    if (d.nome.trim().split(/\s+/).filter(Boolean).length < 2) e.nome = 'Digite nome e sobrenome.'
    if (!cpfValido(d.cpf)) e.cpf = 'CPF inválido. Confira os 11 números.'
    if (!telefoneValido(d.telefone)) e.telefone = 'Telefone inválido. Use DDD e número.'
    if (!emailValido(d.email)) e.email = 'E-mail inválido. Exemplo: nome@email.com'
    if (d.senha.length < 8) e.senha = 'A senha precisa ter pelo menos 8 caracteres.'
    if (d.confirma !== d.senha || !d.confirma) e.confirma = 'As senhas não são iguais.'
  }
  if (passo === 3) {
    if (d.perfil === 'agente') {
      if (!d.orgao.trim()) e.orgao = 'Informe o nome do órgão.'
      if (!cnpjValido(d.cnpj)) e.cnpj = 'CNPJ inválido. Confira os 14 números.'
      if (!telefoneValido(d.telInst)) e.telInst = 'Telefone inválido. Use DDD e número.'
    } else {
      if (!d.logradouro.trim()) e.logradouro = 'Informe a rua e o número.'
      if (!d.bairro.trim()) e.bairro = 'Informe o bairro.'
      if (onlyDigits(d.cep).length !== 8) e.cep = 'CEP inválido. Use 8 números.'
    }
  }
  if (passo === 4 && !d.aceite) e.aceite = 'Aceite os termos para criar a conta.'
  return e
}

function Progresso({ passo }) {
  const etapas = ['Perfil', 'Conta', 'Local']
  const atual = Math.min(passo, 3)
  return (
    <div className="mb-6">
      <p className="mb-2 text-sm font-bold text-ink2">
        {passo === 4 ? 'Revisão final' : `Passo ${passo} de 3`}
      </p>
      <ol className="flex items-center gap-2" aria-label="Progresso do cadastro">
        {etapas.map((nome, i) => {
          const n = i + 1
          const feito = n < passo
          const ativo = n === atual && passo !== 4
          return (
            <li key={nome} className="flex flex-1 items-center gap-2" aria-current={ativo ? 'step' : undefined}>
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-extrabold',
                  feito && 'border-safe bg-safe text-white',
                  ativo && 'border-brand bg-brand text-brand-fg ring-4 ring-brand-soft',
                  !feito && !ativo && 'border-line-strong text-ink2',
                )}
              >
                {feito ? <Check className="size-5" aria-hidden="true" /> : n}
              </span>
              <span className="hidden text-sm font-bold sm:inline">{nome}</span>
              {i < etapas.length - 1 && <span className="h-0.5 flex-1 bg-line-strong" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function SignupFlow({ onFinish, onVoltarLogin }) {
  const [passo, setPasso] = useState(1)
  const [dados, setDados] = useState(dadosIniciais)
  const [tocados, setTocados] = useState({})
  const [tentou, setTentou] = useState(false)
  const [concluido, setConcluido] = useState(false)
  const topo = useRef(null)

  const erros = validar(passo, dados)
  const set = (campo, valor) => setDados((d) => ({ ...d, [campo]: valor }))
  const tocar = (campo) => setTocados((t) => ({ ...t, [campo]: true }))
  const mostrar = (campo) => (tentou || tocados[campo] ? erros[campo] : undefined)

  const form = {
    dados,
    set,
    tocar,
    erroAceite: tentou ? erros.aceite : undefined,
    props: (campo, mascara) => ({
      value: dados[campo],
      error: mostrar(campo),
      onChange: (e) => {
        const valor = mascara ? mascara(e.target.value) : e.target.value
        setDados((d) => ({ ...d, [campo]: valor, ...(['logradouro', 'bairro', 'cep'].includes(campo) ? { usouGps: false } : {}) }))
      },
      onBlur: () => tocar(campo),
    }),
    preencherGoogle: () =>
      setDados((d) => ({ ...d, nome: 'Ryan Silva', email: 'ryan.silva@email.com' })),
    usarLocalizacao: () =>
      setDados((d) => ({ ...d, logradouro: 'Rua das Acácias, 120', bairro: 'Morro da Esperança', cep: '02345-010', usouGps: true })),
    preencherEndereco: (s) =>
      setDados((d) => ({ ...d, logradouro: s.logradouro, bairro: s.bairro, cep: s.cep, usouGps: false })),
  }

  const irPara = (novo) => {
    setPasso(novo)
    setTentou(false)
    topo.current?.scrollIntoView({ block: 'start' })
  }

  const avancar = () => {
    if (Object.keys(erros).length > 0) {
      setTentou(true)
      return
    }
    if (passo === 4) {
      setConcluido(true)
      return
    }
    irPara(passo + 1)
  }

  if (concluido) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl border-2 border-safe bg-safe-soft p-8 text-center text-ink">
        <ShieldCheck className="size-14 text-safe-ink" aria-hidden="true" />
        <h1 className="text-3xl font-extrabold">Conta criada</h1>
        <p className="text-lg">
          {dados.perfil === 'agente'
            ? 'Seu cadastro foi enviado para validação. Avisaremos por e-mail.'
            : `Tudo pronto, ${dados.nome.split(' ')[0]}. Você receberá alertas da sua região.`}
        </p>
        <button
          type="button"
          onClick={onFinish}
          className="min-h-14 rounded-xl bg-brand px-8 text-lg font-extrabold text-brand-fg"
        >
          Ir para o painel
        </button>
      </div>
    )
  }

  return (
    <div ref={topo} className="mx-auto max-w-xl scroll-mt-28">
      <h1 className="mb-4 text-3xl font-extrabold">Criar conta</h1>
      <Progresso passo={passo} />

      <div className="rounded-2xl border-2 border-line bg-surface p-4 text-ink sm:p-6">
        {passo === 1 && (
          <>
            <StepProfile valor={dados.perfil} onChange={(v) => set('perfil', v)} />
            {tentou && erros.perfil && (
              <p role="alert" className="mt-3 text-sm font-semibold text-crit-ink">
                {erros.perfil}
              </p>
            )}
          </>
        )}
        {passo === 2 && <StepAccount form={form} />}
        {passo === 3 && <StepLocation perfil={dados.perfil} form={form} />}
        {passo === 4 && <StepReview form={form} onEditar={irPara} />}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          {passo > 1 && (
            <button
              type="button"
              onClick={() => irPara(passo - 1)}
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-line-strong px-6 text-lg font-bold sm:flex-none"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
              Voltar
            </button>
          )}
          <button
            type="button"
            onClick={avancar}
            className="min-h-14 flex-1 rounded-xl bg-brand px-6 text-lg font-extrabold text-brand-fg"
          >
            {passo === 4 ? 'Criar minha conta' : 'Continuar'}
          </button>
        </div>
      </div>

      <p className="mt-5 text-center text-base text-ink2">
        Já tem conta?{' '}
        <button type="button" onClick={onVoltarLogin} className="font-bold text-ink underline underline-offset-4">
          Entrar
        </button>
      </p>
    </div>
  )
}
