import { Building2, HandHelping, Home, Plus, TriangleAlert } from 'lucide-react'
import { HelpRequestQueue } from '@/components/agent/help-request-queue'
import { MetricCard } from '@/components/metric-card'
import { orgao } from '@/lib/agent-data'

export function AgentDashboard({ alertas, pedidos, abrigos, onAvancarPedido, onNovoAlerta, onVerAlertas, onVerAbrigos }) {
  const ativos = alertas.filter((a) => a.status === 'ativo').length
  const pendentes = pedidos.filter((p) => p.status === 'recebido').length
  const comVagas = abrigos.filter((a) => a.vagas > 0)
  const totalVagas = comVagas.reduce((soma, a) => soma + a.vagas, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink2">
            <Building2 className="size-4" aria-hidden="true" />
            {orgao}
          </p>
          <h1 className="text-3xl font-extrabold">Painel do agente</h1>
          <p className="text-base text-ink2">Acompanhe alertas, pedidos de ajuda e abrigos em tempo real.</p>
        </div>
        <button
          type="button"
          onClick={onNovoAlerta}
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-crit px-6 text-lg font-extrabold text-white"
        >
          <Plus className="size-6" aria-hidden="true" />
          Emitir novo alerta
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <MetricCard
          rotulo="Alertas ativos"
          valor={ativos}
          legenda="+2 nas últimas 24 h"
          Icon={TriangleAlert}
          tom="critico"
          onClick={onVerAlertas}
          acao="Ver alertas"
        />
        <MetricCard
          rotulo="Pedidos de ajuda pendentes"
          valor={pendentes}
          legenda={pendentes > 0 ? 'Aguardando atendimento' : 'Nenhum pedido na fila'}
          Icon={HandHelping}
          tom="ajuda"
          destaque={pendentes > 0}
        />
        <MetricCard
          rotulo="Abrigos com vagas"
          valor={comVagas.length}
          legenda={`${totalVagas} vagas disponíveis`}
          Icon={Home}
          tom="seguro"
          onClick={onVerAbrigos}
          acao="Ver abrigos"
        />
      </div>

      <HelpRequestQueue pedidos={pedidos} onAvancar={onAvancarPedido} />
    </div>
  )
}
