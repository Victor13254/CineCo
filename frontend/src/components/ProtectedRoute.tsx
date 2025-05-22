import { useEffect, type JSX } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('Debes iniciar sesión para acceder');
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}; 


export default ProtectedRoute;
