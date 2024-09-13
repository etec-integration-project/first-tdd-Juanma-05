import React, { useState } from "react";
import "./sesion.css";
import {Link} from 'react-router-dom';
import axios from 'axios';


export default function Register() {
  const [password, contraseña] =useState("")
  const [email, correoElectronico]=useState("")

  const registro = async (e) =>{
    e.preventDefault()
      try {
        await axios.post("http://localhost:3000/register",{email,password})
        alert("Cuenta creada exitosamente!")
        
        window.location.href = "http://localhost:3001/sesion";

        
      } catch (error) {
        alert("El correo electrónico ya está en uso.")
        
      }
    
  }

  return (
    <div className="login-container">
      <form className="login-form" action="#" method="post">
        <h2>Cree su cuenta</h2>
        <div className="input-container">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" value ={email} onChange={(e) => correoElectronico (e.target.value)} required />
        </div>
        <div className="input-container">
          <label htmlFor="contrasena">Contraseña</label>
          <input type="password" id="contrasena" name="contrasena" value ={password} onChange={(e) => contraseña (e.target.value)} required />
        </div>


        <div className ="botoneslogin">
          
          <Link to="/sesion">
          <button type="submit" onClick = {registro}>Crear cuenta </button>
          </Link>


        </div>
        
        
      </form>
    </div>
  );
}

// import './sesion.css';
// import { Link } from "react-router-dom";

// export default function Register() {
//   return(
//       <div className="register">
//         <h2>REGISTER</h2>

//         <label For="email"> Email</label>
//         <input type="text" name="email" required/>

//         <label For="password">Password</label>
//         <input type="password" name="password" required/>


//         <Link to="/sesion">
//         <input type="submit" className="btn-register" value="Register" required/>
//         </Link>



//     </div>

    
// )};