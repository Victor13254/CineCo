import React, { useEffect, useState } from 'react';

interface Silla {
  _id: string;
  numero: string;
  tipo: 'normal' | 'preferencial';
  estado: 'disponible' | 'ocupado';
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
}

interface Props {
  estado: 'cartelera' | 'pronto' | 'fuera';
  onSeleccionar: (pelicula: Pelicula) => void;
}

const IteratorViewer: React.FC<Props> = ({ estado, onSeleccionar }) => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/api/peliculas')
      .then(res => res.json())
      .then((data: { cartelera: Pelicula[] }) => {
        // The API returns movies in a "cartelera" array
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
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Película actual</h4>
      <p><strong>Título:</strong> {current.titulo}</p>
      <p><strong>Género:</strong> {current.genero}</p>
      <p><strong>Duración:</strong> {current.duracion} min</p>
      <button onClick={nextPelicula} className="btn btn-secondary me-2">Siguiente</button>
      <button onClick={() => onSeleccionar(current)} className="btn btn-primary">Seleccionar</button>
    </div>
  );
};

export default IteratorViewer;
