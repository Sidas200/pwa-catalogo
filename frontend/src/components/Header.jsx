export default function Header({ ruta, online }) {
  const activo = (r) => (ruta === r || (r === '/' && ruta.startsWith('/producto')) ? 'activo' : undefined);
  return (
    <header className="header">
      <a href="#/" className="marca">
        <img src="./icons/icon-192.png" alt="" width="36" height="36" />
        <span>Café de Altura</span>
      </a>
      <nav className="nav" aria-label="Principal">
        <a href="#/" className={activo('/')}>Catálogo</a>
        <a href="#/acerca" className={activo('/acerca')}>Acerca de</a>
      </nav>
      <span className={`estado ${online ? 'en-linea' : 'sin-linea'}`} role="status">
        <span className="punto" aria-hidden="true" />
        {online ? 'En línea' : 'Sin conexión'}
      </span>
    </header>
  );
}
