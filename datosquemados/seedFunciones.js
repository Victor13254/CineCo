const mongoose = require('mongoose');

// Subesquema para las sillas, con _id activado explícitamente
const sillaSchema = new mongoose.Schema({
  numero: String,
  tipo: {
    type: String,
    enum: ['normal', 'preferencial', 'discapacidad']
  },
  estado: {
    type: String,
    enum: ['disponible', 'ocupada', 'seleccionada'],
    default: 'disponible'
  }
}, { _id: true }); // Asegura que cada silla tenga un _id propio

// Esquema principal de la función

const FuncionSchema = new mongoose.Schema({
  sala: String,
  horario: Date,
  sillas: [sillaSchema],
}, { timestamps: true });

const Funcion = mongoose.model('Funcion', FuncionSchema);

// Generador de sillas
const generarSillas = (cantidadNormal, cantidadPreferencial, cantidadDiscapacidad = 0) => {
  const sillas = [];
  let contador = 1;

  for (let i = 0; i < cantidadNormal; i++) {
    sillas.push({
      numero: `N${contador++}`,
      tipo: 'normal',
      estado: 'disponible'
    });
  }

  for (let i = 0; i < cantidadPreferencial; i++) {
    sillas.push({
      numero: `P${contador++}`,
      tipo: 'preferencial',
      estado: 'disponible'
    });
  }

  for (let i = 0; i < cantidadDiscapacidad; i++) {
    sillas.push({
      numero: `D${contador++}`,
      tipo: 'discapacidad',
      estado: 'disponible'
    });
  }

  return sillas;
};

// Datos de ejemplo
const funcionesEjemplo = [
  {
    sala: 'Sala 1',
    horario: new Date(new Date().setHours(15, 0, 0, 0)),
    sillas: generarSillas(50, 20, 5)
  },
  {
    sala: 'Sala 2',
    horario: new Date(new Date().setHours(18, 0, 0, 0)),
    sillas: generarSillas(40, 15, 3)
  },
  {
    sala: 'Sala 3',
    horario: new Date(new Date().setHours(14, 0, 0, 0)),
    sillas: generarSillas(60, 25, 4)
  },
  {
    sala: 'Sala 4',
    horario: new Date(new Date().setHours(20, 0, 0, 0)),
    sillas: generarSillas(45, 10, 2)
  },
];

// Conexión y seed
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

// Ejecutar si se llama directamente
if (require.main === module) {
  seedFunciones();
}

module.exports = seedFunciones;
