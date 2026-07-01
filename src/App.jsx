import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Registro from './pages/Registro'
import Catalogo from './pages/Catalogo'
import MisPedidos from './pages/MisPedidos'
import AdminPanel from './pages/AdminPanel'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1.5rem' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/registro" />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/mis-pedidos" element={<MisPedidos />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

