const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
  titulo: String,
  genero: String,
  duracion: Number, // en minutos
  funciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Funcion'
    }
  ],
  estado: {
    type: String,
    enum: ['cartelera', 'pronto', 'fuera'], // estados posibles
    default: 'pronto'
  }
});

module.exports = mongoose.model('Pelicula', PeliculaSchema);
