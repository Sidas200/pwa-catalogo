import { useMemo, useState } from 'react';
import TarjetaProducto from './TarjetaProducto.jsx';
import Esqueleto from './Esqueleto.jsx';
import VistaOffline from './VistaOffline.jsx';

export default function Catalogo({ catalogo }) {
  const { cargando, productos, error, recargar } = catalogo;
  const [busqueda, setBusqueda] = useState('');

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return productos;
    return productos.filter((p) =>
      [p.nombre, p.origen, p.notas, p.proceso].some((t) => t.toLowerCase().includes(q))
    );
  }, [productos, busqueda]);

  if (error) return <VistaOffline error={error} onReintentar={recargar} />;

  return (
    <section>
      <div className="hero">
        <h1>Cafés de especialidad</h1>
        <p>Granos seleccionados de México y el mundo. Explora el catálogo, incluso sin conexión.</p>
        <label className="buscador">
          <span className="sr-only">Buscar café</span>
          <input
            type="search"
            placeholder="Buscar por nombre, origen o notas…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </label>
      </div>

      {cargando ? (
        <Esqueleto />
      ) : filtrados.length === 0 ? (
        <p className="vacio">No encontramos cafés que coincidan con “{busqueda}”.</p>
      ) : (
        <ul className="grid">
          {filtrados.map((p) => <TarjetaProducto key={p.id} producto={p} />)}
        </ul>
      )}
    </section>
  );
}
