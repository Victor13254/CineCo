import React, { useState } from 'react';
import { toast } from 'react-toastify';


const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contraseña }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      toast.success('¡Login exitoso!');
    } else {
      toast.error(data.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="container-fluid my-5 px-4">
      <div className="p-4 rounded shadow-lg mx-auto" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Contraseña"
              value={contraseña}
              onChange={e => setContraseña(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
