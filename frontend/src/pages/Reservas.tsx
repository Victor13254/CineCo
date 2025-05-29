import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IteratorViewer from '../components/IteratorViewer';
import { toast } from 'react-toastify';

interface Silla {
  _id: string;
  numero: string;
  tipo: 'normal' | 'preferencial';
  estado: 'disponible' | 'ocupada';
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
  imagen: string;
}

const Reserva = () => {
  const [paso, setPaso] = useState(1);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<Pelicula | null>(null);
  const [funcionSeleccionada, setFuncionSeleccionada] = useState<Funcion | null>(null);
  const [sillasSeleccionadas, setSillasSeleccionadas] = useState<Silla[]>([]);
  const [sillasNormales, setSillasNormales] = useState(0);
  const [sillasPreferencial, setSillasPreferencial] = useState(0);
  const [pagado, setPagado] = useState(false);

  const navigate = useNavigate();
  const totalSillas = sillasNormales + sillasPreferencial;

  const continuar = () => setPaso(paso + 1);

  useEffect(() => {
    if (peliculaSeleccionada && funcionSeleccionada) {
      const funcion = peliculaSeleccionada.funciones.find(
        (f) => f._id === funcionSeleccionada._id
      );
      if (funcion && funcion.sillas) {
        setFuncionSeleccionada(funcion);
      }
    }
  }, [peliculaSeleccionada, funcionSeleccionada?._id]);

  const enviarReserva = async () => {
    if (!peliculaSeleccionada || !funcionSeleccionada || sillasSeleccionadas.length === 0) {
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
      funcionId: funcionSeleccionada._id,
      horario: funcionSeleccionada.horario,
      sala: funcionSeleccionada.sala,
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
            <h3>Paso 2: Selecciona una función</h3>
            {peliculaSeleccionada?.funciones?.length ? (
              <div>
                <select
                  value={funcionSeleccionada?._id || ''}
                  onChange={(e) => {
                    const funcion = peliculaSeleccionada.funciones.find(f => f._id === e.target.value);
                    if (funcion) setFuncionSeleccionada(funcion);
                  }}
                  className="form-select mb-3"
                >
                  <option value="">--Seleccionar--</option>
                  {peliculaSeleccionada.funciones.map((funcion) => (
                    <option key={funcion._id} value={funcion._id}>
                      {funcion.horario} - {funcion.sala}
                    </option>
                  ))}
                </select>
                {funcionSeleccionada && (
                  <button onClick={continuar} className="btn btn-success">Continuar</button>
                )}
              </div>
            ) : (
              <p className="text-warning">Esta película no tiene funciones disponibles.</p>
            )}
          </div>
        );

      case 3:
        const disponiblesNormales = funcionSeleccionada?.sillas.filter(s => s.tipo === 'normal' && s.estado === 'disponible').length || 0;
        const disponiblesPreferenciales = funcionSeleccionada?.sillas.filter(s => s.tipo === 'preferencial' && s.estado === 'disponible').length || 0;

        return (
          <div>
            <h3>Paso 3: Selecciona la cantidad de sillas</h3>

            <div>
              <label>Sillas Normales (máx: {disponiblesNormales})</label>
              <div className="d-flex align-items-center gap-2">
                <button onClick={() => setSillasNormales(Math.max(0, sillasNormales - 1))}>-</button>
                <input type="text" value={sillasNormales} readOnly className="form-control w-auto text-center" />
                <button onClick={() => setSillasNormales(Math.min(disponiblesNormales, sillasNormales + 1))}>+</button>
              </div>
            </div>

            <div className="mt-3">
              <label>Sillas Preferenciales (máx: {disponiblesPreferenciales})</label>
              <div className="d-flex align-items-center gap-2">
                <button onClick={() => setSillasPreferencial(Math.max(0, sillasPreferencial - 1))}>-</button>
                <input type="text" value={sillasPreferencial} readOnly className="form-control w-auto text-center" />
                <button onClick={() => setSillasPreferencial(Math.min(disponiblesPreferenciales, sillasPreferencial + 1))}>+</button>
              </div>
            </div>

            {totalSillas > 0 && (
              <button onClick={continuar} className="btn btn-success mt-3">Continuar</button>
            )}
          </div>
        );

            case 4:
        const maxNormales = sillasNormales;
        const maxPreferenciales = sillasPreferencial;

        const seleccionadasNormales = sillasSeleccionadas.filter(s => s.tipo === 'normal').length;
        const seleccionadasPreferenciales = sillasSeleccionadas.filter(s => s.tipo === 'preferencial').length;

        const toggleSeleccionSilla = (silla: Silla) => {
          const yaSeleccionada = sillasSeleccionadas.find((s) => s._id === silla._id);
          if (yaSeleccionada) {
            setSillasSeleccionadas(sillasSeleccionadas.filter((s) => s._id !== silla._id));
          } else {
            if (silla.tipo === 'normal' && seleccionadasNormales >= maxNormales) {
              toast.warn(`Ya seleccionaste todas las sillas normales permitidas (${maxNormales})`);
              return;
            }

            if (silla.tipo === 'preferencial' && seleccionadasPreferenciales >= maxPreferenciales) {
              toast.warn(`Ya seleccionaste todas las sillas preferenciales permitidas (${maxPreferenciales})`);
              return;
            }

            setSillasSeleccionadas([...sillasSeleccionadas, silla]);
          }
        };

        return (
          <div>
            <h3>Paso 4: Selección gráfica de sillas</h3>
            <p><strong>Permitidas:</strong> {maxNormales} normales, {maxPreferenciales} preferenciales</p>
            <p><strong>Seleccionadas:</strong> {seleccionadasNormales} normales, {seleccionadasPreferenciales} preferenciales</p>
            <div className="d-flex flex-wrap gap-2">
              {funcionSeleccionada?.sillas.map((silla) => {
                const esSeleccionada = sillasSeleccionadas.find((s) => s._id === silla._id);
                const clase =
                  silla.estado === 'ocupada'
                    ? 'btn btn-danger'
                    : esSeleccionada
                      ? 'btn btn-warning'
                      : silla.tipo === 'normal'
                        ? 'btn btn-outline-primary'
                        : 'btn btn-outline-success';

                return (
                  <button
                    key={silla._id}
                    className={`${clase} silla`}
                    disabled={silla.estado === 'ocupada'}
                    onClick={() => toggleSeleccionSilla(silla)}
                  >
                    {silla.numero}
                  </button>
                );
              })}
            </div>

            {seleccionadasNormales === maxNormales &&
              seleccionadasPreferenciales === maxPreferenciales && (
                <button onClick={continuar} className="btn btn-success mt-3">Confirmar y continuar</button>
              )}
          </div>
        );


      case 5:
        return (
          <div>
            <h3>Paso 5: Confirmación</h3>
            <p><strong>Película:</strong> {peliculaSeleccionada?.titulo}</p>
            <p><strong>Horario:</strong> {funcionSeleccionada?.horario}</p>
            <p><strong>Sala:</strong> {funcionSeleccionada?.sala}</p>
            <p><strong>Sillas seleccionadas:</strong> {sillasSeleccionadas.map(s => s.numero).join(', ')}</p>

            <button onClick={continuar} className="btn btn-success mt-3">Confirmar y continuar</button>
          </div>
        );

      case 6:
        return (
          <div>
            <h3>Paso 6: Confirmar pago</h3>
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
