/**
 * PaginaInicio.tsx — Pantalla principal de SplitWallet
 * 
 * Esta es la primera pantalla que ve el usuario al abrir la app.
 * En la Fase 1, muestra:
 * - Un saludo y resumen visual
 * - Detección de si la app está instalada como PWA en iOS
 * - Instrucciones para instalarla si aún no lo está
 * 
 * En fases posteriores mostrará:
 * - Resumen del mes (total gastado, presupuesto restante)
 * - Últimos movimientos
 * - Grupos activos con saldos pendientes
 */
import { Wallet, Download, Smartphone, TrendingUp, Users, PiggyBank } from 'lucide-react'
import { useEffect, useState } from 'react'

/**
 * Detecta si la app está ejecutándose como PWA instalada en iOS.
 * 
 * navigator.standalone es una propiedad exclusiva de Safari en iOS
 * que vale true cuando la web se abrió desde "Pantalla de inicio".
 * 
 * Para Android/Chrome, se comprueba display-mode: standalone.
 */
function usaEstaPWAInstalada(): boolean | null {
  const [instalada, setInstalada] = useState<boolean | null>(null)

  useEffect(() => {
    // Comprobación para iOS (Safari)
    const esStandaloneIOS = 'standalone' in window.navigator && 
      (window.navigator as Navigator & { standalone: boolean }).standalone === true
    
    // Comprobación para Android/Chrome
    const esStandaloneAndroid = window.matchMedia('(display-mode: standalone)').matches

    setInstalada(esStandaloneIOS || esStandaloneAndroid)
  }, [])

  return instalada
}

export function PaginaInicio() {
  const esPWA = usaEstaPWAInstalada()

  return (
    <div className="px-4 py-6 space-y-6">
      {/* === SECCIÓN: Bienvenida === */}
      <section className="text-center space-y-2 pt-2">
        <div 
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-3"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <Wallet size={40} style={{ color: '#6366f1' }} />
        </div>
        <h2 
          className="text-2xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          ¡Bienvenido a SplitWallet!
        </h2>
        <p 
          className="text-sm"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Tu gestor de gastos personales y compartidos
        </p>
      </section>

      {/* === SECCIÓN: Tarjetas de funcionalidades === */}
      <section className="grid grid-cols-2 gap-3">
        <TarjetaFuncion
          icono={<PiggyBank size={28} style={{ color: '#22c55e' }} />}
          titulo="Gastos Personales"
          descripcion="Registra y controla tus gastos e ingresos"
          colorFondo="#dcfce7"
          colorFondoOscuro="#14532d"
        />
        <TarjetaFuncion
          icono={<Users size={28} style={{ color: '#6366f1' }} />}
          titulo="Grupos"
          descripcion="Divide gastos con amigos en viajes"
          colorFondo="#e0e7ff"
          colorFondoOscuro="#312e81"
        />
        <TarjetaFuncion
          icono={<TrendingUp size={28} style={{ color: '#f59e0b' }} />}
          titulo="Estadísticas"
          descripcion="Gráficas y análisis de tus finanzas"
          colorFondo="#fef3c7"
          colorFondoOscuro="#78350f"
        />
        <TarjetaFuncion
          icono={<Smartphone size={28} style={{ color: '#ef4444' }} />}
          titulo="Offline"
          descripcion="Funciona sin conexión a internet"
          colorFondo="#fecaca"
          colorFondoOscuro="#7f1d1d"
        />
      </section>

      {/* === SECCIÓN: Instrucciones de instalación PWA === */}
      {/* Solo se muestra si la app NO está instalada como PWA */}
      {esPWA === false && (
        <section 
          className="rounded-2xl p-4 space-y-3 border"
          style={{ 
            backgroundColor: 'var(--color-bg-card)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="flex items-center gap-2">
            <Download size={20} style={{ color: '#6366f1' }} />
            <h3 
              className="font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Instalar en tu iPhone
            </h3>
          </div>
          
          <div className="space-y-2">
            <PasoInstalacion 
              numero={1} 
              texto="Pulsa el botón de Compartir en Safari" 
              icono="↑"
            />
            <PasoInstalacion 
              numero={2} 
              texto='Selecciona "Añadir a pantalla de inicio"' 
              icono="+"
            />
            <PasoInstalacion 
              numero={3} 
              texto='Pulsa "Añadir" en la esquina superior derecha' 
              icono="✓"
            />
          </div>
          
          <p 
            className="text-xs text-center pt-1"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            Se abrirá como una app nativa a pantalla completa
          </p>
        </section>
      )}

      {/* Mensaje si ya está instalada como PWA */}
      {esPWA === true && (
        <section 
          className="rounded-2xl p-4 text-center border"
          style={{ 
            backgroundColor: 'var(--color-bg-card)',
            borderColor: 'var(--color-border)',
          }}
        >
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            ✅ App instalada correctamente. ¡A gestionar gastos!
          </p>
        </section>
      )}

      {/* === SECCIÓN: Próximamente === */}
      <section 
        className="rounded-2xl p-4 text-center space-y-1 border"
        style={{ 
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border)',
        }}
      >
        <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
          🚀 Fase 1 completada
        </p>
        <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          PWA instalable · Modo claro/oscuro · Navegación nativa
        </p>
        <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          Próximo: Fase 2 — Registro de gastos personales
        </p>
      </section>
    </div>
  )
}

/* ============================================
   COMPONENTES AUXILIARES
   ============================================ */

/** Tarjeta de función para la pantalla de inicio */
function TarjetaFuncion({ 
  icono, titulo, descripcion, colorFondo, colorFondoOscuro 
}: { 
  icono: React.ReactNode
  titulo: string
  descripcion: string
  colorFondo: string
  colorFondoOscuro: string
}) {
  // Detectamos modo oscuro con matchMedia
  const esModoOscuro = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-color-scheme: dark)').matches

  return (
    <div 
      className="rounded-2xl p-4 space-y-2"
      style={{ backgroundColor: esModoOscuro ? colorFondoOscuro : colorFondo }}
    >
      {icono}
      <h3 
        className="text-sm font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {titulo}
      </h3>
      <p 
        className="text-xs"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {descripcion}
      </p>
    </div>
  )
}

/** Paso numerado de las instrucciones de instalación */
function PasoInstalacion({ numero, texto, icono }: { numero: number; texto: string; icono: string }) {
  return (
    <div className="flex items-center gap-3">
      <span 
        className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white shrink-0"
        style={{ backgroundColor: '#6366f1' }}
      >
        {numero}
      </span>
      <p className="text-sm flex-1" style={{ color: 'var(--color-text-secondary)' }}>
        {texto}
      </p>
      <span 
        className="text-xs px-2 py-0.5 rounded font-mono font-bold shrink-0"
        style={{ 
          backgroundColor: 'var(--color-bg-tertiary)',
          color: '#6366f1' 
        }}
      >
        {icono}
      </span>
    </div>
  )
}
