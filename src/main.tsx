/**
 * main.tsx — Punto de entrada de SplitWallet
 * 
 * Este archivo:
 * 1. Importa los estilos globales (Tailwind + variables de tema)
 * 2. Renderiza el componente raíz <App /> en el DOM
 * 
 * React.StrictMode: activa comprobaciones adicionales en desarrollo
 * (como detectar efectos secundarios inesperados). No afecta en producción.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
