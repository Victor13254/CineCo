const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
  titulo: String,
  genero: String,
  duracion: Number, // en minutos
  funciones: [       // Aquí se aplica el patrón Iterator
    {
      sala: String,
      horario: String
    }
  ],
  estado: {
    type: String,
    enum: ['cartelera', 'pronto', 'fuera'], // estados posibles
    default: 'pronto'
  }
});

module.exports = mongoose.model('Pelicula', PeliculaSchema);
