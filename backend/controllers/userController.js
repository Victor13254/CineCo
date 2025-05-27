const Usuario = require('../models/usuario');

const obtenerPerfil = async (req, res) => {
  try {
    const usuarioId = req.userId;
    
    const usuario = await Usuario.findById(usuarioId).select('-contraseña'); // Excluye contraseña
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ usuario });
  } catch (error) {
    console.error('Error al obtener perfil:', error.message);
    res.status(500).json({ error: 'Error interno' }); 
  }
};

module.exports = { obtenerPerfil };
