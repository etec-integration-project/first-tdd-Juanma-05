import './header.css';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../multimedia/logojm.jpg"
import logocarrito from "../../multimedia/carrito.svg"
import logosesion from "../../multimedia/inicio sesion.svg"
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  
  // Obtén el correo del usuario del localStorage
  const userEmail = localStorage.getItem('userEmail');
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const handleLogout = () => {
    // Elimina el correo del localStorage y redirige a la página principal
    localStorage.removeItem('userEmail');
    navigate("/"); // Redirige a la página principal
  };

  return (
    <section id="seccionprincipal">
      <div className="logo-titulo">
        <Link to="/">
          <img className="logo" src={logo} alt="logo de pagina" />
        </Link>
        <h1 className="titulo">Botines-JM</h1>
      </div>

      <div className="barraprincipal">
        {/* Solo mostrar el botón "Cargar Producto" si el usuario es admin */}
        {userEmail === 'admin@admin' && (
          <div className="cargar-producto">
            <Link className="link" to="/cargar">
              <img className="logocarrito" src={logocarrito} alt="" />
              <li className="carro">Cargar Producto</li>
            </Link>
          </div>
        )}

        {/* Condición para mostrar el ícono de sesión o el correo con opción de cerrar sesión */}
        {userEmail ? (
          <div className="iniciosesion" onClick={() => setShowLogoutMenu(!showLogoutMenu)}>
            <img className="logosesion" src={logosesion} alt="logo inicio de sesion" />
            <li className="sesion">{userEmail}</li>
            {showLogoutMenu && (
              <div className="logout-menu">
                <button onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <div className="iniciosesion">
            <Link className="link" to="/sesion">
              <img className="logosesion" src={logosesion} alt="logo inicio de sesion" />
              <li className="sesion">Iniciar Sesión</li>
            </Link>
          </div>
        )}

        <div className="carrito">
          <Link className="link" to="/carrito">
            <img className="logocarrito" src={logocarrito} alt="" />
            <li className="carro">Carrito</li>
          </Link>
        </div>
      </div>
    </section>
  );
}
