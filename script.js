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
}
