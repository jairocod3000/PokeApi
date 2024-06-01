import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; 

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404 - Página no encontrada</h1>
      <p>Uy! Parece que la ruta que estás buscando no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;
