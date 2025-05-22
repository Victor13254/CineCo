const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  titulo: String,
  genero: String,
  duracion: Number,
  funciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Funcion',
    },
  ],
  estado: {
    type: String,
    enum: ['cartelera', 'pronto', 'fuera'],
    default: 'pronto',
  },
});

const Pelicula = mongoose.model('Pelicula', peliculaSchema);

const uri = 'mongodb+srv://adminVictor:Victor13254@cluster0.igovi6x.mongodb.net/Cluster0?retryWrites=true&w=majority';

async function seedPeliculas() {
  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado a MongoDB Atlas');

    await Pelicula.deleteMany({});
    console.log('🧹 Películas anteriores eliminadas');

    // Cambia estos IDs por los que te arroje seedFunciones.js
    const funcionesIds = [
      '682ea52d5da31c45a38f7738', // Sala 1 - 15:00
      '682ea52d5da31c45a38f7739', // Sala 2 - 18:00
      '682ea52d5da31c45a38f773a', // Sala 3 - 14:00
      '682ea52d5da31c45a38f773b', // Sala 4 - 20:00
    ];

    const peliculasEjemplo = [
      {
        titulo: 'Avengers: Endgame',
        genero: 'Acción',
        duracion: 181,
        funciones: [funcionesIds[0], funcionesIds[1]],
        estado: 'cartelera',
      },
      {
        titulo: 'Spider-Man: No Way Home',
        genero: 'Aventura',
        duracion: 148,
        funciones: [funcionesIds[2], funcionesIds[3]],
        estado: 'pronto',
      },
      {
        titulo: 'Dune',
        genero: 'Ciencia ficción',
        duracion: 155,
        funciones: [funcionesIds[0]],
        estado: 'cartelera',
      },
      {
        titulo: 'La La Land',
        genero: 'Musical',
        duracion: 128,
        funciones: [],
        estado: 'fuera',
      },
    ];

    await Pelicula.insertMany(peliculasEjemplo);
    console.log('🍿 Películas insertadas correctamente');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

if (require.main === module) {
  seedPeliculas();
}

module.exports = seedPeliculas;
