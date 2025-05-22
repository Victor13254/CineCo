const Pelicula = require('../models/pelicula');
const Funcion = require('../models/funcion');

const IteradorFunciones = require('../patterns/iterator/IteradorFunciones');
const EnCarteleraState = require('../patterns/state/movies/EnCarteleraState');
const ProximamenteState = require('../patterns/state/movies/ProximamenteState');
const FueraDeCarteleraState = require('../patterns/state/movies/FueraDeCarteleraState');
const ContextoEstadoPelicula = require('../patterns/state/movies/ContextoEstadoPelicula');

const cambiarEstadoPelicula = async (req, res) => {
  const { id } = req.params;

  try {
    const pelicula = await Pelicula.findById(id);
    if (!pelicula) {
      return res.status(404).json({ mensaje: 'Película no encontrada' });
    }

    let estadoActual;
    switch (pelicula.estado) {
      case 'cartelera':
        estadoActual = new EnCarteleraState();
        break;
      case 'pronto':
        estadoActual = new ProximamenteState();
        break;
      case 'fuera':
        estadoActual = new FueraDeCarteleraState();
        break;
      default:
        estadoActual = new ProximamenteState();
    }

    const contexto = new ContextoEstadoPelicula(estadoActual);
    contexto.cambiarEstado();

    pelicula.estado = contexto.obtenerEstado();
    await pelicula.save();

    res.json({ mensaje: 'Estado actualizado', nuevoEstado: pelicula.estado });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al cambiar el estado de la película' });
  }
};

const obtenerPeliculas = async (req, res) => {
  try {
    // Traemos películas con funciones pobladas (solo sala y horario)
    const peliculas = await Pelicula.find().populate('funciones', 'sala horario');

    const funcionesTotales = [];

    peliculas.forEach(pelicula => {
      const iterador = new IteradorFunciones(pelicula.funciones);
      while (iterador.hasNext()) {
        funcionesTotales.push({
          pelicula: pelicula.titulo,
          ...iterador.next()
        });
      }
    });

    // Mapeamos películas con las funciones completas
    const cartelera = peliculas.map(p => ({
      id: p._id,
      titulo: p.titulo,
      genero: p.genero,
      duracion: p.duracion,
      estado: p.estado,
      funciones: p.funciones.map(func => {
        // Obtener el horario original
        let horario = func.horario;

        // Suponiendo que horario es string tipo "15:00" o "15:00:00"
        // o Date, convertirlo a "HH:MM"
        let hhmm;

        if (typeof horario === 'string') {
          // Si es string, extraemos las primeras 5 posiciones "HH:MM"
          hhmm = horario.slice(0, 5);
        } else if (horario instanceof Date) {
          // Si es Date, formatear con métodos Date
          const h = horario.getHours().toString().padStart(2, '0');
          const m = horario.getMinutes().toString().padStart(2, '0');
          hhmm = `${h}:${m}`;
        } else {
          // Si viene otro formato, dejar igual (o poner vacio)
          hhmm = horario;
        }return {
          ...func.toObject(), // convertir documento a JS object
          horario: hhmm,
        };
      }) // array con funciones completas gracias al populate
    }));

    res.json({ cartelera, funcionesTotales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener películas' });
  }
};

module.exports = {
  obtenerPeliculas,
  cambiarEstadoPelicula
};
