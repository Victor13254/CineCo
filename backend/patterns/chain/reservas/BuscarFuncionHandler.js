const ReservaHandler = require('./reservaHandler');
const Funcion = require('../../../models/funcion');

class BuscarFuncionHandler extends ReservaHandler {
  async handle(req, res, context) {
    const { funcionId } = req.body;
    const funcion = await Funcion.findById(funcionId);
    if (!funcion) {
      return res.status(404).json({ message: 'Función no encontrada' });
    }
    context.funcion = funcion;
    return super.handle(req, res, context);
  }
}

module.exports = BuscarFuncionHandler;
