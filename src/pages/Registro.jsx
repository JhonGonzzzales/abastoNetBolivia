import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './Registro.css'

export default function Registro() {
  const [zonas, setZonas] = useState([])
  const [form, setForm] = useState({ nombre: '', telefono: '', zona_id: '' })
  const [msg, setMsg] = useState({ texto: '', tipo: '' })

  useEffect(() => {
    async function fetchZonas() {
      const { data } = await supabase.from('zonas').select('*')
      setZonas(data || [])
    }
    fetchZonas()
  }, [])

  async function handleSubmit() {
    if (!form.nombre || !form.telefono || !form.zona_id) {
      setMsg({ texto: 'Completa todos los campos', tipo: 'error' })
      return
    }
    const { error } = await supabase.from('tiendas').insert([form])
    if (error) {
      setMsg({ texto: 'Error: ' + error.message, tipo: 'error' })
    } else {
      localStorage.setItem('tienda_telefono', form.telefono)
      localStorage.setItem('tienda_nombre', form.nombre)
      setMsg({ texto: '¡Tienda registrada con éxito!', tipo: 'success' })
    }
  }

  return (
    <div className="registro-container">
      <h2>Registro de Tienda</h2>
      <div className="registro-form">
        <input
          placeholder="Nombre de tu tienda"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          placeholder="Teléfono WhatsApp (sin +591)"
          value={form.telefono}
          onChange={e => setForm({ ...form, telefono: e.target.value })}
        />
        <select
          value={form.zona_id}
          onChange={e => setForm({ ...form, zona_id: e.target.value })}>
          <option value="">Selecciona tu zona</option>
          {zonas.map(z => <option key={z.id} value={z.id}>{z.nombre}</option>)}
        </select>
        <button onClick={handleSubmit}>Registrarse</button>
        {msg.texto && (
          <p className={msg.tipo === 'success' ? 'msg-success' : 'msg-error'}>
            {msg.texto}
          </p>
        )}
      </div>
    </div>
  )
}