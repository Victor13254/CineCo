import React, { useEffect, useState } from 'react';

interface Reserva {
  _id: string;
  pelicula: string;
  horario: string;
  sala: string;
  sillas: { numero: string; tipo: string }[];
  pagado: boolean;
  fecha: string;
}

const GestionReservas: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:4000/api/reservas/usuario', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setReservas(data.reservas);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al obtener reservas:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando reservas...</p>;

  if (reservas.length === 0) return <p>No tienes reservas registradas.</p>;

  return (
    <div className="container mt-4">
  <h2 className="text-center mb-4">Mis Reservas</h2>
  <div className="d-flex flex-wrap gap-3 justify-content-center">
    {reservas.map((reserva) => (
      <div
        key={reserva._id}
        className="card shadow-sm p-3"
        style={{ width: '250px' }}
      >
        <div className="card-body">
          <h5 className="card-title">{reserva.pelicula}</h5>
          <p className="card-text"><strong>Sala:</strong> {reserva.sala}</p>
          <p className="card-text"><strong>Horario:</strong> {reserva.horario}</p>
          <p className="card-text"><strong>Fecha:</strong> {new Date(reserva.fecha).toLocaleString()}</p>
          <p className="card-text"><strong>Pagado:</strong> {reserva.pagado ? 'Sí' : 'No'}</p>
          <p className="card-text"><strong>Sillas:</strong></p>
          <ul className="list-unstyled">
            {reserva.sillas.map((silla, index) => (
              <li key={index}>{silla.numero} ({silla.tipo})</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default GestionReservas;
