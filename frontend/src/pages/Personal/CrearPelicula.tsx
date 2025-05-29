import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Funcion {
  _id: string;
  sala: string;
  horario: string;
}

const CrearPelicula: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [duracion, setDuracion] = useState('');
  const [estado, setEstado] = useState('cartelera');
  const [funciones, setFunciones] = useState<Funcion[]>([]);
  const [funcionesSeleccionadas, setFuncionesSeleccionadas] = useState<string[]>([]);
  const [imagen, setImagen] = useState<File | null>(null);
 const navigate = useNavigate();

  useEffect(() => {
  const fetchFuncionesDisponibles = async () => {
    try {
      const [resFunciones, resPeliculas] = await Promise.all([
        fetch('http://localhost:4000/api/funciones'),
        fetch('http://localhost:4000/api/peliculas'),
      ]);

      const dataFunciones = await resFunciones.json();
      const dataPeliculas = await resPeliculas.json();

      const funcionesRegistradas = new Set<string>();
      dataPeliculas.cartelera?.forEach((peli: any) => {
        peli.funciones.forEach((func: any) => funcionesRegistradas.add(func._id));
      });

      const disponibles = (Array.isArray(dataFunciones) ? dataFunciones : dataFunciones.funciones || [])
        .filter((func: Funcion) => !funcionesRegistradas.has(func._id));

      setFunciones(disponibles);
    } catch (err) {
      console.error(err);
    }
  };

  fetchFuncionesDisponibles();
}, []);


  const toggleSeleccion = (id: string) => {
    setFuncionesSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('genero', genero);
    formData.append('duracion', duracion);
    formData.append('estado', estado);
    funcionesSeleccionadas.forEach(f => formData.append('funciones', f));
    if (imagen) formData.append('imagen', imagen);

    const res = await fetch('http://localhost:4000/api/peliculas', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      toast.success('Película creada exitosamente');
      setTitulo('');
      setGenero('');
      setDuracion('');
      setEstado('cartelera');
      setFuncionesSeleccionadas([]);
      setImagen(null);
      setTimeout(() => navigate('/Personal'), 2000); 
    } else {
      toast.error('Error al crear película');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2>Crear Película</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input className="form-control" value={titulo} onChange={e => setTitulo(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Género</label>
          <input className="form-control" value={genero} onChange={e => setGenero(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Duración (minutos)</label>
          <input className="form-control" type="number" min={1} value={duracion} onChange={e => setDuracion(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select className="form-select" value={estado} onChange={e => setEstado(e.target.value)} required>
            <option value="cartelera">Cartelera</option>
            <option value="pronto">Próximamente</option>
            <option value="fuera">Fuera de cartelera</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input className="form-control" type="file" accept="image/*" onChange={e => {
            if (e.target.files?.[0]) setImagen(e.target.files[0]);
          }} />
        </div>
        <div className="mb-3">
          <label className="form-label">Funciones disponibles</label>
          {funciones.map(f => (
            <div className="form-check" key={f._id}>
              <input
                type="checkbox"
                className="form-check-input"
                checked={funcionesSeleccionadas.includes(f._id)}
                onChange={() => toggleSeleccion(f._id)}
                id={`func-${f._id}`}
              />
              <label className="form-check-label" htmlFor={`func-${f._id}`}>
                Sala {f.sala} - {new Date(f.horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </label>
            </div>
          ))}
        </div>
        <button className="btn btn-success" type="submit">Crear Película</button>
      </form>
    </div>
  );
};

export default CrearPelicula;
