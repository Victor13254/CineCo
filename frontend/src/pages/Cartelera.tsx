import { Link } from 'react-router-dom';
import IteratorViewer from '../components/IteratorViewer';



const Cartelera = () => {
    return (
        <div className="container-fluid py-5 text-center">
            <h1 className="display-4">Cartelera Cine Co</h1>
            <p className="lead">Disfruta del mejor cine con nosotros.</p>
            <IteratorViewer estado="cartelera" />
            <div className= "container-fluid py-4 text-center">
                <Link to="/reservas" className="btn btn-primary">
                    Ir a Reservas
                </Link>
            </div>

        </div>

    );
};

export default Cartelera;
