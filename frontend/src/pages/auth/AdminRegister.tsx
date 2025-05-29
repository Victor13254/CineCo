import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Register.css";
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    confirmarCorreo: '',
    contraseña: '',
    confirmarContraseña: '',
    documento: '',
    celular: '',
    dia: '',
    mes: '',
    anio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const esFechaValida = (dia: number, mes: number, anio: number) => {
    const fecha = new Date(anio, mes - 1, dia);
    return fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.correo !== form.confirmarCorreo) {
      toast.warning('Los correos no coinciden');
      return;
    }

    if (form.contraseña !== form.confirmarContraseña) {
      toast.warning('Las contraseñas no coinciden');
      return;
    }

    if (!form.dia || !form.mes || !form.anio) {
      toast.warning('Por favor selecciona una fecha de nacimiento completa');
      return;
    }

    const diaNum = parseInt(form.dia, 10);
    const mesNum = parseInt(form.mes, 10);
    const anioNum = parseInt(form.anio, 10);

    if (!esFechaValida(diaNum, mesNum, anioNum)) {
      toast.warning('Fecha de nacimiento inválida');
      return;
    }

    const fechaNacimiento = `${anioNum}-${String(mesNum).padStart(2, '0')}-${String(diaNum).padStart(2, '0')}`;

    try {
      const res = await fetch('http://localhost:4000/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: `${form.nombres} ${form.apellidos}`,
          correo: form.correo,
          contraseña: form.contraseña,
          documento: form.documento,
          fechaNacimiento,
          celular: form.celular,
          tipo: 'admin',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Usuario registrado con éxito');
        navigate('/');
      } else {
        toast.error(data.mensaje || data.error || 'Error en el registro');
      }
    } catch (error) {
      toast.error('Error de red o servidor');
    }
  };

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = [
    { valor: '01', nombre: 'Enero' },
    { valor: '02', nombre: 'Febrero' },
    { valor: '03', nombre: 'Marzo' },
    { valor: '04', nombre: 'Abril' },
    { valor: '05', nombre: 'Mayo' },
    { valor: '06', nombre: 'Junio' },
    { valor: '07', nombre: 'Julio' },
    { valor: '08', nombre: 'Agosto' },
    { valor: '09', nombre: 'Septiembre' },
    { valor: '10', nombre: 'Octubre' },
    { valor: '11', nombre: 'Noviembre' },
    { valor: '12', nombre: 'Diciembre' },
  ];
  const años = Array.from({ length: 70 }, (_, i) => new Date().getFullYear() - 19 - i);

  return (
    <div className="container my-5 px-4">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4 text-primary fw-bold">Registro de Usuario</h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nombres" className="form-label">Nombres</label>
                    <input type="text" id="nombres" name="nombres" className="form-control" value={form.nombres} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input type="text" id="apellidos" name="apellidos" className="form-control" value={form.apellidos} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label htmlFor="correo" className="form-label">Correo</label>
                    <input type="email" id="correo" name="correo" className="form-control" value={form.correo} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label htmlFor="confirmarCorreo" className="form-label">Confirmar correo</label>
                    <input type="email" id="confirmarCorreo" name="confirmarCorreo" className="form-control" value={form.confirmarCorreo} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="contraseña" className="form-label">Contraseña</label>
                    <input type="password" id="contraseña" name="contraseña" className="form-control" value={form.contraseña} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmarContraseña" className="form-label">Confirmar contraseña</label>
                    <input type="password" id="confirmarContraseña" name="confirmarContraseña" className="form-control" value={form.confirmarContraseña} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="documento" className="form-label">Documento de identidad</label>
                    <input type="text" id="documento" name="documento" className="form-control" value={form.documento} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="celular" className="form-label">Celular</label>
                    <input type="tel" id="celular" name="celular" className="form-control" value={form.celular} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Fecha de nacimiento</label>
                    <div className="d-flex gap-2">
                      <select className="form-select" name="dia" value={form.dia} onChange={handleChange} required>
                        <option value="">Día</option>
                        {dias.map(d => (
                          <option key={d} value={String(d).padStart(2, '0')}>{d}</option>
                        ))}
                      </select>
                      <select className="form-select" name="mes" value={form.mes} onChange={handleChange} required>
                        <option value="">Mes</option>
                        {meses.map(m => (
                          <option key={m.valor} value={m.valor}>{m.nombre}</option>
                        ))}
                      </select>
                      <select className="form-select" name="anio" value={form.anio} onChange={handleChange} required>
                        <option value="">Año</option>
                        {años.map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4 fw-semibold">Registrarse</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
