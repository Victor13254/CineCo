const Funcion = require('../models/funcion');

// Crear una nueva función con sillas generadas automáticamente
const crearFuncion = async (req, res) => {
  try {
    const { sala, horario, cantidadSillasNormales, cantidadSillasPreferenciales } = req.body;

    let sillas = [];
    let numero = 1;

    for (let i = 0; i < cantidadSillasNormales; i++) {
      sillas.push({ numero: numero++, tipo: 'normal', estado: 'disponible' });
    }
    for (let i = 0; i < cantidadSillasPreferenciales; i++) {
      sillas.push({ numero: numero++, tipo: 'preferencial', estado: 'disponible' });
    }

    const funcion = new Funcion({ sala, horario, sillas });
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

// Obtener una función por ID
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

// Actualizar datos generales de una función (sala, horario)
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

// Eliminar una función
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

// Actualizar estado de sillas específicas
const actualizarSillas = async (req, res) => {
  try {
    const { id } = req.params;
    const { sillasActualizadas } = req.body; // Ejemplo: [{ numero: 5, estado: 'ocupada' }, ...]

    const funcion = await Funcion.findById(id);
    if (!funcion) return res.status(404).json({ error: 'Función no encontrada' });

    funcion.sillas = funcion.sillas.map(silla => {
      const actualizada = sillasActualizadas.find(s => s.numero === silla.numero);
      return actualizada ? { ...silla, estado: actualizada.estado } : silla;
    });

    await funcion.save();
    res.status(200).json(funcion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error actualizando sillas' });
  }
};

module.exports = {
  crearFuncion,
  obtenerFunciones,
  obtenerFuncionPorId,
  actualizarFuncion,
  eliminarFuncion,
  actualizarSillas
};
