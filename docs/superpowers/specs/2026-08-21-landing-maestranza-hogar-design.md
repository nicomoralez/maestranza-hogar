# Landing Maestranza Hogar — Diseño

## Contexto y objetivo

Maestranza Hogar es una empresa de limpieza (post obra, hogar, oficinas, mudanzas) con presencia
activa en Instagram (~24.600 seguidores) y trabajo actual concentrado en countrys y post obra
residencial. El objetivo de negocio es usar la landing para atraer un cliente que hoy no tiene:
**estudios de arquitectura y constructoras**, que compran limpieza final de obra de forma recurrente
y valoran presentación profesional al elegir proveedor.

Existe una landing previa (maestranza-hogar.vercel.app) con buena estrategia de contenido pero
ejecución visual genérica ("sin alma", en palabras del cliente/dueño de este proyecto). Este spec
reconstruye la landing desde cero, misma estrategia de fondo, otra ejecución visual.

Presupuesto de trabajo: lowcost. No hay costo de hosting recurrente aceptable, y la solución debe
ser simple de mantener para que un tercero pueda editarla en el futuro sin depender de un stack
complejo.

## Investigación que informa las decisiones

- La competencia directa en limpieza de obra en Buenos Aires (Elarg, Narclean, AFondo Higiene) usa
  un lenguaje visual B2B genérico: blanco/gris/azul corporativo. No hay diferenciación visual en el
  rubro — es una oportunidad.
- Los estudios de arquitectura que se quiere captar (ej. Fallone Studio) comunican sofisticación por
  restricción: mucho espacio en blanco, tipografía contenida, cero ornamento, la obra/foto como
  protagonista. Ese es el código visual que un arquitecto reconoce como "de su nivel".
- Un tratamiento visual tipo "obrador" (colores flúo de seguridad) juega en contra del objetivo:
  refuerza la percepción de contratista genérico en vez de proveedor confiable para un estudio.

**Decisión de dirección visual:** Premium / restrained. No es literalmente modo oscuro — son los
principios (aire, tipografía contenida, un acento de color usado con moderación, foto real como
protagonista) los que se aplican en toda la página, con bloques de alto contraste (fondo oscuro)
reservados al hero y al cierre de contacto para dar peso sin volver pesada toda la página.

## Estructura de la página (single page)

Una sola página, scroll vertical, mobile-first (la mayoría del tráfico de post obra/countrys llega
por Instagram → celular).

1. **Hero** — título, bajada, CTA primario a WhatsApp, CTA secundario "Ver servicios", badges de
   confianza (Factura B, presupuesto sin cargo), prueba social (+24.600 en Instagram).
2. **"Para estudios de arquitectura y constructoras"** — sección de posicionamiento dirigida
   específicamente a ese público objetivo: por qué la limpieza final es parte de la entrega del
   proyecto, puntos de confianza (presupuesto por m²/proyecto, coordinación directa sin
   intermediarios, facturación formal, disponibilidad para obras simultáneas).
3. **Servicios** — 4 tarjetas: limpieza final de obra, limpieza profunda de hogar, oficinas y
   empresas, mudanzas.
4. **Galería / Portfolio** *(sección nueva, no existía en la versión anterior)* — grilla de fotos
   que muestran el tipo de resultado/ambiente (ver "Estrategia de fotos" abajo). Es la pieza que más
   pesa para que un estudio de arquitectura confíe visualmente antes de escribir.
5. **Proceso** — 4 pasos: contacto → relevamiento y presupuesto (sin cargo) → ejecución → entrega.
6. **Contacto / Cotización rápida** — formulario que arma un mensaje de WhatsApp pre-completado
   (nombre, tipo de espacio, m² aproximados, fecha estimada) + datos de contacto directo (WhatsApp,
   email, zona) + links a redes.
7. **Footer** — datos legales/contacto mínimos, redes.

El contenido/copy de cada sección reutiliza y pule el de la versión anterior (la estrategia de
mensaje ya estaba bien resuelta); el trabajo de esta landing es visual y de estructura, no de
redefinir qué dice cada sección.

## Sistema visual

**Paleta** (valores de referencia, ajustables ±5% en implementación por contraste/accesibilidad):

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F7F3EC` | Fondo base (blanco cálido tipo papel) |
| `--text` | `#211D18` | Texto principal sobre fondo claro |
| `--accent` | `#A8582E` | CTA, links, acentos (terracota apagado) |
| `--accent-hover` | `#8C4623` | Estado hover/active del acento |
| `--contrast-bg` | `#16140F` | Fondo de hero y sección de contacto/cierre |
| `--contrast-text` | `#F7F3EC` | Texto sobre `--contrast-bg` |
| `--line` | `#DDD4C4` | Bordes finos, separadores |

Nada de azul corporativo ni colores flúo. Un solo acento de color en toda la página.

**Tipografía:**
- Títulos: **Fraunces** (Google Fonts, gratis), peso 500–600. Da el tono editorial/premium.
- Cuerpo y UI: **Inter** (Google Fonts, gratis), peso 400/500/600. Legibilidad y modernidad.

**Principios de layout:**
- Padding vertical generoso entre secciones (≈120px desktop / ≈64px mobile).
- Contenedor máximo ≈1140px, con aire lateral.
- Bordes finos (`--line`) en vez de sombras pesadas o gradientes decorativos.
- Sin iconografía de stock genérica; la foto real es el elemento decorativo principal.

## Estrategia de fotos

El cliente todavía no tiene fotos profesionales propias — las va a conseguir, pero la landing se
necesita antes (para poder cobrar el presupuesto). Se decidió **no generar imágenes por IA
presentadas como trabajos propios**: mostrarlas como si fueran obras reales de Maestranza Hogar
sería engañoso para un cliente evaluando trabajo previo.

En su lugar:
- Se usan **fotos de stock reales, libres de derechos** (Unsplash/Pexels), de interiores prolijos y
  espacios post-construcción que encajen con la paleta y el estilo restrained definidos arriba.
- Cada foto de stock lleva una etiqueta discreta **"Foto ilustrativa"** (mismo mecanismo que ya
  tenía la versión anterior), visible pero no invasiva — evita afirmar autoría de un trabajo que no
  es del cliente.
- La estructura HTML/CSS de la Galería y de las fotos de servicios está armada para que reemplazar
  cada `<img>` por una foto real del cliente sea un cambio de una sola línea, sin tocar CSS.
- La selección puntual de fotos de stock (URLs, licencias) se resuelve durante la implementación,
  no en este documento.

## Estructura técnica

- **Stack:** HTML + CSS + JS plano, sin framework ni build step. Fuentes vía Google Fonts (CDN,
  gratis).
- **Archivos:** `index.html`, `styles.css`, `script.js`, carpeta `img/` para las fotos.
- **Hosting:** Vercel (plan gratis), conectado a un repositorio de GitHub para tener historial de
  cambios y que el cliente pueda pedirle a cualquiera un ajuste futuro sin depender de un stack
  particular. Dominio propio queda como opción a cargo del cliente si lo quiere más adelante.
- **Formulario de cotización:** JS arma un mensaje de texto con los datos cargados (nombre, tipo de
  espacio, m², fecha) y abre `https://wa.me/5491128013474?text=<mensaje-codificado>` (mismo número
  que ya usa la marca, +54 9 11 2801-3474) en una pestaña nueva. Sin backend, sin almacenamiento de
  datos del formulario en ningún servidor.
- **Validación:** solo client-side, mínima (campos requeridos antes de habilitar el botón de envío).
  No se agrega librería de validación.
- **Responsive:** mobile-first; breakpoints para mobile / tablet / desktop. Testeo manual en los
  tres tamaños antes de entregar.
- **Testing:** no aplica testing automatizado (sitio estático de marketing, sin lógica de negocio
  compleja). QA manual: revisión visual en los tres breakpoints, verificación de que el link de
  WhatsApp abre con el mensaje correcto, chequeo de performance básico (imágenes optimizadas/livianas
  dado que el hosting y el público son mobile-first).

## Fuera de alcance

- Sitio multi-página, blog o CMS.
- Backend, base de datos, o almacenamiento de leads fuera de WhatsApp.
- Multi-idioma.
- Analítica avanzada (se puede sumar Google Analytics/Meta Pixel más adelante si el cliente lo pide,
  no es parte de este alcance).
- Fotos reales del cliente (se incorporan en una iteración posterior, cuando el cliente las provea).
