import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Register.css";

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
      alert('Los correos no coinciden');
      return;
    }

    if (form.contraseña !== form.confirmarContraseña) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!form.dia || !form.mes || !form.anio) {
      alert('Por favor selecciona una fecha de nacimiento completa');
      return;
    }

    const diaNum = parseInt(form.dia, 10);
    const mesNum = parseInt(form.mes, 10);
    const anioNum = parseInt(form.anio, 10);

    if (!esFechaValida(diaNum, mesNum, anioNum)) {
      alert('Fecha de nacimiento inválida');
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
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Usuario registrado con éxito');
        navigate('/');
      } else {
        alert(data.mensaje || data.error || 'Error en el registro');
      }
    } catch (error) {
      alert('Error de red o servidor');
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
  <div className="container-fluid my-5 px-4">
      <div className="p-4 rounded shadow-lg register-box">
        <h2 className="mb-4 text-center text-white">Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Nombres</label>
            <input type="text" name="nombres" className="form-control" value={form.nombres} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Apellidos</label>
            <input type="text" name="apellidos" className="form-control" value={form.apellidos} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Correo</label>
            <input type="email" name="correo" className="form-control" value={form.correo} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Confirmar correo</label>
            <input type="email" name="confirmarCorreo" className="form-control" value={form.confirmarCorreo} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Contraseña</label>
            <input type="password" name="contraseña" className="form-control" value={form.contraseña} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Confirmar contraseña</label>
            <input type="password" name="confirmarContraseña" className="form-control" value={form.confirmarContraseña} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Documento de identidad</label>
            <input type="text" name="documento" className="form-control" value={form.documento} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-white">Fecha de nacimiento</label>
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
          <div className="mb-3">
            <label className="form-label text-white">Celular</label>
            <input type="tel" name="celular" className="form-control" value={form.celular} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
