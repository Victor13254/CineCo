const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  correo: { type: String, unique: true },
  contraseña: String,
  documento: String,
  fechaNacimiento: Date,
  celular: String,
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
