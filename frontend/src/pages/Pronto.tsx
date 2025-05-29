import { Link } from 'react-router-dom';
import IteratorViewer from '../components/IteratorViewer';

const Pronto = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Proximas Peliculas en CineCo</h1>
        <p className="lead text-muted">Disfruta del mejor cine con nosotros.</p>
      </div>

      <div className="card shadow-sm p-4 mb-5">
        <IteratorViewer estado="pronto" />
      </div>

      <div className="text-center">
        <Link
          to="/reservas"
          className="btn btn-lg btn-primary px-5 shadow"
          style={{ fontWeight: '600' }}
        >
          Ir a Reservas
        </Link>
      </div>
    </div>
  );
};

export default Pronto;
