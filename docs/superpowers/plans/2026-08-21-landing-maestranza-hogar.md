# Landing Maestranza Hogar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, mobile-first marketing landing for Maestranza Hogar (cleaning services) that reads as premium/restrained enough to attract architecture studios and construction companies as clients, while still speaking to the home/office/moving-cleaning audience.

**Architecture:** Static site, no framework, no build step, no backend. One `index.html` with 7 sections, one `styles.css` with CSS custom-property design tokens, one `script.js` with a pure, unit-tested WhatsApp-message-builder function plus DOM wiring. Deployed to Vercel's free tier from a GitHub repo.

**Tech Stack:** HTML5, CSS3 (custom properties, Grid/Flexbox), vanilla JS (ES2017+, no modules/bundler), Google Fonts (Fraunces + Inter), Unsplash stock photography (free Unsplash-License images only), Node.js (`assert` only, no test framework) for the one unit test.

**Spec:** [docs/superpowers/specs/2026-08-21-landing-maestranza-hogar-design.md](../specs/2026-08-21-landing-maestranza-hogar-design.md)

## Global Constraints

- No framework, no bundler, no build step — plain HTML/CSS/JS only.
- No backend, no database, no server-side storage of form data.
- Hosting: Vercel free tier, deployed from a GitHub repo.
- Fonts: Google Fonts only (Fraunces for headings, Inter for body/UI) — free CDN, no self-hosting needed.
- Photos: only free, Unsplash-License images (`images.unsplash.com/photo-...`) — never `plus.unsplash.com/premium_photo-...` (paid Unsplash+). Every stock photo carries a visible "Foto ilustrativa" label.
- Single accent color (`--accent`, muted terracotta). No corporate blue, no neon/flúo.
- Mobile-first; manually verified at mobile / tablet / desktop breakpoints.
- WhatsApp number: `5491128013474` (+54 9 11 2801-3474).
- No automated visual/UI test tooling exists in this project — verification for markup/CSS tasks is manual (open in the browser preview and check the listed items). The one piece of real logic (the WhatsApp message builder) gets a real unit test.

---

## File Structure

```
index.html      — all 7 sections, single page
styles.css      — design tokens + all styles
script.js       — buildWhatsAppUrl() (pure, tested) + DOM wiring
img/            — (no local files; all images are hotlinked Unsplash CDN URLs with explicit size params)
tests/
  build-whatsapp-url.test.js
README.md       — deploy instructions + how to swap in real client photos later
```

## Design Tokens (defined in Task 1, used by every later task)

```css
:root {
  --bg: #F7F3EC;
  --text: #211D18;
  --accent: #A8582E;
  --accent-hover: #8C4623;
  --contrast-bg: #16140F;
  --contrast-text: #F7F3EC;
  --line: #DDD4C4;
  --font-heading: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --container-width: 1140px;
  --space-section: 120px;
  --space-section-mobile: 64px;
}
```

## Approved Stock Photos (all verified free, Unsplash License — do not substitute with `plus.unsplash.com` URLs)

| Use | Base URL |
|---|---|
| Hero (exterior) | `https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6` |
| "Para estudios de arquitectura" (bright interior, large window) | `https://images.unsplash.com/photo-1688901629411-a9228f144396` |
| Servicio: Limpieza final de obra (empty room, white walls, wood floor) | `https://images.unsplash.com/photo-1646592474103-cfd22d1d9e34` |
| Servicio: Limpieza profunda de hogar (minimalist living room, white furniture) | `https://images.unsplash.com/photo-1768609239321-1cfe14893e80` |
| Servicio: Oficinas y empresas (bright home office) | `https://images.unsplash.com/photo-1741880893442-66f56ad8f3a4` |
| Servicio: Mudanzas (room with boxes and window) | `https://images.unsplash.com/photo-1663625318264-695d2d04f11a` |
| Galería 1 (minimalist house, sandy exterior) | `https://images.unsplash.com/photo-1779089042981-038ee31d348e` |
| Galería 2 (concrete wall texture) | `https://images.unsplash.com/photo-1750056661722-8381f9012079` |
| Galería 3 (stacked cardboard boxes) | `https://images.unsplash.com/photo-1757837593538-b4a8654132f1` |
| Galería 4 (kitchen, white cabinets) | `https://images.unsplash.com/photo-1662986787347-52ebbf223519` |
| Galería 5 (living room with fireplace) | `https://images.unsplash.com/photo-1759238136854-a43787126db7` |

Each `<img>` appends Unsplash's own resize params to the base URL (`?w=...&q=75&auto=format&fit=crop`) — exact widths are given per task below. This keeps the page lightweight without downloading/self-hosting anything.

---

### Task 1: Base HTML skeleton, design tokens, fonts

**Files:**
- Create: `index.html`
- Create: `styles.css`

**Interfaces:**
- Produces: CSS custom properties listed in "Design Tokens" above, available globally. Section placeholder ids: `#hero`, `#arquitectos`, `#servicios`, `#galeria`, `#proceso`, `#contacto`. Base classes: `.mh-container` (max-width wrapper), `.mh-section` (vertical padding via `--space-section` / mobile via media query).

- [ ] **Step 1: Write `index.html` skeleton**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Limpieza Final de Obra en Buenos Aires | Maestranza Hogar</title>
  <meta name="description" content="Limpieza final de obra, hogares, oficinas y mudanzas en Buenos Aires. Personal capacitado, Factura B, presupuesto sin cargo.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <section id="hero" class="mh-section"><!-- Task 2 --></section>
  <section id="arquitectos" class="mh-section"><!-- Task 3 --></section>
  <section id="servicios" class="mh-section"><!-- Task 4 --></section>
  <section id="galeria" class="mh-section"><!-- Task 5 --></section>
  <section id="proceso" class="mh-section"><!-- Task 6 --></section>
  <section id="contacto" class="mh-section"><!-- Task 8 --></section>
  <footer class="mh-footer"><!-- Task 9 --></footer>
  <script src="script.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Write `styles.css` reset + tokens + base typography**

```css
:root {
  --bg: #F7F3EC;
  --text: #211D18;
  --accent: #A8582E;
  --accent-hover: #8C4623;
  --contrast-bg: #16140F;
  --contrast-text: #F7F3EC;
  --line: #DDD4C4;
  --font-heading: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --container-width: 1140px;
  --space-section: 120px;
  --space-section-mobile: 64px;
}

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: 600;
  line-height: 1.15;
  margin: 0 0 0.5em;
}

p { margin: 0 0 1em; }

a { color: var(--accent); }

.mh-container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 24px;
}

.mh-section {
  padding: var(--space-section-mobile) 0;
}

@media (min-width: 768px) {
  .mh-section { padding: var(--space-section) 0; }
}

.mh-btn {
  display: inline-block;
  padding: 14px 28px;
  background: var(--accent);
  color: var(--contrast-text);
  text-decoration: none;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.02em;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
}

.mh-btn:hover { background: var(--accent-hover); }

.mh-btn--outline {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--line);
}

.mh-btn--outline:hover { background: var(--line); }

.mh-label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
}

.mh-photo-tag {
  display: inline-block;
  font-size: 11px;
  color: var(--contrast-text);
  background: rgba(0,0,0,0.55);
  padding: 4px 8px;
  position: absolute;
  bottom: 8px;
  left: 8px;
}
```

- [ ] **Step 3: Manual verification**

Open `index.html` in the browser preview. Confirm:
- Page background is warm off-white (`#F7F3EC`), not stark white.
- Any heading text you add temporarily renders in a serif (Fraunces) — devtools computed `font-family` should list `Fraunces`.
- Body text renders in Inter.
- No console errors for the font `<link>` tags.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add base HTML skeleton and design tokens"
```

---

### Task 2: Hero section

**Files:**
- Modify: `index.html` (`#hero` section)
- Modify: `styles.css` (append hero styles)

**Interfaces:**
- Consumes: `.mh-container`, `.mh-btn`, `.mh-btn--outline`, `.mh-label`, `.mh-photo-tag` from Task 1.
- Produces: class `.mh-hero` (full-bleed dark section), `.mh-hero__content`. `id="hero-whatsapp-cta"` on the primary WhatsApp link — Task 8's script does not touch this link (it's a static `wa.me` link with a fixed message, not the dynamic form), but keep the id stable in case a later task needs to target it.

- [ ] **Step 1: Write hero markup inside `#hero`**

```html
<section id="hero" class="mh-section mh-hero">
  <img
    class="mh-hero__bg"
    src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1920&q=75&auto=format&fit=crop"
    alt=""
    aria-hidden="true">
  <span class="mh-photo-tag">Foto ilustrativa</span>
  <div class="mh-container mh-hero__content">
    <p class="mh-label" style="color: var(--contrast-text);">Limpieza final de obra</p>
    <h1>Limpieza final de obra que no atrasa la entrega.</h1>
    <p class="mh-hero__subtitle">
      Limpieza de obra, hogares, oficinas y mudanzas en Buenos Aires. Personal capacitado,
      Factura B, presupuesto sin cargo.
    </p>
    <div class="mh-hero__ctas">
      <a id="hero-whatsapp-cta" class="mh-btn" href="https://wa.me/5491128013474?text=Hola%2C%20quiero%20pedir%20un%20presupuesto." target="_blank" rel="noopener">Pedir presupuesto</a>
      <a class="mh-btn mh-btn--outline" href="#servicios" style="border-color: var(--contrast-text); color: var(--contrast-text);">Ver servicios</a>
    </div>
    <div class="mh-hero__badges">
      <div><strong>Factura B</strong><span>facturación formal para el estudio o el comitente</span></div>
      <div><strong>Sin cargo</strong><span>el presupuesto se cotiza por WhatsApp, sin visita obligatoria</span></div>
      <div><strong>+24.600</strong><span>personas siguen el trabajo diario en Instagram</span></div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append hero styles to `styles.css`**

```css
.mh-hero {
  position: relative;
  background: var(--contrast-bg);
  color: var(--contrast-text);
  overflow: hidden;
  min-height: 640px;
  display: flex;
  align-items: flex-end;
  padding-top: 64px;
}

.mh-hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.45;
}

.mh-hero__content {
  position: relative;
  z-index: 1;
  padding-bottom: 64px;
}

.mh-hero h1 {
  color: var(--contrast-text);
  font-size: 32px;
  max-width: 640px;
}

.mh-hero__subtitle {
  max-width: 520px;
  color: var(--contrast-text);
  opacity: 0.85;
}

.mh-hero__ctas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin: 24px 0 40px;
}

.mh-hero__badges {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  border-top: 1px solid rgba(247,243,236,0.2);
  padding-top: 24px;
}

.mh-hero__badges strong {
  display: block;
  font-family: var(--font-heading);
  font-size: 18px;
  margin-bottom: 4px;
}

.mh-hero__badges span {
  font-size: 13px;
  opacity: 0.75;
}

@media (min-width: 768px) {
  .mh-hero h1 { font-size: 48px; }
  .mh-hero__badges { grid-template-columns: repeat(3, 1fr); }
}
```

- [ ] **Step 3: Manual verification**

Open in the browser preview at mobile (375px), tablet (768px), and desktop (1280px) widths. Confirm:
- Hero image fills the section with a dark overlay tone (text stays legible over it).
- "Foto ilustrativa" tag is visible in the bottom-left corner of the hero image.
- Both CTA buttons are visible and the WhatsApp one opens `wa.me` in a new tab when clicked.
- The 3 trust badges stack in one column on mobile and sit in a 3-column row from tablet width up.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add hero section"
```

---

### Task 3: "Para estudios de arquitectura y constructoras" section

**Files:**
- Modify: `index.html` (`#arquitectos` section)
- Modify: `styles.css` (append section styles)

**Interfaces:**
- Consumes: `.mh-container`, `.mh-label`, `.mh-photo-tag`, `.mh-btn` from Task 1.
- Produces: `.mh-split` (reusable two-column text+image layout — Task 4 and Task 6 do NOT reuse this class; it is specific to this section's asymmetric layout).

- [ ] **Step 1: Write markup inside `#arquitectos`**

```html
<section id="arquitectos" class="mh-section">
  <div class="mh-container mh-split">
    <div class="mh-split__text">
      <p class="mh-label">Estudios de arquitectura y constructoras</p>
      <h2>El último paso de la obra también es parte del proyecto.</h2>
      <p>
        La limpieza final es lo primero que ve el comitente al recibir el espacio. Nos ocupamos
        de ese paso para que el estudio cierre la entrega sin imprevistos.
      </p>
      <ul class="mh-split__points">
        <li><strong>Presupuesto por m² o por proyecto</strong> — sin sorpresas, adaptado al alcance real de la obra.</li>
        <li><strong>Coordinación directa</strong> — con el responsable de obra o el estudio, sin intermediarios.</li>
        <li><strong>Facturación formal</strong> — Factura B a nombre del estudio o del comitente.</li>
        <li><strong>Disponibilidad para varias obras</strong> — agenda para entregas simultáneas o en cadena.</li>
      </ul>
      <a class="mh-btn" href="https://wa.me/5491128013474?text=Hola%2C%20somos%20un%20estudio%20de%20arquitectura%2Fconstructora%20y%20queremos%20pedir%20un%20presupuesto." target="_blank" rel="noopener">Pedir presupuesto</a>
    </div>
    <div class="mh-split__media">
      <img
        src="https://images.unsplash.com/photo-1688901629411-a9228f144396?w=1200&q=75&auto=format&fit=crop"
        alt="Espacio luminoso recién entregado"
        loading="lazy">
      <span class="mh-photo-tag">Foto ilustrativa</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append split-layout styles to `styles.css`**

```css
.mh-split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: center;
}

.mh-split__points {
  list-style: none;
  padding: 0;
  margin: 24px 0;
}

.mh-split__points li {
  padding: 10px 0;
  border-top: 1px solid var(--line);
  font-size: 14px;
}

.mh-split__media {
  position: relative;
}

.mh-split__media img {
  width: 100%;
  height: auto;
  display: block;
}

@media (min-width: 900px) {
  .mh-split {
    grid-template-columns: 1fr 1fr;
    gap: 64px;
  }
}
```

- [ ] **Step 3: Manual verification**

Check mobile/tablet/desktop widths. Confirm the text and image stack vertically on mobile and sit side-by-side from 900px up, the 4 trust points render as a simple list with thin top borders (no bullet dots), and the photo shows the "Foto ilustrativa" tag.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add architecture/construction studios section"
```

---

### Task 4: Servicios section (4 cards)

**Files:**
- Modify: `index.html` (`#servicios` section)
- Modify: `styles.css` (append services styles)

**Interfaces:**
- Consumes: `.mh-container`, `.mh-label`, `.mh-photo-tag` from Task 1.
- Produces: `.mh-services-grid`, `.mh-service-card`, `.mh-service-card__img`. No later task depends on these beyond visual consistency.

- [ ] **Step 1: Write markup inside `#servicios`**

```html
<section id="servicios" class="mh-section">
  <div class="mh-container">
    <p class="mh-label">Servicios</p>
    <h2>Cuatro servicios, un mismo estándar.</h2>
    <div class="mh-services-grid">
      <article class="mh-service-card">
        <div class="mh-service-card__img">
          <img src="https://images.unsplash.com/photo-1646592474103-cfd22d1d9e34?w=800&q=75&auto=format&fit=crop" alt="Limpieza final de obra" loading="lazy">
          <span class="mh-photo-tag">Foto ilustrativa</span>
        </div>
        <h3>Limpieza final de obra</h3>
        <p>Post construcción: eliminamos polvo, restos de materiales y suciedad para dejar el espacio listo para habitar.</p>
      </article>
      <article class="mh-service-card">
        <div class="mh-service-card__img">
          <img src="https://images.unsplash.com/photo-1768609239321-1cfe14893e80?w=800&q=75&auto=format&fit=crop" alt="Limpieza profunda de hogar" loading="lazy">
          <span class="mh-photo-tag">Foto ilustrativa</span>
        </div>
        <h3>Limpieza profunda de hogar</h3>
        <p>Desinfección y pulido de cada rincón de tu vivienda, de punta a punta.</p>
      </article>
      <article class="mh-service-card">
        <div class="mh-service-card__img">
          <img src="https://images.unsplash.com/photo-1741880893442-66f56ad8f3a4?w=800&q=75&auto=format&fit=crop" alt="Limpieza de oficinas y empresas" loading="lazy">
          <span class="mh-photo-tag">Foto ilustrativa</span>
        </div>
        <h3>Limpieza de oficinas y empresas</h3>
        <p>Entornos impecables que proyectan una imagen profesional ante clientes y equipo.</p>
      </article>
      <article class="mh-service-card">
        <div class="mh-service-card__img">
          <img src="https://images.unsplash.com/photo-1663625318264-695d2d04f11a?w=800&q=75&auto=format&fit=crop" alt="Limpieza de mudanzas" loading="lazy">
          <span class="mh-photo-tag">Foto ilustrativa</span>
        </div>
        <h3>Limpieza de mudanzas</h3>
        <p>Antes o después de mudarte, para entregar o estrenar el espacio en condiciones.</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append services styles to `styles.css`**

```css
.mh-services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-top: 32px;
}

.mh-service-card__img {
  position: relative;
  margin-bottom: 16px;
}

.mh-service-card__img img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.mh-service-card h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.mh-service-card p {
  font-size: 14px;
  opacity: 0.85;
}

@media (min-width: 700px) {
  .mh-services-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 3: Manual verification**

Confirm 1 column on mobile, 2x2 grid from 700px up, each card shows its photo with the "Foto ilustrativa" tag, title, and description.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add servicios section"
```

---

### Task 5: Galería section

**Files:**
- Modify: `index.html` (`#galeria` section)
- Modify: `styles.css` (append gallery styles)

**Interfaces:**
- Consumes: `.mh-container`, `.mh-label`, `.mh-photo-tag` from Task 1.
- Produces: `.mh-gallery` (bento grid), `.mh-gallery__item`, modifier `.mh-gallery__item--wide` for the featured first tile.

- [ ] **Step 1: Write markup inside `#galeria`**

```html
<section id="galeria" class="mh-section">
  <div class="mh-container">
    <p class="mh-label">Portfolio</p>
    <h2>El tipo de resultado que dejamos.</h2>
    <p>
      Mientras sumamos fotos propias de cada obra, estas imágenes ilustran el estándar de
      limpieza y prolijidad que buscamos en cada entrega.
    </p>
    <div class="mh-gallery">
      <div class="mh-gallery__item mh-gallery__item--wide">
        <img src="https://images.unsplash.com/photo-1779089042981-038ee31d348e?w=1200&q=75&auto=format&fit=crop" alt="Exterior de vivienda en country" loading="lazy">
        <span class="mh-photo-tag">Foto ilustrativa</span>
      </div>
      <div class="mh-gallery__item">
        <img src="https://images.unsplash.com/photo-1750056661722-8381f9012079?w=1000&q=75&auto=format&fit=crop" alt="Textura de pared de obra" loading="lazy">
        <span class="mh-photo-tag">Foto ilustrativa</span>
      </div>
      <div class="mh-gallery__item">
        <img src="https://images.unsplash.com/photo-1757837593538-b4a8654132f1?w=1000&q=75&auto=format&fit=crop" alt="Espacio en mudanza" loading="lazy">
        <span class="mh-photo-tag">Foto ilustrativa</span>
      </div>
      <div class="mh-gallery__item">
        <img src="https://images.unsplash.com/photo-1662986787347-52ebbf223519?w=1000&q=75&auto=format&fit=crop" alt="Cocina luego de limpieza" loading="lazy">
        <span class="mh-photo-tag">Foto ilustrativa</span>
      </div>
      <div class="mh-gallery__item">
        <img src="https://images.unsplash.com/photo-1759238136854-a43787126db7?w=1000&q=75&auto=format&fit=crop" alt="Living luego de limpieza profunda" loading="lazy">
        <span class="mh-photo-tag">Foto ilustrativa</span>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append gallery styles to `styles.css`**

```css
.mh-gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 32px;
}

.mh-gallery__item {
  position: relative;
}

.mh-gallery__item img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  display: block;
}

.mh-gallery__item--wide img { height: 320px; }

@media (min-width: 700px) {
  .mh-gallery {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 180px;
  }
  .mh-gallery__item--wide {
    grid-column: span 2;
    grid-row: span 2;
  }
  .mh-gallery__item--wide img,
  .mh-gallery__item img { height: 100%; }
}
```

- [ ] **Step 3: Manual verification**

Confirm the gallery stacks as single-column full-width tiles on mobile, and becomes a 4-column bento grid from 700px up with the first tile spanning 2x2. Every tile shows its "Foto ilustrativa" tag.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add galeria section"
```

---

### Task 6: Proceso section (4 steps)

**Files:**
- Modify: `index.html` (`#proceso` section)
- Modify: `styles.css` (append process styles)

**Interfaces:**
- Consumes: `.mh-container`, `.mh-label` from Task 1.
- Produces: `.mh-process`, `.mh-process__step`, `.mh-process__number`.

- [ ] **Step 1: Write markup inside `#proceso`**

```html
<section id="proceso" class="mh-section">
  <div class="mh-container">
    <p class="mh-label">Cómo trabajamos</p>
    <h2>Del primer mensaje a la entrega.</h2>
    <div class="mh-process">
      <div class="mh-process__step">
        <span class="mh-process__number">01</span>
        <h3>Contacto</h3>
        <p>Nos escribís por WhatsApp y contamos los detalles del espacio o la obra.</p>
      </div>
      <div class="mh-process__step">
        <span class="mh-process__number">02</span>
        <h3>Relevamiento y presupuesto</h3>
        <p>Cotizamos según metros y estado del espacio, sin cargo.</p>
      </div>
      <div class="mh-process__step">
        <span class="mh-process__number">03</span>
        <h3>Ejecución</h3>
        <p>El equipo trabaja con protocolo y productos profesionales.</p>
      </div>
      <div class="mh-process__step">
        <span class="mh-process__number">04</span>
        <h3>Entrega</h3>
        <p>Control de calidad final y entrega en el plazo acordado.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append process styles to `styles.css`**

```css
.mh-process {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-top: 32px;
}

.mh-process__number {
  font-family: var(--font-heading);
  font-size: 28px;
  color: var(--accent);
  display: block;
  margin-bottom: 8px;
}

.mh-process__step h3 { font-size: 16px; }
.mh-process__step p { font-size: 14px; opacity: 0.85; }

@media (min-width: 800px) {
  .mh-process { grid-template-columns: repeat(4, 1fr); }
}
```

- [ ] **Step 3: Manual verification**

Confirm 1 column stacked on mobile, 4-column row from 800px up, each step shows its number in the accent terracota color.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add proceso section"
```

---

### Task 7: WhatsApp message builder (pure function, unit-tested)

**Files:**
- Create: `script.js`
- Create: `tests/build-whatsapp-url.test.js`

**Interfaces:**
- Produces: `buildWhatsAppUrl(fields)` where `fields = { nombre: string, tipoEspacio: string, m2: string, fecha: string, mensaje: string }` (any field may be an empty string). Returns a full `https://wa.me/5491128013474?text=...` URL string with the message URI-encoded. Exported via `module.exports` when `typeof module !== 'undefined'` (Node, for the test) and left as a plain global function otherwise (browser, for Task 8's DOM wiring — no bundler means no `import`/`export` in the browser).
- Consumes: nothing from earlier tasks.

- [ ] **Step 1: Write the failing test**

```javascript
// tests/build-whatsapp-url.test.js
const assert = require('assert');
const { buildWhatsAppUrl } = require('../script.js');

function testAllFieldsPresent() {
  const url = buildWhatsAppUrl({
    nombre: 'Juan Pérez',
    tipoEspacio: 'Obra nueva o fin de obra',
    m2: '120',
    fecha: '2026-09-01',
    mensaje: 'Necesito el presupuesto para el viernes.'
  });
  assert.ok(url.startsWith('https://wa.me/5491128013474?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.ok(decoded.includes('Juan Pérez'));
  assert.ok(decoded.includes('Obra nueva o fin de obra'));
  assert.ok(decoded.includes('120'));
  assert.ok(decoded.includes('2026-09-01'));
  assert.ok(decoded.includes('Necesito el presupuesto para el viernes.'));
}

function testEmptyOptionalFieldsOmitted() {
  const url = buildWhatsAppUrl({
    nombre: 'Juan',
    tipoEspacio: '',
    m2: '',
    fecha: '',
    mensaje: ''
  });
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.ok(decoded.includes('Juan'));
  assert.ok(!decoded.includes('m²:'), 'should not print an empty m² line');
  assert.ok(!decoded.includes('Fecha estimada:'), 'should not print an empty fecha line');
}

testAllFieldsPresent();
testEmptyOptionalFieldsOmitted();
console.log('All tests passed.');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/build-whatsapp-url.test.js`
Expected: FAIL — `Cannot find module '../script.js'` (file doesn't exist yet).

- [ ] **Step 3: Write minimal implementation**

```javascript
// script.js
const WHATSAPP_NUMBER = '5491128013474';

function buildWhatsAppUrl(fields) {
  const lines = [];
  lines.push('Hola, quiero pedir un presupuesto.');
  if (fields.nombre) lines.push(`Nombre: ${fields.nombre}`);
  if (fields.tipoEspacio) lines.push(`Tipo de espacio: ${fields.tipoEspacio}`);
  if (fields.m2) lines.push(`m²: ${fields.m2}`);
  if (fields.fecha) lines.push(`Fecha estimada: ${fields.fecha}`);
  if (fields.mensaje) lines.push(fields.mensaje);
  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

if (typeof module !== 'undefined') {
  module.exports = { buildWhatsAppUrl };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/build-whatsapp-url.test.js`
Expected: PASS — prints `All tests passed.`

- [ ] **Step 5: Commit**

```bash
git add script.js tests/build-whatsapp-url.test.js
git commit -m "Add buildWhatsAppUrl with unit tests"
```

---

### Task 8: Contacto / Cotización rápida section + form wiring

**Files:**
- Modify: `index.html` (`#contacto` section)
- Modify: `styles.css` (append contact/form styles)
- Modify: `script.js` (append DOM wiring, after the `buildWhatsAppUrl` function and its `module.exports` guard)

**Interfaces:**
- Consumes: `buildWhatsAppUrl(fields)` from Task 7. Consumes `.mh-container`, `.mh-label`, `.mh-btn` from Task 1.
- Produces: form id `mh-quote-form` with named fields `nombre`, `tipoEspacio`, `m2`, `fecha`, `mensaje` — no later task depends on this.

- [ ] **Step 1: Write markup inside `#contacto`**

```html
<section id="contacto" class="mh-section" style="background: var(--contrast-bg); color: var(--contrast-text);">
  <div class="mh-container mh-split">
    <div>
      <p class="mh-label">Contacto</p>
      <h2 style="color: var(--contrast-text);">Pedí tu presupuesto</h2>
      <p style="opacity: 0.85;">Sin cargo, por WhatsApp o email. Contanos el espacio, la obra o la fecha de entrega.</p>
      <dl class="mh-contact-info">
        <div><dt>WhatsApp</dt><dd><a href="https://wa.me/5491128013474" target="_blank" rel="noopener" style="color: var(--contrast-text);">+54 9 11 2801-3474</a></dd></div>
        <div><dt>Email</dt><dd><a href="mailto:maestranzahogar.slp@gmail.com" style="color: var(--contrast-text);">maestranzahogar.slp@gmail.com</a></dd></div>
        <div><dt>Zona</dt><dd>Buenos Aires y alrededores</dd></div>
        <div><dt>Redes</dt><dd><a href="https://www.instagram.com/maestranzahogar" target="_blank" rel="noopener" style="color: var(--contrast-text);">Instagram</a></dd></div>
      </dl>
    </div>
    <form id="mh-quote-form" class="mh-quote-form" novalidate>
      <p class="mh-label" style="color: var(--contrast-text); opacity: 0.7;">Cotización rápida</p>
      <p style="opacity: 0.7; font-size: 13px; margin-bottom: 16px;">Completá los datos y se arma el mensaje de WhatsApp automáticamente.</p>
      <label>Nombre
        <input type="text" name="nombre" required>
      </label>
      <label>Tipo de espacio
        <select name="tipoEspacio">
          <option value="Obra nueva o fin de obra">Obra nueva o fin de obra</option>
          <option value="Hogar">Hogar</option>
          <option value="Oficina o empresa">Oficina o empresa</option>
          <option value="Mudanza">Mudanza</option>
        </select>
      </label>
      <label>m² aproximados
        <input type="text" name="m2">
      </label>
      <label>Fecha estimada
        <input type="date" name="fecha">
      </label>
      <label>Mensaje
        <textarea name="mensaje" rows="3"></textarea>
      </label>
      <button type="submit" class="mh-btn">Enviar por WhatsApp</button>
      <p style="opacity: 0.6; font-size: 12px; margin-top: 8px;">Se abre WhatsApp con el mensaje ya redactado. No se envía nada automáticamente.</p>
    </form>
  </div>
</section>
```

- [ ] **Step 2: Append contact/form styles to `styles.css`**

```css
.mh-contact-info {
  margin: 24px 0 0;
}

.mh-contact-info div {
  padding: 12px 0;
  border-top: 1px solid rgba(247,243,236,0.15);
}

.mh-contact-info dt {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.6;
}

.mh-contact-info dd {
  margin: 4px 0 0;
  font-size: 16px;
}

.mh-quote-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(247,243,236,0.04);
  padding: 24px;
  border: 1px solid rgba(247,243,236,0.15);
}

.mh-quote-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--contrast-text);
}

.mh-quote-form input,
.mh-quote-form select,
.mh-quote-form textarea {
  font-family: var(--font-body);
  font-size: 14px;
  padding: 10px;
  border: 1px solid rgba(247,243,236,0.25);
  background: transparent;
  color: var(--contrast-text);
}

.mh-quote-form button { margin-top: 8px; }
```

- [ ] **Step 3: Append DOM wiring to `script.js`**

```javascript
// --- appended to script.js, after buildWhatsAppUrl and its module.exports guard ---
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('mh-quote-form');
    if (!form) return;
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const url = buildWhatsAppUrl({
        nombre: data.get('nombre') || '',
        tipoEspacio: data.get('tipoEspacio') || '',
        m2: data.get('m2') || '',
        fecha: data.get('fecha') || '',
        mensaje: data.get('mensaje') || ''
      });
      window.open(url, '_blank', 'noopener');
    });
  });
}
```

- [ ] **Step 4: Run the existing unit test to confirm nothing broke**

Run: `node tests/build-whatsapp-url.test.js`
Expected: PASS — `buildWhatsAppUrl` itself wasn't changed, only code was appended after it, so this should still pass unchanged.

- [ ] **Step 5: Manual verification**

Open in the browser preview, scroll to the contact section, fill in the form (nombre, tipo de espacio, m², fecha, mensaje) and click "Enviar por WhatsApp". Confirm a new tab opens to a `wa.me/5491128013474` URL whose pre-filled text includes everything you typed. Also click the static WhatsApp/email links in the contact info block and confirm they open correctly.

- [ ] **Step 6: Commit**

```bash
git add index.html styles.css script.js
git commit -m "Add contacto section and wire quote form to WhatsApp"
```

---

### Task 9: Footer

**Files:**
- Modify: `index.html` (`<footer>`)
- Modify: `styles.css` (append footer styles)

**Interfaces:**
- Consumes: `.mh-container` from Task 1.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Write footer markup**

```html
<footer class="mh-footer">
  <div class="mh-container mh-footer__inner">
    <span>Maestranza Hogar — Buenos Aires y alrededores</span>
    <div class="mh-footer__links">
      <a href="https://www.instagram.com/maestranzahogar" target="_blank" rel="noopener">Instagram</a>
      <a href="mailto:maestranzahogar.slp@gmail.com">Email</a>
      <a href="https://wa.me/5491128013474" target="_blank" rel="noopener">WhatsApp</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Append footer styles to `styles.css`**

```css
.mh-footer {
  background: var(--contrast-bg);
  color: var(--contrast-text);
  padding: 24px 0;
  border-top: 1px solid rgba(247,243,236,0.1);
}

.mh-footer__inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 13px;
  opacity: 0.75;
}

.mh-footer__links {
  display: flex;
  gap: 16px;
}

.mh-footer__links a {
  color: var(--contrast-text);
}

@media (min-width: 600px) {
  .mh-footer__inner {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
```

- [ ] **Step 3: Manual verification**

Confirm the footer stacks on mobile and sits in a single row (text left, links right) from 600px up.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "Add footer"
```

---

### Task 10: Full-page QA pass, README, and deploy

**Files:**
- Create: `README.md`
- No code changes expected unless QA finds a bug — if it does, fix it in the relevant file before committing.

**Interfaces:**
- Consumes: the complete page from Tasks 1–9.

- [ ] **Step 1: Full responsive QA pass**

Open `index.html` in the browser preview and check at 375px (mobile), 768px (tablet), and 1280px (desktop):
- Every section is visible, no horizontal scrollbar at any width.
- All 11 photos load and each shows its "Foto ilustrativa" tag.
- Heading font is Fraunces throughout, body font is Inter throughout.
- Only one accent color is used for CTAs/links/accents (the terracota `--accent`); no stray blue or bright colors.
- The quote form submits and opens the correct pre-filled WhatsApp link (re-verify after any fixes from this pass).
- No console errors.

Fix anything that fails, then re-run this checklist before moving on.

- [ ] **Step 2: Run the unit test one final time**

Run: `node tests/build-whatsapp-url.test.js`
Expected: PASS.

- [ ] **Step 3: Write `README.md`**

```markdown
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
```

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "Add README with deploy and photo-swap instructions"
```

- [ ] **Step 5: Push and deploy**

```bash
git remote add origin <URL del repo de GitHub>
git push -u origin master
```

Then connect the repo in Vercel as described in `README.md`.

---

## Self-Review Notes

- **Spec coverage:** All 7 sections from the spec (hero, arquitectos, servicios, galería, proceso, contacto, footer) map 1:1 to Tasks 2–9. Design tokens (Task 1) match the spec's palette/typography table exactly. Stock-photo strategy (spec section "Estrategia de fotos") is implemented via the "Foto ilustrativa" tag on every image plus the README swap instructions. Technical structure (spec section "Estructura técnica") is implemented: plain HTML/CSS/JS, no backend, `wa.me` form with no data storage, mobile-first breakpoints, manual QA in Task 10.
- **Placeholder scan:** No TBD/TODO. Every step has real code. The one out-of-scope item mentioned in the spec (real client photos) is explicitly deferred to a documented future step in the README, not left ambiguous.
- **Type/interface consistency:** `buildWhatsAppUrl(fields)` signature defined in Task 7 is used identically in Task 8's form handler (`nombre`, `tipoEspacio`, `m2`, `fecha`, `mensaje` keys match). CSS class names introduced in Task 1 (`.mh-container`, `.mh-section`, `.mh-btn`, `.mh-btn--outline`, `.mh-label`, `.mh-photo-tag`) are the only ones reused across later tasks, and every later task's markup uses them exactly as spelled here.
