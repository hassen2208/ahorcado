import cors from 'cors';
import express from 'express';
import { crearPartida, ErrorDeJuego, jugarLetra, vistaPublica } from './juego.js';

const PUERTO = process.env.PORT ?? 3000;
const partidas = new Map();
const app = express();

app.use(cors());
app.use(express.json());

function buscarPartida(id) {
  const partida = partidas.get(id);
  if (!partida) throw new ErrorDeJuego(404, 'La partida no existe');
  return partida;
}

app.post('/api/partidas', (req, res) => {
  const partida = crearPartida();
  partidas.set(partida.id, partida);
  res.status(201).json(vistaPublica(partida));
});

app.get('/api/partidas/:id', (req, res) => {
  res.json(vistaPublica(buscarPartida(req.params.id)));
});

app.post('/api/partidas/:id/letras', (req, res) => {
  const partida = buscarPartida(req.params.id);
  const acierto = jugarLetra(partida, req.body?.letra);
  res.json({ ...vistaPublica(partida), acierto });
});

app.use((req, res) => {
  res.status(404).json({ error: 'La ruta no existe' });
});

app.use((error, req, res, next) => {
  if (error instanceof ErrorDeJuego) {
    return res.status(error.status).json({ error: error.message });
  }
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo de la petición no es un JSON válido' });
  }
  console.error(error);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

app.listen(PUERTO, () => {
  console.log(`Backend del ahorcado en http://localhost:${PUERTO}`);
});
