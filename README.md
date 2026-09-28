# El ahorcado

Versión digital del juego de papel. El computador elige una palabra al azar y el jugador la adivina letra por letra antes de completar el dibujo: tiene 6 fallos.

- `backend/`: Node.js con Express. Guarda las partidas en memoria y aplica las reglas. La palabra no sale del servidor hasta que la partida termina.
- `frontend/`: React con Vite. Muestra el dibujo, la palabra y el teclado, y se conecta al backend con `src/api.js`.

## Cómo correrlo

Necesitas Node.js 20 o más reciente.

```bash
npm install
npm run dev
```

Levanta el backend en http://localhost:3000 y el juego en http://localhost:5173. Si el backend corre en otra dirección, copia `frontend/.env.example` como `frontend/.env` y cambia `VITE_API_URL`.

| Comando         | Qué hace                                  |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Levanta el backend y el frontend a la vez |
| `npm test`      | Corre las pruebas de las reglas del juego |
| `npm run build` | Compila el frontend en `frontend/dist`    |

## Rutas del backend

| Método | Ruta                       | Cuerpo           | Respuesta                              |
| ------ | -------------------------- | ---------------- | -------------------------------------- |
| POST   | `/api/partidas`            | —                | 201 y el estado de una partida nueva   |
| GET    | `/api/partidas/:id`        | —                | 200 y el estado actual                 |
| POST   | `/api/partidas/:id/letras` | `{"letra": "A"}` | 200, el estado y `acierto: true/false` |

El estado trae `id`, `patron`, `pista`, `letrasUsadas`, `fallos`, `maxFallos`, `estado` (`jugando`, `ganada` o `perdida`) y `palabra`, que es `null` mientras se juega. Los errores responden `{"error": "mensaje"}` con 400 (letra inválida), 404 (la partida no existe) o 409 (letra repetida o partida terminada).

## Estructura

```text
backend/
  server.js        rutas
  juego.js         reglas del juego
  juego.test.js    pruebas de las reglas
  palabras.json    46 palabras con su pista
frontend/src/
  api.js           llamadas al backend
  App.jsx          estado de la partida y teclado físico
  components/      Horca, Palabra, Teclado, Intentos, Resultado
  estilos.css
```

Para agregar palabras, edita `backend/palabras.json`: van en mayúsculas y sin tildes, y la Ñ sí se permite.
