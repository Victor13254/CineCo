const mongoose = require('mongoose');
const Funcion = require('../models/funcion');
const Reserva = require('../models/reserva');

const crearReserva = async (req, res) => {
  try {
    const { funcionId, sillas, pagado, pelicula } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: 'No autorizado. Debe iniciar sesión.' });
    }

    const funcion = await Funcion.findById(funcionId);
    if (!funcion) return res.status(404).json({ message: 'Función no encontrada' });

    // Validar y actualizar solo las sillas seleccionadas
    for (const sillaSeleccionada of sillas) {
      const index = funcion.sillas.findIndex((s) => s._id.toString() === sillaSeleccionada._id);
      if (index === -1) {
        return res.status(400).json({ message: `Silla con ID ${sillaSeleccionada._id} no encontrada` });
      }
      if (funcion.sillas[index].estado === 'ocupada') {
        return res.status(400).json({ message: `La silla ${funcion.sillas[index].numero} ya está ocupada` });
      }
      funcion.sillas[index].estado = 'ocupada';
    }

    await funcion.save();

    const nuevaReserva = new Reserva({
      pelicula,
      horario: funcion.horario,
      sala: funcion.sala,
      sillas,
      pagado,
      usuario: req.userId
    });

    await nuevaReserva.save();

    res.status(201).json({ message: 'Reserva creada exitosamente' });

  } catch (error) {
    console.error('Error al crear reserva:', error.message);
    res.status(500).json({ message: error.message || 'Error interno al crear la reserva' });
  }
};

module.exports = { crearReserva };
