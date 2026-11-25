// Genera los iconos PNG de la PWA sin dependencias externas (solo zlib de Node).
// Uso: npm run icons
import { writeFileSync, mkdirSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

const OUT = new URL('../public/icons/', import.meta.url);
mkdirSync(OUT, { recursive: true });

const FONDO = [59, 36, 22];      // café oscuro
const CIRCULO = [243, 227, 195]; // crema
const GRANO = [139, 90, 43];     // café
const SS = 4;                    // supersampling para bordes suaves

// Devuelve el color del punto (x, y) en coordenadas normalizadas [-0.5, 0.5]
function colorEn(x, y, escala, conFondo) {
  const r = Math.hypot(x, y);
  // Grano de café: elipse rotada con una "costura" ondulada
  const ang = -Math.PI / 6;
  const u = (x * Math.cos(ang) - y * Math.sin(ang)) / escala;
  const v = (x * Math.sin(ang) + y * Math.cos(ang)) / escala;
  const a = 0.2, b = 0.135;
  if ((u * u) / (a * a) + (v * v) / (b * b) <= 1) {
    const costura = 0.03 * Math.sin((u / a) * Math.PI);
    if (Math.abs(v - costura) < 0.018 && Math.abs(u) < a * 0.85) return CIRCULO;
    return GRANO;
  }
  if (r <= 0.36 * escala) return CIRCULO;
  return conFondo ? FONDO : null;
}

function png(size, escala, conFondo = true) {
  const filas = [];
  for (let py = 0; py < size; py++) {
    const fila = Buffer.alloc(1 + size * 4); // byte de filtro + RGBA
    for (let px = 0; px < size; px++) {
      let rr = 0, gg = 0, bb = 0, aa = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const x = (px + (sx + 0.5) / SS) / size - 0.5;
          const y = (py + (sy + 0.5) / SS) / size - 0.5;
          const c = colorEn(x, y, escala, conFondo);
          if (c) { rr += c[0]; gg += c[1]; bb += c[2]; aa += 255; }
        }
      }
      const n = SS * SS, cubiertos = aa / 255 || 1;
      fila.set([rr / cubiertos, gg / cubiertos, bb / cubiertos, aa / n].map(Math.round), 1 + px * 4);
    }
    filas.push(fila);
  }
  return codificarPNG(size, Buffer.concat(filas));
}

function codificarPNG(size, raw) {
  const crcTabla = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    return c >>> 0;
  });
  const crc = (buf) => {
    let c = 0xffffffff;
    for (const byte of buf) c = crcTabla[(c ^ byte) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  };
  const chunk = (tipo, datos) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(datos.length);
    const td = Buffer.concat([Buffer.from(tipo), datos]);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8 bits, RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const iconos = [
  ['icon-192.png', 192, 1.25, true],
  ['icon-512.png', 512, 1.25, true],
  ['maskable-192.png', 192, 1, true],   // contenido dentro de la "zona segura" (80%)
  ['maskable-512.png', 512, 1, true],
  ['apple-touch-icon.png', 180, 1.15, true],
  ['favicon-32.png', 32, 1.35, false],
];

for (const [nombre, size, escala, fondo] of iconos) {
  writeFileSync(new URL(nombre, OUT), png(size, escala, fondo));
  console.log('✔', nombre);
}
