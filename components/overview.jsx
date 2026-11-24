import { Home, LifeBuoy, TriangleAlert } from 'lucide-react'
import { AlertList } from '@/components/alert-list'
import { CriticalAlertCard } from '@/components/critical-alert-card'
import { MetricCard } from '@/components/metric-card'
import { RiskMap } from '@/components/risk-map'
import { abrigos, etapasChamado } from '@/lib/mock-data'
import { googleMapsRotaUrl } from '@/lib/maps'
import { severidades } from '@/lib/severity'

export function Overview({ alertas, chamado, seguro, onSeguro, onDesfazerSeguro, onVerChamado }) {
  const ativos = alertas.filter((a) => a.status === 'ativo')
  const critico = ativos.find((a) => a.nivel_severidade === 'critico')
  const abrigo = abrigos.find((a) => a.recomendado)

  const resumo = ['critico', 'alto', 'medio', 'info']
    .map((n) => ({ n, qtd: ativos.filter((a) => a.nivel_severidade === n).length }))
    .filter((x) => x.qtd > 0)
    .map((x) => `${x.qtd} ${severidades[x.n].label.toLowerCase()}`)
    .join(' · ')

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-extrabold">Visão geral</h1>
        <p className="text-base text-ink2">São Paulo, SP · sua região agora</p>
      </div>

      {critico && (
        <CriticalAlertCard
          alerta={critico}
          abrigo={abrigo}
          seguro={seguro}
          onSeguro={onSeguro}
          onDesfazer={onDesfazerSeguro}
        />
      )}

      <div className="grid gap-3 md:grid-cols-3 md:gap-4">
        <MetricCard
          rotulo="Alertas na região"
          valor={ativos.length}
          legenda={resumo || 'Nenhum alerta ativo'}
          Icon={TriangleAlert}
          tom={critico ? 'critico' : 'seguro'}
        />
        <MetricCard
          rotulo="Abrigo recomendado"
          valor={`${abrigo.tempoMin} min`}
          legenda={`${abrigo.nome} · ${abrigo.distanciaKm.toString().replace('.', ',')} km`}
          Icon={Home}
          tom="seguro"
          href={googleMapsRotaUrl(abrigo)}
          acao={`Como chegar até ${abrigo.nome} (abre o Google Maps em nova aba)`}
        />
        <MetricCard
          rotulo="Chamado em andamento"
          valor={chamado ? chamado.protocolo : 'Nenhum'}
          legenda={chamado ? etapasChamado[chamado.etapaAtual].titulo : 'Use o botão SOS se precisar'}
          Icon={LifeBuoy}
          tom="info"
          onClick={chamado ? onVerChamado : undefined}
          acao="Ver detalhes do chamado"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="order-2 lg:order-none lg:col-span-2">
          <RiskMap titulo="Mapa de riscos" />
        </div>
        <div className="order-1 lg:order-none">
          <AlertList alertas={alertas} />
        </div>
      </div>
    </div>
  )
}
