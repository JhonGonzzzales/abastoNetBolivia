import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate, Link } from 'react-router-dom'
import './Registro.css'

export default function Registro() {
  const [zonas, setZonas] = useState([])
  const [form, setForm] = useState({ nombre: '', telefono: '', zona_id: '', email: '', password: '' })
  const [msg, setMsg] = useState({ texto: '', tipo: '' })
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchZonas() {
      const { data } = await supabase.from('zonas').select('*')
      setZonas(data || [])
    }
    fetchZonas()
  }, [])

  async function handleSubmit() {
    if (!form.nombre || !form.telefono || !form.zona_id || !form.email || !form.password) {
      setMsg({ texto: 'Completa todos los campos', tipo: 'error' })
      return
    }
    if (form.password.length < 6) {
      setMsg({ texto: 'La contraseña debe tener al menos 6 caracteres', tipo: 'error' })
      return
    }

    // 1. Crear cuenta en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    })

    if (authError) {
      setMsg({ texto: 'Error: ' + authError.message, tipo: 'error' })
      return
    }

    // 2. Guardar tienda vinculada al user_id
    const { error: dbError } = await supabase.from('tiendas').insert([{
      nombre: form.nombre,
      telefono: form.telefono,
      zona_id: form.zona_id,
      user_id: authData.user.id
    }])

    if (dbError) {
      setMsg({ texto: 'Error al guardar tienda: ' + dbError.message, tipo: 'error' })
      return
    }

    localStorage.setItem('tienda_nombre', form.nombre)
    localStorage.setItem('tienda_telefono', form.telefono)
    setMsg({ texto: '¡Cuenta creada con éxito!', tipo: 'success' })
    setTimeout(() => navigate('/catalogo'), 1000)
  }

  return (
    <div className="registro-container">
      <h2>Registrar mi tienda</h2>
      <div className="registro-form">
        <input
          placeholder="Nombre de tu tienda"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          placeholder="Teléfono WhatsApp (sin +591)"
          value={form.telefono}
          onChange={e => setForm({ ...form, telefono: e.target.value })}
        />
        <select
          value={form.zona_id}
          onChange={e => setForm({ ...form, zona_id: e.target.value })}>
          <option value="">Selecciona tu zona</option>
          {zonas.map(z => <option key={z.id} value={z.id}>{z.nombre}</option>)}
        </select>
        <input
          placeholder="Correo electrónico"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Contraseña (mínimo 6 caracteres)"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleSubmit}>Crear cuenta</button>
        {msg.texto && (
          <p className={msg.tipo === 'success' ? 'msg-success' : 'msg-error'}>
            {msg.texto}
          </p>
        )}
        <p style={{ fontSize: '0.85rem', color: '#666', textAlign: 'center' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: '#1a1a2e', fontWeight: 700 }}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}