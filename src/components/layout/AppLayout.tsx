/**
 * AppLayout.tsx — Layout principal de la aplicación
 * 
 * Este componente envuelve toda la app y proporciona:
 * 1. La cabecera con el nombre de la app (respetando el safe area del notch)
 * 2. Un área de contenido scrolleable
 * 3. La barra de navegación inferior (respetando el safe area inferior de iOS)
 * 
 * ¿Por qué un layout separado?
 * Porque la cabecera y la navegación inferior son comunes a TODAS las páginas.
 * Así evitamos repetir código en cada página.
 */
import type { ReactNode } from 'react'
import { BarraNavegacion } from './BarraNavegacion'
import { Cabecera } from './Cabecera'

interface AppLayoutProps {
  children: ReactNode  // El contenido de la página actual (lo que viene de <Routes>)
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Cabecera fija arriba — respeta el notch de iOS */}
      <Cabecera />
      
      {/* Contenido principal — scrolleable independientemente */}
      {/* pb-20 = padding-bottom de 80px para que el contenido no quede
          tapado por la barra de navegación inferior */}
      <main 
        className="flex-1 overflow-y-auto pb-20 scroll-container"
        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      >
        {children}
      </main>
      
      {/* Barra de navegación inferior fija — respeta el safe area inferior */}
      <BarraNavegacion />
    </div>
  )
}
