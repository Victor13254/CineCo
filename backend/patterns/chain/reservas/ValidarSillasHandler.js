const ReservaHandler = require('./reservaHandler');

class ValidarSillasHandler extends ReservaHandler {
  async handle(req, res, context) {
    const { sillas } = req.body;
    const funcion = context.funcion;

    for (const sillaSeleccionada of sillas) {
      const index = funcion.sillas.findIndex(s => s._id.toString() === sillaSeleccionada._id);
      if (index === -1) {
        return res.status(400).json({ message: `Silla con ID ${sillaSeleccionada._id} no encontrada` });
      }
      if (funcion.sillas[index].estado === 'ocupada') {
        return res.status(400).json({ message: `La silla ${funcion.sillas[index].numero} ya está ocupada` });
      }
      funcion.sillas[index].estado = 'ocupada';
    }

    return super.handle(req, res, context);
  }
}

module.exports = ValidarSillasHandler;
