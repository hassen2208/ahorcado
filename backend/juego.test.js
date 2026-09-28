import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { crearPartida, ErrorDeJuego, jugarLetra, MAX_FALLOS, vistaPublica } from './juego.js';

function partidaCon(palabra) {
  return crearPartida([{ palabra, pista: 'Prueba' }]);
}

function jugarVarias(partida, letras) {
  for (const letra of letras) jugarLetra(partida, letra);
}

function esperarError(fn, status) {
  assert.throws(fn, (error) => error instanceof ErrorDeJuego && error.status === status);
}

describe('crearPartida', () => {
  it('elige la palabra de la lista según el azar', () => {
    const lista = [
      { palabra: 'UNO', pista: 'A' },
      { palabra: 'DOS', pista: 'B' },
    ];
    assert.equal(crearPartida(lista, () => 0).palabra, 'UNO');
    assert.equal(crearPartida(lista, () => 0.99).palabra, 'DOS');
  });

  it('empieza sin letras, sin fallos y con la palabra oculta', () => {
    const vista = vistaPublica(partidaCon('CABRA'));
    assert.deepEqual(vista.patron, ['_', '_', '_', '_', '_']);
    assert.equal(vista.fallos, 0);
    assert.equal(vista.estado, 'jugando');
    assert.equal(vista.palabra, null);
  });
});

describe('jugarLetra', () => {
  it('destapa todas las apariciones de una letra acertada', () => {
    const partida = partidaCon('CABRA');
    assert.equal(jugarLetra(partida, 'A'), true);
    assert.deepEqual(vistaPublica(partida).patron, ['_', 'A', '_', '_', 'A']);
    assert.equal(partida.fallos, 0);
  });

  it('suma un fallo cuando la letra no está', () => {
    const partida = partidaCon('CABRA');
    assert.equal(jugarLetra(partida, 'E'), false);
    assert.equal(partida.fallos, 1);
  });

  it('acepta minúsculas y la Ñ', () => {
    const partida = partidaCon('PIÑA');
    jugarVarias(partida, ['p', 'ñ']);
    assert.deepEqual(vistaPublica(partida).patron, ['P', '_', 'Ñ', '_']);
  });

  it('rechaza lo que no es una sola letra', () => {
    const partida = partidaCon('CABRA');
    for (const entrada of ['', 'AB', '1', '@', 'Á', undefined]) {
      esperarError(() => jugarLetra(partida, entrada), 400);
    }
    assert.equal(partida.fallos, 0);
  });

  it('rechaza una letra repetida sin sumar fallo', () => {
    const partida = partidaCon('CABRA');
    jugarLetra(partida, 'E');
    esperarError(() => jugarLetra(partida, 'e'), 409);
    assert.equal(partida.fallos, 1);
  });

  it('pierde al llegar al máximo de fallos y muestra la palabra', () => {
    const partida = partidaCon('CABRA');
    jugarVarias(partida, ['E', 'I', 'O', 'U', 'S', 'T']);
    assert.equal(partida.fallos, MAX_FALLOS);
    assert.equal(partida.estado, 'perdida');
    assert.equal(vistaPublica(partida).palabra, 'CABRA');
    esperarError(() => jugarLetra(partida, 'C'), 409);
  });

  it('gana al destapar todas las letras', () => {
    const partida = partidaCon('ESPAÑA');
    jugarVarias(partida, ['E', 'S', 'P', 'A', 'Ñ']);
    assert.equal(partida.estado, 'ganada');
    assert.equal(vistaPublica(partida).palabra, 'ESPAÑA');
  });
});
