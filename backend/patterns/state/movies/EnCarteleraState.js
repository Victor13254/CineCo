const EstadoPelicula = require('./EstadoPelicula');
const ProximamenteState = require('./ProximamenteState');

class EnCarteleraState extends EstadoPelicula {
  cambiarEstado(pelicula) {
    pelicula.setEstado(new ProximamenteState());
  }

  obtenerEstado() {
    return "cartelera";
  }
}

module.exports = EnCarteleraState;
