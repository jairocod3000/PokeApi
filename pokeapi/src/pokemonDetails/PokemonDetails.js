import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css';

function PokemonDetails() {
  const { idPokemon } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
      .then(response => response.json())
      .then(data => {
        setPokemonDetails(data);
        setLoading(false);
      });
  }, [idPokemon]);

  if (loading) return "Cargando...";

  return (
    <div className='body-container'>
      <div className='pokemon-details'><br></br><br></br><br></br>
      <h1>{pokemonDetails.name}</h1>
      <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      <p>Peso: {pokemonDetails.weight} hectograms</p>
      <p>Altura: {pokemonDetails.height} decimetres</p>
      <div>
        <h2>Tipos:</h2>
        <ul>
          {pokemonDetails.types.map((typeInfo) => (
            <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Estadísticas:</h2>
        <ul className="stats-grid">
          {pokemonDetails.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Habilidades:</h2>
        <ul>
          {pokemonDetails.abilities.map((ability) => (
            <li key={ability.ability.name}>
              {ability.ability.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Movimientos:</h2>
        <ul className="moves-grid">
          {pokemonDetails.moves.map((move, index) => index < 10 && (
            <li key={move.move.name}>
              {move.move.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    
  );
}

export default PokemonDetails;


