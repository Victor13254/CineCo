import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


interface Funcion {
  _id: string;
  sala: string;
  horario: string;
}

interface Pelicula {
  id: string;
  titulo: string;
  genero: string;
  duracion: number;
  estado: string;
  funciones: Funcion[];
}

const ModificarPelicula: React.FC = () => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<Pelicula | null>(null);
  const [funciones, setFunciones] = useState<Funcion[]>([]);
  const [funcionesSeleccionadas, setFuncionesSeleccionadas] = useState<string[]>([]);
  const [imagen, setImagen] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const pelisRes = await fetch('http://localhost:4000/api/peliculas');
      const pelisData = await pelisRes.json();
      const todas = [...(pelisData.cartelera || []), ...(pelisData.pronto || []), ...(pelisData.fuera || [])];
      setPeliculas(todas);
      const funcionesRes = await fetch('http://localhost:4000/api/funciones');
      const funcionesData = await funcionesRes.json();
      setFunciones(funcionesData.funciones || funcionesData);
    };
    fetchData();
  }, []);

  const handleSeleccionPelicula = (id: string) => {
    const seleccionada = peliculas.find(p => p.id === id);
    if (seleccionada) {
      setPeliculaSeleccionada(seleccionada);
      setFuncionesSeleccionadas(seleccionada.funciones.map(f => f._id));
      setImagen(null);
    }
  };

  const toggleFuncion = (id: string) => {
    setFuncionesSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!peliculaSeleccionada) return;

    const formData = new FormData();
    formData.append('estado', peliculaSeleccionada.estado);
    funcionesSeleccionadas.forEach(id => formData.append('funciones', id));
    if (imagen) formData.append('imagen', imagen); // si decides permitir subir imagen

    const res = await fetch(`http://localhost:4000/api/peliculas/${peliculaSeleccionada.id}`, {
      method: 'PUT',
      body: formData,
    });

    if (res.ok) {
      toast.success('Película modificada correctamente');
      setTimeout(() => navigate('/Personal'), 2000); 
    } else {
      toast.error('Error al modificar la película');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <h2>Modificar Película</h2>

      <div className="mb-3">
        <label className="form-label">Selecciona una película</label>
        <select className="form-select" onChange={e => handleSeleccionPelicula(e.target.value)}>
          <option key="default" value="">-- Selecciona --</option>
          {peliculas.map(p => (
            <option key={p.id} value={p.id}>
              {p.titulo}
            </option>
          ))}
        </select>
      </div>

      {peliculaSeleccionada && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input className="form-control" value={peliculaSeleccionada.titulo} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Género</label>
            <input className="form-control" value={peliculaSeleccionada.genero} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Duración (minutos)</label>
            <input className="form-control" type="number" value={peliculaSeleccionada.duracion} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select
              className="form-select"
              value={peliculaSeleccionada.estado}
              onChange={e => setPeliculaSeleccionada({ ...peliculaSeleccionada, estado: e.target.value })}
              required
            >
              <option value="cartelera">Cartelera</option>
              <option value="pronto">Próximamente</option>
              <option value="fuera">Fuera de cartelera</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Funciones</label>
            {funciones.map(f => (
              <div className="form-check" key={f._id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={funcionesSeleccionadas.includes(f._id)}
                  onChange={() => toggleFuncion(f._id)}
                  id={`funcion-${f._id}`}
                />
                <label className="form-check-label" htmlFor={`funcion-${f._id}`}>
                  Sala {f.sala} - {new Date(f.horario).toLocaleString()}
                </label>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" type="submit">Guardar Cambios</button>
        </form>
      )}
    </div>
  );
};

export default ModificarPelicula;
