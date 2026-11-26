/**
 * PaginaPersonal.tsx — Pantalla de gastos personales
 * 
 * En la Fase 1, muestra un placeholder atractivo.
 * En la Fase 2, contendrá:
 * - Lista de gastos e ingresos del mes actual
 * - Botón flotante para añadir un nuevo gasto
 * - Filtros por categoría, fecha e importe
 */
import { Receipt } from 'lucide-react'

export function PaginaPersonal() {
  return (
    <div className="px-4 py-6 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div 
        className="flex items-center justify-center w-20 h-20 rounded-3xl"
        style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
      >
        <Receipt size={40} style={{ color: '#6366f1' }} />
      </div>
      <h2 
        className="text-xl font-bold text-center"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Gastos Personales
      </h2>
      <p 
        className="text-sm text-center max-w-xs"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Aquí podrás registrar tus gastos e ingresos, establecer presupuestos y ver estadísticas.
      </p>
      <span 
        className="text-xs px-3 py-1 rounded-full"
        style={{ 
          backgroundColor: 'var(--color-bg-tertiary)',
          color: 'var(--color-text-tertiary)',
        }}
      >
        Disponible en la Fase 2
      </span>
    </div>
  )
}
