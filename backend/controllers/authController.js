const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
require('dotenv').config();

const SECRET = process.env.SECRET_JWT;

const registrar = async (req, res) => {
  const {
    nombre,
    apellidos,
    correo,
    contraseña,
    documento,
    fechaNacimiento,
    celular
  } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ correo });
    const cedulaExistente = await Usuario.findOne({ documento });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }else if (cedulaExistente){
      return res.status(400).json({ error: 'El documento ya está registrado' });
    }

    const hash = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      apellidos,
      correo,
      contraseña: hash,
      documento,
      fechaNacimiento: new Date(fechaNacimiento),
      celular,
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el registro' });
  }
};

const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre }, SECRET, {
      expiresIn: '2h',
    });
    
    res.status(200).json({
      token,
      usuario: {
        nombre: `${usuario.nombre} ${usuario.apellidos}`,
        correo: usuario.correo,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en el login' });
  }
};

module.exports = { registrar, login };
