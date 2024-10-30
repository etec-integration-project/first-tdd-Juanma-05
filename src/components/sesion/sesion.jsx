import React, { useState } from "react";
import "./sesion.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/login", { email, password });
      
      // Muestra el mensaje de éxito
      setSuccessMessage('Inicio de sesion exitoso');
      
      // Limpia los campos
      setEmail('');
      setPassword('');

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("Correo electronico o contraseña incorrecto."); 
      } else {
        setErrorMessage("Correo electronico o contraseña incorrecto."); 
      }
      setSuccessMessage(''); 

      // Limpia los campos y borra el mensaje de error después de 5 segundos
      setTimeout(() => {
        setErrorMessage('');
        setPassword('');
      }, 3000);    }
  };

  return (
    <div className="login">
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="login-form-login" action="#" method="post">
        <h2>Iniciar sesión</h2>
        <div className="input-container-login">
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
        <div className="input-container-login">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="botoneslogin-login">
          <button type="submit" onClick={handleLogin}>Iniciar sesión</button>
        </div>

        <div>
          <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </div>
      </form>
    </div>
  );
}
