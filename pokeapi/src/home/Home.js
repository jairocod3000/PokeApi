import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenido a la Aplicación de Pokémon</h1>
        <p>Explora el mundo de los Pokémon. Aprende sobre diferentes Pokémon, sus habilidades, estadísticas y más.</p>
      </header>
      <section className="features">
        <div className="feature-item">
          <h2>Descubre</h2>
          <p>Explora una vasta base de datos de Pokémon. Encuentra tus favoritos, aprende sobre sus habilidades y características únicas.</p>
        </div>
        <div className="feature-item">
          <h2>Juega</h2>
          <p>Prueba tu conocimiento con un juego interactivo. Adivina Pokémon basándote en siluetas, tipos y habilidades.</p>
        </div>
      </section>
      <section className="latest-news">
        <h2>Últimas Noticias</h2>
        <p>Entérate de las últimas actualizaciones en el mundo Pokémon. ¡No te pierdas ninguna novedad!</p>
        <div className="news-images">
          <img src='/images/noticia1.jpg' alt="Noticia 1" />
          <img src="/images/noticia2.jpg" alt="Noticia 2" />
          <img src="/images/noticia3.jpg" alt="Noticia 3" />
        </div>
      </section>
      <section className="community-section">
        <h2>Comunidad</h2>
        <p>Únete a la comunidad de fans de Pokémon. Participa en eventos, competencias y mucho más.</p>
      </section>
    </div>
  );
}

export default Home;
