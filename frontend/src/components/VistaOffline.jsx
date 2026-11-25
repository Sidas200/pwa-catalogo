/** Vista amigable cuando no hay conexión ni datos guardados. */
export default function VistaOffline({ error, onReintentar }) {
  const sinConexion = error === 'sin-conexion';
  return (
    <section className="offline">
      <div className="offline-icono" aria-hidden="true">{sinConexion ? '☕📡' : '⚠️'}</div>
      <h1>{sinConexion ? '¡Ups! Te quedaste sin conexión' : 'No pudimos cargar el catálogo'}</h1>
      <p>
        {sinConexion
          ? 'Aún no tenemos una copia del catálogo guardada en este dispositivo. Conéctate a internet una vez y después podrás consultarlo sin conexión.'
          : `Ocurrió un problema al obtener los datos (${error}).`}
      </p>
      <button className="boton" onClick={onReintentar}>Reintentar</button>
    </section>
  );
}
