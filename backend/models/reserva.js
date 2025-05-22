const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  pelicula: String,
  horario: String,
  sala: String,
  sillas: [
    {
      numero: String,
      tipo: String
    }
  ],

  pagado: Boolean,
  fecha: { type: Date, default: Date.now },
  usuario: { type: String, required: true } // Aquí guardas el id o documento del usuario
});

module.exports = mongoose.model('Reserva', reservaSchema);
