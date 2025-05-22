const express = require('express');
const router = express.Router();
const funcionController = require('../controllers/funcionesController');

router.post('/', funcionController.crearFuncion);
router.get('/', funcionController.obtenerFunciones);
router.get('/:id', funcionController.obtenerFuncionPorId);
router.put('/:id', funcionController.actualizarFuncion);
router.delete('/:id', funcionController.eliminarFuncion);

// Ruta para actualizar el estado de las sillas
router.put('/:id/sillas', funcionController.actualizarSillas);

module.exports = router;
