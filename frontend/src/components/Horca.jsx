import { useEffect, useRef } from 'react';

const PARTES = [
  'M150 98 Q152 136 150 164',
  'M150 112 Q137 125 125 143',
  'M150 112 Q163 125 175 143',
  'M150 164 Q141 188 131 212',
  'M150 164 Q159 188 169 212',
];

const BALANCEO = [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(7deg)' },
  { transform: 'rotate(-5deg)' },
  { transform: 'rotate(3deg)' },
  { transform: 'rotate(-1deg)' },
  { transform: 'rotate(0deg)' },
];

function prefiereMenosMovimiento() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function Cara({ estado }) {
  if (estado === 'perdida') {
    return (
      <g className="cara">
        <path d="M141 73 L147 79 M147 73 L141 79 M153 73 L159 79 M159 73 L153 79" />
        <path d="M143 91 Q150 86 157 91" />
      </g>
    );
  }
  if (estado === 'ganada') {
    return (
      <g className="cara">
        <circle className="ojo" cx="144" cy="76" r="2" />
        <circle className="ojo" cx="156" cy="76" r="2" />
        <path d="M142 85 Q150 93 158 85" />
      </g>
    );
  }
  return null;
}

export default function Horca({ fallos, estado }) {
  const columpio = useRef(null);
  const fallosAntes = useRef(fallos);

  useEffect(() => {
    if (fallos > fallosAntes.current && !prefiereMenosMovimiento()) {
      columpio.current?.animate(BALANCEO, { duration: 900, easing: 'ease-out' });
    }
    fallosAntes.current = fallos;
  }, [fallos]);

  return (
    <svg
      className={`horca horca-${estado}`}
      viewBox="0 0 220 250"
      role="img"
      aria-label={`Dibujo del ahorcado: ${fallos} de 6 partes`}
    >
      <g className="horca-estructura">
        <path d="M18 236 Q110 231 202 237" />
        <path d="M58 236 Q55 132 59 22" />
        <path d="M52 24 Q108 20 156 25" />
        <path d="M59 64 Q78 46 97 25" />
      </g>
      <g className="columpio" ref={columpio}>
        <path className="cuerda" d="M150 25 Q152 42 150 60" />
        {fallos > 0 && <circle className="trazo" pathLength="1" cx="150" cy="79" r="19" />}
        {PARTES.slice(0, Math.max(fallos - 1, 0)).map((d) => (
          <path key={d} className="trazo" pathLength="1" d={d} />
        ))}
        {fallos > 0 && <Cara estado={estado} />}
      </g>
    </svg>
  );
}
