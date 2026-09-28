const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export class ErrorDeApi extends Error {
  constructor(mensaje, status) {
    super(mensaje);
    this.status = status;
  }
}

async function pedir(ruta, opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opciones,
    });
  } catch {
    throw new ErrorDeApi('No hay conexión con el servidor. Revisa que el backend esté encendido.', 0);
  }
  const datos = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) {
    throw new ErrorDeApi(datos.error ?? 'El servidor respondió con un error', respuesta.status);
  }
  return datos;
}

export const crearPartida = () => pedir('/api/partidas', { method: 'POST' });

export const obtenerPartida = (id) => pedir(`/api/partidas/${id}`);

export const jugarLetra = (id, letra) =>
  pedir(`/api/partidas/${id}/letras`, { method: 'POST', body: JSON.stringify({ letra }) });
