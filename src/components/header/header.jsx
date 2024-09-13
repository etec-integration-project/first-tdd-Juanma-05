import './header.css';
import { Link } from "react-router-dom";
import logo from "../../multimedia/logojm.jpg"
import logocarrito from "../../multimedia/carrito.svg"
import logosesion from "../../multimedia/inicio sesion.svg"

export default function Header(){
    return <>
        <section id="seccionprincipal">
            <div className="logo-titulo">
            <Link to="/">
                <img className= "logo" src={logo} alt="logo de pagina" />
            </Link>
                <h1 className="titulo">Botines-JM</h1>

            </div>

            <div className="barraprincipal">
                <div className="cargar-producto">
                    <Link className="link" to="/cargar">
                        <img className="logocarrito" src={logocarrito} alt="" />
                        <li className="carro">Cargar Producto</li>
                    </Link>
                </div>

                <div className="iniciosesion">
                    <Link className="link" to="/sesion">
                        <img className="logosesion" src={logosesion} alt="logo inicio de sesion" />
                        <li className="sesion">Iniciar Sesion</li>
                    </Link>
                </div>
            </div>
        </section>

        <section className="seccionsecundaria">
            <div>
                <ul className="barrasecundaria">
                {/* <Link className="link" to="/">
                    <li className="nav">HOME</li>
                </Link> */}

                {/* <li className="nav">QUIENES SOMOS</li> */}

                <Link className="link" to="/GuiaTalles">
                <li className="nav">GIA DE TALLES</li>
                </Link>

                </ul>
            </div>

        </section>
        
    </>
}