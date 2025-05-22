const mongoose = require('mongoose');

const sillaSchema = new mongoose.Schema({
  numero: String,
  tipo: {
    type: String,
    enum: ['normal', 'preferencial', 'discapacidad']
  },
  estado: {
    type: String,
    enum: ['disponible', 'ocupada', 'seleccionada'],
    default: 'disponible'
  }
}, { _id: true });

const FuncionSchema = new mongoose.Schema({
  sala: String,
  horario: Date,
  sillas: [sillaSchema],
}, { timestamps: true });

module.exports = mongoose.model('Funcion', FuncionSchema);
