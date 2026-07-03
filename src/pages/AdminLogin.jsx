import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './Registro.css'

export default function AdminLogin() {
  const [pass, setPass] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  async function handleAdmin() {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'admin@abastonet.bo',
      password: pass
    })

    if (error) {
      setMsg('Contraseña incorrecta')
      return
    }

    localStorage.setItem('admin', 'true')
    navigate('/admin')
  }

  return (
    <div className="registro-container">
      <h2>Acceso Administrador</h2>
      <div className="registro-form">
        <input
          type="password"
          placeholder="Contraseña de administrador"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        <button onClick={handleAdmin}>Entrar como Admin</button>
        {msg && <p className="msg-error">{msg}</p>}
      </div>
    </div>
  )
}