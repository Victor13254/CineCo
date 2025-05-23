import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IteratorViewer from '../components/IteratorViewer';
import { toast } from 'react-toastify';

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

const Reserva = () => {
  const [paso, setPaso] = useState(1);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<Pelicula | null>(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  const [funcionSeleccionada, setFuncionSeleccionada] = useState<Funcion | null>(null);

  const [maxSillasNormales, setMaxSillasNormales] = useState(0);
  const [maxSillasPreferencial, setMaxSillasPreferencial] = useState(0);
  const [sillasSeleccionadas, setSillasSeleccionadas] = useState<Silla[]>([]);

  const [sillasNormales, setSillasNormales] = useState(0);
  const [sillasPreferencial, setSillasPreferencial] = useState(0);
  const [pagado, setPagado] = useState(false);

  const navigate = useNavigate();
  const totalSillas = sillasNormales + sillasPreferencial;

  const continuar = () => setPaso(paso + 1);

  useEffect(() => {
    if (peliculaSeleccionada && horarioSeleccionado) {
      const funcion = peliculaSeleccionada.funciones.find(
        (f) => f.horario === horarioSeleccionado
      );
      if (funcion && funcion.sillas) {
        setFuncionSeleccionada(funcion);
        const normales = funcion.sillas.filter((s) => s.tipo === 'normal' && s.estado === 'disponible').length;
        const preferenciales = funcion.sillas.filter((s) => s.tipo === 'preferencial' && s.estado === 'disponible').length;
        setMaxSillasNormales(normales);
        setMaxSillasPreferencial(preferenciales);
      }
    }
  }, [peliculaSeleccionada, horarioSeleccionado]);


  const enviarReserva = async () => {
    if (!peliculaSeleccionada || !horarioSeleccionado || sillasSeleccionadas.length === 0) {
      toast.error("Debes seleccionar al menos una silla");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Debes iniciar sesión para hacer una reserva');
      navigate('/login');
      return;
    }

    const reserva = {
      pelicula: peliculaSeleccionada.titulo,
      funcionId: funcionSeleccionada?._id, // <--- necesario
      horario: funcionSeleccionada?.horario,
      sala: funcionSeleccionada?.sala,
      sillas: sillasSeleccionadas.map((s) => ({
        _id: s._id,
        numero: s.numero,
        tipo: s.tipo
      })),

      pagado
    };


    try {
      const response = await fetch('http://localhost:4000/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reserva)
      });

      if (response.ok) {
        toast.success('Reserva guardada con éxito');
        navigate('/home');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Error al guardar la reserva');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      toast.error('Error al conectar con el servidor');
    }
  };


  const renderPaso = () => {
    switch (paso) {
      case 1:
        return (
          <div>
            <h3>Paso 1: Escoge una película</h3>
            <IteratorViewer estado="cartelera" onSeleccionar={(pelicula: Pelicula) => setPeliculaSeleccionada(pelicula)} />
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
              <label>Sillas Normales (máx: {maxSillasNormales})</label>
              <div className="d-flex align-items-center gap-2">
                <button type="button" onClick={() => setSillasNormales(Math.max(0, sillasNormales - 1))}>-</button>
                <input type="text" value={sillasNormales} readOnly className="form-control w-auto text-center" />
                <button type="button" onClick={() => setSillasNormales(Math.min(maxSillasNormales, sillasNormales + 1))}>+</button>
              </div>
            </div>

            <div className="mt-3">
              <label>Sillas Preferenciales (máx: {maxSillasPreferencial})</label>
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
      // Paso 4 en renderPaso():
      case 4:
        const maxSeleccion = sillasNormales + sillasPreferencial;

        const toggleSeleccionSilla = (silla: Silla) => {
          const yaSeleccionada = sillasSeleccionadas.find((s) => s._id === silla._id);
          if (yaSeleccionada) {
            setSillasSeleccionadas(sillasSeleccionadas.filter((s) => s._id !== silla._id));
          } else {
            if (sillasSeleccionadas.length < maxSeleccion) {
              setSillasSeleccionadas([...sillasSeleccionadas, silla]);
            } else {
              toast.warn('Ya seleccionaste el número máximo de sillas');
            }
          }
        };

        return (
          <div>
            <h3>Paso 4: Selecciona tus sillas específicas</h3>
            <p><strong>Total permitido:</strong> {maxSeleccion}</p>
            <div className="d-flex flex-wrap gap-2">
              {funcionSeleccionada?.sillas.map((silla) => {
                const esSeleccionada = sillasSeleccionadas.find((s) => s._id === silla._id);
                const clase =
                  silla.estado === 'ocupado'
                    ? 'btn btn-secondary'
                    : esSeleccionada
                      ? 'btn btn-warning'
                      : silla.tipo === 'normal'
                        ? 'btn btn-outline-primary'
                        : 'btn btn-outline-success';

                return (
                  <button
                    key={silla._id}
                    className={`${clase} silla`}
                    disabled={silla.estado === 'ocupado'}
                    onClick={() => toggleSeleccionSilla(silla)}
                  >
                    {silla.numero}
                  </button>
                );
              })}
            </div>

            {sillasSeleccionadas.length === maxSeleccion && (
              <button onClick={continuar} className="btn btn-success mt-3">Confirmar y continuar</button>
            )}
          </div>
        );


      case 5:
        return (
          <div>
            <h3>Paso 4: Confirmación de selección</h3>
            <p><strong>Película:</strong> {peliculaSeleccionada?.titulo}</p>
            <p><strong>Horario:</strong> {horarioSeleccionado}</p>
            <p><strong>Sala:</strong> {funcionSeleccionada?.sala}</p>
            <p><strong>Sillas Normales:</strong> {sillasNormales}</p>
            <p><strong>Sillas Preferenciales:</strong> {sillasPreferencial}</p>

            <button onClick={continuar} className="btn btn-success mt-3">Confirmar y continuar</button>
          </div>
        );

      case 6:
        return (
          <div>
            <h3>Paso 5: Confirmar pago</h3>
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
              Finalizar reserva
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
