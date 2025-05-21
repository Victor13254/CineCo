const express = require('express');
const router = express.Router();
const { crearReserva } = require('../controllers/reservasController');
const verificarToken = require('../auth/verificarToken');

router.post('/', verificarToken, crearReserva);

module.exports = router;
