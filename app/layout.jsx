import { Inter } from 'next/font/google'
import { PrefsProvider } from '@/lib/prefs-context'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'SafeZone — Defesa & Emergência',
  description:
    'Painel de monitoramento de riscos climáticos: alertas de enchentes e deslizamentos, mapa de áreas de risco, abrigos próximos e acompanhamento de pedidos de socorro.',
}

export const viewport = {
  themeColor: '#0B3D3C',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased">
        <PrefsProvider>{children}</PrefsProvider>
      </body>
    </html>
  )
}
