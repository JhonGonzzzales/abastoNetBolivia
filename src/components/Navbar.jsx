import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/registro">Registro</NavLink>
      <NavLink to="/catalogo">Catálogo</NavLink>
      <NavLink to="/mis-pedidos">Mis Pedidos</NavLink>
      <NavLink to="/admin">Admin</NavLink>
    </nav>
  )
}