const express = require('express');
const router = express.Router();
const { crearReserva, obtenerReservasUsuario } = require('../controllers/reservasController');
const verificarToken = require('../auth/verificarToken');

router.post('/', verificarToken, crearReserva);
router.get('/usuario', verificarToken, obtenerReservasUsuario);

module.exports = router;
