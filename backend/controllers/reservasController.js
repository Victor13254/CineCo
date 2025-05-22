const ValidarAutenticacionHandler = require('../patterns/chain/reservas/ValidarAutenticacionHandler');
const BuscarFuncionHandler = require('../patterns/chain/reservas/BuscarFuncionHandler');
const ValidarSillasHandler = require('../patterns/chain/reservas/ValidarSillasHandler');
const ActualizarFuncionHandler = require('../patterns/chain/reservas/ActualizarFuncionHandler');
const CrearReservaHandler = require('../patterns/chain/reservas/CrearReservaHandler');

const crearReserva = async (req, res) => {
  try {
    const handler = new ValidarAutenticacionHandler();
    handler
      .setNext(new BuscarFuncionHandler())
      .setNext(new ValidarSillasHandler())
      .setNext(new ActualizarFuncionHandler())
      .setNext(new CrearReservaHandler());

    await handler.handle(req, res, {});
  } catch (error) {
    console.error('Error al crear reserva:', error.message);
    res.status(500).json({ message: 'Error interno al crear la reserva' });
  }
};

module.exports = { crearReserva };
