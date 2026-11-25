import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BannerConexion from './components/BannerConexion.jsx';
import AvisoActualizacion from './components/AvisoActualizacion.jsx';
import Catalogo from './components/Catalogo.jsx';
import DetalleProducto from './components/DetalleProducto.jsx';
import AcercaDe from './components/AcercaDe.jsx';
import { useOnline } from './hooks/useOnline.js';
import { useProductos } from './hooks/useProductos.js';
import { useRuta } from './hooks/useRuta.js';

/**
 * App Shell: el encabezado, la navegación y el pie se pintan siempre (y quedan
 * en caché); solo el contenido de <main> cambia según la ruta, renderizado en el cliente.
 */
export default function App() {
  const ruta = useRuta();
  const online = useOnline();
  const catalogo = useProductos();
  const { error, recargar } = catalogo;

  // Si se recupera la conexión y no había datos, se reintenta automáticamente
  useEffect(() => {
    if (online && error) recargar();
  }, [online, error, recargar]);

  let vista;
  const detalle = ruta.match(/^\/producto\/(\d+)$/);
  if (detalle) vista = <DetalleProducto id={Number(detalle[1])} catalogo={catalogo} />;
  else if (ruta === '/acerca') vista = <AcercaDe />;
  else vista = <Catalogo catalogo={catalogo} />;

  return (
    <div className="app">
      <Header ruta={ruta} online={online} />
      <BannerConexion online={online} desdeCache={catalogo.desdeCache} />
      <main className="contenido" id="contenido">{vista}</main>
      <Footer />
      <AvisoActualizacion />
    </div>
  );
}
