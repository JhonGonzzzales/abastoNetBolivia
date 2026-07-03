import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './Registro.css'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [msg, setMsg] = useState({ texto: '', tipo: '' })
  const navigate = useNavigate()

  async function handleLogin() {
    if (!form.email || !form.password) {
      setMsg({ texto: 'Completa todos los campos', tipo: 'error' })
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })

    if (error) {
      setMsg({ texto: 'Correo o contraseña incorrectos', tipo: 'error' })
      return
    }

    // Buscar la tienda vinculada a este usuario
    const { data: tienda } = await supabase
      .from('tiendas')
      .select('nombre, telefono')
      .eq('user_id', data.user.id)
      .single()

    if (tienda) {
      localStorage.setItem('tienda_nombre', tienda.nombre)
      localStorage.setItem('tienda_telefono', tienda.telefono)
    }

    navigate('/catalogo')
  }

  return (
    <div className="registro-container">
      <h2 style={{ textAlign: 'center' }}>Iniciar sesión</h2>
      <div className="registro-form">
        <input
          placeholder="Correo electrónico"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleLogin}>Ingresar</button>
        {msg.texto && (
          <p className={msg.tipo === 'success' ? 'msg-success' : 'msg-error'}>
            {msg.texto}
          </p>
        )}
        <p style={{ fontSize: '0.85rem', color: '#666', textAlign: 'center' }}>
          ¿Aún no tienes cuenta?{' '}
          <Link to="/registro" style={{ color: '#1a1a2e', fontWeight: 700 }}>
            Registra tu tienda
          </Link>
        </p>
      </div>
    </div>
  )
}