const mongoose = require('mongoose');

const funcionSchema = new mongoose.Schema({
  sala: String,
  horario: Date,
  cantidadSillasNormales: Number,
  sillasNormalesDisponibles: Number,
  cantidadSillasPreferenciales: Number,
  sillasPreferencialesDisponibles: Number,
});

const Funcion = mongoose.model('Funcion', funcionSchema);
const funcionesEjemplo = [
  {
    sala: 'Sala 1',
    horario: new Date(new Date().setHours(15, 0, 0, 0)), // 15:00
    cantidadSillasNormales: 50,
    sillasNormalesDisponibles: 50,
    cantidadSillasPreferenciales: 20,
    sillasPreferencialesDisponibles: 20,
  },
  {
    sala: 'Sala 2',
    horario: new Date(new Date().setHours(18, 0, 0, 0)), // 18:00
    cantidadSillasNormales: 40,
    sillasNormalesDisponibles: 40,
    cantidadSillasPreferenciales: 15,
    sillasPreferencialesDisponibles: 15,
  },
  {
    sala: 'Sala 3',
    horario: new Date(new Date().setHours(14, 0, 0, 0)), // 14:00
    cantidadSillasNormales: 60,
    sillasNormalesDisponibles: 60,
    cantidadSillasPreferenciales: 25,
    sillasPreferencialesDisponibles: 25,
  },
  {
    sala: 'Sala 4',
    horario: new Date(new Date().setHours(20, 0, 0, 0)), // 20:00
    cantidadSillasNormales: 45,
    sillasNormalesDisponibles: 45,
    cantidadSillasPreferenciales: 10,
    sillasPreferencialesDisponibles: 10,
  },
];

const uri = 'mongodb+srv://adminVictor:Victor13254@cluster0.igovi6x.mongodb.net/Cluster0?retryWrites=true&w=majority';

async function seedFunciones() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB Atlas');

    await Funcion.deleteMany({});
    console.log('🧹 Funciones anteriores eliminadas');

    const funcionesInsertadas = await Funcion.insertMany(funcionesEjemplo);
    console.log('🍿 Funciones insertadas correctamente');

    mongoose.disconnect();

    return funcionesInsertadas;
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

if (require.main === module) {
  seedFunciones();
}

module.exports = seedFunciones;
