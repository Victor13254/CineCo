const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('CineCo API funcionando 🎬');
});

// Conexión MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('🟢 Conectado a MongoDB Atlas');
}).catch((err) => {
  console.error('🔴 Error al conectar a MongoDB:', err);
});

const peliculasRoutes = require('./routes/peliculasRoutes');
app.use('/api/peliculas', peliculasRoutes);

const comidaRoutes = require('./routes/comidasRoutes');
app.use('/api/comidas', comidaRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const reservasRoutes = require('./routes/reservasRoutes');
app.use('/api/reservas', reservasRoutes);

const funcionesRoutes = require('./routes/funcionesRoutes');
app.use('/api/funciones', funcionesRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/perfil', userRoutes);

const estadisticasRoutes = require('./routes/estadisticasRoutes');
app.use('/api', estadisticasRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
