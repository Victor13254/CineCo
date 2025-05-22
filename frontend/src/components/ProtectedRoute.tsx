import { useEffect, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      toast.error('Debes iniciar sesión para acceder');
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}; 


export default ProtectedRoute;
