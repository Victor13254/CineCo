import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // <-- ¡IMPORTANTE!
                },
                body: JSON.stringify({ correo, contraseña }),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success('¡Login exitoso!');
                setCorreo('');
                setContraseña('');
                // Cerrar dropdown manualmente
                if (dropdownRef.current) {
                    const dropdownToggle = dropdownRef.current.querySelector('button.dropdown-toggle') as HTMLElement;
                    dropdownToggle?.click();
                }
               window.location.reload();
            } else {
                toast.error(data.message || 'Error al iniciar sesión');
            }
        } catch {
            toast.error('Error de red');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/">CineCo</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cartelera">Cartelera</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/pronto">Pronto</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/comida">Comida</Link>
                    </li>
                </ul>

                {!token ? (
                    // Login/Registro (igual que antes)
                    <div className="dropdown" ref={dropdownRef}>
                        <button
                            className="btn btn-outline-light dropdown-toggle"
                            type="button"
                            id="loginDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            aria-haspopup="true"
                            aria-label="Abrir menú de login"
                        >
                            Login / Registro
                        </button>
                        <div className="dropdown-menu dropdown-menu-end p-3" aria-labelledby="loginDropdown" style={{ minWidth: 250 }}>
                            <form onSubmit={handleLogin}>
                                <div className="mb-2">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Correo"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        value={contraseña}
                                        onChange={(e) => setContraseña(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                            </form>
                            <div className="mt-2 text-center">
                                <Link to="/registro" className="small">¿No tienes cuenta? Regístrate</Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Menú desplegable de Perfil
                    <div className="dropdown">
                        <button
                            className="btn btn-outline-light dropdown-toggle"
                            type="button"
                            id="perfilDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Perfil
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="perfilDropdown">
                            <li>
                                <Link className="dropdown-item" to="/perfil">Gestionar Perfil</Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/mis-reservas">Gestionar Reservas</Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button className="dropdown-item text-danger" onClick={handleLogout}>
                                    Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                )}

            </div>
        </nav>
    );
};

export default Navbar;
