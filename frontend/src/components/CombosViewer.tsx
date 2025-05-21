import React, { useEffect, useState } from 'react';

interface Combo {
  descripcion: string;
  precio: number;
}

const CombosViewer: React.FC = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Cargando combos...</p>;

  return (
    <div>
      <h2>Combos de Comida CineCo</h2>
      {combos.length === 0 ? (
        <p>No hay combos disponibles</p>
      ) : (
        <ul>
          {combos.map((combo, i) => (
            <li key={i}>
              <strong>{/*combo.nombre*/}</strong>: {combo.descripcion} — ${combo.precio}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CombosViewer;
