const ReservaHandler = require('./reservaHandler');

class ValidarAutenticacionHandler extends ReservaHandler {
  async handle(req, res, context) {
    if (!req.userId) {
      return res.status(401).json({ message: 'No autorizado. Debe iniciar sesión.' });
    }
    context.usuario = req.userId;
    return super.handle(req, res, context);
  }
}

module.exports = ValidarAutenticacionHandler;
