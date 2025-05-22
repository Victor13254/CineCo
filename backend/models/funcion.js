const mongoose = require('mongoose');

const FuncionSchema = new mongoose.Schema({
  sala: String,
  horario: Date,
  sillasNormalesTotales: Number,
  sillasNormalesDisponibles: Number,
  sillasPreferencialesTotales: Number,
  sillasPreferencialesDisponibles: Number,
}, { timestamps: true });

module.exports = mongoose.model('Funcion', FuncionSchema);
