const express = require('express');
const router = express.Router();

// Importar el controlador de usuario
const usuarioControlador = require('../controller/usuarioControlador');

// Definir las rutas
router.get('/', usuarioControlador.getAllUsers);
router.get('/:id', usuarioControlador.getUserById);
router.post('/', usuarioControlador.createUser);
router.put('/:id', usuarioControlador.updateUser);
router.delete('/:id', usuarioControlador.deleteUser);

module.exports = router;
