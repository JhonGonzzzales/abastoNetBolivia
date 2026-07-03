import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Spinner from '../components/Spinner'
import './MisPedidos.css'

const colores = {
  pendiente:   { bg: '#fff3cd', color: '#856404' },
  consolidado: { bg: '#cce5ff', color: '#004085' },
  'en ruta':   { bg: '#ffe5cc', color: '#7a3e00' },
  entregado:   { bg: '#d4edda', color: '#155724' },
}

export default function MisPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function fetchPedidos() {
      setCargando(true)
      const telefono = localStorage.getItem('tienda_telefono')
      if (!telefono) { setCargando(false); return }

      const { data: tienda } = await supabase
        .from('tiendas').select('id').eq('telefono', telefono).single()
      if (!tienda) { setCargando(false); return }

      const { data } = await supabase
        .from('pedidos')
        .select('*, productos(nombre, precio)')
        .eq('tienda_id', tienda.id)
        .order('created_at', { ascending: false })
      setPedidos(data || [])
      setCargando(false)
    }
    fetchPedidos()
  }, [])

  return (
    <div className="mispedidos-container">
      <h2>Mis Pedidos</h2>
      {cargando
        ? <Spinner texto="Cargando pedidos..." />
        : pedidos.length === 0
          ? <div className="vacio">No tienes pedidos aún.</div>
          : pedidos.map(p => {
              const c = colores[p.estado] || { bg: '#eee', color: '#333' }
              return (
                <div key={p.id} className="pedido-card">
                  <strong>{p.productos?.nombre} — {p.cantidad} unidades</strong>
                  <div>
                    <span className="pedido-estado" style={{ background: c.bg, color: c.color }}>
                      {p.estado}
                    </span>
                  </div>
                  <div className="pedido-fecha">
                    {new Date(p.created_at).toLocaleString()}
                  </div>
                </div>
              )
            })
      }
    </div>
  )
}