import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="container-fluid py-5 text-center">
      <h1 className="display-4">Bienvenido a CineCo</h1>
      <p className="lead">Disfruta del mejor cine con nosotros.</p>
      <Link to="/reservas" className="btn btn-primary">
          Ir a Reservas
        </Link>
    </div>
  );
};

export default Home;
