const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const {
  obtenerPeliculas,
  cambiarEstadoPelicula,
  crearPelicula,
  actualizarPelicula
} = require('../controllers/peliculasController');

router.get('/', obtenerPeliculas);
router.post('/', upload.single('imagen'), crearPelicula);
router.put('/:id/estado', cambiarEstadoPelicula);
router.put('/:id', upload.single('imagen'), actualizarPelicula); // NUEVA RUTA

module.exports = router;
