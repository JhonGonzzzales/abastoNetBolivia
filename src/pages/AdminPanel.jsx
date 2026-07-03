import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Spinner from '../components/Spinner'
import './AdminPanel.css'

const ESTADOS = ['pendiente', 'consolidado', 'en ruta', 'entregado']

export default function AdminPanel() {
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    let activo = true
    supabase
      .from('pedidos')
      .select('*, productos(nombre), tiendas(nombre, telefono, zonas(nombre))')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (activo) {
          setPedidos(data || [])
          setCargando(false)
        }
      })
    return () => { activo = false }
  }, [refresh])

  async function cambiarEstado(id, nuevoEstado, telefono, nombreProducto) {
    await supabase.from('pedidos').update({ estado: nuevoEstado }).eq('id', id)
    const mensaje = `Hola! Tu pedido de ${nombreProducto} está ahora en estado: *${nuevoEstado}*. - AbastoNet Bolivia`
    const link = `https://wa.me/591${telefono}?text=${encodeURIComponent(mensaje)}`
    window.open(link, '_blank')
    setCargando(true)
    setRefresh(r => r + 1)
  }

  const porZona = pedidos.reduce((acc, p) => {
    const zona = p.tiendas?.zonas?.nombre || 'Sin zona'
    if (!acc[zona]) acc[zona] = []
    acc[zona].push(p)
    return acc
  }, {})

  return (
    <div className="admin-container">
      <h2>Panel Admin — Pedidos por Zona</h2>
      {cargando
        ? <Spinner texto="Cargando pedidos..." />
        : Object.keys(porZona).length === 0
          ? <div className="vacio-admin">No hay pedidos aún.</div>
          : Object.entries(porZona).map(([zona, items]) => (
              <div key={zona} className="zona-bloque">
                <div className="zona-titulo">{zona} — {items.length} pedido(s)</div>
                {items.map(p => (
                  <div key={p.id} className="pedido-admin-card">
                    <div className="pedido-admin-info">
                      <strong>{p.tiendas?.nombre}</strong> — {p.productos?.nombre} x{p.cantidad}
                    </div>
                    <div>
                      Estado: <span className="estado-badge">{p.estado}</span>
                    </div>
                    <div className="acciones">
                      {ESTADOS.filter(e => e !== p.estado).map(e => (
                        <button
                          key={e}
                          onClick={() => cambiarEstado(p.id, e, p.tiendas?.telefono, p.productos?.nombre)}>
                          → {e}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
      }
    </div>
  )
}