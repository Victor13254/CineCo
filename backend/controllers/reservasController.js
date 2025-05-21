// controllers/reservasController.js
const Reserva = require('../models/reserva');

const crearReserva = async (req, res) => {
  try {
    const { pelicula, horario, sala, sillasNormales, sillasPreferenciales, pagado } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: 'No autorizado. Debe iniciar sesión.' });
    }

    const nuevaReserva = new Reserva({
      pelicula,
      horario,
      sala,
      sillasNormales,
      sillasPreferenciales,
      pagado,
      usuario: req.userId // asignas el id del usuario autenticado
    });

    await nuevaReserva.save();
    res.status(201).json({ message: 'Reserva guardada exitosamente' });
  } catch (error) {
    console.error('Error al guardar la reserva:', error);
    res.status(500).json({ message: 'Error al guardar la reserva' });
  }
};

module.exports = {
  crearReserva
};
