// backend/routes/comidaRoutes.js

const express = require('express');
const router = express.Router();
const comidaController = require('../controllers/comidaController');

// Ruta para obtener todos los combos
router.get('/', comidaController.getCombos);

module.exports = router;
