import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';

export const MAX_FALLOS = 6;
const LETRA_VALIDA = /^[A-ZÑ]$/;

const palabras = JSON.parse(readFileSync(new URL('./palabras.json', import.meta.url), 'utf8'));

export class ErrorDeJuego extends Error {
  constructor(status, mensaje) {
    super(mensaje);
    this.status = status;
  }
}

export function crearPartida(lista = palabras, azar = Math.random) {
  const { palabra, pista } = lista[Math.floor(azar() * lista.length)];
  return { id: randomUUID(), palabra, pista, letrasUsadas: [], fallos: 0, estado: 'jugando' };
}

export function jugarLetra(partida, entrada) {
  const letra = String(entrada ?? '')
    .trim()
    .toUpperCase();

  if (!LETRA_VALIDA.test(letra)) {
    throw new ErrorDeJuego(400, 'Escribe una sola letra de la A a la Z');
  }
  if (partida.estado !== 'jugando') {
    throw new ErrorDeJuego(409, 'La partida ya terminó');
  }
  if (partida.letrasUsadas.includes(letra)) {
    throw new ErrorDeJuego(409, `Ya usaste la letra ${letra}`);
  }

  partida.letrasUsadas.push(letra);
  const acierto = partida.palabra.includes(letra);

  if (!acierto) partida.fallos += 1;

  if (partida.fallos >= MAX_FALLOS) {
    partida.estado = 'perdida';
  } else if ([...partida.palabra].every((l) => partida.letrasUsadas.includes(l))) {
    partida.estado = 'ganada';
  }

  return acierto;
}

export function vistaPublica({ id, palabra, pista, letrasUsadas, fallos, estado }) {
  return {
    id,
    patron: [...palabra].map((l) => (letrasUsadas.includes(l) ? l : '_')),
    pista,
    letrasUsadas,
    fallos,
    maxFallos: MAX_FALLOS,
    estado,
    palabra: estado === 'jugando' ? null : palabra,
  };
}
