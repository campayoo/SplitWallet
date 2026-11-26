/**
 * PaginaGrupos.tsx — Pantalla de grupos compartidos
 * 
 * En la Fase 1, muestra un placeholder atractivo.
 * En la Fase 5, contendrá:
 * - Lista de grupos activos con saldos pendientes
 * - Botón para crear un nuevo grupo
 * - Acceso a cada grupo para ver gastos y saldos
 */
import { Users } from 'lucide-react'

export function PaginaGrupos() {
  return (
    <div className="px-4 py-6 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div 
        className="flex items-center justify-center w-20 h-20 rounded-3xl"
        style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
      >
        <Users size={40} style={{ color: '#6366f1' }} />
      </div>
      <h2 
        className="text-xl font-bold text-center"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Grupos y Viajes
      </h2>
      <p 
        className="text-sm text-center max-w-xs"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Crea grupos para dividir gastos con amigos en viajes, cenas o piso compartido.
      </p>
      <span 
        className="text-xs px-3 py-1 rounded-full"
        style={{ 
          backgroundColor: 'var(--color-bg-tertiary)',
          color: 'var(--color-text-tertiary)',
        }}
      >
        Disponible en la Fase 5
      </span>
    </div>
  )
}
