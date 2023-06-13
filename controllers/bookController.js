const Library = require('../models/library');


// Obtener todos los libros
const obtenerLibros = async (req, res) => {
    try {
        const libros = await Libro.findAll();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
};

// Obtener un libro por ID
const obtenerLibroPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const libro = await Libro.findByPk(id);
        res.json(libro);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el libro' });
    }
};

// Crear un nuevo libro
const crearLibro = async (req, res) => {
    const { isbn, titulo, autor, year, libraryId } = req.body;
    try {
        const libro = await Libro.create({ isbn, titulo, autor, year, libraryId });
        res.json(libro);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el libro' });
    }
};

// Modificar un libro por ID
const modificarLibro = async (req, res) => {
    const { id } = req.params;
    const { isbn, titulo, autor, year, libraryId } = req.body;
    try {
        await Libro.update({ isbn, titulo, autor, year, libraryId }, { where: { id } });
        res.json({ message: 'Libro modificado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al modificar el libro' });
    }
};

// Eliminar un libro por ID
const eliminarLibro = async (req, res) => {
    const { id } = req.params;
    try {
        await Libro.destroy({ where: { id } });
        res.json({ message: 'Libro eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el libro' });
    }
};

module.exports = {
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    modificarLibro,
    eliminarLibro
};
