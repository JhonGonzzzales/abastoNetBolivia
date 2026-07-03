import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import ModalConfirmacion from '../components/ModalConfirmacion'
import Spinner from '../components/Spinner'
import './Catalogo.css'

export default function Catalogo() {
  const [productos, setProductos] = useState([])
  const [cantidades, setCantidades] = useState({})
  const [msg, setMsg] = useState('')
  const [modalData, setModalData] = useState(null)
  const [cargando, setCargando] = useState(true)
  const telefono = localStorage.getItem('tienda_telefono')

  useEffect(() => {
    async function fetchProductos() {
      setCargando(true)
      const { data } = await supabase.from('productos').select('*')
      setProductos(data || [])
      setCargando(false)
    }
    fetchProductos()
  }, [])

  function abrirModal(producto) {
    const cantidad = parseInt(cantidades[producto.id] || 1)
    setModalData({ producto, cantidad })
  }

  async function confirmarPedido() {
    const { producto, cantidad } = modalData
    setModalData(null)

    const { data: tienda } = await supabase
      .from('tiendas')
      .select('id')
      .eq('telefono', telefono)
      .single()

    if (!tienda) { setMsg('Tienda no encontrada'); return }

    const { error } = await supabase.from('pedidos').insert([{
      tienda_id: tienda.id,
      producto_id: producto.id,
      cantidad
    }])

    if (error) setMsg('Error: ' + error.message)
    else setMsg(`✓ Pedido de ${cantidad}x ${producto.nombre} enviado`)
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div className="catalogo-container">
      <h2>Catálogo de Productos</h2>
      {msg && <div className="msg-feedback">{msg}</div>}
      {cargando
        ? <Spinner texto="Cargando productos..." />
        : (
          <div className="productos-grid">
            {productos.map(p => (
              <div key={p.id} className="producto-card">
                <div className="producto-info">
                  <strong>{p.nombre}</strong>
                  <span>Bs. {p.precio}</span>
                </div>
                <div className="producto-accion">
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    onChange={e => setCantidades({ ...cantidades, [p.id]: e.target.value })}
                  />
                  <button onClick={() => abrirModal(p)}>Pedir</button>
                </div>
              </div>
            ))}
          </div>
        )
      }
      {modalData && (
        <ModalConfirmacion
          producto={modalData.producto}
          cantidad={modalData.cantidad}
          onConfirmar={confirmarPedido}
          onCancelar={() => setModalData(null)}
        />
      )}
    </div>
  )
}