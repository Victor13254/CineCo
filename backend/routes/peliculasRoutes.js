const express = require('express');
const router = express.Router();
const {
  obtenerPeliculas,
  cambiarEstadoPelicula
} = require('../controllers/peliculasController');

router.get('/', obtenerPeliculas);
router.post('/cambiar-estado/:id', cambiarEstadoPelicula);

module.exports = router;
