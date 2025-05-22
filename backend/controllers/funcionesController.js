const Funcion = require('../models/funcion');

// Crear una nueva función
const crearFuncion = async (req, res) => {
  try {
    const {
      sala,
      horario,
      sillasNormalesTotales,
      sillasNormalesDisponibles,
      sillasPreferencialesTotales,
      sillasPreferencialesDisponibles,
    } = req.body;

    const funcion = new Funciones({
      sala,
      horario,
      sillasNormalesTotales,
      sillasNormalesDisponibles,
      sillasPreferencialesTotales,
      sillasPreferencialesDisponibles,
    });

    await funcion.save();
    res.status(201).json(funcion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creando la función' });
  }
};

// Obtener todas las funciones
const obtenerFunciones = async (req, res) => {
  try {
    const funciones = await Funcion.find().sort({ horario: 1 });
    res.status(200).json(funciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo las funciones' });
  }
};

// Obtener función por ID
const obtenerFuncionPorId = async (req, res) => {
  try {
    const funcion = await Funcion.findById(req.params.id);
    if (!funcion) return res.status(404).json({ error: 'Función no encontrada' });
    res.status(200).json(funcion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo la función' });
  }
};

// Actualizar función (ejemplo: actualizar horarios o sala)
const actualizarFuncion = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const funcionActualizada = await Funcion.findByIdAndUpdate(id, updates, { new: true });

    if (!funcionActualizada) return res.status(404).json({ error: 'Función no encontrada' });

    res.status(200).json(funcionActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error actualizando la función' });
  }
};

// Eliminar función
const eliminarFuncion = async (req, res) => {
  try {
    const { id } = req.params;
    const funcionEliminada = await Funcion.findByIdAndDelete(id);

    if (!funcionEliminada) return res.status(404).json({ error: 'Función no encontrada' });

    res.status(200).json({ mensaje: 'Función eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error eliminando la función' });
  }
};

// Actualizar disponibilidad de sillas (ejemplo: reservar o liberar sillas)
const actualizarDisponibilidad = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      sillasNormalesDisponibles,
      sillasPreferencialesDisponibles,
    } = req.body;

    const funcion = await Funcion.findById(id);
    if (!funcion) return res.status(404).json({ error: 'Función no encontrada' });

    // Opcional: validar que no se excedan los totales o sean negativas
    if (
      sillasNormalesDisponibles < 0 || sillasNormalesDisponibles > funcion.sillasNormalesTotales ||
      sillasPreferencialesDisponibles < 0 || sillasPreferencialesDisponibles > funcion.sillasPreferencialesTotales
    ) {
      return res.status(400).json({ error: 'Cantidad de sillas inválida' });
    }

    funcion.sillasNormalesDisponibles = sillasNormalesDisponibles;
    funcion.sillasPreferencialesDisponibles = sillasPreferencialesDisponibles;

    await funcion.save();

    res.status(200).json(funcion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error actualizando la disponibilidad' });
  }
};

module.exports = {
  crearFuncion,
  obtenerFunciones,
  obtenerFuncionPorId,
  actualizarFuncion,
  eliminarFuncion,
  actualizarDisponibilidad,
};
