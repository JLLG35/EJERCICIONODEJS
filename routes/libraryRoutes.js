const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');

router.get('/', libraryController.obtenerLibrerias);
router.get('/:id', libraryController.obtenerLibreriaPorId);
router.post('/', libraryController.crearLibreria);
router.put('/:id', libraryController.modificarLibreria);
router.delete('/:id', libraryController.eliminarLibreria);

module.exports = router;

