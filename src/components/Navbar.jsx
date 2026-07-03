import { NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { supabase } from '../lib/supabase'

export default function Navbar() {
  const nombre  = localStorage.getItem('tienda_nombre')
  const esAdmin = localStorage.getItem('admin')
  const navigate = useNavigate()

  async function cerrarSesion() {
    await supabase.auth.signOut()
    localStorage.removeItem('tienda_nombre')
    localStorage.removeItem('tienda_telefono')
    localStorage.removeItem('admin')
    navigate('/')
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        <img src="/logopeque.png" alt="AbastoNet Bolivia" style={{ height: '36px' }} />
      </NavLink>

      <div className="navbar-links">
        {esAdmin ? (
          <NavLink to="/admin">Panel Admin</NavLink>
        ) : (
          <>
            <NavLink to="/catalogo">Catálogo</NavLink>
            <NavLink to="/mis-pedidos">Mis Pedidos</NavLink>
          </>
        )}
      </div>

      <div className="navbar-session">
        {esAdmin ? (
          <>
            <span className="navbar-tienda"><strong>Administrador</strong></span>
            <button className="btn-salir" onClick={cerrarSesion}>Salir</button>
          </>
        ) : nombre ? (
          <>
            <span className="navbar-tienda"><strong>{nombre}</strong></span>
            <button className="btn-salir" onClick={cerrarSesion}>Salir</button>
          </>
        ) : (
          <NavLink to="/login" style={{ color: '#f0c040', fontSize: '0.85rem', fontWeight: 700 }}>
            Iniciar sesión
          </NavLink>
        )}
      </div>
    </nav>
  )
}