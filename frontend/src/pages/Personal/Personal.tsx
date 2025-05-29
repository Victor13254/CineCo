import React from 'react';

import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const opciones = [
  {
    titulo: 'Crear Películas',
    ruta: '/Crearpelicula',
    imagen: 'https://cdn-icons-png.flaticon.com/512/2949/2949449.png',
  },
  {
    titulo: 'Crear Funciones',
    ruta: '/Crearfuncion',
    imagen: 'https://cdn-icons-png.flaticon.com/512/3208/3208753.png',
  },
  {
    titulo: 'Modificar Películas',
    ruta: '/ModificarPelicula',
    imagen: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
  },
  {
    titulo: 'Estadísticas',
    ruta: '/Estadisticas',
    imagen: 'https://cdn-icons-png.flaticon.com/512/3106/3106773.png',
  },
  {
    titulo: 'Crear Usuarios',
    ruta: '/AdminRegister',
    imagen: 'https://cdn-icons-png.flaticon.com/512/1828/1828490.png',
  },
];

const Personal: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Panel de Personal</h2>
      <div className="row g-4 justify-content-center">
        {opciones.map((opcion, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 text-center shadow">
              <img
                src={opcion.imagen}
                className="card-img-top p-3"
                alt={opcion.titulo}
                style={{ height: '150px', objectFit: 'contain' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{opcion.titulo}</h5>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => navigate(opcion.ruta)}
                >
                  Ir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Personal;
