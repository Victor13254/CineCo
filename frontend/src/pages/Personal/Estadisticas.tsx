import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Estadisticas {
  totalReservas: number;
  totalSillasReservadas: number;
  totalUsuarios: number;
  totalPeliculas: number;
  funcionesPorPelicula: { titulo: string; totalFunciones: number }[];
}

const PaginaEstadisticas: React.FC = () => {
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch('http://localhost:4000/api/estadisticas')
      .then(res => res.json())
      .then(data => setEstadisticas(data))
      .catch(err => console.error('Error al cargar estadísticas:', err));
  }, []);

  if (!estadisticas) return <p>Cargando estadísticas...</p>;
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setTimeout(() => navigate('/Personal'), 2000); 
  
  };    
  return (
    <div className="container mt-4">
      <h2>📊 Estadísticas Generales</h2>
      <ul className="list-group mb-4">
        <li className="list-group-item">Reservas totales: {estadisticas.totalReservas}</li>
        <li className="list-group-item">Sillas reservadas: {estadisticas.totalSillasReservadas}</li>
        <li className="list-group-item">Usuarios registrados: {estadisticas.totalUsuarios}</li>
        <li className="list-group-item">Películas disponibles: {estadisticas.totalPeliculas}</li>
      </ul>
      <h4>🎬 Funciones por Película</h4>
      <ul className="list-group">
        {estadisticas.funcionesPorPelicula.map(pelicula => (
          <li key={pelicula.titulo} className="list-group-item">
            {pelicula.totalFunciones} funciones para <strong>{pelicula.titulo}</strong>
          </li>
        ))}
      </ul>
      
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
      <button className="btn btn-primary" type="submit">Volver</button></form>
    </div></div>
  );
};

export default PaginaEstadisticas;
