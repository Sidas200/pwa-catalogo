import { useCallback, useEffect, useState } from 'react';

// Si se define VITE_API_URL se consume la API de Spring Boot;
// si no, se usa el JSON estático publicado junto con la PWA.
const API_URL = import.meta.env.VITE_API_URL;
export const ORIGEN_DATOS = API_URL ? `${API_URL.replace(/\/$/, '')}/api/productos` : './data/productos.json';

/** Obtiene el catálogo y reporta si los datos vienen de la red o de la caché del Service Worker. */
export function useProductos() {
  const [estado, setEstado] = useState({ cargando: true, productos: [], error: null, desdeCache: false });

  const cargar = useCallback(async () => {
    setEstado((e) => ({ ...e, cargando: true, error: null }));
    try {
      const res = await fetch(ORIGEN_DATOS);
      if (!res.ok) throw new Error(res.status === 503 ? 'sin-conexion' : `HTTP ${res.status}`);
      const productos = await res.json();
      setEstado({ cargando: false, productos, error: null, desdeCache: res.headers.get('X-Desde-Cache') === 'true' });
    } catch (err) {
      const sinRed = !navigator.onLine || err.message === 'sin-conexion' || err instanceof TypeError;
      setEstado({ cargando: false, productos: [], error: sinRed ? 'sin-conexion' : err.message, desdeCache: false });
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  return { ...estado, recargar: cargar };
}
