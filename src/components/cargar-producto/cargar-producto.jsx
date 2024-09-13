import React, { useState } from "react";
import "./cargar-producto.css";
import {Link} from 'react-router-dom';
import axios from 'axios';


export default function Cargar() {
  const [product, producto ] =useState("")
  const [price, precio]=useState("")
  const [url, img]=useState("")
  const [suela, tiposuela]=useState("")


  const cargar = async (e) =>{
    e.preventDefault()
      try {
        await axios.post("http://localhost:3000/products",{product,price, url, suela})
        alert("Producto creado exitosamente!")
        
        window.location.href = "http://localhost:3001/";

        
      } catch (error) {
        alert("Producto ya existente.")
        
      }
    
  }

  return (
    <div className="cargar-container">
      <form className="cargar-form" action="#" method="post">
        <h2>Ingrese su producto</h2>
        <div className="input-container">
          <label htmlFor="product">Producto</label>
          <input type="product" id="product" name="product" value ={product} onChange={(e) => producto (e.target.value)} required />
        </div>
        <div className="input-container">
          <label htmlFor="price">Precio</label>
          <input type="price" id="Precio" name="Precio" value ={price} onChange={(e) => precio (e.target.value)} required />
        </div>
        <div className="input-container">
          <label htmlFor="url">Url</label>
          <input type="url" id="Img" name="Img" value ={url} onChange={(e) => img (e.target.value)} required />
        </div>
        <div className="input-container">
          <label htmlFor="suela">Suela</label>
          <input type="suela" id="tiposuela" name="tiposuela" value ={suela} onChange={(e) => tiposuela (e.target.value)} required />
        </div>


        <div className ="botoneslogin">
          
          <Link to="/sesion">
          <button type="submit" onClick = {cargar}>Crear producto </button>
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