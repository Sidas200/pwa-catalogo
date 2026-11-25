export default function BannerConexion({ online, desdeCache }) {
  if (online && !desdeCache) return null;
  return (
    <div className="banner" role="alert">
      <span aria-hidden="true">📡</span>
      {online
        ? 'Mostrando la última copia guardada del catálogo.'
        : 'Estás sin conexión. Puedes seguir navegando con el contenido guardado en tu dispositivo.'}
    </div>
  );
}
