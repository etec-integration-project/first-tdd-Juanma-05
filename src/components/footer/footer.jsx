import "./footer.css";
import instagram from "../../multimedia/instagram.png"
import whatsapp from "../../multimedia/whatsapp.png"
import twiter from "../../multimedia/twiter.png"


export default function Footer(){
    return <>
        <footer>
            <div className="social-icons">
                <img className="img" src={whatsapp} alt="Whatsapp"/>
                <img className="img" src={instagram} alt="Instagram"/>
                <img className="img" src={twiter} alt="Twitter"/>
            </div>
        </footer>

    </>

}
