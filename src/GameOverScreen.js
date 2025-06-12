import React from "react";

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
          <p>
            Items:{" "}
            {finalStats.items?.length > 0
              ? finalStats.items.join(", ")
              : "None"}
          </p>
        </div>
      )}

      <button onClick={onRestartGame} className="restart-button">
        Mulai Ulang Game
      </button>
    </div>
  );
}

export default GameOverScreen;
