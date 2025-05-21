const EstadoPelicula = require('./EstadoPelicula');
const FueraDeCarteleraState = require('./FueraDeCarteleraState');

class ProximamenteState extends EstadoPelicula {
  cambiarEstado(pelicula) {
    pelicula.setEstado(new FueraDeCarteleraState());
  }

  obtenerEstado() {
    return "pronto";
  }
}

module.exports = ProximamenteState;
