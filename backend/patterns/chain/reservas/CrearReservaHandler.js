const ReservaHandler = require('./reservaHandler');
const Reserva = require('../../../models/reserva');

class CrearReservaHandler extends ReservaHandler {
  async handle(req, res, context) {
    const { sillas, pagado, pelicula } = req.body;
    const { funcion, usuario } = context;

    const nuevaReserva = new Reserva({
      pelicula,
      horario: funcion.horario,
      sala: funcion.sala,
      sillas,
      pagado,
      usuario
    });

    await nuevaReserva.save();
    return res.status(201).json({ message: 'Reserva creada exitosamente' });
  }
}

module.exports = CrearReservaHandler;
