import React, { useState } from "react";
import "./sesion.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/login", { email, password });
      alert("Inicio de sesión exitoso!");
      
      // Redirige al usuario a la página principal o al área de usuario
      window.location.href = "http://localhost:3001";
    } catch (error) {
      alert("Correo electrónico o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" action="#" method="post">
        <h2>Iniciar sesión</h2>
        <div className="input-container">
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
        <div className="input-container">
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

        <div className="botoneslogin">
          <button type="submit" onClick={handleLogin}>Iniciar sesión</button>
        </div>

        <div>
          <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
        </div>
      </form>
    </div>
  );
}
