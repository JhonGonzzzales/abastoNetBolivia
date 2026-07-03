import './ModalConfirmacion.css'

export default function ModalConfirmacion({ producto, cantidad, onConfirmar, onCancelar }) {
  if (!producto) return null

  return (
    <div className="modal-overlay" onClick={onCancelar}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h3>Confirmar pedido</h3>
        <p>
          ¿Confirmas tu pedido de{' '}
          <strong>{cantidad} × {producto.nombre}</strong>{' '}
          por un total de{' '}
          <strong>Bs. {(cantidad * producto.precio).toFixed(2)}</strong>?
        </p>
        <div className="modal-btns">
          <button className="btn-cancelar" onClick={onCancelar}>Cancelar</button>
          <button className="btn-confirmar" onClick={onConfirmar}>Confirmar pedido</button>
        </div>
      </div>
    </div>
  )
}