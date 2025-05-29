const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
  titulo: String,
  genero: String,
  duracion: Number,
  estado: {
    type: String,
    enum: ['cartelera', 'pronto', 'fuera'],
    default: 'cartelera'
  },
  funciones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Funcion' }],
  imagen: String 
}, { timestamps: true });

module.exports = mongoose.model('Pelicula', PeliculaSchema);
