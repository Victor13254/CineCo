const Pelicula = require('../models/pelicula');
const IteradorFunciones = require('../patterns/iterator/IteradorFunciones');

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

    res.json({ cartelera: peliculas, funcionesTotales });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener películas' });
  }
};

module.exports = {
  obtenerPeliculas
};
