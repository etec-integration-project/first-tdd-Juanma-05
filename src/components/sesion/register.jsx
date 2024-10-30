import React, { useState } from "react";
import "./register.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
  const navigate = useNavigate();

  const registro = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/register", { email, password });

      setSuccessMessage('Usuario registrado correctamente');

      // Limpia los campos
      setEmail('');
      setPassword('');

      // Redirige después de 3 segundos
      setTimeout(() => {
        navigate("/sesion");
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("El correo electrónico ya está en uso."); 
      } else {
        setErrorMessage("El correo electronico ya esta en uso."); 
      }
      setSuccessMessage(''); 

      // Limpia los campos y borra el mensaje de error después de 5 segundos
      setTimeout(() => {
        setErrorMessage('');
        setEmail('');
        setPassword('');
      }, 3000);
    }
  };

  return (
    <div className="register">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Muestra el mensaje de error */}

      <form className="login-form-register" onSubmit={registro}>
        <h2>Cree su cuenta</h2>
        <div className="input-container-register">
          <label htmlFor="email">Correo Electrónico</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-container-register">
          <label htmlFor="contrasena">Contraseña</label>
          <input 
            type="password" 
            id="contrasena" 
            name="contrasena" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <div className="botoneslogin-register">
          <button type="submit">Crear cuenta</button>
        </div>
      </form>
    </div>
  );
}
