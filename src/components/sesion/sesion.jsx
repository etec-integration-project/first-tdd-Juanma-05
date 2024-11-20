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
        const response = await axios.post("/api/login", { email, password });

        // Si el inicio de sesión es exitoso
        if (response.status === 200) {
            setSuccessMessage('Inicio de sesión exitoso');
            setErrorMessage(''); // Borra cualquier mensaje de error

            // Limpia los campos
            setEmail('');
            setPassword('');

            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    } catch (error) {
        if (error.response) {
            // Código 404: Correo electrónico no registrado
            if (error.response.status === 404) {
              setErrorMessage(error.response.data.error); // Muestra el mensaje del backend
                setEmail('');
                setPassword('');


            }
            // Código 401: Contraseña incorrecta
            else if (error.response.status === 401) {
                setErrorMessage(error.response.data.error); // Muestra el mensaje del backend
                setPassword('');

            }
            // Otros errores de inicio de sesión
            else {
                setErrorMessage("Error en el inicio de sesión");
                setSuccessMessage(''); // Limpia cualquier mensaje de éxito
            }
        } else {
            // Si no hay respuesta del servidor, muestra un error genérico
            setErrorMessage("Error en el inicio de sesión");
            setSuccessMessage(''); // Limpia cualquier mensaje de éxito
        }

        // Limpia los mensajes después de 3 segundos
        setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
            setPassword('');
        }, 3000);
    }
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
          <p className="p">¿No tienes una cuenta? </p>
          <p className="p"><Link to="/register">Regístrate aquí</Link></p>
        </div>
      </form>
    </div>
  );
}
