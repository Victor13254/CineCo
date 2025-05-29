import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CrearFuncion: React.FC = () => {
  const [sala, setSala] = useState('');
  const [horario, setHorario] = useState('');
  const [normales, setNormales] = useState('');
  const [preferenciales, setPreferenciales] = useState('');
  const [discapacidad, setDiscapacidad] = useState('');
 const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cantidadNormales = parseInt(normales, 10) || 0;
    const cantidadPreferenciales = parseInt(preferenciales, 10) || 0;
    const cantidadDiscapacidad = parseInt(discapacidad, 10) || 0;

    const payload = {
      sala,
      horario, // Se envía como string "HH:mm", y el backend lo convierte a Date
      cantidadSillasNormales: cantidadNormales,
      cantidadSillasPreferenciales: cantidadPreferenciales,
      cantidadSillasDiscapacidad: cantidadDiscapacidad
    };

    const res = await fetch('http://localhost:4000/api/funciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success('Función creada exitosamente');
      setSala('');
      setHorario('');
      setNormales('');
      setPreferenciales('');
      setDiscapacidad('');
      setTimeout(() => navigate('/Personal'), 2000); 
    } else {
      toast.error('Error al crear función');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '500px' }}>
      <h2>Crear Función</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Sala</label>
          <input className="form-control" value={sala} onChange={e => setSala(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Horario</label>
          <input className="form-control" type="time" value={horario} onChange={e => setHorario(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Sillas Normales</label>
          <input className="form-control" type="number" min={0} value={normales} onChange={e => setNormales(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Sillas Preferenciales</label>
          <input className="form-control" type="number" min={0} value={preferenciales} onChange={e => setPreferenciales(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Sillas para Discapacidad</label>
          <input className="form-control" type="number" min={0} value={discapacidad} onChange={e => setDiscapacidad(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit">Crear Función</button>
      </form>
    </div>
  );
};

export default CrearFuncion;
