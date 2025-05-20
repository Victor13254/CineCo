const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
  titulo: String,
  genero: String,
  duracion: Number, // en minutos
  funciones: [       // Aquí se aplicará el patrón Iterator
    {
      sala: String,
      horario: String
    }
  ]
});

module.exports = mongoose.model('Pelicula', PeliculaSchema);
