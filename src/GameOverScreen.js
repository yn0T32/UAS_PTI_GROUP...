import React from 'react';

function GameOverScreen({ message, playerData, onRestartGame }) {
  const finalStats = playerData?.stats || {}; // Ambil stats terakhir pemain

  return (
    <div className="game-over-screen">
      <h2>Game Over!</h2>
      <p className="game-over-message">{message}</p>

      {playerData && (
        <div className="final-stats">
          <h3>Statistik Akhir {playerData.name}:</h3>
          <p>Meal: {Math.round(finalStats.meal)}</p>
          <p>Sleep: {Math.round(finalStats.sleep)}</p>
          <p>Happiness: {Math.round(finalStats.happiness)}</p>
          <p>Cleanliness: {Math.round(finalStats.cleanliness)}</p>
          <p>Money: ${finalStats.money}</p>
          {/* Menampilkan item dari objek */}
          <div className="inventory">
            <p>Items:</p>
            {/* Memastikan Object.keys menerima objek yang valid untuk menghindari error */}
            {Object.keys(finalStats.items || {}).length > 0 ? (
              <ul>
                {Object.entries(finalStats.items).map(([itemName, quantity]) => (
                  <li key={itemName}>{itemName}: {quantity}</li>
                ))}
              </ul>
            ) : (
              <p>None</p>
            )}
          </div>
          <p>Score: {finalStats.score || 0}</p> {/* BARIS INI UNTUK MENAMPILKAN SKOR */}
          <p>Waktu Hidup: {finalStats.lifetime || 0} detik</p> {/* BARIS INI UNTUK MENAMPILKAN WAKTU HIDUP */}
        </div>
      )}

      <button onClick={onRestartGame} className="restart-button">
        Mulai Ulang Game
      </button>
    </div>
  );
}

export default GameOverScreen;
