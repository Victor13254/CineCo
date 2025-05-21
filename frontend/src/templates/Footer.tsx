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
              <h6 className="text-uppercase mb-4 font-weight-bold">Company name</h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
              <p><a className="text-white" href="#!">MDBootstrap</a></p>
              <p><a className="text-white" href="#!">MDWordPress</a></p>
              <p><a className="text-white" href="#!">BrandFlow</a></p>
              <p><a className="text-white" href="#!">Bootstrap Angular</a></p>
            </div>

            <hr className="w-100 clearfix d-md-none" />

            <hr className="w-100 clearfix d-md-none" />

            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
              <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
              <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
              <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
            </div>

            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>

              {/* Facebook */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              {/* Twitter */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>

              {/* Google */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
                aria-label="Google"
              >
                <i className="fab fa-google"></i>
              </a>

              {/* Instagram */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>

              {/* Linkedin */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
                aria-label="Linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>

              {/* Github */}
              <a
                className="btn btn-outline-light btn-floating m-1"
                href="#!"
                role="button"
                aria-label="Github"
              >
                <i className="fab fa-github"></i>
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
        © 2025 Copyright: CineCo
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
