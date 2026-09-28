import { useEffect, useRef } from 'react';

function textoDeFallos(fallos) {
  if (fallos === 0) return 'sin un solo fallo';
  if (fallos === 1) return 'con 1 fallo';
  return `con ${fallos} fallos`;
}

export default function Resultado({ estado, palabra, fallos, onJugarOtraVez }) {
  const boton = useRef(null);
  const gano = estado === 'ganada';

  useEffect(() => {
    boton.current?.focus();
  }, []);

  return (
    <div className={`resultado resultado-${estado}`} role="status">
      <h2>{gano ? '¡Ganaste!' : 'Esta vez gané yo'}</h2>
      <p>
        {gano ? (
          <>
            Adivinaste <strong>{palabra}</strong> {textoDeFallos(fallos)}.
          </>
        ) : (
          <>
            La palabra era <strong>{palabra}</strong>.
          </>
        )}
      </p>
      <button ref={boton} type="button" className="boton-principal" onClick={onJugarOtraVez}>
        Jugar otra vez
      </button>
      <span className="resultado-ayuda">o presiona Enter</span>
    </div>
  );
}
