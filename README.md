# Maestranza Hogar — Landing

Sitio estático (HTML/CSS/JS plano, sin build step).

## Ver en local

Abrí `index.html` directamente en el navegador, o serví la carpeta con cualquier
servidor estático (por ejemplo `npx serve .`).

## Correr el test

    node tests/build-whatsapp-url.test.js

## Deploy (Vercel)

1. Subí este repo a GitHub.
2. En vercel.com, "New Project" → importá el repo. No hace falta configurar build
   command ni output directory (es un sitio estático): dejá los defaults.
3. Cada push a la rama principal redeploya automáticamente.

## Reemplazar las fotos de stock por fotos reales del cliente

Todas las fotos son de Unsplash (libres de derechos, licencia Unsplash) y están
etiquetadas "Foto ilustrativa" en `index.html`. Cuando lleguen las fotos reales:

1. Guardá cada foto nueva en una carpeta `img/` en la raíz del proyecto.
2. En `index.html`, cambiá el `src="https://images.unsplash.com/..."` de la sección
   correspondiente por `src="img/nombre-del-archivo.jpg"`.
3. Borrá el `<span class="mh-photo-tag">Foto ilustrativa</span>` que acompaña a esa foto.
4. No hace falta tocar `styles.css` ni `script.js`.
