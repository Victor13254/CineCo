import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        toast.success('¡Inicio de sesión exitoso!');
        setTimeout(() => navigate('/Personal'), 2000); 
      } else {
        toast.error(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      toast.error('Error de red o servidor');
    }
  };

  return (
    <div className="container-fluid my-5 px-4">
      <div className="p-4 rounded shadow-lg mx-auto bg-dark text-white" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">Inicio de Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Ingresa tu contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
