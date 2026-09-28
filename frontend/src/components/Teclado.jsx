const FILAS = ['QWERTYUIOP', 'ASDFGHJKLÑ', 'ZXCVBNM'];

const DESCRIPCION = {
  libre: '',
  acierto: ', está en la palabra',
  fallo: ', no está en la palabra',
};

export default function Teclado({ letrasUsadas, patron, onLetra }) {
  function estadoDe(letra) {
    if (!letrasUsadas.includes(letra)) return 'libre';
    return patron.includes(letra) ? 'acierto' : 'fallo';
  }

  return (
    <div className="teclado" role="group" aria-label="Teclado">
      {FILAS.map((fila) => (
        <div className="fila" key={fila}>
          {[...fila].map((letra) => {
            const estado = estadoDe(letra);
            return (
              <button
                key={letra}
                type="button"
                className={`tecla tecla-${estado}`}
                disabled={estado !== 'libre'}
                onClick={() => onLetra(letra)}
                aria-label={`${letra}${DESCRIPCION[estado]}`}
              >
                {letra}
              </button>
            );
          })}
        </div>
      ))}
      <p className="teclado-ayuda">También puedes jugar con el teclado de tu computador.</p>
    </div>
  );
}
