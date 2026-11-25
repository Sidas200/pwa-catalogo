import { useEffect, useState } from 'react';

/**
 * Enrutador mínimo basado en el hash (#/...). Funciona en GitHub Pages y
 * Netlify sin configurar redirecciones, y todo se resuelve en el cliente.
 */
export function useRuta() {
  const leer = () => window.location.hash.replace(/^#/, '') || '/';
  const [ruta, setRuta] = useState(leer);
  useEffect(() => {
    const cambiar = () => { setRuta(leer()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', cambiar);
    return () => window.removeEventListener('hashchange', cambiar);
  }, []);
  return ruta;
}
