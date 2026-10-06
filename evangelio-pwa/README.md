# 🕊️ Camino de Vida - Aplicación Evangelística Offline (PWA)

Una aplicación web progresiva (**PWA**) interactiva diseñada para presentar el Evangelio de Jesucristo, responder a inquietudes del corazón y acompañar el crecimiento de nuevos creyentes. 

Cumple al 100% con los requerimientos:
- **De una sola descarga / instalación:** Se instala directo desde tu página web con un solo clic, sin pasar por Google Play ni App Store.
- **Disponible 100% offline:** Gracias a su Service Worker y almacenamiento local (`localStorage`), una vez visitada o instalada funciona en modo avión o en lugares sin señal móvil.
- **Interactiva y multimedia:** Preguntas de reflexión con retroalimentación, síntesis de voz para la oración de fe, certificado de nuevo nacimiento personalizado, diario espiritual y código QR para compartir de persona a persona.

---

## 📁 Estructura del Proyecto

```text
evangelio-pwa/
├── index.html       # Interfaz principal, diseño responsivo (móvil y PC)
├── style.css        # Estilos modernos, temas oscuro/claro y navegación nativa
├── app.js           # Lógica interactiva, Service Worker, audio y base de datos local
├── data.js          # Textos bíblicos, tratados, los 4 pasos y el plan de 7 días
├── qr.js            # Generador autónomo de código QR offline (sin librerías externas)
├── sw.js            # Service Worker con estrategia de caché ultra-rápida offline
├── manifest.json    # Manifiesto PWA para instalación nativa en Android, iOS y Windows
└── icons/           # Íconos vectoriales y de alta resolución (192px y 512px)
    ├── icon.svg
    ├── icon-192.png
    └── icon-512.png
```

---

## 🚀 ¿Cómo publicar la aplicación en tu página web?

La aplicación está lista para funcionar en cualquier servidor web con **HTTPS** (requisito estándar de los navegadores para permitir la instalación PWA y funcionamiento offline).

### Opción 1: En tu propio Hosting (cPanel / FTP / Hostinger / GoDaddy, etc.)
1. Ingresa a tu administrador de archivos de cPanel o conéctate vía FTP (FileZilla).
2. Dentro de `public_html/`, crea una subcarpeta llamada por ejemplo `vida` o `app` (o colócalo en la raíz si deseas que sea la web principal).
3. Sube todos los archivos y la carpeta `icons/` dentro de esa carpeta.
4. ¡Listo! Tu aplicación estará disponible en `https://tupaginaweb.com/app/`.

### Opción 2: En un sitio de WordPress
1. Mediante el Administrador de Archivos de tu hosting o un plugin de FTP, sube la carpeta `evangelio-pwa` a la raíz de tu instalación de WordPress.
2. Añade en tu menú o en un botón de tu página de WordPress un enlace a `https://tupaginaweb.com/evangelio-pwa/`.

### Opción 3: Alojamiento gratuito de alto rendimiento (Netlify o Vercel)
1. **Netlify:** Ve a [netlify.com](https://www.netlify.com), arrastra y suelta la carpeta `evangelio-pwa` en la sección "Deploy" y en 10 segundos tendrás un enlace seguro con HTTPS gratuito.
2. **Vercel / GitHub Pages:** También puedes subirlo a un repositorio de GitHub y habilitar GitHub Pages con 1 clic.

---

## 📲 ¿Cómo se instala en los dispositivos?

### En Celulares Android (Chrome, Edge, Samsung Browser):
- Al ingresar por primera vez, la aplicación muestra una barra superior: **"Instalar en tu Pantalla de Inicio"**.
- Al tocar **Instalar**, se añade directamente al cajón de aplicaciones de Android con su propio ícono, abriendo en pantalla completa como una app nativa.

### En iPhone y iPad (Safari iOS):
1. El usuario abre la página en Safari.
2. Presiona el botón central de **Compartir** (el icono del cuadro con flecha hacia arriba).
3. Selecciona la opción **"Agregar a la pantalla de inicio"** (Add to Home Screen).
4. La app queda guardada y funciona sin conexión permanentemente.

### En Computadoras (Windows / Mac / Linux):
- En Chrome o Edge aparece un icono de pantalla/flecha en la barra de direcciones que dice *"Instalar Camino de Vida"*.

---

## 🌟 Módulos y Funcionalidades Incluidas

1. **El Camino de la Vida (4 Pasos Interactivos):**
   - 1. *El Amor y Propósito de Dios* (Juan 3:16, Jeremías 29:11).
   - 2. *El Dilema: Pecado y Separación* (Romanos 3:23, Romanos 6:23).
   - 3. *La Solución: Jesucristo* (Romanos 5:8, Juan 14:6).
   - 4. *La Decisión: Recibir a Jesús* (Juan 1:12, Apocalipsis 3:20).
   - Preguntas interactivas en cada paso con explicaciones bíblicas directas.
   - Oración de fe guiada con botón para **escuchar en voz alta**.
   - Generación de **Certificado de Nuevo Nacimiento** editable e imprimible con fecha de decisión.

2. **Tratados Bíblicos y Respuestas (Apologética):**
   - *¿Cómo vencer la ansiedad y el miedo?*
   - *¿Por qué permite Dios el sufrimiento y el dolor?*
   - *¿Puede Dios perdonar mi pasado y mis peores errores?*
   - *¿Es la Biblia un libro confiable e histórico?*
   - *¿Cuál es el verdadero propósito de mi vida?*
   - *¿Alcanza con ser "buena persona" para ir al cielo?*
   - Filtros por temática y lectura agradable.

3. **Plan de Discipulado ("Mis Primeros 7 Días"):**
   - Días 1 al 7 con lecturas bíblicas, devocionales sencillos, retos prácticos diarios y checkbox interactivo que calcula el porcentaje de avance (0% a 100%).

4. **Diario de Oración y Gratitud:**
   - Permite al usuario registrar peticiones privadas, guardadas únicamente en su dispositivo, y marcarlas como "Respondida" cuando Dios obre.

5. **Modo Evangelista & Código QR:**
   - Botón superior para generar un código QR en pantalla sin internet, permitiendo que en la calle o en una reunión otra persona escanee la pantalla e instale la aplicación al instante.

---

## ✏️ ¿Cómo personalizar textos o agregar tu iglesia?

Todo el contenido textual está centralizado en el archivo [`data.js`](data.js). Puedes abrirlo con cualquier editor de texto para:
- Añadir o modificar preguntas de reflexión.
- Agregar más tratados temáticos en el array `APP_DATA.tracts`.
- Cambiar los versículos bíblicos o las lecciones del discipulado de 7 días.
