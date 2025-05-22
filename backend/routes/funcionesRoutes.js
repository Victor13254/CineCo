const express = require('express');
const router = express.Router();

const funcionesController = require('../controllers/funcionesController');

// Crear función
router.post('/', funcionesController.crearFuncion);

// Obtener todas las funciones
router.get('/', funcionesController.obtenerFunciones);

// Obtener función por ID
router.get('/:id', funcionesController.obtenerFuncionPorId);

// Actualizar función
router.put('/:id', funcionesController.actualizarFuncion);

// Eliminar función
router.delete('/:id', funcionesController.eliminarFuncion);

// Actualizar disponibilidad de sillas
router.patch('/:id/disponibilidad', funcionesController.actualizarDisponibilidad);

module.exports = router;
