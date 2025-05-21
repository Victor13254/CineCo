class ContextoEstadoPelicula {
  constructor(estado) {
    this.estado = estado;
  }

  setEstado(estado) {
    this.estado = estado;
  }

  cambiarEstado() {
    this.estado.cambiarEstado(this);
  }

  obtenerEstado() {
    return this.estado.obtenerEstado();
  }
}

module.exports = ContextoEstadoPelicula;
