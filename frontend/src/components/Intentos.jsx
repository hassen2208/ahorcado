function textoDeIntentos(quedan) {
  if (quedan <= 0) return 'No te quedan intentos';
  if (quedan === 1) return 'Te queda 1 intento';
  return `Te quedan ${quedan} intentos`;
}

export default function Intentos({ fallos, maxFallos, pista, largo }) {
  const quedan = maxFallos - fallos;

  return (
    <div className="intentos">
      <p className="pista">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9V16h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <strong>{pista}</strong>
        <span aria-hidden="true">·</span>
        <span>{largo} letras</span>
      </p>
      <div className={`vidas${quedan <= 1 ? ' vidas-alerta' : ''}`}>
        <span aria-live="polite">{textoDeIntentos(quedan)}</span>
        <span className="vidas-marcas" aria-hidden="true">
          {Array.from({ length: maxFallos }, (_, i) => (
            <span key={i} className={i < quedan ? 'vida vida-llena' : 'vida'} />
          ))}
        </span>
      </div>
    </div>
  );
}
