import Esqueleto from './Esqueleto.jsx';
import VistaOffline from './VistaOffline.jsx';
import { precio } from '../formato.js';

export default function DetalleProducto({ id, catalogo }) {
  const { cargando, productos, error, recargar } = catalogo;
  if (cargando) return <Esqueleto cantidad={1} />;
  if (error) return <VistaOffline error={error} onReintentar={recargar} />;

  const p = productos.find((x) => x.id === id);
  if (!p) {
    return (
      <section className="offline">
        <h1>Producto no encontrado</h1>
        <a className="boton" href="#/">Volver al catálogo</a>
      </section>
    );
  }

  return (
    <article className="detalle">
      <a href="#/" className="volver">← Volver al catálogo</a>
      <div className="detalle-img" style={{ background: p.color }} aria-hidden="true">{p.emoji}</div>
      <div className="detalle-info">
        <span className="etiqueta">{p.proceso}</span>
        <h1>{p.nombre}</h1>
        <p className="origen">📍 {p.origen}</p>
        <p>{p.descripcion}</p>
        <dl>
          <dt>Notas de cata</dt><dd>{p.notas}</dd>
          <dt>Proceso</dt><dd>{p.proceso}</dd>
          <dt>Presentación</dt><dd>250 g, grano entero</dd>
        </dl>
        <p className="precio grande">{precio(p.precio)}</p>
      </div>
    </article>
  );
}
