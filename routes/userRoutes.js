const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.post('/register', userController.registrarUsuario);
router.post('/login', passport.authenticate('local'), userController.iniciarSesion);

module.exports = router;
