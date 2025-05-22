class ReservaHandler {
  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  async handle(req, res, context) {
    if (this.nextHandler) {
      return await this.nextHandler.handle(req, res, context);
    }
  }
}

module.exports = ReservaHandler;
