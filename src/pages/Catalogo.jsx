import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './Catalogo.css'

export default function Catalogo() {
  const [productos, setProductos] = useState([])
  const [cantidades, setCantidades] = useState({})
  const [msg, setMsg] = useState('')
  const telefono = localStorage.getItem('tienda_telefono')

  useEffect(() => {
    async function fetchProductos() {
      const { data } = await supabase.from('productos').select('*')
      setProductos(data || [])
    }
    fetchProductos()
  }, [])

  async function pedirProducto(producto) {
    const cantidad = parseInt(cantidades[producto.id] || 1)
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

  if (!telefono) return (
    <div className="no-registro">
      Primero <a href="/registro">regístrate aquí</a> para hacer pedidos.
    </div>
  )

  return (
    <div className="catalogo-container">
      <h2>Catálogo de Productos</h2>
      {msg && <div className="msg-feedback">{msg}</div>}
      {productos.length === 0 && <p>Cargando productos...</p>}
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
            <button onClick={() => pedirProducto(p)}>Pedir</button>
          </div>
        </div>
      ))}
    </div>
  )
}