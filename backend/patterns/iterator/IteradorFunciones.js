class IteradorFunciones {
  constructor(funciones) {
    this.funciones = funciones;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.funciones.length;
  }

  next() {
    return this.hasNext() ? this.funciones[this.index++] : null;
  }

  reset() {
    this.index = 0;
  }
}

module.exports = IteradorFunciones;
