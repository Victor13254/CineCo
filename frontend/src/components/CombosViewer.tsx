import React, { useEffect, useState } from 'react';

interface Combo {
  descripcion: string;
  precio: number;
  imagen: string; // URL o base64 string
}

const CombosViewer: React.FC = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const [indexActual, setIndexActual] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/api/comidas')
      .then(res => res.json())
      .then(data => {
        setCombos(data.combos);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar combos:', err);
        setLoading(false);
      });
  }, []);

  const handleSiguiente = () => {
    setIndexActual((prev) => (prev + 1) % combos.length);
  };

  if (loading) return <p className="text-center mt-4">Cargando combos...</p>;

  if (combos.length === 0) return <p className="text-center mt-4">No hay combos disponibles</p>;

  const comboActual = combos[indexActual];

  return (
    <div className="card mx-auto shadow-sm p-4" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Combos de Comida CineCo</h2>

      <div className="text-center mb-3">
        <img
          src={comboActual.imagen}
          alt={`Combo: ${comboActual.descripcion}`}
          className="img-fluid rounded"
          style={{ maxHeight: '250px', objectFit: 'cover', width: '100%' }}
        />
      </div>

      <p><strong>Descripción:</strong> {comboActual.descripcion}</p>
      <p><strong>Precio:</strong> ${comboActual.precio.toFixed(2)}</p>

      <div className="d-flex justify-content-center mt-4">
        <button onClick={handleSiguiente} className="btn btn-primary px-4">
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CombosViewer;
