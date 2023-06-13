const Usuario = require('../models/user');

// Registro de usuario
const registrarUsuario = async (req, res) => {
    const { name, password } = req.body;
    try {
        const usuario = await Usuario.create({ name, password });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Inicio de sesión
const iniciarSesion = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            // Si la autenticación es exitosa, aquí puedes generar y devolver el token de sesión
            return res.json({ message: 'Inicio de sesión exitoso' });
        });
    })(req, res, next);
};

module.exports = {
    registrarUsuario,
    iniciarSesion
};
