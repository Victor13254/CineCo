import React, { useEffect, useState } from 'react';

interface Silla {
  _id: string;
  numero: string;
  tipo: 'normal' | 'preferencial';
  estado: 'disponible' | 'ocupada';
}

interface Funcion {
  _id: string;
  horario: string;
  sala: string;
  sillas: Silla[];
}

interface Pelicula {
  titulo: string;
  genero: string;
  duracion: number;
  estado: 'cartelera' | 'pronto' | 'fuera';
  funciones: Funcion[];
  imagen: string;
}

interface Props {
  estado: 'cartelera' | 'pronto' | 'fuera';
  onSeleccionar?: (pelicula: Pelicula) => void;
}

const IteratorViewer: React.FC<Props> = ({ estado, onSeleccionar }) => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/api/peliculas')
      .then(res => res.json())
      .then((data: { cartelera: Pelicula[] }) => {
        const allMovies = data.cartelera;
        const filtradas = allMovies.filter(p => p.estado === estado);
        setPeliculas(filtradas);
      })
      .catch(console.error);
  }, [estado]);

  const nextPelicula = () => {
    setIndex((i) => (i + 1) % peliculas.length);
  };

  if (peliculas.length === 0) return <p>No hay películas en estado "{estado}".</p>;

  const current = peliculas[index];

return (
  <div className="card p-4 shadow-sm" style={{ maxWidth: '350px', margin: 'auto' }}>
    <h4 className="mb-4 text-center fw-semibold">Película actual</h4>

    <div className="text-center mb-4">
      <img
        src={current.imagen}
        alt={current.titulo}
        className="img-fluid rounded"
        style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover' }}
      />
    </div>

    <p><strong>Título:</strong> {current.titulo}</p>
    <p><strong>Género:</strong> {current.genero}</p>
    <p><strong>Duración:</strong> {current.duracion} min</p>

    <div className="d-flex justify-content-between mt-4">
      <button onClick={nextPelicula} className="btn btn-outline-secondary px-4">
        Siguiente
      </button>

      {onSeleccionar ? (
        <button onClick={() => onSeleccionar(current)} className="btn btn-primary px-4">
          Seleccionar
        </button>
      ) : (
        <div></div>
      )}
    </div>
  </div>
);


};

export default IteratorViewer;
