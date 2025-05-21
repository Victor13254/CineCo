const Pelicula = require('../models/pelicula');
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
    contexto.cambiarEstado(); // Cambiar el estado actual

    pelicula.estado = contexto.obtenerEstado(); // Guardar nuevo estado
    await pelicula.save();

    res.json({ mensaje: 'Estado actualizado', nuevoEstado: pelicula.estado });
  } catch (err) {
    res.status(500).json({ error: 'Error al cambiar el estado de la película' });
  }
};

const obtenerPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.find();

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

    // Devuelve también el estado actual de cada película
    const cartelera = peliculas.map(p => ({
      id: p._id,
      titulo: p.titulo,
      genero: p.genero,
      duracion: p.duracion,
      estado: p.estado,
      funciones: p.funciones
    }));

    res.json({ cartelera, funcionesTotales });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener películas' });
  }
};

module.exports = {
  obtenerPeliculas,
  cambiarEstadoPelicula
};
