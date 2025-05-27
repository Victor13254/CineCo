import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from './templates/Navbar';
import Footer from './templates/Footer';
import Home from './pages/Home';
import Reserva from './pages/Reservas';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Cartelera from './pages/Cartelera';
import Pronto from './pages/Pronto';
import Fuera from './pages/Fuera';
import Comida from './pages/Comida';
import GestionPerfil from './pages/perfil/GestionPerfil';
import GestionReservas from './pages/perfil/GestionReservas';

const App = () => {
  return (
    <>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1 container-fluid py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Cartelera" element={<Cartelera />} />
              <Route path="/GestionPerfil" element={<ProtectedRoute><GestionPerfil /></ProtectedRoute>} />
              <Route path="/GestionReservas" element={<ProtectedRoute><GestionReservas /></ProtectedRoute>} />
              <Route path="/Pronto" element={<Pronto />} />
              <Route path="/Fuera" element={<Fuera />} />
              <Route path="/Comida" element={<Comida />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="*" element={<Home />} />
              <Route path="/reservas" element={<ProtectedRoute><Reserva /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
