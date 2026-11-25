# Formato de Coevaluación — Práctica 1

**Desarrollo y Coevaluación de una Aplicación Web Progresiva Básica** · Ponderación: 20%

| Dato | Valor |
|------|-------|
| Equipo evaluado | |
| Integrantes del equipo evaluado | |
| Repositorio evaluado | |
| URL de la PWA evaluada | |
| Equipo evaluador | |
| Fecha | |

## Lista de cotejo

| # | Criterio a evaluar | Indicador / Descripción | Cumple (Sí / No) | Puntuación / Observaciones |
|---|--------------------|-------------------------|:----------------:|----------------------------|
| 1 | Repositorio y Estructura | El código fuente está organizado lógicamente en un repositorio de control de versiones. | | |
| 2 | Manifiesto Web | Cuenta con el archivo `manifest.json` configurado con nombre, iconos adaptativos y modo de visualización `standalone`. | | |
| 3 | Arquitectura App Shell | Implementa una estructura visual inicial fluida mediante técnicas de renderizado del lado del cliente (CSR). | | |
| 4 | Service Worker y Caché | El Service Worker se registra correctamente e intercepta peticiones para almacenar los recursos esenciales del App Shell. | | |
| 5 | Funcionamiento Offline | La aplicación muestra una interfaz o vista amigable cuando el usuario simula la pérdida de conexión a internet. | | |
| 6 | Auditoría Básica (Lighthouse) | Supera las métricas mínimas de PWA indicadas por la herramienta Lighthouse en el navegador. | | |

## Guía de verificación sugerida

1. **Repositorio:** ¿hay README, `.gitignore`, carpetas separadas y commits con mensajes claros?
2. **Manifiesto:** DevTools → *Application → Manifest*. Revisar `name`, `short_name`, `display: standalone`, iconos 192 y 512 (incluye `maskable`), sin errores de instalabilidad.
3. **App Shell / CSR:** ver el código fuente (`Ctrl+U`): el HTML inicial solo trae el shell y React renderiza el contenido. Navegar entre vistas sin recargar la página.
4. **Service Worker:** *Application → Service Workers* debe estar *activated and is running*; en *Cache Storage* aparecen los recursos del App Shell. En *Network*, las peticiones muestran "(ServiceWorker)".
5. **Offline:** activar *Offline* y recargar. La app debe mostrar contenido o una vista amigable (no el dinosaurio de Chrome).
6. **Lighthouse:** ejecutar en modo incógnito. Anotar Performance, Accessibility, Best Practices y SEO, e indicar si la app es instalable.

## Puntajes Lighthouse obtenidos

| Performance | Accessibility | Best Practices | SEO | ¿Instalable? |
|:-----------:|:-------------:|:--------------:|:---:|:------------:|
| | | | | |

## Retroalimentación constructiva

**Fortalezas:**

**Áreas de mejora:**

**Sugerencias concretas:**

## Firmas del equipo evaluador

| Nombre | Matrícula | Firma |
|--------|-----------|-------|
| | | |
| | | |
| | | |
