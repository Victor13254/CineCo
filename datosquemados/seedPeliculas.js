const mongoose = require('mongoose');

// Esquema de Película con campo `estado` incluido
const peliculaSchema = new mongoose.Schema({
  titulo: String,
  genero: String,
  duracion: Number,
  funciones: [
    {
      sala: String,
      horario: String,
    },
  ],
  estado: {
    type: String,
    enum: ['cartelera', 'pronto', 'fuera'],
    default: 'pronto',
  },
});

const Pelicula = mongoose.model('Pelicula', peliculaSchema);

// Películas con estado inicial
const peliculasEjemplo = [
  {
    titulo: 'Avengers: Endgame',
    genero: 'Acción',
    duracion: 181,
    funciones: [
      { sala: 'Sala 1', horario: '15:00' },
      { sala: 'Sala 2', horario: '18:00' },
    ],
    estado: 'cartelera',
  },
  {
    titulo: 'Spider-Man: No Way Home',
    genero: 'Aventura',
    duracion: 148,
    funciones: [
      { sala: 'Sala 3', horario: '14:00' },
      { sala: 'Sala 4', horario: '20:00' },
    ],
    estado: 'pronto',
  },
  {
    titulo: 'Dune',
    genero: 'Ciencia ficción',
    duracion: 155,
    funciones: [
      { sala: 'Sala 1', horario: '21:00' },
    ],
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

// Conexión a MongoDB Atlas
const uri = 'mongodb+srv://adminVictor:Victor13254@cluster0.igovi6x.mongodb.net/Cluster0?retryWrites=true&w=majority';

async function seed() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB Atlas');

    await Pelicula.deleteMany({});
    console.log('🧹 Películas anteriores eliminadas');

    await Pelicula.insertMany(peliculasEjemplo);
    console.log('🍿 Películas insertadas correctamente');

    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

seed();
