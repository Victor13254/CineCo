const path = require('path');
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
    const peliculas = await Pelicula.find().populate('funciones', 'sala horario sillas');

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

    const cartelera = peliculas.map(p => ({
      id: p._id,
      titulo: p.titulo,
      genero: p.genero,
      duracion: p.duracion,
      estado: p.estado,
      imagen: p.imagen, 
      funciones: p.funciones.map(func => {
        let horario = func.horario;
        let hhmm;

        if (typeof horario === 'string') {
          hhmm = horario.slice(0, 5);
        } else if (horario instanceof Date) {
          const h = horario.getHours().toString().padStart(2, '0');
          const m = horario.getMinutes().toString().padStart(2, '0');
          hhmm = `${h}:${m}`;
        } else {
          hhmm = horario;
        }

        return {
          ...func.toObject(),
          horario: hhmm,
        };
      })
    }));

    res.json({ cartelera, funcionesTotales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener películas' });
  }
};

const crearPelicula = async (req, res) => {
  const { titulo, genero, duracion, estado } = req.body;
  const funciones = Array.isArray(req.body.funciones) ? req.body.funciones : [req.body.funciones];
  const imagen = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const funcionesValidas = await Funcion.find({ _id: { $in: funciones } });

    if (funcionesValidas.length !== funciones.length) {
      return res.status(400).json({ error: 'Algunas funciones no son válidas' });
    }

    const nuevaPelicula = new Pelicula({
      titulo,
      genero,
      duracion: parseInt(duracion, 10),
      estado,
      funciones,
      imagen,
    });

    await nuevaPelicula.save();
    res.status(201).json({ mensaje: 'Película creada correctamente', pelicula: nuevaPelicula });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear película' });
  }
};

const actualizarPelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, genero, duracion, estado } = req.body;
    const funciones = Array.isArray(req.body.funciones) ? req.body.funciones : [req.body.funciones];
    const imagen = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = {
      ...(titulo && { titulo }),
      ...(genero && { genero }),
      ...(duracion && { duracion: parseInt(duracion, 10) }),
      ...(estado && { estado }),
      ...(funciones && { funciones }),
      ...(imagen && { imagen }),
    };

    const peliculaActualizada = await Pelicula.findByIdAndUpdate(id, updateData, { new: true });

    if (!peliculaActualizada) {
      return res.status(404).json({ mensaje: 'Película no encontrada' });
    }

    res.status(200).json({ mensaje: 'Película actualizada correctamente', pelicula: peliculaActualizada });
  } catch (err) {
    console.error('Error al actualizar película:', err);
    res.status(500).json({ error: 'Error al actualizar película' });
  }
};

 
module.exports = {
  obtenerPeliculas,
  cambiarEstadoPelicula,
  crearPelicula,
  actualizarPelicula
};
