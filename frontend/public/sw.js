/* Service Worker – Café de Altura (Práctica 1 PWA)
 *
 * Estrategias:
 *  - App Shell (HTML, JS, CSS, iconos, manifest)  -> Cache First (precacheado en "install")
 *  - Navegación (abrir la app / recargar)          -> Network First, con respaldo al index.html en caché
 *  - Datos del catálogo (/data/*.json o /api/*)    -> Network First, con respaldo a la última copia
 *  - Si nada de lo anterior existe                 -> offline.html (vista amigable sin conexión)
 *
 * Las constantes VERSION y APP_SHELL se rellenan automáticamente al ejecutar
 * "npm run build" (ver el plugin "precacheAppShell" en vite.config.js).
 */
const VERSION = '__VERSION__';
const APP_SHELL = [/*__APP_SHELL__*/];

const CACHE_SHELL = `shell-${VERSION}`;
const CACHE_DATOS = 'datos-v1';
const OFFLINE_URL = 'offline.html';

// 1) INSTALACIÓN: guarda en caché todos los recursos del App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    // Set elimina duplicados: cache.addAll() falla si recibe la misma URL dos veces
    caches.open(CACHE_SHELL).then((cache) => cache.addAll([...new Set(['./', OFFLINE_URL, ...APP_SHELL])]))
  );
});

// 2) ACTIVACIÓN: elimina cachés de versiones anteriores y toma control de las pestañas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('shell-') && k !== CACHE_SHELL).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// La página puede pedir activar de inmediato una versión nueva
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

// 3) INTERCEPCIÓN DE PETICIONES
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (request.mode === 'navigate') {
    event.respondWith(navegacion(request));
  } else if (url.pathname.includes('/api/') || url.pathname.includes('/data/')) {
    event.respondWith(networkFirstDatos(request));
  } else if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request));
  }
});

async function navegacion(request) {
  try {
    const respuesta = await fetch(request);
    const cache = await caches.open(CACHE_SHELL);
    cache.put('./', respuesta.clone());
    return respuesta;
  } catch {
    return (await caches.match('./')) || (await caches.match(OFFLINE_URL));
  }
}

async function networkFirstDatos(request) {
  const cache = await caches.open(CACHE_DATOS);
  try {
    const respuesta = await fetch(request);
    if (respuesta.ok) cache.put(request, respuesta.clone());
    return respuesta;
  } catch {
    const guardada = (await cache.match(request)) || (await caches.match(request));
    if (guardada) {
      // Marca la respuesta para que la interfaz sepa que viene de caché
      const headers = new Headers(guardada.headers);
      headers.set('X-Desde-Cache', 'true');
      return new Response(await guardada.blob(), { status: 200, headers });
    }
    return new Response(JSON.stringify({ error: 'sin-conexion' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function cacheFirst(request) {
  const guardada = await caches.match(request);
  if (guardada) return guardada;
  try {
    const respuesta = await fetch(request);
    if (respuesta.ok) (await caches.open(CACHE_SHELL)).put(request, respuesta.clone());
    return respuesta;
  } catch {
    return new Response('', { status: 504, statusText: 'Sin conexión' });
  }
}
