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
