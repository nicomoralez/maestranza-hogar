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
