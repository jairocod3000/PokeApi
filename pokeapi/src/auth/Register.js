import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerWithEmail, signInWithGoogle, signInWithGithub } from '../auth-functions';
import './Register.css'; 

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      navigate('/');
    } catch (error) {
      alert("Error en el registro: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      alert("Error al iniciar sesión con Google: " + error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub();
      navigate('/');
    } catch (error) {
      alert("Error al iniciar sesión con GitHub: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Registrarse</h1>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <button className='registrar' type="submit">Registrar</button>
        </form>
        <button onClick={handleGoogleSignIn}>Registrarse con Google</button>
        <button onClick={handleGithubSignIn}>Registrarse con GitHub</button>
      </div>
    </div>
  );
}

export default Register;
