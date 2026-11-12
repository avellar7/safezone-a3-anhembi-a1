'use client'

import { useCallback, useState } from 'react'
import { ClaimPage } from '@/components/claim-page'
import { ConnectionStatusBar } from '@/components/connection-status-bar'
import { CriticalAlertTakeover } from '@/components/critical-alert-takeover'
import { ForecastPage } from '@/components/forecast-page'
import { MapPage } from '@/components/map-page'
import { Navbar } from '@/components/navbar'
import { Overview } from '@/components/overview'
import { PreferencesPage } from '@/components/preferences-page'
import { SOSButton } from '@/components/sos-button'
import { SignupFlow } from '@/components/signup/signup-flow'
import { abrigos, alertas, chamadoInicial } from '@/lib/mock-data'

function horaAgora() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export function SafeZoneApp() {
  const [view, setView] = useState('overview')
  const [chamado, setChamado] = useState(chamadoInicial)
  const [seguro, setSeguro] = useState(false)
  const [takeoverAberto, setTakeoverAberto] = useState(true)

  const alertaCritico = alertas.find((a) => a.status === 'ativo' && a.nivel_severidade === 'critico')
  const abrigo = abrigos.find((a) => a.recomendado)

  const navegar = useCallback((destino) => {
    setView(destino)
    window.scrollTo({ top: 0 })
  }, [])

  const abrirChamado = useCallback(
    ({ descricao, localizacao }) => {
      const hora = horaAgora()
      const protocolo = `#${Math.floor(1000 + Math.random() * 9000)}`
      setChamado({ protocolo, descricao, localizacao, aberto_em: hora, etapaAtual: 0, horarios: [hora, null, null] })
      return protocolo
    },
    [],
  )

  return (
    <div className="min-h-screen bg-bg text-ink">
      <ConnectionStatusBar />
      <Navbar view={view} onNavigate={navegar} />

      <main className="mx-auto max-w-6xl px-4 pb-32 pt-28 sm:px-6">
        {view === 'overview' && (
          <Overview
            alertas={alertas}
            chamado={chamado}
            seguro={seguro}
            onRota={() => navegar('map')}
            onSeguro={() => setSeguro(true)}
            onDesfazerSeguro={() => setSeguro(false)}
            onVerChamado={() => navegar('claim')}
          />
        )}
        {view === 'map' && <MapPage />}
        {view === 'forecast' && <ForecastPage />}
        {view === 'claim' && (
          <ClaimPage chamado={chamado} onCancelar={() => setChamado(null)} onAbrirSOS={() => document.querySelector('[data-sos]')?.click()} />
        )}
        {view === 'prefs' && <PreferencesPage />}
        {view === 'signup' && <SignupFlow onFinish={() => navegar('overview')} />}
      </main>

      <SOSButton onSubmit={abrirChamado} onVerChamado={() => navegar('claim')} />

      {takeoverAberto && alertaCritico && !seguro && (
        <CriticalAlertTakeover
          alerta={alertaCritico}
          abrigo={abrigo}
          onRota={() => {
            setTakeoverAberto(false)
            navegar('map')
          }}
          onSeguro={() => {
            setSeguro(true)
            setTakeoverAberto(false)
          }}
          onFechar={() => setTakeoverAberto(false)}
        />
      )}
    </div>
  )
}
