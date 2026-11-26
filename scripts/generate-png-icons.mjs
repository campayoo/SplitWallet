/**
 * generate-png-icons.mjs
 * Genera archivos PNG binarios 100% reales para PWA e iOS
 * usando pngjs (JavaScript puro, sin dependencias nativas).
 */
import { PNG } from 'pngjs'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const iconsDir = join(__dirname, '..', 'public', 'icons')
mkdirSync(iconsDir, { recursive: true })

/**
 * Dibuja un icono estilizado de SplitWallet
 * @param {number} size - Dimensiones cuadradas (size x size)
 * @param {boolean} maskable - Margen seguro extra para Android maskable
 */
function createSplitWalletIcon(size, maskable = false) {
  const png = new PNG({ width: size, height: size })
  
  // Colores (R, G, B, A)
  const bgR1 = 99,  bgG1 = 102, bgB1 = 241 // #6366f1 Indigo primario
  const bgR2 = 67,  bgG2 = 56,  bgB2 = 202 // #4338ca Indigo oscuro
  const whiteR = 255, whiteG = 255, whiteB = 255
  const accentR = 34, accentG = 197, accentB = 94 // #22c55e Verde finanzas

  const cornerRadius = maskable ? 0 : size * 0.22 // iOS usa esquinas cuadradas en el archivo (Apple aplica la máscara automáticamente)
  const center = size / 2

  // Margen de seguridad (safe zone)
  const scale = maskable ? 0.65 : 0.8
  const halfScale = scale / 2

  // Dimensiones de la cartera en el icono
  const wLeft = size * (0.5 - halfScale * 0.7)
  const wRight = size * (0.5 + halfScale * 0.7)
  const wTop = size * (0.5 - halfScale * 0.45)
  const wBottom = size * (0.5 + halfScale * 0.45)
  const wRadius = size * 0.08

  // Cierre de la cartera
  const claspX = wRight - size * 0.1
  const claspY = center
  const claspR = size * 0.075

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2

      // 1. Fondo degradado (diagonal superior izquierda a inferior derecha)
      const gradT = (x + y) / (size * 2)
      let r = Math.round(bgR1 * (1 - gradT) + bgR2 * gradT)
      let g = Math.round(bgG1 * (1 - gradT) + bgG2 * gradT)
      let b = Math.round(bgB1 * (1 - gradT) + bgB2 * gradT)
      let a = 255

      // Esquinas redondeadas para visualización normal (Apple añade su propio squircle, pero para standalone sirve)
      if (cornerRadius > 0) {
        let dx = 0, dy = 0
        if (x < cornerRadius) dx = cornerRadius - x
        else if (x > size - cornerRadius) dx = x - (size - cornerRadius)
        if (y < cornerRadius) dy = cornerRadius - y
        else if (y > size - cornerRadius) dy = y - (size - cornerRadius)
        if (dx > 0 && dy > 0 && Math.sqrt(dx * dx + dy * dy) > cornerRadius) {
          a = 0 // Transparente fuera de las esquinas
        }
      }

      // Si el píxel está dentro del fondo
      if (a > 0) {
        // 2. Dibuja el cuerpo de la cartera (rectángulo redondeado blanco)
        const insideWalletBox = (x >= wLeft && x <= wRight && y >= wTop && y <= wBottom)
        if (insideWalletBox) {
          let cdx = 0, cdy = 0
          if (x < wLeft + wRadius) cdx = (wLeft + wRadius) - x
          else if (x > wRight - wRadius) cdx = x - (wRight - wRadius)
          if (y < wTop + wRadius) cdy = (wTop + wRadius) - y
          else if (y > wBottom - wRadius) cdy = y - (wBottom - wRadius)

          const isCorner = (cdx > 0 && cdy > 0)
          if (!isCorner || (cdx * cdx + cdy * cdy <= wRadius * wRadius)) {
            // Interior de la cartera: blanco limpio
            r = whiteR
            g = whiteG
            b = whiteB

            // Detalle: ranura / pliegue de tarjetas superior
            if (y > wTop + size * 0.08 && y < wTop + size * 0.12 && x > wLeft + size * 0.08 && x < wRight - size * 0.22) {
              r = 203; g = 213; b = 225 // #cbd5e1 slate-300
            }
            if (y > wTop + size * 0.16 && y < wTop + size * 0.20 && x > wLeft + size * 0.08 && x < wRight - size * 0.22) {
              r = 226; g = 232; b = 240 // #e2e8f0 slate-200
            }
          }
        }

        // 3. Broche / Solapa lateral de la cartera
        const distToClasp = Math.sqrt((x - claspX) ** 2 + (y - claspY) ** 2)
        if (distToClasp <= claspR) {
          // Fondo del broche en color acento verde finanzas (#22c55e)
          r = accentR
          g = accentG
          b = accentB
          // Perno central metálico
          if (distToClasp <= claspR * 0.35) {
            r = whiteR
            g = whiteG
            b = whiteB
          }
        }
      }

      png.data[idx] = r
      png.data[idx + 1] = g
      png.data[idx + 2] = b
      png.data[idx + 3] = a
    }
  }

  return PNG.sync.write(png)
}

// Generar los 3 tamaños principales
const icons = [
  { file: 'apple-touch-icon-180x180.png', size: 180, maskable: false },
  { file: 'icon-192x192.png', size: 192, maskable: false },
  { file: 'icon-512x512.png', size: 512, maskable: true }
]

for (const icon of icons) {
  const buffer = createSplitWalletIcon(icon.size, icon.maskable)
  const fullPath = join(iconsDir, icon.file)
  writeFileSync(fullPath, buffer)
  console.log(`✅ Creado icono PNG nativo: ${icon.file} (${icon.size}x${icon.size} px, ${buffer.length} bytes)`)
}

// También creamos el favicon directo
const faviconBuffer = createSplitWalletIcon(64, false)
writeFileSync(join(iconsDir, '..', 'favicon.ico'), faviconBuffer)
console.log('✅ Creado favicon.ico')
