import IteratorViewer from '../components/IteratorViewer';



const Pronto = () => {
    return (
        <div className="container-fluid py-5 text-center">
            <h1 className="display-4">Proximas Peliculas en Cartelera Cine Co</h1>
            <p className="lead">Disfruta del mejor cine con nosotros.</p>
            <IteratorViewer estado="pronto" />

        </div>

    );
};

export default Pronto;
