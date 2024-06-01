import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pokemons.css';

function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=12'); // Irá mostrando pokemons de 12 en 12
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(currentPageUrl)
      .then(response => response.json())
      .then(data => {
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
        return data.results.map(pokemon => pokemon.url);
      })
      .then(urls => {
        return Promise.all(urls.map(url => fetch(url).then(resp => resp.json())));
      })
      .then(pokemonsDetails => {
        setLoading(false);
        setPokemons(pokemonsDetails);
      });
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.includes(search.toLowerCase())
  );

  if (loading) return "Cargando...";

  return (
    <div className='list-container'>
      <br></br><br></br><br></br>
      <h1>Pokemons</h1>
      <div className="search-box">
        <input type="text" placeholder="Buscar Pokémon" onChange={handleSearchChange} />
      </div>
      <div className="pokemon-list">
        {filteredPokemons.map(pokemon => (
          <Link to={`/detalle/${pokemon.id}`} key={pokemon.id} className="pokemon-item"> {}
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </Link>
        ))}
      </div>
      <div className='next-or-prev'>
        {prevPageUrl && <button onClick={goToPrevPage}>Anterior</button>}
        {nextPageUrl && <button onClick={goToNextPage}>Siguiente</button>}
      </div>
    </div>
  );
}

export default Pokemons;

