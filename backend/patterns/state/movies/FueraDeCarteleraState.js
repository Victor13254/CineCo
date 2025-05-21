const EstadoPelicula = require('./EstadoPelicula');
const EnCarteleraState = require('./EnCarteleraState');

class FueraDeCarteleraState extends EstadoPelicula {
  cambiarEstado(pelicula) {
    pelicula.setEstado(new EnCarteleraState());
  }

  obtenerEstado() {
    return "fuera";
  }
}

module.exports = FueraDeCarteleraState;
