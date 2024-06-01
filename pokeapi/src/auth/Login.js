import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle, signInWithGithub } from '../auth-functions';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      navigate('/');
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
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
    <div className="login-container">
      <div className="login-form">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleLogin}>
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
          <button className='iniciar' type="submit">Iniciar Sesión</button>
        </form>
        <button onClick={handleGoogleSignIn}>Iniciar sesión con Google</button>
        <button onClick={handleGithubSignIn}>Iniciar sesión con GitHub</button>
        <div className="register-links">
          <p>¿Aún no tienes una cuenta? <Link to="/register">Registrarse</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
