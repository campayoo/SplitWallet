# SplitWallet 💳

> Gestor de gastos inteligente con dos modos: finanzas personales y reparto de cuentas en viajes con amigos. Diseñado como **Progressive Web App (PWA)** de alto rendimiento optimizada para iOS y Android.

Proyecto desarrollado por **Pablo** como parte del portfolio para el ciclo formativo (SMR / DAM) y movilidad **Erasmus+**.

---

## 📱 Características de la Fase 1 (Completada)

- 🍎 **PWA nativa en iOS**: Configuración completa de Safari (`apple-mobile-web-app-capable`, `apple-touch-icon`, `status-bar-style: black-translucent`, y `viewport-fit=cover`).
- 🛡️ **Safe Areas de iOS**: Respeta la isla dinámica, el notch y la barra de inicio inferior (`env(safe-area-inset-*)`).
- ⚡ **Look & Feel de App Nativa**:
  - Sin selección accidental de texto (`user-select: none`).
  - Sin rebote elástico ni parpadeos grises de Safari (`-webkit-tap-highlight-color: transparent`).
  - Botones táctiles adaptados a las directrices de Apple Human Interface (>44px).
  - Efectos de cristal esmerilado (`backdrop-blur-lg`).
- 🌓 **Tema Automático**: Detecta el modo claro/oscuro del sistema operativo (`prefers-color-scheme`) mediante variables CSS nativas.
- 📶 **Offline-First Ready**: Service Worker generado con Workbox y `vite-plugin-pwa` con precaching de assets para arranque instantáneo sin conexión.
- 🚀 **Despliegue Continuo**: Preparado con configuración optimizada para Vercel (`vercel.json`) con reescritura de rutas para SPA.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript + Vite
- **Estilos**: Tailwind CSS v4 + Variables CSS nativas
- **Iconografía**: Lucide React
- **Navegación**: React Router DOM v7
- **PWA**: vite-plugin-pwa + Workbox
- **Despliegue**: Vercel con HTTPS automático

---

## 🚀 Cómo ejecutar en local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción y verificar PWA
npm run build
npm run preview
```

---

## 🌐 Cómo desplegar en Vercel paso a paso (Gratuito con HTTPS)

Para que iOS permita instalar una PWA en la pantalla de inicio, es **obligatorio que la web se sirva con HTTPS**. Vercel lo proporciona automáticamente con certificados SSL gestionados.

### Opción A: Mediante GitHub (Recomendada)
1. Crea un nuevo repositorio en tu GitHub: `https://github.com/new` (ej. `SplitWallet`).
2. Sube este proyecto:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/SplitWallet.git
   git push -u origin main
   ```
3. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
4. Pulsa **"Add New..."** > **"Project"**.
5. Selecciona el repositorio `SplitWallet` y pulsa **"Import"**.
6. Vercel detectará automáticamente que es un proyecto **Vite**.
7. Pulsa **"Deploy"**. En menos de 1 minuto tendrás una URL pública con HTTPS (ej. `https://splitwallet.vercel.app`).

---

## 📲 Cómo instalarla en tu iPhone paso a paso

Una vez desplegada en Vercel:

1. Abre **Safari** en tu iPhone y entra en la URL de tu app en Vercel (ej. `https://splitwallet.vercel.app`).
2. Toca el botón **Compartir** (el icono del cuadrado con una flecha hacia arriba en la barra inferior de Safari).
3. Desliza hacia abajo en el menú y selecciona **"Añadir a pantalla de inicio"** (o *"Add to Home Screen"*).
4. Verás el icono nativo de SplitWallet y el nombre ya preconfigurado. Toca **"Añadir"** en la esquina superior derecha.
5. ¡Listo! Vuelve a tu pantalla de inicio: ahora verás el icono de **SplitWallet**. Al pulsarlo se abrirá a pantalla completa sin barra de navegación de Safari, comportándose exactamente igual que una app descargada de la App Store.
