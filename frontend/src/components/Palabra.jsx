function casillaDe(letra, i, letrasFinales, estado) {
  if (letra !== '_') return { letra, tipo: 'destapada' };
  if (estado === 'perdida' && letrasFinales) return { letra: letrasFinales[i], tipo: 'faltante' };
  return { letra: '', tipo: 'oculta' };
}

export default function Palabra({ patron, palabra, estado }) {
  const letrasFinales = palabra ? [...palabra] : null;
  const casillas = patron.map((letra, i) => casillaDe(letra, i, letrasFinales, estado));
  const lectura = casillas.map(({ letra }) => letra || 'vacía').join(', ');

  return (
    <div className={`palabra palabra-${estado}`} role="img" aria-label={`Palabra: ${lectura}`}>
      {casillas.map(({ letra, tipo }, i) => (
        <span key={`${i}-${letra}`} className={`casilla casilla-${tipo}`} style={{ '--i': i }}>
          <span>{letra}</span>
        </span>
      ))}
    </div>
  );
}
