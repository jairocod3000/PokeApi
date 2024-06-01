import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './home/Home.js';
import Pokemons from './pokemons/Pokemons.js';
import Play from './play/Play.js';
import PokemonDetails from './pokemonDetails/PokemonDetails.js';
import NotFound from './notFound/NotFound';
import Login from './auth/Login';
import Register from './auth/Register';
import { AuthContext } from './contexts/AuthContext';
import Leaderboard from './leaderboard/Leaderboard.js';
import Footer from './footer/Footer.js';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    toggleMenu();
  };

  return (
    <Router>
      <div className="header">
        <button className="menu-button" onClick={toggleMenu}>&#9776;</button>
        <nav className={isOpen ? "navigation open" : "navigation"}>
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
            <li><Link to="/pokemons" onClick={toggleMenu}>Pokemons</Link></li>
            {currentUser ? (
              <>
                <li><Link to="/play" onClick={toggleMenu}>Jugar</Link></li>
                <li><Link to="/leaderboard" onClick={toggleMenu}>Ranking</Link></li>
                <li><LogoutButton onLogout={handleLogout} /></li>
                <li><span>Hola, {currentUser.email}</span></li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={toggleMenu}>Iniciar Sesión</Link></li>
                <li><Link to="/register" onClick={toggleMenu}>Registro</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/detalle/:idPokemon" element={<PokemonDetails />} />
        <Route path="/play" element={currentUser ? <Play /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />  {}
    </Router>
  );
}

function LogoutButton({ onLogout }) {
  let navigate = useNavigate();
  return (
    <button className='logout-button' onClick={() => { onLogout(); navigate('/login'); }}>Cerrar Sesión</button>
  );
}

export default App;
