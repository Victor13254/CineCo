import React, { useEffect, useState } from 'react';

interface Usuario {
  nombre: string;
  apellidos: string;
  correo: string;
  documento: string;
  fechaNacimiento: string;
  celular: string;
}

const GestionarPerfil: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:4000/api/perfil', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then(res => res.json())
      .then(data => {
        setUsuario(data.usuario);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar perfil:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando perfil...</p>;
  if (!usuario) return <p>No se pudo cargar la información del perfil.</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h2 className="text-center mb-4">Mi Perfil</h2>
      <div className="card">
        <div className="card-body d-flex flex-column gap-2">
          <div><strong>Nombre:</strong> {usuario.nombre} {usuario.apellidos}</div>
          <div><strong>Correo:</strong> {usuario.correo}</div>
          <div><strong>Documento:</strong> {usuario.documento}</div>
          <div><strong>Fecha de nacimiento:</strong> {new Date(usuario.fechaNacimiento).toLocaleDateString()}</div>
          <div><strong>Celular:</strong> {usuario.celular}</div>
        </div>
      </div>
    </div>

  );
};

export default GestionarPerfil;
