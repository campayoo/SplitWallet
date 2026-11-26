/**
 * PaginaAjustes.tsx — Pantalla de ajustes
 * 
 * En la Fase 1, muestra información básica de la app.
 * En fases posteriores incluirá:
 * - Gestión de cuenta (login/registro con Supabase)
 * - Preferencias (moneda predeterminada, idioma)
 * - Exportar datos (CSV)
 * - Tema (aunque el modo claro/oscuro es automático)
 * - Información de la versión y créditos
 */
import { Info, Moon, Sun, Smartphone } from 'lucide-react'
import { useState, useEffect } from 'react'

export function PaginaAjustes() {
  // Detectar el tema actual del sistema
  const [temaOscuro, setTemaOscuro] = useState(false)

  useEffect(() => {
    // matchMedia escucha cambios en el tema del sistema operativo
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setTemaOscuro(mediaQuery.matches)
    
    // Listener para cambios en tiempo real (si el usuario cambia el tema del sistema)
    const handleChange = (e: MediaQueryListEvent) => setTemaOscuro(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    // Limpieza: quitar el listener cuando el componente se desmonte
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className="px-4 py-6 space-y-4">
      <h2 
        className="text-xl font-bold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Ajustes
      </h2>

      {/* Tarjeta de información de la app */}
      <div 
        className="rounded-2xl p-4 space-y-3 border"
        style={{ 
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border)',
        }}
      >
        <ItemAjuste
          icono={temaOscuro ? <Moon size={20} /> : <Sun size={20} />}
          titulo="Tema"
          valor={temaOscuro ? 'Oscuro (automático)' : 'Claro (automático)'}
        />
        <Separador />
        <ItemAjuste
          icono={<Smartphone size={20} />}
          titulo="Versión"
          valor="1.0.0 — Fase 1"
        />
        <Separador />
        <ItemAjuste
          icono={<Info size={20} />}
          titulo="Autor"
          valor="Pablo — Portfolio DAM"
        />
      </div>

      {/* Créditos */}
      <p 
        className="text-xs text-center pt-4"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        SplitWallet © 2026 · Hecho con React + TypeScript + Vite
      </p>
    </div>
  )
}

/** Un item de la lista de ajustes */
function ItemAjuste({ icono, titulo, valor }: { icono: React.ReactNode; titulo: string; valor: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span style={{ color: 'var(--color-text-tertiary)' }}>{icono}</span>
        <span 
          className="text-sm font-medium"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {titulo}
        </span>
      </div>
      <span 
        className="text-sm"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {valor}
      </span>
    </div>
  )
}

/** Línea separadora entre items */
function Separador() {
  return <hr style={{ borderColor: 'var(--color-border)' }} className="border-t" />
}
