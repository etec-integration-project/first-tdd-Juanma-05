import React, { useState } from "react";
import "./sesion.css";
import {Link} from 'react-router-dom';
import axios from "axios";



export default function Login() {
  const [email, correoElectronico]=useState("")
  const [password, contraseña] =useState("")
  const login = async (e) =>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/login",{email,password})
      alert("inicio de sesion exitoso")

      window.location.href = "http://localhost:3001";

      
    } catch (error) {
      alert("no se pudo iniciar sesion")
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" action="#" method="post">
        <h2>Iniciar Sesión</h2>
        <div className="input-container">
          <label htmlFor="nombre">Email</label>
          <input type="text" id="nombre" name="nombre" value ={email} onChange={(e) => correoElectronico (e.target.value)} required />
        </div>
        
        <div className="input-container">
          <label htmlFor="contrasena">Contraseña</label>
          <input type="password" id="contrasena" name="contrasena" value ={password} onChange={(e) => contraseña (e.target.value)} required />
        </div>
        

        <div className ="botoneslogin">
          <Link to='/'>
          <button type="submit"  onClick ={login}>Iniciar Sesión  </button>
          </Link>

          <Link to='/register'>
            <button type="submit">Crear cuenta </button>
          
          </Link>


        </div>
        
        
      </form>
    </div>
  );
}




// import './sesion.css';
// import { Link } from "react-router-dom";

// export default function LoginForm() {
//   return(
//       <div className="loginForm">
//         <h2>LOGIN</h2>
//         <input type="text" name="email" placeholder="Email " required/>
//         <input type="password" name="password" placeholder="Password" required/>
//         <Link to="/">
//         <input type="submit" className="btn-login" value="Login " required/>
//         </Link>
    
//         <Link to="/register">
//         <button className='btn-register'>Register</button>
//         </Link>



//     </div>

    
// )};
