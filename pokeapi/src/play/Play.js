import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { addScore } from '../firestore-functions';
import './Play.css';

function Play() {
  const { currentUser } = useContext(AuthContext);
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(3); // Son 3 oportunidades para intentar adivinar al pokemon
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * 150) + 1; // Selecciona un Pokémon al azar de la primera generación
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then(response => response.json())
      .then(data => {
        setPokemon({
          name: data.name,
          type: data.types.map(type => type.type.name).join(', '),
          ability: data.abilities[0].ability.name,
          height: data.height,
          weight: data.weight,
          image: data.sprites.front_default
        });
        setMessage('');
        setAttempts(3);
        setGameOver(false);
      });
  }

  function handleGuess() {
    if (guess.toLowerCase() === pokemon.name) {
      setMessage('¡Correcto! ¡Felicidades!');
      setGameOver(true); // Establece el juego como terminado
      const score = 0 + attempts * 10;
      if (currentUser && score !== undefined) {
        addScore(currentUser.uid, currentUser.email, score); // Guardamos la puntuación
      }
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      if (newAttempts <= 0) {
        setMessage(`Lo siento, has fallado. El Pokémon era ${pokemon.name}.`);
        setGameOver(true); // Establece tambiém el juego como terminado
      } else {
        setMessage(`Incorrecto. Intentos restantes: ${newAttempts}`);
      }
    }
    setGuess('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !gameOver) {
      handleGuess();
    }
  }

  function restartGame() {
    fetchRandomPokemon();
  }

  return (
    <div className='body'><br></br>
      <div className="play-container">
      <div className="play-left">
        <h1>¿Quién es ese Pokémon?</h1>
        {pokemon && (
          <>
            <div className="play-hints">
              <p>Pista: Tipo(s) - {pokemon.type}</p>
              <p>Pista: Primera habilidad - {pokemon.ability}</p>
              <p>Pista: Altura - {pokemon.height} decímetros</p>
              <p>Pista: Peso - {pokemon.weight} hectogramos</p>
            </div>
            {!gameOver && (
              <>
                <input
                  type="text"
                  className="play-input"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tu respuesta..."
                />
                <button className="play-button" onClick={handleGuess}>Adivinar</button>
              </>
            )}
            {message && <p className="play-message">{message}</p>}
            {gameOver && <button className="play-button" onClick={restartGame}>Jugar de Nuevo</button>}
          </>
        )}
      </div>
      <div className="play-right">
        {pokemon && <img src={pokemon.image} alt="Silueta" className="pokemon-silueta" />}
      </div>
    </div>
    </div>
  );
}

export default Play;
