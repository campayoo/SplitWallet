/// <reference lib="webworker" />
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'

declare const self: ServiceWorkerGlobalScope

// Forzar activación inmediata del service worker
self.skipWaiting()
clientsClaim()

// Limpiar cachés antiguas de versiones previas
cleanupOutdatedCaches()

// self.__WB_MANIFEST es inyectado automáticamente por VitePWA en tiempo de compilación
precacheAndRoute(self.__WB_MANIFEST)
