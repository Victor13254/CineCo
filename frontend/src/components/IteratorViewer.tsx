import React, { useEffect, useState } from 'react';

interface Pelicula {
  titulo: string;
  genero: string;
  duracion: number;
  estado: 'cartelera' | 'pronto' | 'fuera';
  funciones: { horario: string; sala: string }[]; // Para pasos siguientes
}

interface Props {
  onSeleccionar: (pelicula: Pelicula) => void;
}

const IteratorViewer: React.FC<Props> = ({ onSeleccionar }) => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/api/peliculas')
      .then(res => res.json())
      .then(data => {
        setPeliculas(data.cartelera);
      })
      .catch(console.error);
  }, []);

  const nextPelicula = () => {
    setIndex((i) => (i + 1) % peliculas.length);
  };

  if (peliculas.length === 0) return <p>Cargando películas...</p>;

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
