import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IteratorViewer from '../components/IteratorViewer';

interface Funcion {
  horario: string;
  sala: string;
}

interface Pelicula {
  titulo: string;
  genero: string;
  duracion: number;
  estado: 'cartelera' | 'pronto' | 'fuera';
  funciones: Funcion[];
}

const Reserva = () => {
  const [paso, setPaso] = useState(1);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<Pelicula | null>(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [sillasNormales, setSillasNormales] = useState(0);
  const [sillasPreferencial, setSillasPreferencial] = useState(0);
  const [pagado, setPagado] = useState(false);

  const navigate = useNavigate();

  const maxSillasNormales = 10;
  const maxSillasPreferencial = 5;
  const totalSillas = sillasNormales + sillasPreferencial;

  const continuar = () => setPaso(paso + 1);

  const enviarReserva = async () => {
    if (!peliculaSeleccionada || !horarioSeleccionado) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para hacer una reserva');
      navigate('/login'); // o donde tengas el login
      return;
    }

    const funcionSeleccionada = peliculaSeleccionada.funciones.find(
      (f) => f.horario === horarioSeleccionado
    );

    const reserva = {
      pelicula: peliculaSeleccionada.titulo,
      horario: funcionSeleccionada?.horario,
      sala: funcionSeleccionada?.sala,
      sillasNormales,
      sillasPreferenciales: sillasPreferencial,
      pagado
    };

    try {
      const response = await fetch('http://localhost:4000/api/reservas', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Aquí enviamos el token en el header
        },
        body: JSON.stringify(reserva)
      });

      if (response.ok) {
        alert('Reserva guardada con éxito');
        navigate('/home');
      } else {
        const data = await response.json();
        alert(data.message || 'Error al guardar la reserva');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error al conectar con el servidor');
    }
  };

  const renderPaso = () => {
    switch (paso) {
      case 1:
        return (
          <div>
            <h3>Paso 1: Escoge una película</h3>
            <IteratorViewer onSeleccionar={(pelicula: Pelicula) => setPeliculaSeleccionada(pelicula)} />
            {peliculaSeleccionada && (
              <div className="mt-3">
                <p className="text-success">Película seleccionada: {peliculaSeleccionada.titulo}</p>
                <button onClick={continuar} className="btn btn-success">Continuar</button>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div>
            <h3>Paso 2: Selecciona un horario</h3>
            {peliculaSeleccionada?.funciones?.length ? (
              <div>
                <select
                  value={horarioSeleccionado}
                  onChange={(e) => setHorarioSeleccionado(e.target.value)}
                  className="form-select mb-3"
                >
                  <option value="">--Seleccionar--</option>
                  {peliculaSeleccionada.funciones.map((funcion, idx) => (
                    <option key={idx} value={funcion.horario}>
                      {funcion.horario} - {funcion.sala}
                    </option>
                  ))}
                </select>
                {horarioSeleccionado && (
                  <button onClick={continuar} className="btn btn-success">Continuar</button>
                )}
              </div>
            ) : (
              <p className="text-warning">Esta película no tiene funciones disponibles.</p>
            )}
          </div>
        );

      case 3:
        return (
          <div>
            <h3>Paso 3: Selecciona tus sillas</h3>

            <div>
              <label>Sillas Normales</label>
              <div className="d-flex align-items-center gap-2">
                <button type="button" onClick={() => setSillasNormales(Math.max(0, sillasNormales - 1))}>-</button>
                <input type="text" value={sillasNormales} readOnly className="form-control w-auto text-center" />
                <button type="button" onClick={() => setSillasNormales(Math.min(maxSillasNormales, sillasNormales + 1))}>+</button>
              </div>
            </div>

            <div className="mt-3">
              <label>Sillas Preferenciales</label>
              <div className="d-flex align-items-center gap-2">
                <button type="button" onClick={() => setSillasPreferencial(Math.max(0, sillasPreferencial - 1))}>-</button>
                <input type="text" value={sillasPreferencial} readOnly className="form-control w-auto text-center" />
                <button type="button" onClick={() => setSillasPreferencial(Math.min(maxSillasPreferencial, sillasPreferencial + 1))}>+</button>
              </div>
            </div>

            {totalSillas > 0 && (
              <button onClick={continuar} className="btn btn-success mt-3">Continuar</button>
            )}
          </div>
        );

      case 4:
        return (
          <div>
            <h3>Paso 4: Confirmar pago</h3>
            <div className="form-check">
              <input
                type="checkbox"
                id="pagado"
                className="form-check-input"
                checked={pagado}
                onChange={() => setPagado(!pagado)}
              />
              <label className="form-check-label" htmlFor="pagado">Ya pagó</label>
            </div>
            <button
              onClick={enviarReserva}
              disabled={!pagado}
              className="btn btn-success mt-3"
            >
              Pagar
            </button>
          </div>
        );

      default:
        return <p>Proceso completado</p>;
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Reservar Función</h2>
      {renderPaso()}
    </div>
  );
};

export default Reserva;
