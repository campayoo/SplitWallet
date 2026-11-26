/**
 * Cabecera.tsx — Barra superior de la aplicación
 * 
 * Muestra el nombre de la app y respeta el espacio del notch/isla dinámica
 * de iOS usando la clase 'safe-area-top'.
 * 
 * El fondo usa backdrop-blur para un efecto de cristal esmerilado
 * (como el que usa iOS en sus propias apps).
 */
import { Wallet } from 'lucide-react'

export function Cabecera() {
  return (
    <header 
      className="safe-area-top sticky top-0 z-50 backdrop-blur-lg border-b"
      style={{ 
        backgroundColor: 'var(--color-nav-bg)',
        borderColor: 'var(--color-border)'
      }}
    >
      <div className="flex items-center gap-2 px-4 h-12">
        {/* Icono de la app — Wallet de Lucide */}
        <Wallet 
          size={24} 
          className="text-primary-500" 
          style={{ color: '#6366f1' }}
        />
        <h1 
          className="text-lg font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          SplitWallet
        </h1>
      </div>
    </header>
  )
}
