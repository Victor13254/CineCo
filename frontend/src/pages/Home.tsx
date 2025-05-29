import promo1 from '../../public/34.jpg';
import promo2 from '../../public/35.jpg';
import promo3 from '../../public/36.jpg';
import promo4 from '../../public/37.jpg';
import carteleraImg from '../../public/cartelera.png'; // Asumo que tienes esta imagen o puedes cambiar la ruta

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToCartelera = () => {
    navigate('/Cartelera');
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Promociones CineCo</h2>

      {/* Promo 1 */}
      <div className="row mb-5">
        <div className="col-md-6">
          <img src={promo1} alt="Mitad de Precio" className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h3>Martes y Miércoles a Mitad de Precio</h3>
          <p>Disfruta de entradas al 50% de descuento en funciones 2D durante estos días (excepto festivos).</p>
          <h5>Horarios y precios:</h5>
          <ul>
            <li><strong>3:00 p.m. - 4:59 p.m. y después de 8:00 p.m.</strong></li>
            <ul>
              <li>General: $6.300</li>
              <li>Preferencial: $7.900</li>
            </ul>
            <li><strong>5:00 p.m. - 7:59 p.m.</strong></li>
            <ul>
              <li>General: $7.200</li>
              <li>Preferencial: $9.000</li>
            </ul>
          </ul>
          <h6>Con Tarjeta Cineco:</h6>
          <ul>
            <li><strong>3:00 p.m. - 4:59 p.m. y después de 8:00 p.m.</strong></li>
            <ul>
              <li>General: $4.700</li>
              <li>Preferencial: $5.900</li>
            </ul>
            <li><strong>5:00 p.m. - 7:59 p.m.</strong></li>
            <ul>
              <li>General: $5.300</li>
              <li>Preferencial: $6.700</li>
            </ul>
          </ul>
        </div>
      </div>

      {/* Promo 2 */}
      <div className="row mb-5">
        <div className="col-md-6 order-md-2">
          <img src={promo2} alt="Matinée" className="img-fluid rounded" />
        </div>
        <div className="col-md-6 order-md-1">
          <h3>Matinée: Entradas desde $6.000</h3>
          <p>Aprovecha precios especiales en funciones antes de las 3:00 p.m. todos los días.</p>
          <ul>
            <li>General: $6.000</li>
            <li>Preferencial: $8.000</li>
          </ul>
          <p>Esta promoción aplica en todos los formatos y salas del país.</p>
        </div>
      </div>

      {/* Promo 3 */}
      <div className="row mb-5">
        <div className="col-md-6">
          <img src={promo3} alt="Combo Martes y Miércoles" className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h3>Combo Martes y Miércoles</h3>
          <p>Complementa tu experiencia con un combo especial que incluye:</p>
          <ul>
            <li>Crispeta de sal (100 g)</li>
            <li>Gaseosa (hasta 960 ml)</li>
            <li>Perro caliente</li>
            <li>Chocolatina Jet (25 g)</li>
          </ul>
          <h5>Precios:</h5>
          <ul>
            <li>Tarjeta Platino: $26.300</li>
            <li>Tarjeta Cineco: $29.600</li>
            <li>Otros medios de pago: $32.900</li>
          </ul>
        </div>
      </div>

      {/* Promo 4 */}
      <div className="row mb-5">
        <div className="col-md-6 order-md-2">
          <img src={promo4} alt="Beneficios Tarjetas" className="img-fluid rounded" />
        </div>
        <div className="col-md-6 order-md-1">
          <h3>Beneficios Tarjeta Cineco y Platino</h3>
          <p>Al ser miembro de estos programas, accedes a:</p>
          <ul>
            <li>Descuentos en entradas y combos.</li>
            <li>Acumulación de puntos para redimir en productos y servicios.</li>
            <li>Promociones exclusivas y preventas.</li>
          </ul>
        </div>
      </div>

      {/* Nueva sección Cartelera */}
      <div className="row align-items-center py-5 border rounded">
        <div className="col-md-6">
          <img
            src={carteleraImg}
            alt="Cartelera CineCo"
            className="img-fluid rounded shadow"
            style={{ maxHeight: '350px', objectFit: 'cover', width: '100%' }}
          />
        </div>
        <div className="col-md-6 text-center text-md-start">
          <h2>¡No te pierdas la Cartelera!</h2>
          <p>Consulta las películas en exhibición, horarios y reserva tus entradas fácilmente.</p>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={goToCartelera}
          >
            Ver Cartelera
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
