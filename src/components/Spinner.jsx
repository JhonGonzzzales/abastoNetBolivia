import './Spinner.css'

export default function Spinner({ texto = 'Cargando...' }) {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" />
      <span>{texto}</span>
    </div>
  )
}