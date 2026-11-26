/**
 * generate-icons.mjs — Genera los iconos PWA de SplitWallet
 * 
 * Este script crea archivos SVG que pueden usarse directamente como iconos.
 * Para producción, se recomienda convertirlos a PNG con herramientas online
 * como https://cloudconvert.com/svg-to-png o RealFaviconGenerator.
 * 
 * Los SVGs se escalan perfectamente a cualquier tamaño, así que funcionan
 * como iconos temporales mientras desarrollamos.
 * 
 * Uso: node scripts/generate-icons.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const iconsDir = join(__dirname, '..', 'public', 'icons')

// Asegura que el directorio existe
mkdirSync(iconsDir, { recursive: true })

/**
 * Genera un SVG con el logo de SplitWallet
 * El icono es una billetera (wallet) estilizada con el color primario de la marca
 * 
 * @param {number} size - Tamaño en píxeles del icono
 * @param {boolean} maskable - Si es true, añade padding extra para el recorte maskable
 * @returns {string} - El contenido SVG como string
 */
function generarSVG(size, maskable = false) {
  // Maskable icons necesitan que el contenido esté en el 80% central
  // para que no se recorte al adaptarse a diferentes formas (círculo, cuadrado redondeado, etc.)
  const padding = maskable ? size * 0.1 : size * 0.15
  const innerSize = size - padding * 2
  const cx = size / 2
  const cy = size / 2
  
  // Radio del icono de billetera
  const walletW = innerSize * 0.6
  const walletH = innerSize * 0.45
  const walletX = cx - walletW / 2
  const walletY = cy - walletH / 2 + innerSize * 0.02

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <!-- Fondo con gradiente -->
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1"/>
      <stop offset="100%" style="stop-color:#4f46e5"/>
    </linearGradient>
    <linearGradient id="wallet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff"/>
      <stop offset="100%" style="stop-color:#e0e7ff"/>
    </linearGradient>
  </defs>
  
  <!-- Fondo redondeado (esquinas redondeadas como los iconos de iOS) -->
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#bg)"/>
  
  <!-- Icono de billetera simplificado -->
  <!-- Cuerpo principal de la billetera -->
  <rect x="${walletX}" y="${walletY}" width="${walletW}" height="${walletH}" 
        rx="${walletH * 0.15}" fill="white" opacity="0.95"/>
  
  <!-- Solapa superior de la billetera -->
  <rect x="${walletX}" y="${walletY - walletH * 0.12}" width="${walletW * 0.75}" height="${walletH * 0.2}" 
        rx="${walletH * 0.08}" fill="white" opacity="0.7"/>
  
  <!-- Cierre / botón de la billetera -->
  <circle cx="${walletX + walletW - walletW * 0.18}" cy="${walletY + walletH * 0.5}" 
          r="${walletH * 0.12}" fill="#6366f1" opacity="0.8"/>
  <circle cx="${walletX + walletW - walletW * 0.18}" cy="${walletY + walletH * 0.5}" 
          r="${walletH * 0.06}" fill="white"/>
  
  <!-- Línea decorativa tipo tarjeta -->
  <line x1="${walletX + walletW * 0.1}" y1="${walletY + walletH * 0.35}" 
        x2="${walletX + walletW * 0.5}" y2="${walletY + walletH * 0.35}" 
        stroke="#c7d2fe" stroke-width="${size * 0.012}" stroke-linecap="round"/>
  <line x1="${walletX + walletW * 0.1}" y1="${walletY + walletH * 0.52}" 
        x2="${walletX + walletW * 0.35}" y2="${walletY + walletH * 0.52}" 
        stroke="#c7d2fe" stroke-width="${size * 0.012}" stroke-linecap="round"/>
  
  <!-- Texto "SW" debajo -->
  <text x="${cx}" y="${walletY + walletH + innerSize * 0.22}" 
        text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" 
        font-size="${innerSize * 0.14}" font-weight="700" fill="white" opacity="0.9">
    SplitWallet
  </text>
</svg>`
}

// Generar los iconos en diferentes tamaños
const iconos = [
  { nombre: 'icon-192x192.png', size: 192, maskable: false },
  { nombre: 'icon-512x512.png', size: 512, maskable: false },
  { nombre: 'apple-touch-icon-180x180.png', size: 180, maskable: false },
]

for (const { nombre, size, maskable } of iconos) {
  // Guardamos como SVG (con extensión .png por ahora — el navegador los aceptará)
  // NOTA: Para producción real, convertir a PNG con una herramienta online
  const svgNombre = nombre.replace('.png', '.svg')
  const svgPath = join(iconsDir, svgNombre)
  writeFileSync(svgPath, generarSVG(size, maskable))
  console.log(`✅ Generado: ${svgNombre} (${size}x${size})`)
  
  // También guardar como "PNG" (en realidad SVG) para que el manifest funcione
  const pngPath = join(iconsDir, nombre)
  writeFileSync(pngPath, generarSVG(size, maskable))
  console.log(`✅ Generado: ${nombre} (${size}x${size}) [SVG como fallback]`)
}

console.log('\n🎉 Iconos generados en public/icons/')
console.log('💡 Para iconos PNG reales, usa: https://realfavicongenerator.net/')
