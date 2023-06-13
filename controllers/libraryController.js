const Libreria = require('../models/library');

// Middleware de autenticación
const autenticacionMiddleware = (req, res, next) => {
    // Verificar autenticación
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }
    next();
};

// Obtener todas las librerías
const obtenerLibrerias = async (req, res) => {
    try {
        const librerias = await Libreria.findAll();
        res.json(librerias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las librerías' });
    }
};

// Obtener una librería por ID
const obtenerLibreriaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const libreria = await Libreria.findByPk(id);
        res.json(libreria);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la librería' });
    }
};

// Crear una nueva librería
const crearLibreria = async (req, res) => {
    const { name, location, telefono } = req.body;
    try {
        const libreria = await Libreria.create({ name, location, telefono });
        res.json(libreria);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la librería' });
    }
};

// Modificar una librería por ID
const modificarLibreria = async (req, res) => {
    const { id } = req.params;
    const { name, location, telefono } = req.body;
    try {
        await Libreria.update({ name, location, telefono }, { where: { id } });
        res.json({ message: 'Librería modificada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al modificar la librería' });
    }
};

// Eliminar una librería por ID
const eliminarLibreria = async (req, res) => {
    const { id } = req.params;
    try {
        await Libreria.destroy({ where: { id } });
        res.json({ message: 'Librería eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la librería' });
    }
};

module.exports = {
    obtenerLibrerias: [autenticacionMiddleware, obtenerLibrerias],
    obtenerLibreriaPorId,
    crearLibreria: [autenticacionMiddleware, crearLibreria],
    modificarLibreria: [autenticacionMiddleware, modificarLibreria],
    eliminarLibreria: [autenticacionMiddleware, eliminarLibreria]
};
