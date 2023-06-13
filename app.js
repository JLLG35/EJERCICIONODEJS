const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

// Configuración de middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Configuración de rutas
const libraryRoutes = require('./routes/libraryRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/library', libraryRoutes);
app.use('/book', bookRoutes);
app.use('/user', userRoutes);

// Configuración de Passport
const Usuario = require('./models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    { usernameField: 'name', passwordField: 'password' },
    async (name, password, done) => {
        try {
            const usuario = await Usuario.findOne({ where: { name } });
            if (!usuario) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }
            if (usuario.password !== password) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
            return done(null, usuario);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await Usuario.findByPk(id);
        done(null, usuario);
    } catch (error) {
        done(error);
    }
});

// Inicio del servidor
app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});
