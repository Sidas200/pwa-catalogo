import { ORIGEN_DATOS } from '../hooks/useProductos.js';

export default function AcercaDe() {
  const sw = 'serviceWorker' in navigator && navigator.serviceWorker.controller;
  const standalone = window.matchMedia('(display-mode: standalone)').matches;
  return (
    <section className="acerca">
      <h1>Acerca de esta PWA</h1>
      <p>
        Catálogo informativo desarrollado como <strong>Aplicación Web Progresiva</strong> para la
        Práctica 1. El frontend está hecho con <strong>React</strong> (renderizado del lado del cliente)
        y los datos los provee una API REST hecha con <strong>Java + Spring Boot</strong>.
      </p>
      <h2>Componentes PWA</h2>
      <ul className="checklist">
        <li><strong>Manifiesto</strong> (<code>manifest.json</code>): nombre, iconos normales y <em>maskable</em>, modo <code>standalone</code>.</li>
        <li><strong>App Shell</strong>: encabezado, navegación y pie fijos; solo el contenido cambia, renderizado con React.</li>
        <li><strong>Service Worker</strong> (<code>sw.js</code>): precachea el App Shell e intercepta las peticiones.</li>
        <li><strong>Modo offline</strong>: el catálogo se sirve desde caché y hay vistas amigables sin conexión.</li>
      </ul>
      <h2>Estado en este dispositivo</h2>
      <ul className="estado-lista">
        <li>Service Worker controlando la página: <strong>{sw ? 'Sí ✅' : 'No (recarga la página) ⏳'}</strong></li>
        <li>Abierta como app instalada: <strong>{standalone ? 'Sí ✅' : 'No, en navegador'}</strong></li>
        <li>Origen de datos: <code>{ORIGEN_DATOS}</code></li>
      </ul>
    </section>
  );
}
