/**
 * BarraNavegacion.tsx — Navegación inferior tipo app nativa
 * 
 * Barra fija en la parte inferior con 4 botones:
 * Inicio, Personal, Grupos y Ajustes.
 * 
 * Características:
 * - Fija en la parte inferior (fixed bottom-0)
 * - Respeta el safe area inferior de iOS (para la barra de inicio)
 * - Botones de 44x44px mínimo (directriz de Apple Human Interface Guidelines)
 * - Efecto de cristal esmerilado con backdrop-blur
 * - Resalta la pestaña activa con color primario
 * 
 * Usa useLocation() de React Router para saber qué ruta está activa
 * y pintar el icono correspondiente con el color primario.
 */
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Receipt, Users, Settings } from 'lucide-react'

// Definición de cada pestaña de navegación
const PESTANAS = [
  { ruta: '/', icono: Home, etiqueta: 'Inicio' },
  { ruta: '/personal', icono: Receipt, etiqueta: 'Personal' },
  { ruta: '/grupos', icono: Users, etiqueta: 'Grupos' },
  { ruta: '/ajustes', icono: Settings, etiqueta: 'Ajustes' },
] as const

export function BarraNavegacion() {
  const location = useLocation()   // Obtiene la URL actual
  const navigate = useNavigate()   // Función para cambiar de ruta

  return (
    <nav 
      className="safe-area-bottom fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg border-t"
      style={{ 
        backgroundColor: 'var(--color-nav-bg)',
        borderColor: 'var(--color-nav-border)',
      }}
    >
      <div className="flex justify-around items-center h-16">
        {PESTANAS.map((pestana) => {
          // Comprueba si esta pestaña corresponde a la ruta actual
          const estaActiva = location.pathname === pestana.ruta
          const Icono = pestana.icono

          return (
            <button
              key={pestana.ruta}
              onClick={() => navigate(pestana.ruta)}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] transition-colors duration-200"
              // aria-label: accesibilidad — los lectores de pantalla leen esto
              aria-label={pestana.etiqueta}
              // aria-current: indica al lector de pantalla qué pestaña está activa
              aria-current={estaActiva ? 'page' : undefined}
              style={{ 
                color: estaActiva ? '#6366f1' : 'var(--color-text-tertiary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Icono size={24} strokeWidth={estaActiva ? 2.5 : 1.5} />
              <span className="text-xs font-medium">{pestana.etiqueta}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
