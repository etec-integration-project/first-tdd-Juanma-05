import React, { useState } from "react";
import "./cargar-producto.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Cargar() {
  const [product, producto] = useState("");
  const [price, precio] = useState("");
  const [url, img] = useState("");
  const [suela, tiposuela] = useState(""); // Suela se mantendrá como un estado
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const cargar = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/products", { product, price, url, suela });
      setSuccessMessage('Producto creado exitosamente');

      // Limpia los campos
      producto('');
      precio('');
      img('');
      tiposuela('');

      // Redirige después de 3 segundos
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error); // Agregar este log para depurar
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data.error); // Muestra el mensaje del backend
      } else {
        setErrorMessage("Error al crear el producto.");
      }
      setSuccessMessage('');

      // Limpia los campos y borra el mensaje de error después de 5 segundos
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }

  return (
    <div className="cargar-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="cargar-form" action="#" method="post">
        <h2>Ingrese su producto</h2>
        <div className="input-container">
          <label htmlFor="product">Producto</label>
          <input type="product" id="product" name="product" value={product} onChange={(e) => producto(e.target.value)} required />
        </div>
        <div className="input-container">
          <label htmlFor="price">Precio</label>
          <input type="price" id="Precio" name="Precio" value={price} onChange={(e) => precio(e.target.value)} required />
        </div>
        <div className="input-container">
          <label htmlFor="url">Url</label>
          <input type="url" id="Img" name="Img" value={url} onChange={(e) => img(e.target.value)} required />
        </div>
        <div className="input-container">
          <label htmlFor="suela">Suela</label>
          <select id="tiposuela" name="tiposuela" value={suela} onChange={(e) => tiposuela(e.target.value)} required>
            <option value="">Seleccione un tipo de suela</option>
            <option value="SG">SG</option>
            <option value="FG">FG</option>
            <option value="MIXTA">MIXTA</option>
          </select>
        </div>

        <div className="botoneslogin">
          <Link to="/sesion">
            <button type="submit" onClick={cargar}>Crear producto </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
