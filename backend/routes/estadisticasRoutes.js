const express = require('express');
const router = express.Router();
const Reserva = require('../models/reserva');
const Usuario = require('../models/usuario');
const Pelicula = require('../models/pelicula');

// Ruta: GET /api/estadisticas
router.get('/estadisticas', async (req, res) => {
  try {
    // Total de reservas
    const totalReservas = await Reserva.countDocuments();

    // Total de sillas reservadas
    const totalSillasReservadas = await Reserva.aggregate([
      { $group: { _id: null, total: { $sum: { $size: "$sillas" } } } }
    ]);

    // Total de usuarios
    const totalUsuarios = await Usuario.countDocuments();

    // Total de películas
    const totalPeliculas = await Pelicula.countDocuments();

    // Funciones por película
    const funcionesPorPelicula = await Pelicula.aggregate([
      {
        $project: {
          titulo: 1,
          totalFunciones: { $size: "$funciones" }
        }
      }
    ]);

    res.json({
      totalReservas,
      totalSillasReservadas: totalSillasReservadas[0]?.total || 0,
      totalUsuarios,
      totalPeliculas,
      funcionesPorPelicula
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

module.exports = router;
