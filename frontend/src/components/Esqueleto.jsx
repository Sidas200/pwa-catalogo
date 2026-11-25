/** Marcadores de posición mientras llegan los datos (evita saltos visuales). */
export default function Esqueleto({ cantidad = 6 }) {
  return (
    <ul className="grid" aria-busy="true" aria-label="Cargando productos">
      {Array.from({ length: cantidad }, (_, i) => (
        <li key={i} className="tarjeta esqueleto">
          <div className="tarjeta-img" />
          <div className="tarjeta-cuerpo">
            <div className="linea corta" />
            <div className="linea" />
            <div className="linea media" />
          </div>
        </li>
      ))}
    </ul>
  );
}
