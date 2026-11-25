import { useEffect, useState } from 'react';

/** Aviso que aparece cuando el Service Worker descargó una versión nueva de la app. */
export default function AvisoActualizacion() {
  const [swEnEspera, setSwEnEspera] = useState(null);

  useEffect(() => {
    const manejar = (e) => setSwEnEspera(e.detail);
    window.addEventListener('sw-actualizacion', manejar);
    return () => window.removeEventListener('sw-actualizacion', manejar);
  }, []);

  if (!swEnEspera) return null;
  return (
    <div className="toast" role="status">
      <span>Hay una nueva versión disponible.</span>
      <button onClick={() => swEnEspera.postMessage('SKIP_WAITING')}>Actualizar</button>
    </div>
  );
}
