import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

/**
 * Al terminar el build, escribe en dist/sw.js la lista de archivos del App Shell
 * (con sus nombres finales con hash) y una VERSION única. Así el Service Worker
 * precachea exactamente lo que se publicó y renueva la caché en cada despliegue.
 */
function precacheAppShell() {
  let outDir;
  return {
    name: 'precache-app-shell',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const listar = (dir) =>
        readdirSync(dir).flatMap((f) => {
          const ruta = join(dir, f);
          return statSync(ruta).isDirectory() ? listar(ruta) : [ruta];
        });

      const archivos = listar(outDir)
        .map((f) => relative(outDir, f).split('\\').join('/'))
        .filter((f) => f !== 'sw.js' && !f.endsWith('.map') && !f.startsWith('.'))
        .sort();

      const hash = createHash('sha256');
      archivos.forEach((f) => hash.update(f).update(readFileSync(join(outDir, f))));
      const version = hash.digest('hex').slice(0, 10);

      const swPath = join(outDir, 'sw.js');
      const sw = readFileSync(swPath, 'utf8')
        .replace('__VERSION__', version)
        .replace('/*__APP_SHELL__*/', archivos.map((f) => `'${f}'`).join(', '));
      writeFileSync(swPath, sw);
      console.log(`\n[sw] versión ${version} · ${archivos.length} recursos del App Shell precacheados`);
    },
  };
}

export default defineConfig({
  // Rutas relativas: funciona igual en Netlify (/) y en GitHub Pages (/nombre-repo/)
  base: './',
  plugins: [react(), precacheAppShell()],
});
