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

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('mh-quote-form');
    if (!form) return;
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      // El input date entrega AAAA-MM-DD; en el mensaje va DD/MM/AAAA.
      let fecha = data.get('fecha') || '';
      const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha);
      if (isoMatch) fecha = `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;
      const url = buildWhatsAppUrl({
        nombre: data.get('nombre') || '',
        tipoEspacio: data.get('tipoEspacio') || '',
        m2: data.get('m2') || '',
        fecha: fecha,
        mensaje: data.get('mensaje') || ''
      });
      window.open(url, '_blank', 'noopener');
    });
  });

  // Carrusel de antes y después: sin JS igual se desliza; las flechas son un extra.
  document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('ad-track');
    const controls = document.querySelector('.mh-ad__controls');
    if (!track || !controls) return;
    const prev = controls.querySelector('[data-ad="prev"]');
    const next = controls.querySelector('[data-ad="next"]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function stepWidth() {
      const slide = track.querySelector('.mh-ad__slide');
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return slide.getBoundingClientRect().width + gap;
    }

    function update() {
      const atStart = track.scrollLeft <= 2;
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
      const prevHadFocus = document.activeElement === prev;
      const nextHadFocus = document.activeElement === next;
      prev.disabled = atStart;
      next.disabled = atEnd;
      // Si el botón con foco se deshabilita, el foco pasa al otro en vez de perderse.
      if (atStart && prevHadFocus) next.focus();
      if (atEnd && nextHadFocus) prev.focus();
    }

    function go(direction) {
      track.scrollBy({ left: direction * stepWidth(), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }

    prev.addEventListener('click', function () { go(-1); });
    next.addEventListener('click', function () { go(1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    controls.hidden = false;
    update();
  });

  // Comparadores antes/después: se arrastra la manija, se toca la foto o se usan las flechas del teclado.
  document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.mh-ba');
    if (!sliders.length) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    sliders.forEach(function (ba, index) {
      const handle = ba.querySelector('.mh-ba__handle');
      let pos = 50;
      let dragging = false;
      let interacted = false;
      let animation = 0;

      function set(value) {
        pos = Math.max(0, Math.min(100, value));
        const rounded = Math.round(pos);
        ba.style.setProperty('--pos', pos + '%');
        ba.dataset.edge = pos < 14 ? 'start' : pos > 86 ? 'end' : '';
        handle.setAttribute('aria-valuenow', String(rounded));
        handle.setAttribute('aria-valuetext', rounded + '% antes, ' + (100 - rounded) + '% después');
      }

      function percentFrom(event) {
        const rect = ba.getBoundingClientRect();
        return ((event.clientX - rect.left) / rect.width) * 100;
      }

      function takeOver() {
        interacted = true;
        animation++;
      }

      function animateTo(target, duration, then) {
        const id = ++animation;
        if (reduceMotion.matches) { set(target); if (then) then(); return; }
        const from = pos;
        const start = performance.now();
        function frame(now) {
          if (id !== animation) return;
          const k = Math.min(1, (now - start) / duration);
          set(from + (target - from) * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(frame);
          else if (then) then();
        }
        requestAnimationFrame(frame);
      }

      handle.addEventListener('pointerdown', function (event) {
        takeOver();
        dragging = true;
        handle.setPointerCapture(event.pointerId);
        ba.classList.add('is-dragging');
        event.preventDefault();
      });
      handle.addEventListener('pointermove', function (event) {
        if (dragging) set(percentFrom(event));
      });
      function stopDrag() {
        dragging = false;
        ba.classList.remove('is-dragging');
      }
      handle.addEventListener('pointerup', stopDrag);
      handle.addEventListener('pointercancel', stopDrag);

      // Un toque en la foto lleva la línea ahí; deslizar sobre la foto sigue moviendo el carrusel.
      ba.addEventListener('click', function (event) {
        if (event.target.closest('.mh-ba__handle')) return;
        takeOver();
        animateTo(percentFrom(event), 350);
      });

      handle.addEventListener('keydown', function (event) {
        const steps = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -20, PageUp: 20 };
        let next = null;
        if (event.key in steps) next = pos + steps[event.key];
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = 100;
        if (next === null) return;
        event.preventDefault();
        takeOver();
        set(next);
      });

      set(50);

      // El primero muestra una vez cómo se usa, cuando entra en pantalla.
      if (index === 0 && 'IntersectionObserver' in window && !reduceMotion.matches) {
        const observer = new IntersectionObserver(function (entries) {
          if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
          observer.disconnect();
          setTimeout(function () {
            if (interacted) return;
            animateTo(28, 650, function () {
              animateTo(72, 900, function () { animateTo(50, 650); });
            });
          }, 400);
        }, { threshold: 0.6 });
        observer.observe(ba);
      }
    });
  });

  // Portada: una capa de polvo de obra que se limpia al pasar el cursor o el dedo.
  document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.mh-hero');
    const canvas = hero && hero.querySelector('.mh-hero__dust');
    if (!canvas || !canvas.getContext || !('ResizeObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.remove();
      return;
    }
    const ctx = canvas.getContext('2d');
    const hint = hero.querySelector('.mh-dust-hint');
    const bg = hero.querySelector('.mh-hero__bg');
    let width = 0;
    let height = 0;
    let cleaned = 0;
    let done = false;
    let touched = false;
    let last = null;

    // Azar con semilla: el polvo queda igual en cada visita.
    function seeded(seed) {
      return function () {
        seed = (seed + 0x6D2B79F5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function paint() {
      const rect = hero.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, width, height);
      const rand = seeded(7);

      ctx.fillStyle = 'rgba(206, 196, 178, 0.16)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 18; i++) {
        const x = rand() * width;
        const y = rand() * height;
        const radius = 120 + rand() * 320;
        const alpha = 0.08 + rand() * 0.14;
        const blot = ctx.createRadialGradient(x, y, 0, x, y, radius);
        blot.addColorStop(0, 'rgba(214, 204, 186, ' + alpha + ')');
        blot.addColorStop(1, 'rgba(214, 204, 186, 0)');
        ctx.fillStyle = blot;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }

      const specks = Math.round((width * height) / 700);
      for (let i = 0; i < specks; i++) {
        const size = 0.4 + Math.pow(rand(), 3) * 2.2;
        const r = 225 + Math.floor(rand() * 30);
        const g = 215 + Math.floor(rand() * 30);
        const b = 195 + Math.floor(rand() * 30);
        ctx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (0.25 + rand() * 0.5) + ')';
        ctx.beginPath();
        ctx.arc(rand() * width, rand() * height, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineCap = 'round';
      for (let i = 0; i < 36; i++) {
        let x = rand() * width;
        let y = rand() * height;
        ctx.strokeStyle = 'rgba(235, 228, 214, ' + (0.25 + rand() * 0.3) + ')';
        ctx.lineWidth = 0.6 + rand() * 0.6;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let k = 0; k < 4; k++) {
          x += (rand() - 0.5) * 18;
          y += (rand() - 0.5) * 18;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      cleaned = 0;
      last = null;
    }

    function brushRadius() {
      return Math.max(48, Math.min(90, width * 0.06));
    }

    function wipeAt(x, y, radius) {
      const cloth = ctx.createRadialGradient(x, y, 0, x, y, radius);
      cloth.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
      cloth.addColorStop(0.6, 'rgba(0, 0, 0, 0.5)');
      cloth.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = cloth;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }

    function wipeTo(x, y) {
      if (done) return;
      const radius = brushRadius();
      ctx.globalCompositeOperation = 'destination-out';
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / (radius * 0.3)));
        for (let i = 1; i <= steps; i++) wipeAt(last.x + (dx * i) / steps, last.y + (dy * i) / steps, radius);
        cleaned += (dist * radius * 1.2) / (width * height);
      } else {
        wipeAt(x, y, radius);
      }
      last = { x: x, y: y };
      // Con un tercio limpio, el resto se va solo.
      if (cleaned > 0.32) finish();
    }

    function finish() {
      if (done) return;
      done = true;
      canvas.classList.add('is-clean');
      if (hint) hint.classList.add('is-done');
      window.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
      setTimeout(function () { canvas.remove(); }, 1000);
    }

    function markTouched() {
      touched = true;
      if (hint) hint.classList.add('is-done');
    }

    function local(point) {
      const rect = hero.getBoundingClientRect();
      return { x: point.clientX - rect.left, y: point.clientY - rect.top };
    }

    hero.addEventListener('pointermove', function (event) {
      if (event.pointerType !== 'mouse') return;
      markTouched();
      const p = local(event);
      wipeTo(p.x, p.y);
    });
    hero.addEventListener('pointerleave', function () { last = null; });
    hero.addEventListener('touchstart', function (event) {
      markTouched();
      last = null;
      const p = local(event.touches[0]);
      wipeTo(p.x, p.y);
    }, { passive: true });
    hero.addEventListener('touchmove', function (event) {
      const p = local(event.touches[0]);
      wipeTo(p.x, p.y);
    }, { passive: true });
    hero.addEventListener('touchend', function () { last = null; }, { passive: true });

    // Si bajan sin tocar la foto, el polvo se va igual: nunca queda tapando la página.
    function onScroll() {
      if (window.scrollY > height * 0.35) finish();
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    paint();
    let paintedWidth = width;
    let paintedHeight = height;
    const resizeObserver = new ResizeObserver(function () {
      const rect = hero.getBoundingClientRect();
      if (done) return;
      if (Math.abs(rect.width - paintedWidth) > 20 || Math.abs(rect.height - paintedHeight) > 20) {
        paintedWidth = rect.width;
        paintedHeight = rect.height;
        paint();
      }
    });
    resizeObserver.observe(hero);

    // Una pasada de trapo automática enseña el gesto.
    function demoPass() {
      if (touched || done) return;
      const points = [];
      const total = 40;
      for (let i = 0; i <= total; i++) {
        const t = i / total;
        points.push({
          x: width * (0.58 + 0.36 * t),
          y: height * (0.2 + 0.18 * t + 0.12 * Math.sin(t * Math.PI * 2.2))
        });
      }
      let next = 0;
      const start = performance.now();
      last = null;
      function frame(now) {
        if (touched || done) { last = null; return; }
        const k = Math.min(1, (now - start) / 1300);
        const reached = Math.floor((1 - Math.pow(1 - k, 3)) * total);
        while (next <= reached) {
          wipeTo(points[next].x, points[next].y);
          next++;
        }
        if (k < 1) requestAnimationFrame(frame);
        else last = null;
      }
      requestAnimationFrame(frame);
    }

    if (hint && window.matchMedia('(hover: hover) and (pointer: fine)').matches) hint.hidden = false;
    function scheduleDemo() { setTimeout(demoPass, 700); }
    if (bg && !bg.complete) bg.addEventListener('load', scheduleDemo, { once: true });
    else scheduleDemo();
  });
}
