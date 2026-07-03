import { Link } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  return (
    <div className="landing">

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-logo">
  <img src="/logogrand.png" alt="AbastoNet Bolivia" />
</div>
          <div className="hero-tag">PEP 846 · 8C · UPEA</div>
          <h1>Abastece tu tienda sin salir de ella</h1>
          <p>
            Plataforma digital que agrupa los pedidos de las tiendas de barrio
            de tu zona para comprar al por mayor directo desde las industrias.
            Más barato, más rápido, sin intermediarios.
          </p>
          <div className="hero-btns">
            <Link to="/registro" className="btn-primary">Registrar mi tienda</Link>
            <Link to="/catalogo" className="btn-secondary">Ver catálogo</Link>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="seccion-problema">
        <div className="seccion-inner">
          <div className="seccion-titulo">El problema que resolvemos</div>
          <div className="seccion-sub">Las tiendas de barrio enfrentan estos desafíos a diario</div>
          <div className="problema-grid">
            <div className="problema-card">
              <h3>Horas perdidas viajando</h3>
              <p>Los comerciantes deben trasladarse a los mercados mayoristas, perdiendo tiempo y energía productiva.</p>
            </div>
            <div className="problema-card">
              <h3>Precios elevados</h3>
              <p>Al comprar en pequeñas cantidades, los precios son más altos y los márgenes de ganancia se reducen.</p>
            </div>
            <div className="problema-card">
              <h3>Sin control de inventario</h3>
              <p>No existe un sistema digital que avise cuando el stock baja o que registre las compras automáticamente.</p>
            </div>
            <div className="problema-card">
              <h3>Sin canal digital</h3>
              <p>Las industrias no tienen forma directa de llegar a miles de puntos de venta pequeños sin preventistas físicos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="seccion-pasos">
        <div className="seccion-inner">
          <div className="seccion-titulo">¿Cómo funciona?</div>
          <div className="seccion-sub">En 4 pasos simples, desde tu celular</div>
          <div className="pasos-grid">
            <div className="paso">
              <div className="paso-numero">1</div>
              <h3>Regístrate</h3>
              <p>Crea tu cuenta con el nombre de tu tienda y tu número WhatsApp.</p>
            </div>
            <div className="paso">
              <div className="paso-numero">2</div>
              <h3>Elige productos</h3>
              <p>Explora el catálogo con precios de fábrica y selecciona lo que necesitas.</p>
            </div>
            <div className="paso">
              <div className="paso-numero">3</div>
              <h3>Pedidos consolidados</h3>
              <p>Tu pedido se agrupa con los de tu zona para una compra mayor y más económica.</p>
            </div>
            <div className="paso">
              <div className="paso-numero">4</div>
              <h3>Entrega en tu puerta</h3>
              <p>Recibes tu mercadería al día siguiente. Pagas contra entrega, efectivo o QR.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEGMENTOS */}
      <section className="seccion-segmentos">
        <div className="seccion-inner">
          <div className="seccion-titulo">¿Para quién es?</div>
          <div className="seccion-sub">Dos actores, una plataforma</div>
          <div className="segmentos-grid">
            <div className="segmento-card comerciante">
              <h3>Comerciantes</h3>
              <ul>
                <li>Dueños de tiendas de barrio y almacenes</li>
                <li>Pensiones y micronegocios urbanos</li>
                <li>Ahorra tiempo y dinero en cada compra</li>
                <li>Recibe tu pedido sin moverte</li>
                <li>Paga solo cuando llega tu mercadería</li>
              </ul>
            </div>
            <div className="segmento-card proveedor">
              <h3>Proveedores</h3>
              <ul>
                <li>Industrias locales (PIL, Sofía, Famosa)</li>
                <li>Distribuidoras e importadoras</li>
                <li>Canal directo a miles de puntos de venta</li>
                <li>Rutas optimizadas por software</li>
                <li>Sin necesidad de preventistas físicos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="seccion-cta">
        <div className="seccion-inner">
          <h2>¿Listo para abastecer tu tienda de forma inteligente?</h2>
          <p>Únete a AbastoNet Bolivia y empieza a ahorrar desde el primer pedido.</p>
          <div className="hero-btns">
            <Link to="/registro" className="btn-primary">Registrar mi tienda ahora</Link>
            <Link to="/admin" className="btn-secondary">Panel administrador</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="hero-logo">
  <img src="/logogrand.png" alt="AbastoNet Bolivia" style={{ height: '60px', marginBottom: '0.5rem' }} />
</div>
          <div className="footer-equipo">
            Rodrigo Miguel Chura Choque &nbsp;·&nbsp;
            Hugo Sócrates Quispe Cañasto &nbsp;·&nbsp;
            Jhon Herbert Gonzales Hurtado &nbsp;·&nbsp;
            Amilcar Quispe Santos
          </div>
          <div className="footer-copy">
            PEP 846 · Paralelo 8C · Ingeniería de Sistemas · UPEA · 2026
          </div>
        </div>
      </footer>

    </div>
  )
}