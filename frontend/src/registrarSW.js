/**
 * Registra el Service Worker (solo en el build de producción, para no
 * interferir con el servidor de desarrollo de Vite).
 * Cuando hay una versión nueva esperando, emite el evento "sw-actualizacion".
 */
export function registrarServiceWorker() {
  if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return;

  window.addEventListener('load', async () => {
    try {
      const registro = await navigator.serviceWorker.register('./sw.js');
      console.log('[PWA] Service Worker registrado. Alcance:', registro.scope);

      const avisar = (sw) => window.dispatchEvent(new CustomEvent('sw-actualizacion', { detail: sw }));
      if (registro.waiting && navigator.serviceWorker.controller) avisar(registro.waiting);

      registro.addEventListener('updatefound', () => {
        const nuevo = registro.installing;
        nuevo?.addEventListener('statechange', () => {
          if (nuevo.state === 'installed' && navigator.serviceWorker.controller) avisar(nuevo);
        });
      });

      // Al activarse la nueva versión, recargamos una sola vez
      let recargado = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!recargado) { recargado = true; window.location.reload(); }
      });
    } catch (error) {
      console.error('[PWA] Error al registrar el Service Worker:', error);
    }
  });
}
