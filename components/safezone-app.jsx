'use client'

import { useCallback, useState } from 'react'
import { ClaimPage } from '@/components/claim-page'
import { ConnectionStatusBar } from '@/components/connection-status-bar'
import { CriticalAlertTakeover } from '@/components/critical-alert-takeover'
import { AgentApp } from '@/components/agent/agent-app'
import { AIForecastPage } from '@/components/ai-forecast-page'
import { LoginScreen } from '@/components/login-screen'
import { MapPage } from '@/components/map-page'
import { Navbar } from '@/components/navbar'
import { Overview } from '@/components/overview'
import { PreferencesPage } from '@/components/preferences-page'
import { SOSButton } from '@/components/sos-button'
import { SignupFlow } from '@/components/signup/signup-flow'
import { resumoPets } from '@/components/pet-toggle-fields'
import { abrigos, alertas, chamadoInicial } from '@/lib/mock-data'

function horaAgora() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function Dashboard({ onLogout }) {
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

  const abrirChamado = useCallback(({ tipo, descricao, localizacao, pets }) => {
    const hora = horaAgora()
    const protocolo = `#${Math.floor(1000 + Math.random() * 9000)}`
    if (tipo === 'seguro') {
      setSeguro(true)
      return protocolo
    }
    const petsTexto = resumoPets(pets)
    setChamado({
      protocolo,
      tipo,
      pets,
      descricao: petsTexto ? `${descricao} · Com ${petsTexto}` : descricao,
      localizacao,
      aberto_em: hora,
      etapaAtual: 0,
      horarios: [hora, null, null],
    })
    return protocolo
  }, [])

  const pedidosAtivos = chamado && chamado.etapaAtual < 2 ? 1 : 0

  return (
    <div className="min-h-screen bg-bg text-ink">
      <ConnectionStatusBar />
      <Navbar view={view} onNavigate={navegar} onLogout={onLogout} />

      <main className="mx-auto max-w-6xl px-4 pb-32 pt-28 sm:px-6">
        {view === 'overview' && (
          <Overview
            alertas={alertas}
            chamado={chamado}
            seguro={seguro}
            onSeguro={() => setSeguro(true)}
            onDesfazerSeguro={() => setSeguro(false)}
            onVerChamado={() => navegar('claim')}
          />
        )}
        {view === 'map' && <MapPage />}
        {view === 'forecast' && <AIForecastPage perfil="morador" />}
        {view === 'claim' && (
          <ClaimPage chamado={chamado} onCancelar={() => setChamado(null)} onAbrirSOS={() => document.querySelector('[data-sos]')?.click()} />
        )}
        {view === 'prefs' && <PreferencesPage />}
      </main>

      <SOSButton onSubmit={abrirChamado} onVerChamado={() => navegar('claim')} pedidosAtivos={pedidosAtivos} />

      {takeoverAberto && alertaCritico && !seguro && (
        <CriticalAlertTakeover
          alerta={alertaCritico}
          abrigo={abrigo}
          onRota={() => setTakeoverAberto(false)}
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

export function SafeZoneApp() {
  const [currentScreen, setCurrentScreen] = useState('login')

  const irPara = useCallback((tela) => {
    setCurrentScreen(tela)
    window.scrollTo({ top: 0 })
  }, [])

  if (currentScreen === 'agent') {
    return <AgentApp onLogout={() => irPara('login')} />
  }

  if (currentScreen === 'signup') {
    return (
      <main className="min-h-screen bg-bg px-4 py-10 text-ink sm:px-6">
        <SignupFlow onFinish={() => irPara('dashboard')} onVoltarLogin={() => irPara('login')} />
      </main>
    )
  }

  if (currentScreen === 'dashboard') {
    return <Dashboard onLogout={() => irPara('login')} />
  }

  return (
    <LoginScreen
      onLogin={({ perfil }) => irPara(perfil === 'agente' ? 'agent' : 'dashboard')}
      onCriarConta={() => irPara('signup')}
    />
  )
}
