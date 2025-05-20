import React, { useEffect, useState } from 'react';

interface Pelicula {
  title: string;
  genre: string;
  duration: number;
}

const IteratorViewer: React.FC = () => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/api/peliculas')
      .then(res => res.json())
      .then(data => {
        console.log('Películas:', data);
        setPeliculas(data);
      })
      .catch(console.error);
  }, []);

  const nextPelicula = () => {
    setIndex((i) => (i + 1) % peliculas.length);
  };

  if (peliculas.length === 0) return <p>Cargando películas...</p>;

  const current = peliculas[index];

  return (
    <div>
      <h2>Película actual</h2>
      <p><strong>Título:</strong> {current.title}</p>
      <p><strong>Género:</strong> {current.genre}</p>
      <p><strong>Duración:</strong> {current.duration} min</p>
      <button onClick={nextPelicula}>Siguiente</button>
    </div>
  );
};

export default IteratorViewer;

