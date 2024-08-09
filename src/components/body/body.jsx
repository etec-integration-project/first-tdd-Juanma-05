import './body.css';
import { Link } from "react-router-dom";
import suelamixta from "../../multimedia/suela mixta.jpg"
import suelafg from "../../multimedia/suela FG.jpg"
import suelasg from "../../multimedia/suela SG.jpg"



export default function Body(){
    return <>
        
        <section id="fondo">
            <div className="suelas">
                <Link className="link" to="/suelamixta">
                    <div className="suela1"><img class="suelamixta" src={suelamixta} alt=""/>
                        <h1 className="text">SUELA MIXTA</h1>
                        <p className="text1">Tapones intercambiables de plastico y aluminio</p>
                    </div>
                </Link>

                <Link className="link" to="/suelaFG">
                <div className="suela2"><img class="suelafg" src={suelafg} alt=""/>
                    <h1 className="text">SUELA FG</h1>
                    <p className="text1">Todos los tapones de plastico</p>
                </div>
                </Link>

                <Link className="link" to="/suelaSG">
                <div className="suela3"><img class="suelasg" src={suelasg} alt=""/>
                    <h1 className="text">SUELA SG</h1>
                    <p className="text1">8 tapones de aluminio, ideal para forwards</p>
                </div>
                </Link>

            </div>
        </section>

        
    </>
}