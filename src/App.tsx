/**
 * App.tsx — Componente raíz de SplitWallet
 * 
 * Configura el enrutamiento de la aplicación usando React Router.
 * Cada "página" (Inicio, Personal, Grupos, Ajustes) es una ruta diferente.
 * 
 * El layout principal tiene:
 * - Un área de contenido scrolleable que ocupa toda la pantalla
 * - Una barra de navegación inferior fija (tipo app nativa)
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { PaginaInicio } from './features/inicio/PaginaInicio'
import { PaginaPersonal } from './features/personal/PaginaPersonal'
import { PaginaGrupos } from './features/groups/PaginaGrupos'
import { PaginaAjustes } from './features/ajustes/PaginaAjustes'

function App() {
  return (
    // BrowserRouter: usa URLs limpias (ej. /personal, /grupos)
    // en vez de hash (ej. /#/personal). Necesario para PWA.
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/personal" element={<PaginaPersonal />} />
          <Route path="/grupos" element={<PaginaGrupos />} />
          <Route path="/ajustes" element={<PaginaAjustes />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
