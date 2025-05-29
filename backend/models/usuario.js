const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  correo: { type: String, unique: true },
  contraseña: String,
  documento: String,
  fechaNacimiento: Date,
  celular: String,
  tipo: {
    type: String,
    enum: ['cliente', 'admin'],
    default: 'cliente'
  }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
