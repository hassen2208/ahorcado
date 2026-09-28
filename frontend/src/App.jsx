import { useCallback, useEffect, useRef, useState } from 'react';
import { crearPartida, jugarLetra, obtenerPartida } from './api.js';
import Horca from './components/Horca.jsx';
import Intentos from './components/Intentos.jsx';
import Palabra from './components/Palabra.jsx';
import Resultado from './components/Resultado.jsx';
import Teclado from './components/Teclado.jsx';

const CLAVE_PARTIDA = 'ahorcado.partida';
const LETRA = /^[A-ZÑ]$/;

function leerIdGuardado() {
  try {
    return localStorage.getItem(CLAVE_PARTIDA);
  } catch {
    return null;
  }
}

function guardarId(id) {
  try {
    localStorage.setItem(CLAVE_PARTIDA, id);
  } catch {
    return;
  }
}

export default function App() {
  const [partida, setPartida] = useState(null);
  const [aviso, setAviso] = useState(null);
  const [sinConexion, setSinConexion] = useState(false);
  const ocupado = useRef(false);
  const iniciado = useRef(false);

  const ejecutar = useCallback(async (tarea) => {
    if (ocupado.current) return;
    ocupado.current = true;
    try {
      const siguiente = await tarea();
      guardarId(siguiente.id);
      setPartida(siguiente);
      setSinConexion(false);
    } catch (error) {
      setAviso({ texto: error.message, vez: Date.now() });
      if (error.status === 0) setSinConexion(true);
    } finally {
      ocupado.current = false;
    }
  }, []);

  const cargarPartida = useCallback(() => {
    const id = leerIdGuardado();
    return ejecutar(async () => {
      if (id) {
        try {
          return await obtenerPartida(id);
        } catch (error) {
          if (error.status !== 404) throw error;
        }
      }
      return crearPartida();
    });
  }, [ejecutar]);

  const nuevaPartida = useCallback(() => ejecutar(crearPartida), [ejecutar]);

  const jugar = useCallback(
    (letra) => {
      if (!partida || partida.estado !== 'jugando' || partida.letrasUsadas.includes(letra)) return;
      ejecutar(async () => {
        try {
          return await jugarLetra(partida.id, letra);
        } catch (error) {
          if (error.status !== 404) throw error;
          setAviso({ texto: 'La partida ya no estaba en el servidor. Empezamos una nueva.', vez: Date.now() });
          return crearPartida();
        }
      });
    },
    [partida, ejecutar],
  );

  useEffect(() => {
    if (iniciado.current) return;
    iniciado.current = true;
    cargarPartida();
  }, [cargarPartida]);

  useEffect(() => {
    if (!aviso) return;
    const temporizador = setTimeout(() => setAviso(null), 3000);
    return () => clearTimeout(temporizador);
  }, [aviso]);

  useEffect(() => {
    function alTeclear(evento) {
      if (evento.ctrlKey || evento.metaKey || evento.altKey || evento.repeat || !partida) return;
      if (partida.estado !== 'jugando') {
        if (evento.key === 'Enter') nuevaPartida();
        return;
      }
      const letra = evento.key.toUpperCase();
      if (LETRA.test(letra)) jugar(letra);
    }
    window.addEventListener('keydown', alTeclear);
    return () => window.removeEventListener('keydown', alTeclear);
  }, [partida, jugar, nuevaPartida]);

  return (
    <div className="app">
      <header className="banda">
        <div className="banda-contenido">
          <div className="marca">
            <img src="/favicon.svg" alt="" width="40" height="40" />
            <div>
              <h1>El ahorcado</h1>
              <p>Pensé una palabra. Adivínala antes de que termine el dibujo.</p>
            </div>
          </div>
          {partida && (
            <button type="button" className="boton-banda" onClick={nuevaPartida}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Nueva partida
            </button>
          )}
        </div>
      </header>

      <main className="tablero">
        {partida ? (
          <>
            <section className={`lamina lamina-${partida.estado}`} aria-label="Dibujo">
              <Horca fallos={partida.fallos} estado={partida.estado} />
            </section>
            <section className="juego" aria-label="Juego">
              <Intentos
                fallos={partida.fallos}
                maxFallos={partida.maxFallos}
                pista={partida.pista}
                largo={partida.patron.length}
              />
              <Palabra patron={partida.patron} palabra={partida.palabra} estado={partida.estado} />
              {partida.estado === 'jugando' ? (
                <Teclado letrasUsadas={partida.letrasUsadas} patron={partida.patron} onLetra={jugar} />
              ) : (
                <Resultado
                  estado={partida.estado}
                  palabra={partida.palabra}
                  fallos={partida.fallos}
                  onJugarOtraVez={nuevaPartida}
                />
              )}
            </section>
          </>
        ) : sinConexion ? (
          <div className="espera espera-error" role="alert">
            <h2>No hay conexión con el servidor</h2>
            <p>
              Revisa que el backend esté encendido con <code>npm run dev</code> y vuelve a intentarlo.
            </p>
            <button type="button" className="boton-principal" onClick={cargarPartida}>
              Reintentar
            </button>
          </div>
        ) : (
          <p className="espera">Pensando una palabra…</p>
        )}
      </main>

      {aviso && partida && (
        <div className="aviso" role="alert" key={aviso.vez}>
          {aviso.texto}
        </div>
      )}
    </div>
  );
}
