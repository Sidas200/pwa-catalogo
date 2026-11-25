import { precio } from '../formato.js';

export default function TarjetaProducto({ producto: p }) {
  return (
    <li className="tarjeta">
      <a href={`#/producto/${p.id}`}>
        <div className="tarjeta-img" style={{ background: p.color }} aria-hidden="true">{p.emoji}</div>
        <div className="tarjeta-cuerpo">
          <span className="etiqueta">{p.proceso}</span>
          <h2>{p.nombre}</h2>
          <p className="origen">{p.origen}</p>
          <p className="notas">{p.notas}</p>
          <p className="precio">{precio(p.precio)} <small>/ 250 g</small></p>
        </div>
      </a>
    </li>
  );
}
