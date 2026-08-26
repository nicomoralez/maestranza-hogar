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

## Cambiar el número de WhatsApp

El número (`5491128013474`) está hardcodeado en 5 lugares: cuatro veces en
`index.html` (los links de WhatsApp del hero, la sección de arquitectos, la
sección de contacto y el footer) y una vez en `script.js` (la constante
`WHATSAPP_NUMBER`, usada por el formulario de cotización). Si el número
cambia, hay que actualizar los 5 lugares a mano — no hay un solo punto de
configuración porque el sitio es HTML/JS plano sin build step.

## Cambiar los colores

Toda la paleta vive en `:root` al principio de `styles.css` (variables
`--bg`, `--text`, `--accent`, `--accent-hover`, `--contrast-bg`,
`--contrast-text`, `--line`). Cambiar un valor ahí actualiza todo el sitio,
ya que el resto del CSS solo usa estas variables, nunca colores sueltos.
