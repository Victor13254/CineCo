import CombosViewer from '../components/CombosViewer';

const Comida = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Películas que estuvieron en CineCo</h1>
        <p className="lead text-muted">
          Disfruta del mejor cine con nosotros.
        </p>
      </div>

      <div className="card shadow-sm p-4">
        <CombosViewer />
      </div>
    </div>
  );
};

export default Comida;
