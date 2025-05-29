const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start text-white bg-dark"
      style={{ paddingTop: '1rem' }}
    >
      {/* Grid container */}
      <div className="container p-4 pb-0">
        {/* Section: Links */}
        <section>
          {/* Grid row */}
          <div className="row">
            {/* Grid column */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Cine Co</h6>
              <p>
                Ser continuamente reconocidos como la empresa de entretenimiento más importante de Colombia y una de las mejores en servicio y tecnología en Latinoamérica.   
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Productos</h6>
              <p><a className="text-white" href="/Cartelera">Cartelera</a></p>
              <p><a className="text-white" href="/Pronto">Pronto</a></p>
              <p><a className="text-white" href="/Comida">Comida</a></p>
              <p><a className="text-white" href="/Fuera">Peliculas Pasadas</a></p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <hr className="w-100 clearfix d-md-none" />

            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contacto</h6>
              <p><i className="fas fa-home mr-3"></i> Carrera 13 No. 38 – 85 - Teusaquillo</p>
              <p><i className="fas fa-envelope mr-3"></i> sugerencias@cinecolombia.com</p>
              <p><i className="fas fa-phone mr-3"></i> (571) 756-9898</p>
            </div>

            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>

              {/* Facebook */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="https://www.facebook.com/cinecolombiaoficial"
                role="button"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              {/* Twitter */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="https://twitter.com/Cine_Colombia"
                role="button"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>

              {/* Google */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="https://www.cinecolombia.com/bogota"
                role="button"
                aria-label="Google"
              >
                <i className="fab fa-google"></i>
              </a>

              {/* Instagram */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="https://www.instagram.com/cinecolombia"
                role="button"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          {/* Grid row */}
        </section>
        {/* Section: Links */}
      </div>
      {/* Grid container */}

      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        © 2025 CineCo
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
