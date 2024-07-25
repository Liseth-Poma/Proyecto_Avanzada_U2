const express = require('express');
const { conexionBDD, getDB } = require('./src/config/conexion');
const usuarioRutas = require('./src/routes/usuarioRutas');
const AppEnv = require('./src/config/appEnv');

const appEnv = new AppEnv(); // Cargar variables de entorno desde el archivo .env

const app = express();
app.use(express.json());

const PORT = appEnv.get('PORT') || 3000;

// Conectar a la base de datos
conexionBDD().then(() => {
  // Definir las rutas
  app.use('/api/users', usuarioRutas);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
