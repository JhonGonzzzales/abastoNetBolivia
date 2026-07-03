import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import Registro from './pages/Registro'
import Catalogo from './pages/Catalogo'
import MisPedidos from './pages/MisPedidos'
import AdminPanel from './pages/AdminPanel'

function PaginaInterna({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 2.5rem' }}>
        {children}
      </div>
    </>
  )
}

function RutaComerciante({ children }) {
  const logueado = localStorage.getItem('tienda_telefono')
  if (!logueado) return <Navigate to="/login" />
  return <PaginaInterna>{children}</PaginaInterna>
}

function RutaAdmin({ children }) {
  const esAdmin = localStorage.getItem('admin')
  if (!esAdmin) return <Navigate to="/admin-login" />
  return <PaginaInterna>{children}</PaginaInterna>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<Landing />} />
        <Route path="/login"       element={<PaginaInterna><Login /></PaginaInterna>} />
        <Route path="/admin-login" element={<PaginaInterna><AdminLogin /></PaginaInterna>} />
        <Route path="/registro"    element={<PaginaInterna><Registro /></PaginaInterna>} />
        <Route path="/catalogo"    element={<RutaComerciante><Catalogo /></RutaComerciante>} />
        <Route path="/mis-pedidos" element={<RutaComerciante><MisPedidos /></RutaComerciante>} />
        <Route path="/admin"       element={<RutaAdmin><AdminPanel /></RutaAdmin>} />
      </Routes>
    </BrowserRouter>
  )
}