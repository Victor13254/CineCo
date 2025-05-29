const express = require('express');
const router = express.Router();
const { obtenerPerfil } = require('../controllers/userController');
const verificarToken = require('../middlewares/verificarToken');

router.get('/', verificarToken, obtenerPerfil);

module.exports = router;
