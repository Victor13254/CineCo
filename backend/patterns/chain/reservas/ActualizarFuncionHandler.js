const ReservaHandler = require('./reservaHandler');

class ActualizarFuncionHandler extends ReservaHandler {
  async handle(req, res, context) {
    await context.funcion.save();
    return super.handle(req, res, context);
  }
}

module.exports = ActualizarFuncionHandler;
