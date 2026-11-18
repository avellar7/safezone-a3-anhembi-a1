'use client'

import { useSyncExternalStore } from 'react'
import { Wifi, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePrefs } from '@/lib/prefs-context'
import { ultimaAtualizacao } from '@/lib/mock-data'

function subscribe(callback) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

export function ConnectionStatusBar() {
  const { t } = usePrefs()
  const online = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  )
  const Icon = online ? Wifi : WifiOff

  return (
    <div
      role="status"
      className={cn(
        'fixed inset-x-0 top-0 z-[60] flex h-8 items-center justify-center gap-2 border-b px-3 text-xs font-bold',
        online ? 'border-safe bg-safe-soft text-safe-ink' : 'border-mid bg-mid-soft text-mid-ink',
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span className="truncate">
        {online ? t('status.synced') : t('status.offline', { time: ultimaAtualizacao })}
      </span>
    </div>
  )
}
