//const express = require('express');
//const router = express.Router();
//const { obtenerPeliculas } = require('../controllers/peliculasController');

//router.get('/', obtenerPeliculas);

//module.exports = router;


const express = require('express');
const router = express.Router();

// Simulamos datos de películas (puedes cambiar por consulta a BD)
const peliculas = [
  { title: 'El Padrino', genre: 'Drama', duration: 175 },
  { title: 'Matrix', genre: 'Ciencia ficción', duration: 136 },
  { title: 'Inception', genre: 'Thriller', duration: 148 }
];

// Ruta GET para devolver la lista
router.get('/', (req, res) => {
  res.json(peliculas);
});

module.exports = router;
