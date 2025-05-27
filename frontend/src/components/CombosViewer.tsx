import React, { useEffect, useState } from 'react';

interface Combo {
  descripcion: string;
  precio: number;
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

  if (loading) return <p>Cargando combos...</p>;

  if (combos.length === 0) return <p>No hay combos disponibles</p>;

  const comboActual = combos[indexActual];

  return (
    <div>
      <h2>Combos de Comida CineCo</h2>
      <div>
        <p><strong>Descripción:</strong> {comboActual.descripcion}</p>
        <p><strong>Precio:</strong> ${comboActual.precio}</p>
        <button onClick={handleSiguiente} className="btn btn-primary">Siguiente</button>
      </div>
    </div>
  );
};

export default CombosViewer;
