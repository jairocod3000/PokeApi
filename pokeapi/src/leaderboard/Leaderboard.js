import React, { useEffect, useState } from 'react';
import { getTopScores } from '../firestore-functions';
import './Leaderboard.css'; 

function Leaderboard() {
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const scores = await getTopScores();
      const scoreMap = {};
      scores.forEach(({ userEmail, score }) => { // Sumamos todos los puntos para el mismo correo
        if (scoreMap[userEmail]) {
          scoreMap[userEmail] += score;
        } else {
          scoreMap[userEmail] = score;
        }
      });

      const sortedScores = Object.entries(scoreMap).map(([userEmail, score]) => ({ userEmail, score }));
      sortedScores.sort((a, b) => b.score - a.score); // Ordena descendentemente por puntuación
      setScoreboard(sortedScores);
    };

    fetchScores();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>Tabla de Puntuaciones:</h1>
      <ul className="leaderboard-list">
        {scoreboard.map((entry, index) => (
          <li key={index} className="leaderboard-item">
            <span>{entry.userEmail}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
