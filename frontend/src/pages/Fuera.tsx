import IteratorViewer from '../components/IteratorViewer';



const Fuera = () => {
    return (
        <div className="container-fluid py-5 text-center">
            <h1 className="display-4">Peliculas que estuvieron en Cine Co</h1>
            <p className="lead">Disfruta del mejor cine con nosotros.</p>
            <IteratorViewer estado="fuera" />
        </div>

    );
};

export default Fuera;
