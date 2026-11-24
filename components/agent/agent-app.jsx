'use client'

import { useCallback, useState } from 'react'
import { AgentAlertList } from '@/components/agent/agent-alert-list'
import { AgentDashboard } from '@/components/agent/agent-dashboard'
import { AgentNavbar } from '@/components/agent/agent-navbar'
import { HistoryList } from '@/components/agent/history-list'
import { NewAlertModal } from '@/components/agent/new-alert-modal'
import { ShelterList } from '@/components/agent/shelter-list'
import { AIForecastPage } from '@/components/ai-forecast-page'
import {
  abrigosAgenteIniciais,
  alertasAgenteIniciais,
  historicoInicial,
  orgao,
  pedidosIniciais,
  statusPedido,
  tiposEvento,
} from '@/lib/agent-data'

export function AgentApp({ onLogout }) {
  const [view, setView] = useState('painel')
  const [pedidos, setPedidos] = useState(pedidosIniciais)
  const [alertas, setAlertas] = useState(alertasAgenteIniciais)
  const [abrigos, setAbrigos] = useState(abrigosAgenteIniciais)
  const [historico, setHistorico] = useState(historicoInicial)
  const [modalAlerta, setModalAlerta] = useState(null)
  const [aviso, setAviso] = useState('')

  const navegar = useCallback((destino) => {
    setView(destino)
    window.scrollTo({ top: 0 })
  }, [])

  const avancarPedido = (protocolo) => {
    setPedidos((lista) =>
      lista.map((p) => {
        if (p.protocolo !== protocolo) return p
        const indice = statusPedido.findIndex((s) => s.id === p.status)
        const proximo = statusPedido[Math.min(indice + 1, statusPedido.length - 1)]
        return { ...p, status: proximo.id }
      }),
    )
  }

  const emitirAlerta = ({ area, tipo, severidade, instrucao }) => {
    const rotuloTipo = tiposEvento.find((t) => t.id === tipo)?.label ?? 'Outro'
    const id = `novo-${Date.now()}`
    setAlertas((lista) => [
      { id, tipo: rotuloTipo, local: area, nivel_severidade: severidade, status: 'ativo', minutosAtras: 0, instrucao },
      ...lista,
    ])
    setHistorico((lista) => [
      { id, diasAtras: 0, tipo, titulo: `Alerta emitido: ${rotuloTipo}`, area, nivel: severidade },
      ...lista,
    ])
    setModalAlerta(null)
    setAviso(`Alerta de ${rotuloTipo.toLowerCase()} emitido para ${area}.`)
    navegar('alertas')
  }

  const encerrarAlerta = (id) => {
    setAlertas((lista) => lista.map((a) => (a.id === id ? { ...a, status: 'resolvido' } : a)))
  }

  const salvarAbrigo = (abrigo) => {
    setAbrigos((lista) =>
      lista.some((a) => a.id === abrigo.id) ? lista.map((a) => (a.id === abrigo.id ? abrigo : a)) : [abrigo, ...lista],
    )
  }

  const abrirModal = (inicial = null) => setModalAlerta({ inicial })

  return (
    <div className="min-h-screen bg-bg text-ink">
      <AgentNavbar view={view} onNavigate={navegar} onLogout={onLogout} />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6">
        <p role="status" aria-live="polite" className={aviso ? 'mb-4 rounded-xl border-2 border-safe bg-safe-soft px-4 py-3 text-base font-bold text-safe-ink' : 'sr-only'}>
          {aviso}
        </p>

        {view === 'painel' && (
          <AgentDashboard
            alertas={alertas}
            pedidos={pedidos}
            abrigos={abrigos}
            onAvancarPedido={avancarPedido}
            onNovoAlerta={() => abrirModal()}
            onVerAlertas={() => navegar('alertas')}
            onVerAbrigos={() => navegar('abrigos')}
          />
        )}
        {view === 'alertas' && (
          <AgentAlertList alertas={alertas} onNovoAlerta={() => abrirModal()} onEncerrar={encerrarAlerta} />
        )}
        {view === 'abrigos' && <ShelterList abrigos={abrigos} onSalvar={salvarAbrigo} />}
        {view === 'historico' && <HistoryList eventos={historico} />}
        {view === 'previsao' && <AIForecastPage perfil="agente" onEmitirPreventivo={abrirModal} />}
      </main>

      {modalAlerta && (
        <NewAlertModal inicial={modalAlerta.inicial} onEmitir={emitirAlerta} onFechar={() => setModalAlerta(null)} />
      )}
    </div>
  )
}
